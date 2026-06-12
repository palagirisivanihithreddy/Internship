from fastapi import FastAPI

app=FastAPI()

store={}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create():

    table=[]

    for i in range(1,11):
        table.append(f"9 x {i} = {9*i}")

    store["table"]=table
    return store

@app.put("/")
def update():
    return create()

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}