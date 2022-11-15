from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
from app.models import Image, Listing, db
from app.forms import ImageForm
import json


image_routes = Blueprint('images', __name__)
me_image_routes = Blueprint('me_images', __name__)

@image_routes.route('/')
def get_all_images():
    images = Image.query.all()
    return {'Images': [image.to_dict() for image in images]}


@me_image_routes.route('/images')
@login_required
def get_all_user_images():
    images = Image.query.filter(Image.user_id == current_user.id)
    return {'user_images': [image.to_dict() for image in images]}


@image_routes.route('/<int:image_id>')
@login_required
def get_image(image_id):
  single_image = Image.query.get(image_id)
  if single_image:
    return {'Image': [image.to_dict() for image in single_image]}
  else:
    return Response(json.dumps({'Error': 'Image not found'}), status=404)


@image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
  image = Image.query.get(image_id)
  if image.user_id == current_user.id:
    db.session.delete(image)
    db.session.commit()
    return {'Message': 'Image was successfully deleted'}
