from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Calculator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/calculate/{num1}/{num2}/{operation}")
def calculate(num1: float, num2: float, operation: str):

    if operation == "add":
        result = num1 + num2

    elif operation == "subtract":
        result = num1 - num2

    elif operation == "multiply":
        result = num1 * num2

    elif operation == "divide":

        if num2 == 0:
            return {
                "error": "Cannot divide by zero"
            }

        result = num1 / num2

    else:
        return {
            "error": "Invalid Operation"
        }

    return {
        "num1": num1,
        "num2": num2,
        "operation": operation,
        "result": result
    }