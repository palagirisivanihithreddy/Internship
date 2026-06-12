from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Numbers(BaseModel):
    num1: int
    num2: int

store = {}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data: Numbers):

    if data.num1 > data.num2:
        result = "First Greater"
    elif data.num2 > data.num1:
        result = "Second Greater"
    else:
        result = "Equal"

    store["result"] = result
    return {"result": result}

@app.put("/")
def update(data: Numbers):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message": "Deleted"}