from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('listings.id')), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    listing = db.relationship("Listing", back_populates="images")
    img_owner = db.relationship("User", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'img_url': self.img_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
