from pymongo import MongoClient
import certifi

MONGO_URL = "mongodb+srv://palagirisivanihithreddy:Nihithreddy123@intership.macoiwl.mongodb.net/?appName=Intership"

client = MongoClient(
    MONGO_URL,
    tlsCAFile=certifi.where()
)

db = client.employee_management

employee_collection = db.employees