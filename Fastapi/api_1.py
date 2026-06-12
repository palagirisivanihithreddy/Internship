from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Number(BaseModel):
    number: int

data_store = {}

@app.get("/")
def get_result():
    return data_store

@app.post("/")
def create(data: Number):
    result = "Even" if data.number % 2 == 0 else "Odd"
    data_store["result"] = result
    return {"number": data.number, "result": result}

@app.put("/")
def update(data: Number):
    result = "Even" if data.number % 2 == 0 else "Odd"
    data_store["result"] = result
    return {"updated_result": result}

@app.delete("/")
def delete():
    data_store.clear()
    return {"message": "Deleted"}