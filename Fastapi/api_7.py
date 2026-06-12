from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Input(BaseModel):
    n:int

store={}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create(data:Input):

    nums=[]
    i=1

    while i<=data.n:
        nums.append(i)
        i+=1

    store["numbers"]=nums
    return store

@app.put("/")
def update(data:Input):
    return create(data)

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}