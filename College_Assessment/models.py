from pydantic import BaseModel

class College(BaseModel):
    college_id: int
    college_name: str
    location: str


class Department(BaseModel):
    department_id: int
    department_name: str
    college_id: int


class Faculty(BaseModel):
    faculty_id: int
    faculty_name: str
    subject: str
    department_id: int


class Student(BaseModel):
    student_id: int
    student_name: str
    age: int
    email: str
    department_id: int