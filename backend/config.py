class Config:
    SECRET_KEY = '8l@ck8901d'  # Replace with your secret key
    SQLALCHEMY_DATABASE_URI = 'sqlite:///mydb.db'  # Replace with your database URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable tracking modifications for efficiency
    SESSION_PERMANENT = True
    SESSION_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_SECURE = True
