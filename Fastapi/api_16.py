from fastapi import FastAPI
import pandas as pd

app=FastAPI()

store={}

@app.get("/")
def get_data():
    return store

@app.post("/")
def create():

    df=pd.read_csv("students.csv")

    records=df.head(10).to_dict(orient="records")

    store["records"]=records

    return records

@app.put("/")
def update():
    return create()

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}