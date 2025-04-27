import pandas as pd
import requests
from database import engine
import models
import json
import numpy as np

models.Base.metadata.create_all(bind=engine)

url = "https://arkhamdb.com/api/public/cards/"
response = requests.get(url)
cards_data = response.json()

investigators = [card for card in cards_data if card["type_code"] == "investigator"]
cards = [card for card in cards_data if card["type_code"] != "investigator" and not card.get("encounter_code")]

df_investigators = pd.DataFrame(investigators)
df_cards = pd.DataFrame(cards)

def serialize_obj(x):
    if isinstance(x, (dict, list)):
        return json.dumps(x)
    return x

df_cards = df_cards.applymap(serialize_obj)

df_investigators = df_investigators.rename(columns={"code": "id"})
df_cards = df_cards.rename(columns={"code": "id"})


columns_to_keep_investigators = [
    "id", "name", "subname", "pack_name", "faction_name", "exceptional", "myriad",
    "text", "skill_willpower", "skill_intellect", "skill_combat", "skill_agility",
    "health", "sanity", "traits", "deck_requirements", "deck_options",
    "flavor", "back_text", "back_flavor", "imagesrc", "backimagesrc"
]
df_investigators = df_investigators[columns_to_keep_investigators]


df_investigators["deck_requirements"] = df_investigators["deck_requirements"].apply(lambda x: json.dumps(x) if isinstance(x, (dict, list)) else (None if pd.isna(x) else x))
df_investigators["deck_options"] = df_investigators["deck_options"].apply(lambda x: json.dumps(x) if isinstance(x, (dict, list)) else (None if pd.isna(x) else x))


list_or_dict_fields_cards = [
    "duplicated_by", "bonded_cards", "tags", 
    "deck_options", "linked_card", "customization_options", "restrictions"
]
for column in list_or_dict_fields_cards:
    if column in df_cards.columns:
        df_cards[column] = df_cards[column].apply(
            lambda x: json.dumps(x) if isinstance(x, (dict, list)) else (None if pd.isna(x) else x)
        )

direct_dict_fields_cards = [
    "bonded_to", "customization_text", "customization_change"
]
for column in direct_dict_fields_cards:
    if column in df_cards.columns:
        df_cards[column] = df_cards[column].apply(
            lambda x: json.dumps(x) if isinstance(x, dict) else (None if pd.isna(x) else x)
        )


df_investigators.to_sql("investigators", con=engine, if_exists="replace", index=False)
df_cards.to_sql("cards", con=engine, if_exists="replace", index=False)

print("✅ Seeding completed successfully!")
