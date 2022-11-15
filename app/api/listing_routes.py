from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Listing, db
from app.forms import ListingForm


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
