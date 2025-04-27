from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from crud import cards as crud_cards
from database import get_db
from schemas import CardBase
from typing import List

router = APIRouter()

@router.get("/cards", response_model=List[CardBase])
def read_cards(db: Session = Depends(get_db)):
    return crud_cards.get_cards(db)

@router.get("/cards/{card_id}")
def get_card(card_id: str, db: Session = Depends(get_db)):
    card = crud_cards.get_card_by_id(card_id, db)
    if not card:
        raise HTTPException(status_code=404, detail="card not found.")
    return card

@router.get("/cards/class/{faction_name}")
def get_cards_by_class(faction_name: str, db: Session = Depends(get_db)):
    class_cards = crud_cards.get_cards_by_class(faction_name, db)
    if not class_cards:
        raise HTTPException(status_code=404, detail="cards not found")
    return class_cards

@router.get("/cards/pack/{pack_name}")
def get_cards_by_pack(pack_name: str, db: Session = Depends(get_db)):
    pack_cards = crud_cards.get_cards_by_pack(pack_name, db)
    if not pack_cards:
        raise HTTPException(status_code=404, detail="cards not found")
    return pack_cards

@router.get("/cards/search/search")
def search_cards(search_query: str = Query(..., min_length = 1), db: Session = Depends(get_db)):
    card = crud_cards.search_card(search_query, db)
    if not card:
        raise HTTPException(status_code=404, detail="card not found")
    return card