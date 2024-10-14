
import click
from api.models import db, User, ProductCategories

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    @app.cli.command("fill-db-with-categorie-images")
    def fill_db_with_categorie_images():
        """ Este comando rellenará la base de datos con datos de ejemplo. """
        db.drop_all()
        db.create_all()
        categorie = ProductCategories
        try:
            categorie = [
                categorie(name = "Cereales", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/cereals"),
                categorie(name = "Frutas", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/fruits"),
                categorie(name = "Verduras", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/vegetables"),
                categorie(name = "Frutos secos", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/dried_fruits"),
                categorie(name = "Alcoholes fermentados", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/alcohol_fermentado"),
                categorie(name = "Leche y derivados", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/milk_and_related"),
                categorie(name = "Carnes", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/meat"),
                categorie(name = "Especias", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/spices"),
                categorie(name = "Hierbas", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/herbs"),
                categorie(name = "Productos del mar", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/seafood"),
                categorie(name = "Alcoholes destilados", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/alcohol_destilado"),
                # categorie(categorie = "Error", imageUrl = "https://res.cloudinary.com/dw5sqtvsd/image/upload/error"),
            ]
            db.session.add_all(categorie)
            db.session.commit()
            print("database has been correctly populated")
        except Exception as e:
            db.session.rollback()
            print(f"error while populating the database: {e}")