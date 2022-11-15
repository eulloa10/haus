from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
from app.models import db, Favorite, Listing
from app.forms import FavoriteForm
import json

favorite_routes = Blueprint('favorites', __name__)
me_favorite_routes = Blueprint('me_favorites', __name__)

@favorite_routes.route('/')
def get_all_favorites():
    favorite_listings = Favorite.query.all()
    return {'favorite_listings': [favorite.to_dict() for favorite in favorite_listings]}

@me_favorite_routes.route('/favorites')
@login_required
def get_all_user_favorites():
    favorite_listings = Favorite.query.filter(Favorite.user_id == current_user.id)
    return {'user_favorite_listings': [favorite.to_dict() for favorite in favorite_listings]}


@me_favorite_routes.route('/favorites/<int:favorite_id>')
@login_required
def get_a_user_favorite(favorite_id):
  favorite_listing = Favorite.query.filter(Favorite.id == favorite_id).filter(Favorite.user_id == current_user.id).all()

  if favorite_listing:
    return {'favorite_listing': [favorite.to_dict() for favorite in favorite_listing]}
  else:
    return Response(json.dumps({'Error': 'Record not found'}), status=404)


@me_favorite_routes.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_favorite(favorite_id):
  favorite = Favorite.query.get(favorite_id)
  if favorite.user_id == current_user.id:
    db.session.delete(favorite)
    db.session.commit()
    return {'Message': 'Favorite was successfully deleted'}
