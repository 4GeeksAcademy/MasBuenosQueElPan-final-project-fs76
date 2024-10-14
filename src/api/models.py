from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric, DateTime, Integer, String, Boolean

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
####CUSTOMER####
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable = True)
    last_name = db.Column(db.String(60), unique=False, nullable = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column (db.String(400), unique = False, nullable = False)
    address = db.Column(db.String(60), unique = False, nullable = True)
    province = db.Column (db.String(40), unique=False, nullable=True)
    city = db.Column (db.String(40), unique=False, nullable=True)
    zipcode = db.Column (db.String(14), unique = False, nullable = True)
    phone = db.Column (db.String(20), unique = False, nullable = True)
    country = db.Column (db.String(20), unique = False, nullable = True)
    is_active = db.Column (db.Boolean, default=True, nullable=False)
    #Representación básica
    def __repr__(self):
        return f'<Customer {self.name}>'
    #Representación completa
    def serialize(self):
        return {
            "id": self.id,
            "customer_name": self.name,
            "customer_lastname": self.last_name,
            "customer_email": self.email,
            "customer_password": self.password,
            "customer_address": self.address, 
            "customer_province": self.province,
            "customer_zipcode": self.zipcode,
            "customer_phone": self.phone,
            "customer_country": self.country,
            "customer_isactive": self.is_active
        }
    

# #####PROVINCES#####
# class Province(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=True, nullable=False)

#     def __repr__(self):
#         return f'<Province {self.name}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name
#         }

# #####DEFAULT PROVINCES#####
# def populate_provinces():
#     provinces = [
#     "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Baleares", 
#     "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", 
#     "Cuenca", "Girona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Jaén", "La Rioja", 
#     "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", 
#     "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", 
#     "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"] 
#     for province in provinces:
#         existing_province = Province.query.filter_by(name=province).first()
#         if not existing_province:
#             new_province = Province(name=province)
#             db.session.add(new_province)
#     db.session.commit()



class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    price = db.Column(Numeric(10, 2), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)
    origin = db.Column(db.String(120), unique=False, nullable=False)
    # Nueva columna de clave foránea que vincula con Producer
    producer_id = db.Column(db.Integer, db.ForeignKey('producer.id'), nullable=False)
    # Relación inversa con Producer
    producer = db.relationship('Producer', back_populates='products')

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": float(self.price),  # Convertir a float
            "description": self.description,
            "origin": self.origin,
            "producer_id": self.producer_id
        }

class Producer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(300), unique=True, nullable=False)
    password = db.Column(db.String(300), unique=False, nullable=False)
    brand_name = db.Column(db.String(120), unique=True, nullable=True)
    user_name = db.Column(db.String(120), unique=False, nullable=True)
    user_last_name = db.Column(db.String(120), unique=False, nullable=True)
    cif = db.Column(db.String(120), unique=True, nullable=True)
    address = db.Column(db.String(300), unique=False, nullable=True)
    province = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(60), unique=False, nullable=True)
    zip_code = db.Column(db.String(10), unique=False, nullable=True)  # Usar String para códigos postales
    phone = db.Column(db.String(15), unique=False, nullable=True)  # Usar String para números de teléfono
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # Relación con Product
    products = db.relationship('Product', back_populates='producer', lazy=True)

    def __repr__(self):
        return f'<Producer {self.email}>'

    #Representación completa
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "brand_name": self.brand_name,
            "user_name": self.user_name,
            "user_last_name": self.user_last_name,
            "cif": self.cif,
            "address": self.address,
            "province": self.province,
            "zip_code": self.zip_code,
            "city": self.city,
            "phone": self.phone,
            "products": [product.serialize() for product in self.products]
        }

class ProductCategories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    categorie = db.Column(db.String(40), unique=True, nullable=False)
    imageUrl = db.Column(db.String(255), nullable=True)
    
    #Representación básica
    def __repr__(self):
        return f'<Category {self.category}>'

    def serialize(self):
        return {
            "id": self.id,
            "imageUrl": self.imageUrl,
            "category": self.category,
        }

class CartProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(Integer, unique=False, nullable=False)
    product_id = db.Column(Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<CartProduct {self.product_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "cart_id": self.cart_id,
            "product_id": self.product_id
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_cart_id = db.Column(Integer, unique=False, nullable=False)
    product_id = db.Column(Integer, unique=False, nullable=False)
    quantity = db.Column(Integer, unique=False, nullable=False)  # Cambiar a Integer
    price = db.Column(Numeric(10, 2), unique=False, nullable=False)
    subtotal = db.Column(Numeric(10, 2), unique=False, nullable=False)
    total_price = db.Column(Numeric(10, 2), unique=False, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow, nullable=False)  # Fecha de creación
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)  # Fecha de actualización

    def __repr__(self):
        return f'<CartItem {self.product_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "customer_cart_id": self.customer_cart_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price": float(self.price),
            "subtotal": float(self.subtotal),
            "total_price": float(self.total_price)
        }

class CustomerCart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(Integer, unique=False, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    total_price = db.Column(Numeric(10, 2), unique=False, nullable=False)
    status = db.Column(String(50), unique=False, nullable=False)

    def __repr__(self):
        return f'<CustomerCart {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),  # Formato ISO para serialización
            "updated_at": self.updated_at.isoformat(),  # Formato ISO para serialización
            "total_price": float(self.total_price),
            "status": self.status
        }
           
            

  


