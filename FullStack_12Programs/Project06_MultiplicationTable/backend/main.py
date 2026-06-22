from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Multiplication Table API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/table/{number}")
def multiplication_table(number: int):

    table = []

    for i in range(1, 11):
        table.append(
            f"{number} x {i} = {number * i}"
        )

    return {
        "number": number,
        "table": table
    }