from fastapi import FastAPI
from pydantic import BaseModel

app=FastAPI()

class Number(BaseModel):
    number:int

store={}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data:Number):

    num=abs(data.number)
    total=0

    while num>0:
        total+=num%10
        num//=10

    store["sum"]=total
    return {"sum":total}

@app.put("/")
def update(data:Number):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}