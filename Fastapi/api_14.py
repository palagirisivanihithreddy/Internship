from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app=FastAPI()

class Numbers(BaseModel):
    numbers:List[int]

store={}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data:Numbers):

    total=sum(data.numbers)

    store["sum"]=total

    return {"sum":total}

@app.put("/")
def update(data:Numbers):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}