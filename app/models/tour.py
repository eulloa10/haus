from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tour(db.Model):
    __tablename__ = 'tours'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')), nullable=False)
    tour_start_date = db.Column(db.DateTime, nullable = False)
    tour_end_date =  db.Column(db.DateTime, nullable = False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    tour_participant = db.relationship("User", back_populates="tours")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'tour_start_date': self.tour_start_date,
            'tour_end_date': self.tour_end_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
