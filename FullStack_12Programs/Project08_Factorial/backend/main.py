from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Factorial API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/factorial/{number}")
def factorial(number: int):

    result = 1

    for i in range(1, number + 1):
        result *= i

    return {
        "number": number,
        "factorial": result
    }