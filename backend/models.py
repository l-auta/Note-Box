from flask_login import UserMixin
from sqlalchemy.sql import func
from config import db

# USER MODEL
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    
    # Relationship with the Note model (backref on the User side)
    notes = db.relationship('Note', back_populates='user', lazy=True)  # A user can have many notes


# NOTES MODEL
class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)  # Title of the note
    content = db.Column(db.Text, nullable=False)  # Content of the note
    date = db.Column(db.DateTime(timezone=True), default=func.now())
   
    # Foreign Key to reference the User who created the note
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Reference to the user who created the note

    # Relationship to the User model (without backref)
    user = db.relationship('User', back_populates='notes', lazy=True)  # This allows access to the user of the note (e.g., note.user)
