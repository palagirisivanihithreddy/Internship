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

    table=[]

    for i in range(1,11):
        table.append(f"{data.number} x {i} = {data.number*i}")

    store["table"]=table
    return store

@app.put("/")
def update(data:Number):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}