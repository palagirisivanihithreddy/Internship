from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Greatest Number API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Greatest Number API Running"}


@app.get("/greatest/{num1}/{num2}")
def greatest_number(num1: int, num2: int):

    if num1 > num2:
        result = f"{num1} is Greater"

    elif num2 > num1:
        result = f"{num2} is Greater"

    else:
        result = "Both Numbers are Equal"

    return {
        "first_number": num1,
        "second_number": num2,
        "result": result
    }