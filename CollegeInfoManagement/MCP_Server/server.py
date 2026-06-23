from fastapi import FastAPI
from pymongo import MongoClient
import certifi
import uvicorn

app = FastAPI(
    title="College MCP API",
    version="1.0.0"
)

client = MongoClient(
    "mongodb+srv://palagirisivanihithreddy:Palagirisiva123@intership.macoiwl.mongodb.net/?retryWrites=true&w=majority&appName=Intership",
    tlsCAFile=certifi.where()
)

db = client["college_management"]


@app.get("/")
def home():
    return {
        "message": "College MCP API Running Successfully"
    }


@app.get("/total-colleges")
def total_colleges():

    try:
        count = db.colleges.count_documents({})

        return {
            "count": count
        }

    except Exception as e:

        return {
            "error": str(e)
        }


@app.get("/list-colleges")
def list_colleges():

    try:

        colleges = db.colleges.find()

        result = []

        for college in colleges:
            result.append(
                college.get("name")
            )

        return result

    except Exception as e:

        return {
            "error": str(e)
        }


@app.get("/top-college")
def top_college():

    try:

        college = db.colleges.find_one(
            sort=[("rating", -1)]
        )

        if college:

            return {
                "name": college.get("name"),
                "rating": college.get("rating")
            }

        return {
            "message": "No college found"
        }

    except Exception as e:

        return {
            "error": str(e)
        }


@app.get("/health")
def health():

    try:

        client.admin.command("ping")

        return {
            "status": "MongoDB Connected"
        }

    except Exception as e:

        return {
            "status": "MongoDB Not Connected",
            "error": str(e)
        }


if __name__ == "__main__":

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )