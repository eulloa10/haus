from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Listing

class ListingForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    lat = DecimalField('lat', validators=[DataRequired()])
    lng = DecimalField('lng', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    beds = IntegerField('beds', validators=[DataRequired()])
    baths = IntegerField('baths', validators=[DataRequired()])
    sqft = IntegerField('sqft', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    preview_image = StringField('preview_image', validators=[DataRequired()])
