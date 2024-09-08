from .db import db, environment, SCHEMA, add_prefix_for_prod


class Listing(db.Model):
    __tablename__ = 'listings'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.String(5), nullable=False)
    country = db.Column(db.String(2), nullable=False)
    lat = db.Column(db.Numeric, nullable=False)
    lng = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.String, nullable=False)
    type = db.Column(db.String(20), nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    baths = db.Column(db.Integer, nullable=False)
    sqft = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    preview_image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    owner = db.relationship("User", back_populates="listings")
    offers = db.relationship("Offer", back_populates="offer_owner", cascade="all, delete-orphan")
    images = db.relationship("Image", back_populates="listing", cascade="all, delete-orphan")
    tours = db.relationship("Tour", back_populates="tour_listing", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'country': self.country,
            'lat': f'{self.lat}',
            'lng': f'{self.lng}',
            'description': self.description,
            'type': self.type,
            'beds': self.beds,
            'baths': self.baths,
            'sqft': self.sqft,
            'price': self.price,
            'preview_image': self.preview_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'images': [image.to_dict() for image in self.images]
        }
