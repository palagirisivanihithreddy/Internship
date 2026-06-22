from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sum List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/sumlist/{numbers}")
def sum_list(numbers: str):

    number_list = [int(x.strip()) for x in numbers.split(",")]
    total = sum(number_list)

    return {
        "numbers": number_list,
        "sum": total
    }