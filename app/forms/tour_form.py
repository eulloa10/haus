from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Tour

class TourForm(FlaskForm):
    user_id = IntegerField('user_id')
    listing_id = IntegerField('listing_id')
    tour_start_date = DateField('tour_start_date', validators=[DataRequired()])
    tour_time_slot = StringField('tour_time_slot', validators=[DataRequired()])
