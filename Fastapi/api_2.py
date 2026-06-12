from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Age(BaseModel):
    age: int

data_store = {}

@app.get("/")
def get_result():
    return data_store

@app.post("/")
def create(data: Age):
    result = "Eligible" if data.age >= 18 else "Not Eligible"
    data_store["result"] = result
    return {"result": result}

@app.put("/")
def update(data: Age):
    result = "Eligible" if data.age >= 18 else "Not Eligible"
    data_store["result"] = result
    return {"updated_result": result}

@app.delete("/")
def delete():
    data_store.clear()
    return {"message": "Deleted"}