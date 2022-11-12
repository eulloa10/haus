from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Image

class ImageForm(FlaskForm):
    listing_id = IntegerField('listing_id', validators=[DataRequired()])
    img_url = StringField('img_url', validators=[DataRequired()])
