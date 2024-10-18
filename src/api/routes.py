"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Producer, ProductCategories, Product, Customer, OrderStatus, Order, OrderItem
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from decimal import Decimal
from datetime import datetime

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import check_password_hash , generate_password_hash

import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
load_dotenv()
cloudinary.config(
    cloud_name=os.environ.get('CLOUDINARY_CLOUD_NAME'),
    api_key=os.environ.get('CLOUDINARY_API_KEY'),
    api_secret=os.environ.get('CLOUDINARY_API_SECRET')
)


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

#####GET ONE PRODUCER####
@api.route('/customer/<int:customer_id>', methods=["GET"])
def get_one_customer(customer_id):
    customer = Customer.query.filter_by(id=customer_id).first()
    if not customer:
        return jsonify({"msg": "No existen usuarios creados"}), 404
    return jsonify(customer.serialize()), 200


#####POST Customer#####
@api.route('/customers', methods=['POST'])
def create_customer():
    try:
        # Obtener los datos
        data = request.get_json()
        if not data:
            return jsonify({"msg": "No se han proporcionado datos"}), 400
        # Validar campos obligatorios
        required_fields = [ 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"msg": f"Falta el campo {field}"}), 400
        # Asigno los datos
        # name = data.get('name')
        # last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        # address = data.get('address')
        # province = data.get('province')
        # zipcode = data.get('zipcode')
        # phone = data.get('phone')
        # country = data.get('country')
        # Hashear la contraseña antes de almacenar
        hashed_password = generate_password_hash(password)
        # Añadir el nuevo cliente
        new_customer = Customer(
            # name=name,
            # last_name=last_name,
            email=email,
            password=hashed_password,
            # address=address,
            # province=province,
            # zipcode=zipcode,
            # phone=phone,
            # country=country
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
        address = data.get('address')
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
        if address:
            customer.address = address
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
        #Busco el usuario con el email recibido
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
def get_products():
    products = Product.query.all()
    result = list(map(lambda product: product.serialize(), products))

    return jsonify(result), 200
# @api.route('/products', methods=['GET'])
# def get_products():
#     products = Product.query.all()
#     return jsonify([product.serialize() for product in products]), 200

#####POST Product#####
@api.route('/product', methods=['POST'])
def add_product():
    try:
        data = request.form
        file = request.files.get('file')

        print("datos recibidos del nuevo producto", data.to_dict())
        print("imagen recibida para el nuevo producto", file)

        if not data:
            return jsonify({"msg": "No se han proporcionado datos"}), 400
        
        if file is None or file.filename == '':
            return jsonify({"msg": "No se ha subido ningún archivo"}), 400
        
        # Obtener otros datos
        name = data.get('name')
        price = data.get('price')
        description = data.get('description')
        origin = data.get('origin')
        brief_description = data.get('brief_description')
        weight = data.get('weight')
        volume = data.get('volume')
        minimum = data.get('minimum')
        categorie_id = data.get('categorie_id')
        producer_id = data.get('producer_id')
        available = data.get('available') == 'true'
        last_units = data.get('last_units') == 'true'
        soon = data.get('soon') == 'true'
        not_available = data.get('not_available') == 'true'
        print("price", price, "weight", weight, "volume", volume, "minimum", minimum)

        if not name or not price or not description or not origin or not brief_description or not minimum:
            return jsonify({"msg": "Faltan datos"}), 400
        
        # if (weight and volume) or (not weight and not volume):
        #     return jsonify({"msg": "Debes proporcionar solo uno de los campos: weight o volume."}), 400

        # Subir el archivo a Cloudinary
        upload_result = cloudinary.uploader.upload(file)
        file_url = upload_result['secure_url'] 

        # Validación de precio
        try:
            price = float(price)
            if price < 0:
                return jsonify({"msg": "El número debe ser positivo"}), 400
        except ValueError:
            return jsonify({"msg": "El precio debe ser un número"}), 400

        # Crear el nuevo producto
        new_product = Product(
            name=name,
            price=price,
            description=description,
            brief_description=brief_description,
            origin=origin,
            weight=weight,
            volume=volume,
            minimum=minimum,
            categorie_id=categorie_id,
            producer_id=producer_id,
            available=available,  # Ahora es un booleano
            last_units=last_units,  # Ahora es un booleano
            soon=soon,  # Ahora es un booleano
            not_available=not_available,  # Ahora es un booleano
            imageUrl=file_url 
        )
        
        print("Nuevo producto desde routes:", new_product)

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#####PUT Products#####

@api.route('/product/<int:id>', methods=['PUT'])
def edit_product(id):
    try:

        product = Product.query.get(id)
        if not product:
            return jsonify({"msg":"Product not found"}), 404

        data = request.form
        file = request.files.get('file') 

        if not data:
            return jsonify({"msg":"No data provided"}), 400

        product.name = data.get('name', product.name)
        product.price = float(data.get('price', product.price))
        product.description = data.get('description', product.description)
        product.origin = data.get('origin', product.origin)
        product.brief_description = data.get('brief_description', product.brief_description)

        # Solo actualizamos weight y volume si se pasan
        if 'weight' in data:
            product.weight = int(data['weight']) if data['weight'] else None
        if 'volume' in data:
            product.volume = int(data['volume']) if data['volume'] else None
        if 'minimum' in data:
            product.minimum = int(data['minimum']) if data['minimum'] else None

        # Actualizamos el estado del producto
        product.available = data.get('available') == 'true'
        product.last_units = data.get('lastUnits') == 'true'
        product.soon = data.get('soon') == 'true'
        product.not_available = data.get('not_available') == 'true'
        
        # Manejo del archivo de imagen
        if file:
            upload_result = cloudinary.uploader.upload(file)
            product.imageUrl = upload_result['secure_url']

        db.session.commit()
        return jsonify(product.serialize()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#####DELETE Products#####

@api.route('/product/<int:productId>', methods=['DELETE'])
def delete_product(productId):
    try:
        #Seleccionamos el producto que queremos eliminar
        product = Product.query.get(productId)
        if not product:
            return jsonify({"msg": "Producto no encontrado"}), 404
        #Eliminamos el producto
        db.session.delete(product)
        db.session.commit()
        return jsonify({"msg":"se ha eliminado el producto", "producer_id": product.producer_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# @api.route('/producer/<int:producer_id>', methods=['DELETE'])
# def delete_producer(producer_id):
#     producer = Producer.query.filter_by(id=producer_id).first()
#     if producer is None:
#         return jsonify("ERROR: Could not delete the account. Maybe it doesn't exist"), 404
#     db.session.delete(producer)
#     db.session.commit()

#     return jsonify(producer.serialize()), 200

####GET PRODUCERS PRODUCTS####
@api.route("/producer/product/<int:producerId>", methods=["GET"])
def get_producer_products(producerId):
    # Filtra los productos usando el producer_id, no el id de los productos
    producer_products = Product.query.filter_by(producer_id=producerId).all()

    if not producer_products:
        return jsonify({"message": "No se encontraron productos para este productor."}), 404

    return jsonify([product.serialize() for product in producer_products]), 200

####PRODUCER SIGNUP####
@api.route('/producer/signup', methods=['POST'])
def handle_signup():
    email = request.json["email"]
    password = request.json["password"]

    # Verificar si el email ya existe antes de proceder
    existing_producer = Producer.query.filter_by(email=email).first()
    if existing_producer:
        return jsonify(exists=True, message="Email already exists"), 400

    # Generar el hash de la contraseña
    hashed_password = generate_password_hash(password)
    
    new_producer = Producer(
        email=email,
        password=hashed_password,
        is_active=True
    )

    db.session.add(new_producer)
    db.session.commit()
    return jsonify(new_producer.serialize()), 201


# ####PRODUCER SINGUP #####
# @api.route('/producer/signup', methods=['POST'])
# def handle_signup():
#     email = request.json["email"]
#     password = request.json["password"]
#     print(email,password)
#     hashed_password = generate_password_hash(password)
#     new_producer = Producer(
#         email=email,
#         password=hashed_password,
#         is_active=True
#         )
#     if email:
#         existing_producer = Producer.query.filter_by(email=email).first()
#         if existing_producer:
#             return jsonify(exists=True, message="Email already exists"), 400
#     print("New producer", new_producer)
#     db.session.add(new_producer)
#     db.session.commit()
#     return jsonify(new_producer.serialize()), 201

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

#####GET USERS####
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
    if producer.email != email:
        print("incorrect email")
        return jsonify({"msg": "Password or email incorrect"}), 401
    if not check_password_hash(producer.password, password):
        print("Contraseña incorrecta")
        return jsonify({"msg": "Contraseña incorrecta"}), 401
    
    access_token = create_access_token(identity=producer.id)
    is_fill = bool(producer.brand_name)
    # is_fill = producer.brand_name is not None and producer.brand_name != ""
        # if producer.brand_name is None:
    return jsonify({"access_token": access_token,
                    "is_verify": True,
                    "is_fill": is_fill,
                    "producer_id": producer.id,
                    "brand_name": producer.brand_name})

    # return jsonify(access_token=access_token, is_verify=True, is_fill=True, producer_id=producer.id, brand_name=producer.brand_name)

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
@api.route('/producerInfo/<int:producer_id>', methods=['PUT'])
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
    producer.city= producer_data.get("city", producer.city)
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
    producer.city= producer_data.get("city", producer.city)
    db.session.commit()
    return jsonify(producer.serialize()), 200

#####GET categorieS#####
@api.route('/categories', methods=['GET'])
def get_categories():
    all_categories= ProductCategories.query.all()    
    results = list (map(lambda categorie: categorie.serialize (), all_categories))
    print(results)
    return jsonify(results), 200


####GET ONE categorie#####
@api.route('/categories/<int:categorie_id>', methods=['GET'])
def get_categorie(categorie_id):
    print(f"Fetching categorie with ID: {categorie_id}")
    categorie = ProductCategories.query.filter_by(id=categorie_id).first()
    print(f"categorie fetched: {categorie}")
    if categorie is None:
        return jsonify({"msg": "categorie not found"}), 404
    return jsonify(categorie.serialize()), 200

#####DELETE ONE categorie####
@api.route('/categories/<int:categorie_id>', methods=['DELETE'])
def delete_categorie(categorie_id):
    print(categorie_id)
    categorie = ProductCategories.query.get(categorie_id)
    if categorie is None:
        return jsonify({"error": "Espabila!! , que esta categoría no la hemos creado"}), 404
    db.session.delete(categorie)
    db.session.commit()
    return jsonify({'message': f' Has  borrado la categoría {categorie_id}'}), 200

#### GET categorieS#####
@api.route('/images', methods=['GET'])
def get_images():
    try:
        categories = ProductCategories.query.all()
        images = [{'url': categorie.imageUrl, 'categorie': categorie.name, 'id': categorie.id} for categorie in categories]
        return jsonify(images), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
#### GET categorie#####  
@api.route('/images/<int:categorie_id>', methods=['GET'])
def get_image_by_categorie(categorie_id):
    try:
        categorie = ProductCategories.query.get(categorie_id)
        if categorie:
            image = {'imageUrl': categorie.imageUrl, 'categorie': categorie.categorie}
            return jsonify(image), 200
        else:
            return jsonify({'error': 'Categoría no encontrada'}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


####Aquí meto todo lo que tenga que ver con la compra y órdenes de compra###
####Generar una orden de compra. Es decir, el customer va añadiendo items al carrito####
@api.route("/ordencompra", methods=["POST"], endpoint="create_purchase")
def customer_create_purchase():
    data = request.get_json()
    new_order = Order(
        customer_id=data.get("customer_id"),
        producer_id=data.get("producer_id"),
        total_price=data.get("price"),
        status=OrderStatus.RECEIVED  
    )
    db.session.add(new_order)
    db.session.commit()

    new_order_item = OrderItem(
        order_id=new_order.id,
        product_id=data.get('product_id'),
        quantity=data.get('quantity'),
        price=data.get('price')
    )
    db.session.add(new_order_item)
    db.session.commit()

    return jsonify({"msg": "Compra realizada con éxito", "order_id": new_order.id}), 200
#####Guardamos el nuevo estado de los productos que ha finalizado de comprar el customer####
@api.route("/finalize_purchase", methods=["POST"], endpoint="finalize_purchase_order")
def finalize_purchase():
    data = request.get_json()
    customer_id = data.get("customer_id")
    # Obtener todas las órdenes "received" del cliente y cambiarlas a "shipped"
    orders = Order.query.filter_by(customer_id=customer_id, status=OrderStatus.RECEIVED).all()
    if not orders:
        return jsonify({"msg": "No hay órdenes pendientes de envío"}), 404
    for order in orders:
        # Cambiamos el estado de la orden a "shipped"
        order.status = OrderStatus.SHIPPED
        db.session.add(order)
    db.session.commit()  # Confirmamos los cambios en la base de datos
    return jsonify({"msg": "Todas las órdenes han sido marcadas como enviadas", "orders_updated": [order.id for order in orders]}), 200

####GET CART FROM A CUSTOMER RECIVED####
@api.route('/customer/orders/received/<int:customer_id>', methods=['GET'])
def get_received_orders(customer_id):
    # Obtener todas las órdenes "received" del cliente
    orders = Order.query.filter_by(customer_id=customer_id, status=OrderStatus.RECEIVED).all()
    if not orders:
        return jsonify({"msg": "No se encontraron órdenes recibidas para este cliente"}), 404
    # Crear una lista para las órdenes recibidas
    received_orders = []
    for order in orders:
        items = OrderItem.query.filter_by(order_id=order.id).all()
        order_items = []
        for item in items:
            product = Product.query.get(item.product_id)
            order_items.append({
                "product_id": item.product_id,
                "product_name": product.name, 
                "quantity": item.quantity,
                "price": item.price
            })
        received_orders.append({
            "order_id": order.id,
            "date_created": order.order_date,
            "producer_id": order.producer_id,
            "total_price": order.total_price,
            "status": order.status.value,
            "items": order_items
        })
    return jsonify({"received_orders": received_orders}), 200

####GET CART FROM A CUSTOMER Shipped####
@api.route('/customer/orders/shipped/<int:customer_id>', methods=['GET'])
def get_shipped_orders(customer_id):
    # Obtener todas las órdenes "shipped" del cliente
    orders = Order.query.filter_by(customer_id=customer_id, status=OrderStatus.SHIPPED).all()
    
    if not orders:
        return jsonify({"msg": "No se encontraron órdenes enviadas para este cliente"}), 404

    # Crear una lista para las órdenes enviadas
    shipped_orders = []
    
    for order in orders:
        items = OrderItem.query.filter_by(order_id=order.id).all()
        order_items = []
        for item in items:
            product = Product.query.get(item.product_id)
            order_items.append({
                "product_id": item.product_id,
                "product_name": product.name, 
                "quantity": item.quantity,
                "price": item.price
            })
        customer = Customer.query.get(order.customer_id)
        shipped_orders.append({
            "order_id": order.id,
            "date_created": order.order_date,
            "customer_name": customer.name,

            "producer_id": order.producer_id,
            "total_price": order.total_price,
            "status": order.status.value,
            "items": order_items
        })
    
    return jsonify({"shipped_orders": shipped_orders}), 200


####Orden de carrito del productor####
@api.route('/producer/orders/<int:producer_id>', methods=['GET'])
def get_producer_orders(producer_id):
    # Obtener todas las órdenes que contengan productos de este productor
    order_items = OrderItem.query.join(Product, OrderItem.product_id == Product.id).filter(Product.producer_id == producer_id).all()
    if not order_items:
        return jsonify({"msg": "No se encontraron órdenes para este productor"}), 404
    # Recopilamos los pedidos asociados a esos productos
    producer_orders = {}
    for item in order_items:
        order = item.order
        product = Product.query.get(item.product_id)
        if order.id not in producer_orders:
            producer_orders[order.id] = {
                "order_id": order.id,
                "date_created": order.order_date,
                "customer_id": order.customer_id,
                "total_price": order.total_price,
                "status": order.status.value,
                "items": []
            }
        producer_orders[order.id]["items"].append({
            "product_id": product.id,
            "product_name": product.name,
            "quantity": item.quantity,
            "price": item.price
        })
    return jsonify({"producer_orders": list(producer_orders.values())}), 200

###PASAR LA ORDEN A DONE####
@api.route('/producer/order/done/<int:order_id>', methods=['PUT'])
def mark_order_as_done(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"msg": "Order not found"}), 404
    # Cambiar el estado del pedido a "done"
    order.status = OrderStatus.DONE
    db.session.commit()
    return jsonify({"msg": "Order marked as done", "order_id": order.id}), 200

####DEVUELVE LOS PEDIDOS EN FORMATO DONE####
@api.route('/producer/orders/done/<int:producer_id>', methods=['GET'])
def get_done_orders(producer_id):
    # Filtrar pedidos que están en estado "done" para un productor específico
    done_orders = Order.query.filter_by(producer_id=producer_id, status=OrderStatus.DONE).all()

    if not done_orders:
        return jsonify({"msg": "No se encontraron pedidos completados"}), 404

    done_orders_list = []
    for order in done_orders:
        customer = Customer.query.get(order.customer_id)  # Obtener nombre del cliente
        items = OrderItem.query.filter_by(order_id=order.id).all()
        order_items = []
        for item in items:
            product = Product.query.get(item.product_id)
            order_items.append({
                "product_id": item.product_id,
                "product_name": product.name,
                "quantity": item.quantity,
                "price": item.price
            })
        done_orders_list.append({
            "order_id": order.id,
            "date_created": order.order_date,
            "customer_id": order.customer_id,
            "customer_name": customer.name,  # Añadir nombre del cliente
            "producer_id": order.producer_id,
            "total_price": order.total_price,
            "status": order.status.value,
            "items": order_items
        })

    return jsonify({"done_orders": done_orders_list}), 200
####GENERAR ORDEN DE CARRITO####
@api.route('/finalize_purchase', methods=['POST'])
def finalize_purchase():
    data = request.get_json()
    customer_id = data.get('customer_id')
    orders = data.get('orders')

    # Creo la orden principal
    for order in orders:
        new_order = Order(
            customer_id=customer_id,
            producer_id=order.get('producer_id'),
            total_price=order.get('total_price'),
            status=OrderStatus.RECEIVED  
        )
        db.session.add(new_order)
        db.session.commit()

        # Creo los items para la orden
        for item in order['items']:
            new_order_item = OrderItem(
                order_id=new_order.id,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price=item['price']
            )
            db.session.add(new_order_item)
        db.session.commit()

    return jsonify({"msg": "Compra finalizada con éxito"}), 200


# @api.route('/categories', methods=['POST'])
# def create_categories():
#     categories = [
#         ProductCategories(categorie='Cereales', imageUrl= "beneficios-cereales-integrales-para-ninos_ae7vap"),
#         ProductCategories(categorie='Verduras', imageUrl='Cesta-de-verdura-ecologica_wzxave'),
#         # ProductCategories(categorie='Frutas', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/frutas-de-temporada_rkivoj'),
#         # ProductCategories(categorie='Frutos secos', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/frutos_secos_31-blog-rrss-fb_rp9ggm'),
#         # ProductCategories(categorie='Carnes', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/carne_plgsnd'),
#         # ProductCategories(categorie='Productos del mar', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/mar_ntg96i'),
#         # ProductCategories(categorie='Productos lácteos', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/lácteos_chisrm'),
#         # ProductCategories(categorie='Hierbas', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/hierbas_gcgf3v'),
#         # ProductCategories(categorie='Especias', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/especias-y-el-mundo-de-la-gastronomia_fezicb'),
#         # ProductCategories(categorie='Vinos', imageUrl='https://res.cloudinary.com/dw5sqtvsd/image/upload/v1/VINO-TUMBADAS_uqiaxc')
#     ]
#     for categorie in categories:
#         if not ProductCategories.query.filter_by(categorie=categorie.categorie).first():
#             db.session.add(categorie)
#     serialized_categories = [{'categorie': cat.categorie, 'imageUrl': cat.imageUrl} for cat in categories]

#     db.session.commit()

#     return jsonify("Categorías creadas exitosamente.", serialized_categories), 200

# @api.route('/categories', methods=['POST'])
# def add_categorie():
#     body = request.get_json()
#     print (body)
    
#     if 'categorie' not in body:
#         return jsonify ('Indica el nombre de la categoria'), 400
#     if body['categorie'] == '':
#         return jsonify ('El nombre es obligatorio'), 400

#     categorie = ProductCategories( **body)
#     print (categorie)
#     db.session.add(categorie)
#     db.session.commit()

#     response_body ={
#         "msg":"Se ha añadido la categoría"
#     }
##### POST categorieS#####
# @api.route('/categories', methods=['POST'])
# def add_categorie():
#     body = request.get_json()
#     print (body)
#     if 'categorie' not in body:
#         return jsonify ('Indica el nombre de la categoria'), 400
#     if body['categorie'] == '':
#         return jsonify ('El nombre es obligatorio'), 400
#     categorie = ProductCategories( **body)
#     print (categorie)
#     db.session.add(categorie)
#     db.session.commit()
#     response_body ={
#         "msg":"Se ha añadido la categoría"
#     }
#     return jsonify(response_body), 200

#GET products by CATEGORY
@api.route('/categorie/<int:categorie_id>/products', methods=['GET'])
def get_products_by_category(categorie_id):
    try:
        products = Product.query.filter_by(categorie_id=categorie_id).all()
        
        if not products:
            return jsonify({"message": "No hay productos para esta categoría."}), 404
        
        result = [product.serialize() for product in products]
        return jsonify({
            "message": "Productos obtenidos con éxito.",
            "data": result
        }), 200

    except Exception as e:
        return jsonify({"message": "Ocurrió un error al procesar la solicitud.", "error": str(e)}), 500

##### PUT categorieS#####
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

# #####GET CART ITEMS#####
# @api.route('/cart', methods=['GET'])
# def get_cart_items():
#     all_cart_items = CartItem.query.all()    
#     results = list(map(lambda cart_item: cart_item.serialize(), all_cart_items)) 
#     return jsonify(results), 200

# @api.route('/cart', methods=['POST'])
# def add_cart_item():
#        try:
#            data = request.get_json()
#            if not data:
#                return jsonify({"msg": "No se han proporcionado datos"}), 400

#            customer_cart_id = data.get('customer_cart_id')
#            product_id = data.get('product_id')
#            quantity = data.get('quantity')
#            price = data.get('price')

#            if not customer_cart_id or not product_id or not quantity or not price:
#                return jsonify({"msg": "Faltan datos requeridos"}), 400

#            # Crear un nuevo item en el carrito
#            new_cart_item = CartItem(
#                customer_cart_id=customer_cart_id,
#                product_id=product_id,
#                quantity=quantity,
#                price=price,
#                subtotal=Decimal(price) * Decimal(quantity),  # Calculado
#                total_price=Decimal(price) * Decimal(quantity)  # Calculado
#            )

#            db.session.add(new_cart_item)
#            db.session.commit()

#            return jsonify(new_cart_item.serialize()), 201
#        except Exception as e:
#            db.session.rollback()
#            print(f"Error al añadir al carrito: {str(e)}")  # Para inspeccionar errores
#            return jsonify({"error": str(e)}), 500
       
# @api.route('/cart/<int:product_id>', methods=['DELETE'])
# def remove_cart_item(product_id):
#     try:
       
#         cart_item = CartItem.query.filter_by(product_id=product_id).first()
#         if cart_item is None:
#             return jsonify({"msg": "Item no encontrado"}), 404

#         db.session.delete(cart_item)
#         db.session.commit()
#         return jsonify({"msg": "Item eliminado del carrito"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500
    
# @api.route('/customers_cart', methods=['POST'])
# def save_cart():
#     try:
#         data = request.get_json()
#         user_id = data.get('customer_cart_id')  # ID del cliente
#         items = data.get('items')  # Ítems del carrito

#         if not user_id or not items:
#             return jsonify({"msg": "Faltan datos requeridos"}), 400

#         # Crear un nuevo carrito con estado 'finalizado'
#         new_cart = CustomerCart(
#             user_id=user_id,
#             total_price=sum(item['price'] * item['quantity'] for item in items),
#             status='finalizado'
#         )

#         db.session.add(new_cart)
#         db.session.commit()

#         # Guardar los ítems en el carrito
#         for item in items:
#             new_cart_item = CartItem(
#                 customer_cart_id=new_cart.id,  # ID del carrito recién creado
#                 product_id=item['product_id'],  # ID del producto
#                 quantity=item['quantity'],  # Cantidad
#                 price=item['price'],  # Precio unitario
#                 subtotal=Decimal(item['price']) * Decimal(item['quantity']),
#                 total_price=Decimal(item['price']) * Decimal(item['quantity'])
#             )
#             db.session.add(new_cart_item)

#         db.session.commit()

#         return jsonify({"msg": "Carrito guardado exitosamente!"}), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500
    
# @api.route('/customers_cart/<int:user_id>', methods=['GET'])
# def get_customer_carts(user_id):
#     try:
#         carts = CustomerCart.query.filter_by(user_id=user_id).all()  # Filtra carritos por user_id
#         return jsonify([cart.serialize() for cart in carts]), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
# @api.route('/cart_item/<int:user_id>', methods=['DELETE'])
# def clear_cart(user_id):
#     try:
#         # Filtrar y eliminar los elementos del carrito asociados al usuario
#         CartItem.query.filter_by(customer_cart_id=user_id).delete()
#         db.session.commit()

#         return jsonify({"message": "Carrito vaciado exitosamente."}), 200
#     except Exception as e:
#         # Manejo de errores y rollback
#         db.session.rollback()
#         return jsonify({"message": f"Error al vaciar el carrito: {str(e)}"}), 500

# # @api.route('/upload-image', methods=['POST'])
# # @jwt_required()
# # def upload_image():
# #     # Obtener el archivo subido
# #     file = request.files.get('file')
    
# #     if not file:
# #         return jsonify({"ERROR": "No se proporcionó un archivo."}), 400

# #     # Verificar si el archivo es una imagen
# #     if not file.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
# #         return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400
    
# #     # Verificar el tamaño del archivo
# #     file.seek(0, 2)  # Mover el cursor al final del archivo para obtener el tamaño
# #     if file.tell() > 1024 * 1024 * 5:  # 5MB
# #         return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
# #     file.seek(0)  # Volver al inicio del archivo

# #     try:
# #         # DEBUG: Imprimir el archivo recibido
# #         print(f"Archivo recibido: {file.filename}")

# #         # Subir la imagen a Cloudinary
# #         upload_result = cloudinary.uploader.upload(file)
        
# #         # Obtener el ID del usuario que está subiendo la imagen
# #         producer_id = get_jwt_identity()
# #         producer = Producer.query.get(producer_id)

# #         # Verificar cuántas imágenes ya tiene el usuario
# #         if Imagenes.query.filter_by(usuario_id=usuario_id).count() >= 5:
# #             return jsonify({"ERROR": "No se pueden subir más de 5 imágenes por usuario."}), 400

# #         # Crear una nueva entrada de imagen
# #         nueva_imagen = Imagenes(
# #             url=upload_result['secure_url'],  # Almacenar la URL de la imagen
# #             public_id=upload_result['public_id'],  # Almacenar el public_id
# #             usuario_id=usuario_id
# #         )
# #         db.session.add(nueva_imagen)
# #         db.session.commit()
        
# #         # DEBUG: Imprimir la URL de la imagen subida
# #         print(f"Imagen subida con éxito: {upload_result['secure_url']}")

# #         # Devolver la URL de la imagen subida
# #         return jsonify({
# #             "message": "Imagen subida con éxito",
# #             "url": upload_result['secure_url']
# #         }), 201
# #     except Exception as e:
# #         print(f"Error al subir imagen: {e}")  # Loggear el error exacto
# #         return jsonify({"error": str(e)}), 500

