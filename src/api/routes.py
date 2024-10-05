"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Producer, ProductCategories, Product, Customer
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from decimal import Decimal

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import check_password_hash , generate_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# ####GET Provinces#####
# @api.route('/provinces', methods=['GET'])
# def get_provinces():
#     all_provinces=Province.query.all()
#     result = list(map(lambda province : province.serialize(),all_provinces))
#     return jsonify(result),200

#####GET Customer#####
@api.route('/customers', methods=['GET'])
def get_customers():
    all_custumer = Customer.query.all()
    result = list(map(lambda customer: customer.serialize(),all_custumer))
    if not result:
        return jsonify({"msg": "No existen datos"}), 200
    return jsonify(result), 200


#####POST Customer#####
@api.route('/customers', methods=['POST'])
def create_customer():
    try:
        # Obtener los datos
        data = request.get_json()
        if not data:
            return jsonify({"msg": "No se han proporcionado datos"}), 400
        
        # Validar campos obligatorios
        required_fields = ['name', 'last_name', 'email', 'password', 'address', 'province', 'zipcode', 'phone', 'country']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"msg": f"Falta el campo {field}"}), 400

        # Asigno los datos
        name = data.get('name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        address = data.get('address')
        province = data.get('province')
        zipcode = data.get('zipcode')
        phone = data.get('phone')
        country = data.get('country')

        # Hashear la contraseña antes de almacenar
        hashed_password = generate_password_hash(password)
        # Añadir el nuevo cliente
        new_customer = Customer(
            name=name,
            last_name=last_name,
            email=email,
            password=hashed_password,
            address=address,
            province=province,
            zipcode=zipcode,
            phone=phone,
            country=country
        )

        # Actualizar la base de datos
        db.session.add(new_customer)
        db.session.commit()

        return jsonify(new_customer.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#####PUT Customer#####
@api.route('/customer/<int:id>', methods=['PUT'])
def edit_customer(id):
    try:
        customer = Customer.query.get(id)
        if not customer:
            return jsonify({"msg":"No existe el usuario"}), 404
        data = request.get_json()
        if not data:
            return jsonify({"msg":"No se han proporcionado datos"}), 400
        name = data.get('name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        adress = data.get('adress')
        # province_name = data.get ('province')
        province = data.get('province')
        zipcode = data.get ('zipcode')
        phone = data.get ('phone')
        country = data.get('country')

        #Actualizamos la bade de datos
        if name:
            customer.name = name
        if last_name:
            customer.last_name = last_name
        if email:
            customer.email = email
        if password:
            customer.password = password
        if adress:
            customer.adress = adress
        if province:
            customer.province = province
        if zipcode:
            customer.zipcode = zipcode
        if phone:
            customer.phone = phone
        if country:
            customer.country = country

        #Guardamos los datos en la base de datos
        db.session.commit()

        return jsonify(customer.serialize()), 200
    except Exception as e:
        db.sessions.rollback()
        return jsonify({"error": str(e)}), 500
    


#####DELETE Customer#####
@api.route('/customer/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        #Seleccionamos el producto que queremos eliminar
        customer = Customer.query.get(id)

        if not customer:
            return jsonify({"msg": "Producto no encontrado"}), 404
        
        #Eliminamos el producto
        db.session.delete(customer)
        db.session.commit()

        return jsonify({"msg":"se ha eliminado el usuario"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#####LOGIN CUTSOMER#####
@api.route('/login', methods=['POST'])
def customer_login():
    try:
        data = request.get_json()
        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"msg":"Faltan credenciales"}), 400
        email = data.get('email')
        password = data.get('password')
        print(email)
        print(password)
        #Busco el usuario con el amail recibido
        user = Customer.query.filter_by(email=email).first()
        #Verificamos para hacer el login
        if user and check_password_hash(user.password, password):
            #Generamos token de acceso
            access_token = create_access_token(identity={"id": user.id, "email":user.email})
            return jsonify({"msg": "Inicio de sesión exitoso", "access_token":access_token, "user_id":user.id}),200
        else:
            return jsonify({"msg": "Credenciales incorrectas"}), 401
    except Exception as e:
        return jsonify({"error":str(e)}), 500 


#####GET Products#####
@api.route('/products', methods=['GET'])
def view_products():
    all_products = Product.query.all()
    result = list(map(lambda product: product.serialize(), all_products))
    if not result:
        response_body = {
            "msg": "No existen datos"
        }
        return jsonify(response_body),200
    return jsonify(result), 200

#####GET Product: Para cuando podamos obtener los productos que haya añadido cada productor, revisar ruta#####
@api.route('/product', methods=['GET'])
def view_producer_products():
    producer_id = request.args.get('producerId')
    print(producer_id)
    if producer_id:
        all_products = Product.query.filter_by(producer_id=producer_id).all()  # Filtrar productos por producer_id
    else:
        return {"msg": "No existen datos"}  # Obtener todos los productos si no se proporciona producer_id

    result = list(map(lambda product: product.serialize(), all_products))
    if not result:
        response_body = {
            "msg": "No existen datos"
        }
        return jsonify(response_body), 200
    return jsonify(result), 200

#####POST Products#####

@api.route('/product', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg":"No se han proporcionado datos"}), 400
        
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
            price = float(price)
            if price <0:
                return jsonify({"msg":"El número debe ser positivo"}), 400
        except ValueError:
            return jsonify({"msg":"El precio debe ser un número"}), 400

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
                product.price = float(price)
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


####PRODUCER SINGUP #####
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

    return jsonify(new_producer.serialize()), 201

####CHECK IF PRODUCER EXIST####
@api.route('/checkProducer', methods=['POST'])
def check_PRODUCER_exists():
    email = request.json.get('email')

    if not email:
        return jsonify(message="Email is required"), 400

    if email:
        existing_user = Producer.query.filter_by(email=email).first()
        if existing_user:
            return jsonify(exists=True, message="Email already exists"), 200

    return jsonify(exists=False), 200

####GET PRODUCERS####
@api.route('/producers', methods=['GET'])
def get_producers():
    producers = Producer.query.order_by(Producer.email).all()
    result = list(map(lambda producers: producers.serialize(), producers))

    return jsonify(result), 200


@api.route('/user', methods=['GET'])
def view_users():
    all_users= User.query.all()
    results = list(map(lambda usuario: usuario.serialize(), all_users))
    print(results)

    response_body = {
        "msg": "Hello, this is your GET /user response "
    }

    return jsonify(results), 200


##### PRODUCER for logging in######
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
    if producer.brand_name is None:
        return jsonify(access_token=access_token, is_verify=False, producer_id=producer.id)
    return jsonify(access_token=access_token, is_verify=True, producer_id=producer.id)

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


#####GET ONE PRODUCER#####
@api.route('/producer/<int:producer_id>', methods=['GET'])
def get_producer(producer_id):
    producer = Producer.query.filter_by(id=producer_id).first()
    if producer is None:
        return jsonify("ERROR: Error getting account"), 404
    else:
        return jsonify(producer.serialize()), 200
    
##### DELETE ONE PRODUCER####
@api.route('/producer/<int:producer_id>', methods=['DELETE'])
def delete_producer(producer_id):

    producer = Producer.query.filter_by(id=producer_id).first()
    if producer is None:
        return jsonify("ERROR: Could not delete the account. Maybe it doesn't exist"), 404

    db.session.delete(producer)
    db.session.commit()

    return jsonify(producer.serialize()), 200

#####EDIT ONE PRODUCER#####
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

@api.route('/producer/<int:producer_id>', methods=['PUT'])
def add_producer_info(producer_id):
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

#####GET CATEGORIES#####
@api.route('/categories', methods=['GET'])
def get_categories():
    all_categories= ProductCategories.query.all()    
    results = list (map(lambda categorie: categorie.serialize (), all_categories)) 
    
    return jsonify(results), 200


####GET ONE CATEGORIE#####
@api.route('/categories/<int:categorie_id>', methods=['GET'])
def get_categorie(categorie_id):
    print(f"Fetching category with ID: {categorie_id}")
    categorie = ProductCategories.query.filter_by(id=categorie_id).first()
    print(f"Category fetched: {categorie}")
    if categorie is None:
        return jsonify({"msg": "Category not found"}), 404
    return jsonify(categorie.serialize()), 200

#####DELETE ONE CATEGORIE####
@api.route('/categories/<int:categorie_id>', methods=['DELETE'])
def delete_categorie(categorie_id):
    print(categorie_id)
    categorie = ProductCategories.query.get(categorie_id)
    if categorie is None:
        return jsonify({"error": "Espabila!! , que esta categoría no la hemos creado"}), 404
    db.session.delete(categorie)
    db.session.commit()
    
    return jsonify({'message': f' Has  borrado la categoría {categorie_id}'}), 200


##### POST CETEGORIES#####
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


##### PUT CATEGORIES#####
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

