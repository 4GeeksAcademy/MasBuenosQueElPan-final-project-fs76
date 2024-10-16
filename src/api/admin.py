  
import os
from flask_admin import Admin
from .models import db, User, Producer, ProductCategories, Product, Customer, OrderStatus, Order, OrderItem
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Producer, db.session))
    admin.add_view(ModelView(ProductCategories, db.session))
    admin.add_view(ModelView(Customer, db.session))
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(OrderItem, db.session))
    # admin.add_view(ModelView(Province, db.session))

    # admin.add_view(ModelView(CartItem, db.session))
    # admin.add_view(ModelView(CartProduct, db.session))
    # admin.add_view(ModelView(CustomerCart, db.session))

    