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

@app.get("/check/{number}")
def check_even_odd(number: int):
    if number % 2 == 0:
        return {"number": number, "result": "Even"}
    else:
        return {"number": number, "result": "Odd"}