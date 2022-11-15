from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
from app.models import Listing, Offer, Favorite, Tour, db
from app.forms import ListingForm, OfferForm, FavoriteForm, TourForm
import json
import datetime


listing_routes = Blueprint('listings', __name__)
me_listing_routes = Blueprint('me_listings', __name__)

@listing_routes.route('/')
def get_all_listings():
    listings = Listing.query.all()
    return {'listings': [listing.to_dict() for listing in listings]}

@listing_routes.route('/', methods=['POST'])
@login_required
def create_a_listing():
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        listing = Listing(
            owner_id=current_user.id,
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            country=form.data['country'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            description=form.data['description'],
            type=form.data['type'],
            beds=form.data['beds'],
            baths=form.data['baths'],
            sqft=form.data['sqft'],
            price=form.data['price'],
            preview_image=form.data['preview_image']
        )
        db.session.add(listing)
        db.session.commit()
        return listing.to_dict()


@listing_routes.route('/<int:listing_id>/offers', methods=['POST'])
@login_required
def create_an_offer(listing_id):
    form = OfferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    listing = Listing.query.get(listing_id)
    if form.validate_on_submit():
        if listing.owner_id != current_user.id:
            offer = Offer(
                user_id=current_user.id,
                listing_id=listing_id,
                offer_amount=form.data['offer_amount'],
            )
            db.session.add(offer)
            db.session.commit()
            return offer.to_dict()
        else:
            return {'Error:': 'Cannot submit offer on owned listing'}

@listing_routes.route('/<int:listing_id>/favorites', methods=['POST'])
@login_required
def add_favorite(listing_id):
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    listing = Listing.query.filter(Listing.id == listing_id).filter(Listing.owner_id == current_user.id).all()

    favorite = Favorite.query.filter(Favorite.listing_id == listing_id).filter(Favorite.user_id == current_user.id).all()

    if not listing and not favorite:
        if form.validate_on_submit():
            favorite = Favorite(
            user_id = current_user.id,
            listing_id = listing_id,
            )
            db.session.add(favorite)
            db.session.commit()
            return favorite.to_dict()
    else:
      return Response(json.dumps({"Error": "Cannot favorite this listing. Listing is either your own or has already been favorited."}), status=403)


@listing_routes.route('/<int:listing_id>/tours', methods=['POST'])
@login_required
def create_tour(listing_id):
    form = TourForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # TODO:
    '''
    1. get all tours for current listing
    2. make sure selected time doesn't overlap
    3. make sure selected time is in future
    4. make sure selected time is within certain range
    '''

    listing = Listing.query.filter(Listing.id == listing_id).filter(Listing.owner_id == current_user.id).all()

    if not listing:
        if form.validate_on_submit():
            tour = Tour(
            user_id = current_user.id,
            listing_id = listing_id,
            tour_start_date=form.data['tour_start_date'],
            tour_end_date=form.data['tour_end_date']
            )
            db.session.add(tour)
            db.session.commit()
            return tour.to_dict()
    else:
      return Response(json.dumps({"Error": "Cannot schedule tour for own property."}), status=403)

@me_listing_routes.route('/listings')
@login_required
def get_all_user_listings():
    user_listings = Listing.query.filter(Listing.owner_id == current_user.id)
    return {'user_listings': [listing.to_dict() for listing in user_listings]}


@listing_routes.route('/<int:listing_id>')
def get_a_listing(listing_id):
    user_listing = Listing.query.filter(Listing.owner_id == current_user.id).filter(Listing.id == listing_id)
    return {'user_listing': [listing.to_dict() for listing in user_listing]}


@listing_routes.route('/<int:listing_id>', methods=['PUT'])
@login_required
def update_listing(listing_id):
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_listing = Listing.query.get(listing_id)
    if user_listing.owner_id == current_user.id:
        user_listing.address = form.data['address']
        user_listing.city = form.data['city']
        user_listing.state = form.data['state']
        user_listing.zip_code = form.data['zip_code']
        user_listing.country = form.data['country']
        user_listing.lat = form.data['lat']
        user_listing.lng = form.data['lng']
        user_listing.description = form.data['description']
        user_listing.type = form.data['type']
        user_listing.beds = form.data['beds']
        user_listing.baths = form.data['baths']
        user_listing.sqft = form.data['sqft']
        user_listing.price = form.data['price']
        user_listing.preview_image = form.data['preview_image']
        db.session.commit()
        return user_listing.to_dict()
    else:
        return {'Error': 'Can only modify owned listing'}


@listing_routes.route('/<int:listing_id>', methods=['DELETE'])
@login_required
def delete_a_user_listing(listing_id):
    listing = Listing.query.get(listing_id)
    if listing.owner_id == current_user.id:
        db.session.delete(listing)
        db.session.commit()
        return {'Message': 'Listing was successfully deleted'}
    else:
        return {'Error': 'Cannot delete listing'}
