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

    if data.number<=1:
        result=False
    else:
        result=True

        for i in range(2,int(data.number**0.5)+1):
            if data.number%i==0:
                result=False
                break

    store["prime"]=result
    return {"prime":result}

@app.put("/")
def update(data:Number):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}