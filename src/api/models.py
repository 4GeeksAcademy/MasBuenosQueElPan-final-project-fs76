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
        return f'<User {self.email}>'
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
    

  


