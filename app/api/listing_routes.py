from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Listing


listing_routes = Blueprint('listings', __name__)
me_listing_routes = Blueprint('me', __name__)

@listing_routes.route('/')
# @login_required
def get_all_listings():
    listings = Listing.query.all()
    return {'listings': [listing.to_dict() for listing in listings]}


@me_listing_routes.route('/listings')
@login_required
def get_all_user_listings():
    user_id = current_user.id
    print("USER ID", user_id)
    user_listings = Listing.query.filter(Listing.owner_id == user_id)
    return {'user_listings': [listing.to_dict() for listing in user_listings]}

@me_listing_routes.route('/listings/<int:listing_id>')
@login_required
def get_a_user_listing(listing_id):
    user_id = current_user.id
    user_listing = Listing.query.filter(Listing.owner_id == user_id).filter(Listing.id == listing_id)
    return {'user_listing': [listing.to_dict() for listing in user_listing]}

@me_listing_routes.route('/listings/<int:listing_id>', methods=['PUT'])
@login_required
def update_a_user_listing(listing_id):
    user_id = current_user.id
    user_listing = Listing.query.filter(Listing.owner_id == user_id).filter(Listing.id == listing_id)
    return {'user_listing': [listing.to_dict() for listing in user_listing]}

@me_listing_routes.route('/listings/<int:listing_id>', methods=['DELETE'])
@login_required
def delete_a_user_listing(listing_id):
    user_id = current_user.id
    user_listing = Listing.query.filter(Listing.owner_id == user_id).filter(Listing.id == listing_id)
    return {'user_listing': [listing.to_dict() for listing in user_listing]}
