from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os 

load_dotenv()

app = Flask(__name__,static_folder="../frontend/dist", static_url_path="/")
CORS(app)

# print("Loaded DB URI:", )
# Check if environment variable is loaded
database_uri = os.getenv("DATABASE_URL")
print("DATABASE_URL:", database_uri)  # You can remove this after testing

if not database_uri:
    raise RuntimeError("DATABASE_URL environment variable is missing!")
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

# app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABSAE_URL")
# os.getenv("DATABSAE_URL")
# "sqlite:///loginDB.db"

app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

db = SQLAlchemy(app)
