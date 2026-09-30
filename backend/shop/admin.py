from django.contrib import admin
from .models import User,Product,Category,Location,Reservation

admin.site.register(User)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Location)
admin.site.register(Reservation)