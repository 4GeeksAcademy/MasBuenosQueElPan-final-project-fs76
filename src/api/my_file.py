
# Set your Cloudinary credentials
# ==============================
from dotenv import load_dotenv
load_dotenv()

# Import the Cloudinary libraries
# ==============================
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

# Import to format the JSON responses
# ==============================
import json

# Set configuration parameter: return "https" URLs by setting secure=True  
# ==============================
config = cloudinary.config(secure=True)

# Log the configuration
# ==============================
print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")

def uploadImage():

  # Upload the image and get its URL
  # ==============================

  # Upload the image.
  # Set the asset's public ID and allow overwriting the asset with new versions
  cloudinary.uploader.upload("https://cloudinary-devs.github.io/cld-docs-assets/assets/images/butterfly.jpeg", public_id="quickstart_butterfly", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728156470/cereals.jpg", public_id="cereals", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728209839/fruits.jpg", public_id="fruits", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/vegetables", public_id="vegetables", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/dried_fruits", public_id="dried_fruits", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/alcohol_fermentado", public_id="alcohol_fermentado", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/milk_and_related", public_id="milk_and_related", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/meat.jpg", public_id="meat", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/spices.jpg", public_id="spices", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/herbs.jpg", public_id="herbs", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728210933/seafood.jpg", public_id="seafood", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728570336/alcohol_destilado.jpg", public_id="alcohol_destilado", unique_filename = False, overwrite=True)
  cloudinary.uploader.upload("https://res.cloudinary.com/dw5sqtvsd/image/upload/v1728230720/error.jpg", public_id="error", unique_filename = False, overwrite=True)

  # Build the URL for the image and save it in the variable 'srcURL'
  srcURL = CloudinaryImage("quickstart_butterfly").build_url()
  cerealsURL = CloudinaryImage("cereals").build_url()
  fruitsURL = CloudinaryImage("fruits").build_url()
  vegetablesURL = CloudinaryImage("vegetables").build_url()
  dried_fruitsURL = CloudinaryImage("dried_fruits").build_url()
  alcohol_fermentadoURL = CloudinaryImage("alcohol_fermentado").build_url()
  milk_and_relatedURL = CloudinaryImage("milk_and_related").build_url()
  meatURL = CloudinaryImage("meat").build_url()
  spicesURL = CloudinaryImage("spices").build_url()
  herbsURL = CloudinaryImage("herbs").build_url()
  seafoodURL = CloudinaryImage("seafood").build_url()
  alcohol_destiladoURL = CloudinaryImage("alcohol_destilado").build_url()
  errorURL = CloudinaryImage("error").build_url()

  # Log the image URL to the console. 
  # Copy this URL in a browser tab to generate the image on the fly.
  print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", cerealsURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", fruitsURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", vegetablesURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", dried_fruitsURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", alcohol_fermentadoURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", milk_and_relatedURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", meatURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", spicesURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", herbsURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", seafoodURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", alcohol_destiladoURL, "\n")
  print("****2. Upload an image****\nDelivery URL: ", errorURL, "\n")


# def getAssetInfo():

#   # Get and use details of the image
#   # ==============================

#   # Get image details and save it in the variable 'image_info'.
#   image_info=cloudinary.api.resource("quickstart_butterfly")
#   print("****3. Get and use details of the image****\nUpload response:\n", json.dumps(image_info,indent=2), "\n")

#   # Assign tags to the uploaded image based on its width. Save the response to the update in the variable 'update_resp'.
#   if image_info["width"]>900:
#     update_resp=cloudinary.api.update("quickstart_butterfly", tags = "large")
#   elif image_info["width"]>500:
#     update_resp=cloudinary.api.update("quickstart_butterfly", tags = "medium")
#   else:
#     update_resp=cloudinary.api.update("quickstart_butterfly", tags = "small")

#   # Log the new tag to the console.
#   print("New tag: ", update_resp["tags"], "\n")

# def createTransformation():

#   # Transform the image
#   # ==============================

#   transformedURL = CloudinaryImage("quickstart_butterfly").build_url(width = 100, height = 150, crop = "fill")

#   # Log the URL to the console
#   print("****4. Transform the image****\nTransfrmation URL: ", transformedURL, "\n")

  # Use this code instead if you want to create a complete HTML image element:
  # imageTag = cloudinary.CloudinaryImage("quickstart_butterfly").image(radius="max", effect="sepia")
  # print("****4. Transform the image****\nTransfrmation URL: ", imageTag, "\n")

def main():
  uploadImage()
#   getAssetInfo()
#   createTransformation()
main();