from django.contrib import admin

# Register your models here.
from base.models import Product


# Define the product class
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'image', 'price', 'countInStock')


admin.site.register(Product, ProductAdmin)
