from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Offer, db
from app.forms import OfferForm


offer_routes = Blueprint('offers', __name__)
me_offer_routes = Blueprint('me_offers', __name__)


@offer_routes.route('/')
@login_required
def get_all_offers():
    offers = Offer.query.all()
    return {'offers': [offer.to_dict() for offer in offers]}


@me_offer_routes.route('/offers')
@login_required
def get_all_user_offers():
    user_offers = Offer.query.filter(Offer.user_id == current_user.id)
    return {'user_offers': [offer.to_dict() for offer in user_offers]}


@offer_routes.route('/<int:offer_id>', methods=['PUT'])
@login_required
def update_offer(offer_id):
    form = OfferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    offer = Offer.query.get(offer_id)
    if offer.user_id == current_user.id:
        offer.offer_amount = form.data['offer_amount']
        db.session.commit()
        return offer.to_dict()
    else:
        return {'Error': 'Cannot modify offer'}


@offer_routes.route('/<int:offer_id>', methods=['DELETE'])
@login_required
def delete_offer(offer_id):
    offer = Offer.query.get(offer_id)
    if offer.user_id == current_user.id:
        db.session.delete(offer)
        db.session.commit()
        return {'Message': 'Offer was successfully deleted'}
    else:
        return {'Error': 'Cannot delete offer'}
