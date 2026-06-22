from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/vote/{age}")
def check_voting(age: int):

    if age >= 18:
        return {
            "age": age,
            "result": "Eligible to Vote"
        }

    return {
        "age": age,
        "result": "Not Eligible to Vote"
    }