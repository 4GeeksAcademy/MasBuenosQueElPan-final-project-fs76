"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Producer
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

@api.route('/producer', methods=['POST'])
def handle_signup():
    email = request.json["email"]
    password = request.json["password"]
    brand_name = request.json["brand_name"]
    user_name = request.json["user_name"]
    user_last_name = request.json["user_last_name"]
    cif = request.json["cif"]
    address = request.json["address"]
    province = request.json["province"]
    zip_code = request.json["zip_code"]
    phone = request.json["phone"]
    print(email,password)

    new_producer = Producer(
        email=email,
        password=password,
        brand_name=brand_name,
        user_name=user_name,
        user_last_name=user_last_name,
        cif=cif,
        address=address,
        province=province,
        zip_code=zip_code,
        phone=phone,
        is_active=True
        )
    
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
@api.route('/producer', methods=['GET'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    producer = Producer.query.filter_by(email=email).first() 
    print("email",email)
    print("password",password)
    print("producer",producer)

    if producer is None:
        print("Incorrect email or email does not exist")
        return jsonify({"msg": "Email  incorrect"}), 401
    if producer.password != password:
        print("incorrect password")
        return jsonify({"msg": "password incorrect"}), 401
    print(producer)

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

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