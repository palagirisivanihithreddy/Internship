from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Prime Checker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/prime/{number}")
def check_prime(number: int):

    if number <= 1:
        return {
            "number": number,
            "result": "Not a Prime Number"
        }

    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return {
                "number": number,
                "result": "Not a Prime Number"
            }

    return {
        "number": number,
        "result": "Prime Number"
    }