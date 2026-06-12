from fastapi import FastAPI

app = FastAPI()

store = {}

@app.get("/")
def get_numbers():
    return {"numbers": list(range(1,11))}

@app.post("/")
def create():
    store["numbers"] = list(range(1,11))
    return store

@app.put("/")
def update():
    return create()

@app.delete("/")
def delete():
    store.clear()
    return {"message":"Deleted"}