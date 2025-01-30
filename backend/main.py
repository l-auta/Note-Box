from flask import Flask, session, request, flash,  jsonify, redirect, url_for
from config import *
import hashlib
from models import User, Note
from werkzeug.security import generate_password_hash, check_password_hash


# DEFINE THE ROUTES
# LOGIN ROUTE
@app.route('/login', methods=['POST'])
def login():
    # Get data from the request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    # Query the database to find the user
    user = User.query.filter_by(email=email).first()

    if user:
        # Compare the hashed password using check_password_hash
        if check_password_hash(user.password, password):  # This compares the entered password with the stored hash
            # User is authenticated, set the user ID in the session
            session['user_id'] = user.id
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404
 

# LOGOUT ROUTE
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)

    return jsonify ({'message': 'You have logged out successfully!'})


# SIGNUP ROUTE
@app.route('/signup', methods=['GET', 'POST'])
def signUp():
    if request.method == 'POST':
        data = request.get_json()  # Parse the incoming JSON data
        username = data.get('username')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')

        # Check if user with the same email exists
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists!', category='error')
            return jsonify({"error": "Email already exists!"}), 400

        # Check if email length is valid
        elif len(email) < 5:
            flash('Email should be at least 5 characters long!', category='error')
            return jsonify({"error": "Email should be at least 5 characters long!"}), 400

        # Check if username length is valid
        elif len(username) < 2:
            flash('Username must be at least 2 characters long!', category='error')
            return jsonify({"error": "Username must be at least 2 characters long!"}), 400

        # Check if passwords are provided
        elif password1 is None or password2 is None:
            flash("Password is required", category='error')
            return jsonify({"error": "Password is required"}), 400

        # Check if passwords match
        elif password1 != password2:
            flash('Passwords do not match!', category='error')
            return jsonify({"error": "Passwords do not match!"}), 400

        # Check if password length is valid
        elif len(password1) < 5:
            flash('Password should be at least 5 characters long!', category='error')
            return jsonify({"error": "Password should be at least 5 characters long!"}), 400

        # Hash the password
        hashed_password = generate_password_hash(password1)
        
        # If all checks pass, create the user
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful! You can now log in.', category='success')
        return jsonify({"message": "User created successfully!"}), 200

    return jsonify({"message": "Please send a POST request to create a user."}), 200

# adding notes to the user
@app.route('/notes', methods=['POST'])
def create_note():
    user_id = session.get('user_id')  # Ensure the user is logged in
    if not user_id:
        return jsonify({'message': 'You must be logged in to create a note'}), 401

    data = request.get_json()  # Get JSON data from the request
    title = data.get('title')
    content = data.get('content')

    # Validation
    if not title or not content:
        return jsonify({'message': 'Title and content are required'}), 400

    # Create and add the new note
    new_note = Note(title=title, content=content, user_id=user_id)

    try:
        db.session.add(new_note)
        db.session.commit()
        return jsonify({'id': new_note.id, 'title': new_note.title, 'content': new_note.content}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
# get notes from the db
@app.route('/notes', methods=['GET'])
def get_notes():
    # Ensure the user is logged in
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'You must be logged in to get notes'}), 401

    try:
        # Query notes for the logged-in user
        notes = Note.query.filter_by(user_id=user_id).all()

        if not notes:
            return jsonify({'message': 'No notes found for this user'}), 404

        # Return the notes as a JSON response
        return jsonify([{'id': note.id, 'title': note.title, 'content': note.content} for note in notes])

    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    

# update notes in the db
@app.route('/notes/<int:id>', methods=['PATCH'])
def update_note(id):
    user_id = session.get('user_id')  # Ensure the user is logged in
    if not user_id:
        return jsonify({'message': 'You must be logged in to update a note'}), 401

    note = Note.query.filter_by(id=id, user_id=user_id).first()  # Find the note by ID and user ID
    if not note:
        return jsonify({'message': 'Note not found or you are not authorized to edit this note'}), 404

    data = request.get_json()  # Get updated data from the request
    title = data.get('title')
    content = data.get('content')

    if title:
        note.title = title
    if content:
        note.content = content

    try:
        db.session.commit()
        return jsonify({'id': note.id, 'title': note.title, 'content': note.content}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
# delete notes from the db
@app.route('/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    user_id = session.get('user_id')  # Ensure the user is logged in
    if not user_id:
        return jsonify({'message': 'You must be logged in to delete a note'}), 401

    note = Note.query.filter_by(id=id, user_id=user_id).first()  # Find the note by ID and user ID
    if not note:
        return jsonify({'message': 'Note not found or you are not authorized to delete this note'}), 404

    try:
        db.session.delete(note)  # Delete the note
        db.session.commit()
        return jsonify({'message': 'Note deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist

    app.run(ssl_context=('ssl/cert.pem', 'ssl/key_nopass.pem'), debug=True)
