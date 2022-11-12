from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Tour

class TourForm(FlaskForm):
    user_id = IntegerField('owner_id', validators=[DataRequired()])
    listing_id = IntegerField('listing_id', validators=[DataRequired()])
    tour_start_date = StringField('tour_start_date', validators=[DataRequired()])
    tour_end_date = StringField('tour_end_date', validators=[DataRequired()])
