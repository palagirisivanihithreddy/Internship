from fastapi import FastAPI
from pydantic import BaseModel

app=FastAPI()

class Student(BaseModel):
    name:str
    maths:int
    physics:int
    chemistry:int

store={}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data:Student):

    total=data.maths+data.physics+data.chemistry

    if total>=270:
        grade="A"
    elif total>=240:
        grade="B"
    elif total>=180:
        grade="C"
    else:
        grade="D"

    store["student"]=data.name

    return {
        "name":data.name,
        "total":total,
        "grade":grade
    }

@app.put("/")
def update(data:Student):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}