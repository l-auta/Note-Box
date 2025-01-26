from flask import Flask, request, flash,  jsonify
from config import app, db
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
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404
 
 
# LOGOUT ROUTE
@app.route('/logout')
def logout():
    return 'You have been logged out!'

# NOTES ROUTE
@app.route('/notes')
def notes():
    return 'Welcome to the notes page!'

# HOMEPAGE ROUTE
@app.route('/')
def home():
    return 'Welcome to the home page!'

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


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist

    app.run(debug=True)
