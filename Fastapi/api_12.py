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

    factors=[]

    for i in range(1,data.number+1):
        if data.number%i==0:
            factors.append(i)

    store["factors"]=factors
    return {"factors":factors}

@app.put("/")
def update(data:Number):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}