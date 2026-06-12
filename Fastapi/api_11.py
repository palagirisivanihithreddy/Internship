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

    fact=1

    for i in range(1,data.number+1):
        fact*=i

    store["factorial"]=fact
    return {"factorial":fact}

@app.put("/")
def update(data:Number):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}