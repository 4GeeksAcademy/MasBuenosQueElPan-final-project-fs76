"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Producer, ProductCategories
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/producer/signup', methods=['POST'])
def handle_signup():
    email = request.json["email"]
    password = request.json["password"]
    # brand_name = request.json["brand_name"]
    # user_name = request.json["user_name"]
    # user_last_name = request.json["user_last_name"]
    # cif = request.json["cif"]
    # address = request.json["address"]
    # province = request.json["province"]
    # zip_code = request.json["zip_code"]
    # phone = request.json["phone"]
    print(email,password)

    new_producer = Producer(
        email=email,
        password=password,
        # brand_name=brand_name,
        # user_name=user_name,
        # user_last_name=user_last_name,
        # cif=cif,
        # address=address,
        # province=province,
        # zip_code=zip_code,
        # phone=phone,
        is_active=True
        )
    
    if email:
        existing_producer = Producer.query.filter_by(email=email).first()
        if existing_producer:
            return jsonify(exists=True, message="Email already exists"), 400
    print("New producer", new_producer)

    db.session.add(new_producer)
    db.session.commit()

    return jsonify({"message": "User created successfully!"}), 201


@api.route('/producers', methods=['GET'])
def get_producers():
    producers = Producer.query.order_by(Producer.email).all()
    result = list(map(lambda producers: producers.serialize(), producers))

    return jsonify(result), 200


# for logging in
@api.route("/producer/login", methods=["POST"])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    producer = Producer.query.filter_by(email=email).first()

    if producer is None:
        print("email does not exist")
        return jsonify({"msg": "Incorrect email or email does not exist"}), 401
    if producer.email != email or producer.password != password:
        print("incorrect password or email")
        return jsonify({"msg": "Password or email incorrect"}), 401


    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route('/producer/<int:producer_id>', methods=['GET'])
def get_producer(producer_id):
    producer = Producer.query.filter_by(id=producer_id).first()
    if producer is None:
        return jsonify("ERROR: Error getting account"), 404
    else:
        return jsonify(producer.serialize()), 200
    
@api.route('/producer/<int:producer_id>', methods=['DELETE'])
def delete_producer(producer_id):

    producer = Producer.query.filter_by(id=producer_id).first()
    if producer is None:
        return jsonify("ERROR: Could not delete the account. Maybe it doesn't exist"), 404

    db.session.delete(producer)
    db.session.commit()

    return jsonify(producer.serialize()), 200

@api.route('/producer/<int:producer_id>', methods=['PUT'])
def edit_producer(producer_id):
    producer_data = request.get_json()
    print(producer_data)
    producer = Producer.query.filter_by(id=producer_id).first()

    if producer is None:
        return ("error","producer not found")
    producer.email= producer_data.get("email", producer.email)
    producer.password= producer_data.get("password", producer.password)
    producer.brand_name= producer_data.get("brand_name", producer.brand_name)
    producer.user_name= producer_data.get("user_name", producer.user_name)
    producer.user_last_name= producer_data.get("user_last_name", producer.user_last_name)
    producer.cif= producer_data.get("cif", producer.cif)
    producer.address= producer_data.get("address", producer.address)
    producer.province= producer_data.get("province", producer.province)
    producer.zip_code= producer_data.get("zip_code", producer.zip_code)
    producer.phone= producer_data.get("phone", producer.phone)
    

    db.session.commit()

    return jsonify(producer.serialize()), 200

@api.route('/categories', methods=['GET'])
def get_categories():
    all_categories= ProductCategories.query.all()    
    results = list (map(lambda categorie: categorie.serialize (), all_categories)) 
    

    return jsonify(results), 200

@api.route('/categories/<int:categorie_id>', methods=['GET'])
def get_categorie(categorie_id):
    print(f"Fetching category with ID: {categorie_id}")
    categorie = ProductCategories.query.filter_by(id=categorie_id).first()
    print(f"Category fetched: {categorie}")
    if categorie is None:
        return jsonify({"msg": "Category not found"}), 404
    return jsonify(categorie.serialize()), 200

@api.route('/categories/<int:categorie_id>', methods=['DELETE'])
def delete_categorie(categorie_id):
    print(categorie_id)
    categorie = ProductCategories.query.get(categorie_id)
    if categorie is None:
        return jsonify({"error": "Espabila!! , que esta categoría no la hemos creado"}), 404
    db.session.delete(categorie)
    db.session.commit()
    
    return jsonify({'message': f' Has  borrado la categoría {categorie_id}'}), 200



@api.route('/categories', methods=['POST'])
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

@api.route('/categories/<int:categorie_id>', methods=['PUT'])
def update_categorie(categorie_id):
    categorie_data = request.get_json()
    print(categorie_data)
    categorie = ProductCategories.query.filter_by(id=categorie_id).first()

    if categorie is None:
        return jsonify({"error":"La categoría no existe"})
    if categorie_data['categorie'] == '':
        return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400
    
    categorie.categorie= categorie_data.get("categorie", categorie.categorie)

    db.session.commit()

    return jsonify(categorie.serialize()), 200



    # body = request.get_json()

    # categorie = ProductCategories.query.get(categorie_id)
    # if categorie is None:
    #     return jsonify({"error": "La categoría no existe"}), 404

    # if 'categorie' not in body:
    #     return jsonify({"error": "Indica el nombre de la categoría"}), 400
    # if body['categorie'] == '':
    #     return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

    # categorie.name = body['categorie']
    
    # db.session.commit()

    return jsonify({"msg": f"La categoría {categorie_id} ha sido actualizada"}), 200

