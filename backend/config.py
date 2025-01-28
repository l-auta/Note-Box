from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SECRET_KEY'] = '8l@ck8901d'  # Replace with your secret key
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///mydb.db'  # Replace with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable tracking modifications for efficiency
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
