from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Offer

class OfferForm(FlaskForm):
    user_id = IntegerField('owner_id')
    listing_id = IntegerField('listing_id')
    offer_amount = IntegerField('offer_amount', validators=[DataRequired()])
