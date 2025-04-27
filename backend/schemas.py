from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class InvestigatorBase(BaseModel):
    id: str  
    name: str
    subname: Optional[str] = None
    pack_name: str
    faction_name: str
    exceptional: Optional[bool] = None
    myriad: Optional[bool] = None
    text: Optional[str] = None
    skill_willpower: Optional[int] = None
    skill_intellect: Optional[int] = None
    skill_combat: Optional[int] = None
    skill_agility: Optional[int] = None
    health: Optional[int] = None
    sanity: Optional[int] = None
    traits: Optional[str] = None
    deck_requirements: Optional[Dict[str, Any]] = None
    deck_options: Optional[List[Dict[str, Any]]] = None
    flavor: Optional[str] = None         
    back_text: Optional[str] = None    
    back_flavor: Optional[str] = None
    imagesrc: Optional[str] = None     
    backimagesrc: Optional[str] = None

    class Config:
        orm_mode = True

class CardBase(BaseModel):
    id: str
    name: str
    pack_name: str
    faction_name: str
    exceptional: Optional[bool] = None
    myriad: Optional[bool] = None
    is_unique: Optional[bool] = None
    permanent: Optional[bool] = None
    text: Optional[str] = None
    cost: Optional[int] = None
    quantity: Optional[int] = None
    xp: Optional[int] = None
    deck_limit: Optional[int] = None
    slot: Optional[str] = None
    traits: Optional[str] = None
    imagesrc: Optional[str] = None

    class Config:
        orm_mode = True