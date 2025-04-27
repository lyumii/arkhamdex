from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from database import Base

class Investigator(Base):
    __tablename__ = "investigators"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    subname = Column(String)
    pack_name = Column(String)
    faction_name = Column(String)
    exceptional = Column(Boolean)
    myriad = Column(Boolean)
    text = Column(Text)
    skill_willpower = Column(Integer)
    skill_intellect = Column(Integer)
    skill_combat = Column(Integer)
    skill_agility = Column(Integer)
    health = Column(Integer)
    sanity = Column(Integer)
    traits = Column(String)
    deck_requirements = Column(JSON)
    deck_options = Column(JSON)
    flavor = Column(String)
    back_text = Column(Text)
    back_flavor = Column(Text)
    imagesrc = Column(String)
    backimagesrc = Column(String)

class Card(Base):
    __tablename__ = "cards" 

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    pack_name = Column(String)
    faction_name = Column(String)
    exceptional = Column(Boolean)
    myriad = Column(Boolean)
    is_unique = Column(Boolean)
    permanent = Column(Boolean)
    text = Column(Text)
    cost = Column(Integer)
    quantity = Column(Integer)
    xp = Column(Integer)
    deck_limit = Column(Integer)
    slot = Column(String)
    traits = Column(String)
    imagesrc = Column(String)
