from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(
    MONGO_URI,
    tlsCAFile=certifi.where()
)

db = client["college_db"]

college_collection = db["colleges"]

department_collection = db["departments"]

faculty_collection = db["faculty"]

student_collection = db["students"]