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


@me_favorite_routes.route('/favorites/<int:favorite_id>')
@login_required
def get_a_favorite(favorite_id):
  favorite_listing = Favorite.query.get(favorite_id)
  if favorite_listing:
    return {'favorite_listing': [favorite.to_dict() for favorite in favorite_listing]}
  else:
    return Response(json.dumps({"Error": "Record not found"}), status=404)


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


@me_favorite_routes.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_favorite(favorite_id):
  favorite = Favorite.query.get(favorite_id)

  if favorite:
    db.session.delete(favorite)
    db.session.commit()
    return {"Message": "Favorite was successfully deleted"}
