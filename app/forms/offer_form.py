from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Offer

class OfferForm(FlaskForm):
    user_id = IntegerField('owner_id', validators=[DataRequired()])
    listing_id = IntegerField('listing_id', validators=[DataRequired()])
    offer_amount = IntegerField('offer_amount', validators=[DataRequired()])
