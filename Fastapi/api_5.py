from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Numbers(BaseModel):
    num1: float
    num2: float

store = {}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data: Numbers):

    result = {
        "addition": data.num1 + data.num2,
        "subtraction": data.num1 - data.num2,
        "multiplication": data.num1 * data.num2,
        "division": data.num1 / data.num2 if data.num2 != 0 else "Cannot divide by zero"
    }

    store["result"] = result
    return result

@app.put("/")
def update(data: Numbers):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message": "Deleted"}