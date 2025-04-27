from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from crud import investigators as crud_investigators
from database import get_db
from schemas import InvestigatorBase
from typing import List

router = APIRouter()

@router.get("/investigators", response_model=List[InvestigatorBase])
def read_investigators(db: Session = Depends(get_db)):
    return crud_investigators.get_investigators(db)

@router.get("/investigators/{investigator_id:int}")
def get_investigator(investigator_id: int, db: Session = Depends(get_db)):
    investigator = crud_investigators.get_investigator_by_id(investigator_id, db)
    if not investigator:
        raise HTTPException(status_code=404, detail="Investigator not found.")
    return investigator

@router.get("/investigators/class/{faction_name}")
def get_investigators_by_class(faction_name: str, db: Session = Depends(get_db)):
    class_investigators = crud_investigators.get_investigators_by_class(faction_name, db)
    if not class_investigators:
        raise HTTPException(status_code=404, detail="Investigators not found")
    return class_investigators

@router.get("/investigators/pack/{pack_name}")
def get_investigators_by_pack(pack_name: str, db: Session = Depends(get_db)):
    pack_investigators = crud_investigators.get_investigators_by_pack(pack_name, db)
    if not pack_investigators:
        raise HTTPException(status_code=404, detail="Investigators not found")
    return pack_investigators

@router.get("/investigators/search")
def search_investigators(search_query: str = Query(..., min_length = 1), db: Session = Depends(get_db)):
    investigator = crud_investigators.search_investigator(search_query, db)
    if not investigator:
        raise HTTPException(status_code=404, detail="Investigator not found")
    return investigator