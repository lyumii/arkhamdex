from sqlalchemy.orm import Session
from models import Card

def get_cards(db: Session):
    return db.query(Card).all()

def get_card_by_id(card_id: str, db: Session):
    return db.query(Card).filter(Card.id == card_id).first()

def get_cards_by_class(faction_name: str, db: Session):
    class_cards = []
    cards = get_cards(db)
    for card in cards:
        if card.faction_name == faction_name:
            class_cards.append(card)

    return class_cards

def get_cards_by_pack(pack_name: str, db: Session):
    pack_cards = []
    cards = get_cards(db)
    for card in cards:
        if card.pack_name == pack_name:
            pack_cards.append(card)
    return pack_cards

def search_card(search_query: str, db: Session):
    all_cards = get_cards(db)
    result = [card for card in all_cards if search_query.lower() in card.name.lower()]
    return [{"id": card.id, "name": card.name} for card in result]