from django.contrib.auth.models import AbstractUser
from django.db import models


class Location(models.Model):
    # จุดรับสินค้า/สถานที่
    name = models.CharField(max_length=150)
    building = models.CharField(max_length=100, blank=True)
    floor = models.CharField(max_length=30, blank=True)
    room = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    class Meta:
        db_table = "locations"

class User(AbstractUser):
    # AbstractUser มี username, password ให้แล้ว เราเพิ่มแค่ role กับ location
    role = models.CharField(max_length=30, default="staff")  # admin / staff
    # staff ดูแลได้แค่ location ของตัวเอง (admin ปล่อยว่างได้)
    location = models.ForeignKey(
        Location, null=True, blank=True,
        on_delete=models.SET_NULL, related_name="staff",
    )
    # created_at ใช้ date_joined ที่ AbstractUser มีให้แทนได้
    class Meta:
        db_table = "users"


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "categories"


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.CharField(max_length=255, blank=True)
    reservable = models.BooleanField(default=True)  # จองได้ไหม
    created_at = models.DateTimeField(auto_now_add=True)
    # สินค้าอยู่ที่ไหนบ้าง (ผ่านตาราง product_locations)
    locations = models.ManyToManyField(Location, through="ProductLocation", related_name="products")

    def __str__(self):
        return self.name
    class Meta:
        db_table = "products"

class ProductLocation(models.Model):
    # สินค้าชิ้นนี้ มีของที่ location นี้กี่ชิ้น
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    stock = models.IntegerField(default=0)

    class Meta:
        db_table = "product_locations"
        constraints = [
            # ห้ามมีคู่ product+location ซ้ำ (แทน composite PK ใน ER)
            models.UniqueConstraint(fields=["product", "location"], name="uniq_product_location")
        ]


class Reservation(models.Model):
    reservation_code = models.CharField(max_length=30, unique=True)
    customer_id = models.CharField(max_length=20)  # รหัสผู้จอง
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    status = models.CharField(max_length=30, default="reserved")  # reserved / picked_up / expired / cancelled
    reserved_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    picked_up_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = "reservations"