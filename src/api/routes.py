"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#####GET Products#####
@api.route('/product', methods=['GET'])
def view_products():
    all_products = Product.query.all()
    result = list(map(lambda product: product.serialize(), all_products))
    if not result:
        response_body = {
            "msg" : "No existen datos"
        }
        return jsonify(response_body),200

    return jsonify(result), 200


#####POST Products#####

@api.route('/product', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg":"No se han proporcioando datos"}), 400
        
        ##Body Obtener respuesta
        name = data.get('name')
        price = data.get('price')
        description = data.get('description')
        origin = data.get('origin')

        #Validación de la respuesta
        if not name or not price or not description or not origin:
            return jsonify({"msg": "Faltan datos"}), 400
        
        #Hago verificación de que el precio sea número

        try:
            price = int(price)
        except ValueError:
            return jsonify({"msg":"El precio debe ser un número"}), 400
        
        #Comprobamos que no exista el nombre del producto 
        existing_product = Product.query.filter_by(name=name).first()
        if existing_product:
            return jsonify({"msg":"El nombre del producto ya existe"}), 400

        #Añadir nuevo producto
        new_product = Product(
            name=name,
            price=price,
            description=description,
            origin=origin 
        )

        #Actualizar la base de datos
        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.serialize()),201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#####PUT Products#####

@api.route('/product/<int:id>', methods=['PUT'])
def edit_product(id):
    try:
        #Primero traemos el producto de la base de datos
        product = Product.query.get(id)
        if not product:
            return jsonify({"msg":"Product no encontrado"}), 404

        #Traemos la respuesta
        data = request.get_json()
        if not data:
            return jsonify({"msg":"No se han proporcionado datos"}), 400
        
        name = data.get("name")
        price = data.get("price")
        description = data.get("description")
        origin = data.get("origin")

        #Actualizamos la base de datos
        if name:
            product.name = name
        if price:
            try:
                product.price = int(price)
            except ValueError:
                return jsonify({"msg":"El precio debe ser un número"}), 400
            product.price = price
        if description:
            product.description = description
        if origin:
            product.origin = origin
        
        #Guardamos los datos en la base de datos
        db.session.commit()

        return jsonify(product.serialize()),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#####DELETE Products#####

@api.route('/product/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        #Seleccionamos el producto que queremos eliminar
        product = Product.query.get(id)

        if not product:
            return jsonify({"msg": "Producto no encontrado"}), 404
        
        #Eliminamos el producto
        db.session.delete(product)
        db.session.commit()

        return jsonify({"msg":"se ha eliminado el producto"}), 200
        

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500




@api.route('/user', methods=['GET'])
def view_users():
    all_users= User.query.all()
    results = list(map(lambda usuario: usuario.serialize(), all_users))
    print(results)

    response_body = {
        "msg": "Hello, this is your GET /user response "
    }

    return jsonify(results), 200
