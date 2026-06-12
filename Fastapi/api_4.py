from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Number(BaseModel):
    number: int

store = {}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data: Number):
    if data.number > 0:
        result = "Positive"
    elif data.number < 0:
        result = "Negative"
    else:
        result = "Zero"

    store["result"] = result
    return {"result": result}

@app.put("/")
def update(data: Number):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message": "Deleted"}