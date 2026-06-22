from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bson import ObjectId

from db import employee_collection

app = FastAPI(title="Employee Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmployeeCreate(BaseModel):
    name: str
    role: str
    department: str
    email: str


def employee_serializer(employee):
    return {
        "id": str(employee["_id"]),
        "name": employee["name"],
        "role": employee["role"],
        "department": employee["department"],
        "email": employee["email"]
    }


@app.get("/employees")
def get_employees():

    employees = []

    for employee in employee_collection.find():
        employees.append(employee_serializer(employee))

    return employees


@app.get("/employees/{emp_id}")
def get_employee(emp_id: str):

    employee = employee_collection.find_one(
        {"_id": ObjectId(emp_id)}
    )

    if employee:
        return employee_serializer(employee)

    raise HTTPException(
        status_code=404,
        detail="Employee not found"
    )


@app.post("/employees")
def create_employee(emp: EmployeeCreate):

    employee_data = {
        "name": emp.name,
        "role": emp.role,
        "department": emp.department,
        "email": emp.email
    }

    result = employee_collection.insert_one(employee_data)

    created_employee = employee_collection.find_one(
        {"_id": result.inserted_id}
    )

    return {
        "message": "Employee Added Successfully",
        "employee": employee_serializer(created_employee)
    }


@app.put("/employees/{emp_id}")
def update_employee(emp_id: str, emp: EmployeeCreate):

    result = employee_collection.update_one(
        {"_id": ObjectId(emp_id)},
        {
            "$set": {
                "name": emp.name,
                "role": emp.role,
                "department": emp.department,
                "email": emp.email
            }
        }
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    updated_employee = employee_collection.find_one(
        {"_id": ObjectId(emp_id)}
    )

    return {
        "message": "Employee Updated Successfully",
        "employee": employee_serializer(updated_employee)
    }


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str):

    employee = employee_collection.find_one(
        {"_id": ObjectId(emp_id)}
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee_collection.delete_one(
        {"_id": ObjectId(emp_id)}
    )

    return {
        "message": "Employee Deleted Successfully"
    }