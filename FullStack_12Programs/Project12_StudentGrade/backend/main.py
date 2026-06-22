from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Student Grade API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/grade/{name}/{m1}/{m2}/{m3}")
def grade(name: str, m1: int, m2: int, m3: int):

    total = m1 + m2 + m3
    average = total / 3

    if average >= 90:
        grade = "A"
    elif average >= 75:
        grade = "B"
    elif average >= 60:
        grade = "C"
    else:
        grade = "D"

    return {
        "name": name,
        "total": total,
        "average": average,
        "grade": grade
    }