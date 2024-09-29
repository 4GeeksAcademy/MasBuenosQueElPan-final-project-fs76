"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, ProductCategories
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


@api.route('/categorias', methods=['GET'])
def get_categories():
    all_categories= ProductCategories.query.all()    
    results = list (map(lambda categorie: categorie.serialize (), all_categories)) 
    

    return jsonify(results), 200

@api.route('/categorias/<int:categorie_id>', methods=['GET'])
def get_categorie(categorie_id):
    print(f"Fetching category with ID: {categorie_id}")
    categorie = ProductCategories.query.filter_by(id=categorie_id).first()
    print(f"Category fetched: {categorie}")
    if categorie is None:
        return jsonify({"msg": "Category not found"}), 404
    return jsonify(categorie.serialize()), 200

@api.route('/categorias/<int:categorie_id>', methods=['DELETE'])
def delete_categorie(categorie_id):
    
    categorie = ProductCategories.query.get(categorie_id)
    if categorie is None:
        return jsonify({"error": "Espabila!! , que esta categoría no la hemos creado"}), 404
    db.session.delete(categorie)
    db.session.commit()

   
    return jsonify({'message': f' Has  borrado la categoría {categorie_id}'}), 200



@api.route('/categorias', methods=['POST'])
def add_categorie():
    body = request.get_json()
    print (body)
    
    if 'categorie' not in body:
        return jsonify ('Indica el nombre de la categoria'), 400
    if body['categorie'] == '':
        return jsonify ('El nombre es obligatorio'), 400

    categorie = ProductCategories( **body)
    print (categorie)
    db.session.add(categorie)
    db.session.commit()

    response_body ={
        "msg":"Se ha añadido la categoría"
    }
     
    return jsonify(response_body), 200

@api.route('/categorias/<int:categorie_id>', methods=['PUT'])
def update_categorie(categorie_id):
    body = request.get_json()

    categorie = ProductCategories.query.get(categorie_id)
    if categorie is None:
        return jsonify({"error": "La categoría no existe"}), 404

    if 'categorie' not in body:
        return jsonify({"error": "Indica el nombre de la categoría"}), 400
    if body['categorie'] == '':
        return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

    categorie.name = body['categorie']
    
    db.session.commit()

    return jsonify({"msg": f"La categoría {categorie_id} ha sido actualizada"}), 200

