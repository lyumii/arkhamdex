from sqlalchemy.orm import Session
from sqlalchemy import func
from models import Investigator

def get_investigators(db: Session):
    return db.query(Investigator).all()

def get_investigator_by_id(investigator_id: int, db: Session):
    return db.query(Investigator).filter(Investigator.id == investigator_id).first()

def get_investigators_by_class(faction_name: str, db: Session):
    class_investigators = []
    investigators = get_investigators(db)
    for investigator in investigators:
        if investigator.faction_name == faction_name:
            class_investigators.append(investigator)

    return class_investigators

def get_investigators_by_pack(pack_name: str, db: Session):
    pack_investigators = []
    investigators = get_investigators(db)
    for investigator in investigators:
        if investigator.pack_name == pack_name:
            pack_investigators.append(investigator)
    return pack_investigators

def search_investigator(search_query: str, db: Session):
    all_investigators = db.query(Investigator).all()
    result = [investigator for investigator in all_investigators if search_query.lower() in investigator.name.lower()]
    return [{"id": inv.id, "name": inv.name} for inv in result]

    
