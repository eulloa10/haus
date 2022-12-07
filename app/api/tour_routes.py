from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
from app.models import Tour, db
from app.forms import TourForm
import json


tour_routes = Blueprint('tours', __name__)
me_tour_routes = Blueprint('me_tours', __name__)

@tour_routes.route('/')
def get_all_tours():
    tours = Tour.query.all()
    return {'tours': [tour.to_dict() for tour in tours]}


@me_tour_routes.route('/tours')
@login_required
def get_all_user_tours():
    tours = Tour.query.filter(Tour.user_id == current_user.id)
    return {'user_tours': [tour.to_dict() for tour in tours]}

@me_tour_routes.route('/tours/data')
@login_required
def get_user_tour_listings():
  tours = Tour.query.filter(Tour.user_id == current_user.id)
  return {'tourListings': [tour.listing_data() for tour in tours]}


@tour_routes.route('/<int:tour_id>')
@login_required
def get_a_user_tour(tour_id):
  user_tour = Tour.query.filter(Tour.id == tour_id).filter(Tour.user_id == current_user.id).all()

  if user_tour:
    return {'user_tour': [tour.to_dict() for tour in user_tour]}
  else:
    return Response(json.dumps({'Error': 'Tour not found'}), status=404)

# @tour_routes.route('/', methods=['POST'])
# @login_required
# def create_a_tour(tour):
#   print("--------------------ENTEREDTOURSROUTE")
#   form = TourForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#     print("----------------------TOURVALIDATEDENTERED")
#     tour = Tour(
#         user_id=current_user.id,
#         listing_id=form.data['listing_id'],
#         tour_start_date=form.data['tour_start_date'],
#         tour_time_slot=form.data['tour_time_slot']
#     )
#     db.session.add(tour)
#     db.session.commit()
#     return tour.to_dict()

@tour_routes.route('/<int:tour_id>', methods=['PUT'])
@login_required
def update_tour(tour_id):
    form = TourForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    tour = Tour.query.get(tour_id)
    if tour.user_id == current_user.id:
        tour.tour_start_date = form.data['tour_start_date']
        tour.tour_end_date = form.data['tour_end_date']
        db.session.commit()
        return tour.to_dict()
    else:
        return {'Error': 'Cannot modify tour'}


@tour_routes.route('/<int:tour_id>', methods=['DELETE'])
@login_required
def delete_favorite(tour_id):
  tour = Tour.query.get(tour_id)
  if tour.user_id == current_user.id:
    db.session.delete(tour)
    db.session.commit()
    return {'Message': 'Tour was successfully deleted'}
