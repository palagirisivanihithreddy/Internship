from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sign Number API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Sign Number API Running"}

@app.get("/sign/{number}")
def check_sign(number: int):

    if number > 0:
        result = "Positive Number"

    elif number < 0:
        result = "Negative Number"

    else:
        result = "Zero"

    return {
        "number": number,
        "result": result
    }