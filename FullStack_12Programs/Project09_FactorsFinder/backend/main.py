from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Factors Finder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/factors/{number}")
def find_factors(number: int):

    factors = []

    for i in range(1, number + 1):
        if number % i == 0:
            factors.append(i)

    return {
        "number": number,
        "factors": factors
    }