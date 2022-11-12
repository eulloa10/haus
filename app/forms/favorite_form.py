from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Favorite

class FavoriteForm(FlaskForm):
    listing_id = IntegerField('listing_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
