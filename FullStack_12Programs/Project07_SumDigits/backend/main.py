from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sum Digits API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/sumdigits/{number}")
def sum_digits(number: int):

    total = sum(int(digit) for digit in str(abs(number)))

    return {
        "number": number,
        "sum": total
    }