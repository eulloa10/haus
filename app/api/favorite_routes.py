from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
from app.models import db, Favorite, Listing
from app.forms import FavoriteForm
import json


me_favorite_routes = Blueprint('favorite', __name__)


@me_favorite_routes.route('/favorites')
@login_required
def get_all_favorites():
    user_id = current_user.id
    favorite_listings = Favorite.query.filter(Favorite.user_id == user_id)
    return {'favorite_listings': [favorite.to_dict() for favorite in favorite_listings]}


@me_favorite_routes.route('/favorites/<int:listing_id>', methods=['POST'])
@login_required
def add_favorite(listing_id):
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    listing = Listing.query.filter(Listing.id == listing_id).filter(Listing.owner_id == 2).all()

    favorite = Favorite.query.filter(Favorite.listing_id == listing_id).filter(Favorite.user_id == current_user.id)

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


@me_favorite_routes.route('/favorites/<int:listing_id>', methods=['DELETE'])
@login_required
def delete_favorite(listing_id):
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    listing = Listing.query.filter(Listing.id == listing_id).filter(Listing.owner_id == 2).all()

    favorite = Favorite.query.filter(Favorite.listing_id == listing_id).filter(Favorite.user_id == current_user.id)

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
