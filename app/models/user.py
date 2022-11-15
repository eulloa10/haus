from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=True, unique=False)
    last_name = db.Column(db.String(50), nullable=True, unique=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    address = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(40), nullable=True)
    zip_code = db.Column(db.String(40), nullable=True)
    country = db.Column(db.String(40), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    listings = db.relationship("Listing", back_populates="owner", cascade="all, delete-orphan")
    tours = db.relationship("Tour", back_populates="tour_participant", cascade="all, delete-orphan")
    favorites = db.relationship("Favorite", back_populates="favorite_owner", cascade="all, delete-orphan")
    images = db.relationship("Image", back_populates='img_owner', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'country': self.country,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
