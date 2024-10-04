from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric

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
    name = db.Column(db.String(60), unique=False, nullable = False)
    last_name = db.Column(db.String(60), unique=False, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column (db.String(400), unique = False, nullable = False)
    address = db.Column(db.String(60), unique = False, nullable = False)
    province = db.Column (db.String(40), unique=False, nullable=False)
    zipcode = db.Column (db.String(14), unique = False, nullable = False)
    phone = db.Column (db.String(20), unique = False, nullable = False)
    country = db.Column (db.String(20), unique = False, nullable = False)
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



##PRODUCT##
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    price = db.Column(Numeric(10, 2), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)
    origin = db.Column(db.String(120), unique=False, nullable=False)
    #Representación básica
    def __repr__(self):
        return f'<Product {self.name}>'
    #Representación completa
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "origin": self.origin,
        }

##PRODUCER##
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
    zip_code = db.Column(db.Integer, unique=False, nullable=True)
    phone = db.Column(db.Integer, unique=True, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #Representación básico
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
            "phone": self.phone,
            # do not serialize the password, its a security breach
        }

##PRODUCT CATEGORIES##
class ProductCategories (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    categorie = db.Column(db.String(40), unique=True, nullable=False)
    #Representación básica
    def __repr__(self):
        return f'<Categorie {self.categorie}>'
    #Representación completa
    def serialize(self):
        return {
            "categorie": self.categorie,
            "id": self.id,
            # do not serialize the password, its a security breach
        }
    

  


