from fastapi import FastAPI
from models import College, Department, Faculty, Student

from database import (
    college_collection,
    department_collection,
    faculty_collection,
    student_collection
)

app = FastAPI(
    title="College Management System",
    description="College Department Faculty Student Management API",
    version="1.0"
)

# ==================================================
# COLLEGE CRUD OPERATIONS
# ==================================================

@app.post("/college", tags=["Colleges"])
def add_college(college: College):

    result = college_collection.insert_one(
        college.model_dump()
    )

    return {
        "message": "College Added Successfully",
        "id": str(result.inserted_id)
    }


@app.get("/colleges", tags=["Colleges"])
def get_colleges():

    colleges = []

    for college in college_collection.find():

        college["_id"] = str(college["_id"])
        colleges.append(college)

    return colleges


@app.get("/college/{college_id}", tags=["Colleges"])
def get_college(college_id: int):

    college = college_collection.find_one(
        {"college_id": college_id}
    )

    if college:

        college["_id"] = str(college["_id"])
        return college

    return {"message": "College Not Found"}


@app.put("/college/{college_id}", tags=["Colleges"])
def update_college(college_id: int, college: College):

    result = college_collection.update_one(
        {"college_id": college_id},
        {"$set": college.model_dump()}
    )

    return {
        "updated": result.modified_count
    }


@app.delete("/college/{college_id}", tags=["Colleges"])
def delete_college(college_id: int):

    result = college_collection.delete_one(
        {"college_id": college_id}
    )

    return {
        "deleted": result.deleted_count
    }


# ==================================================
# DEPARTMENT CRUD OPERATIONS
# ==================================================

@app.post("/department", tags=["Departments"])
def add_department(department: Department):

    result = department_collection.insert_one(
        department.model_dump()
    )

    return {
        "message": "Department Added Successfully",
        "id": str(result.inserted_id)
    }


@app.get("/departments", tags=["Departments"])
def get_departments():

    departments = []

    for department in department_collection.find():

        department["_id"] = str(department["_id"])
        departments.append(department)

    return departments


@app.get("/department/{department_id}", tags=["Departments"])
def get_department(department_id: int):

    department = department_collection.find_one(
        {"department_id": department_id}
    )

    if department:

        department["_id"] = str(department["_id"])
        return department

    return {"message": "Department Not Found"}


@app.put("/department/{department_id}", tags=["Departments"])
def update_department(
        department_id: int,
        department: Department
):

    result = department_collection.update_one(
        {"department_id": department_id},
        {"$set": department.model_dump()}
    )

    return {
        "updated": result.modified_count
    }


@app.delete("/department/{department_id}", tags=["Departments"])
def delete_department(department_id: int):

    result = department_collection.delete_one(
        {"department_id": department_id}
    )

    return {
        "deleted": result.deleted_count
    }


# ==================================================
# FACULTY CRUD OPERATIONS
# ==================================================

@app.post("/faculty", tags=["Faculty"])
def add_faculty(faculty: Faculty):

    result = faculty_collection.insert_one(
        faculty.model_dump()
    )

    return {
        "message": "Faculty Added Successfully",
        "id": str(result.inserted_id)
    }


@app.get("/faculties", tags=["Faculty"])
def get_faculties():

    faculties = []

    for faculty in faculty_collection.find():

        faculty["_id"] = str(faculty["_id"])
        faculties.append(faculty)

    return faculties


@app.get("/faculty/{faculty_id}", tags=["Faculty"])
def get_faculty(faculty_id: int):

    faculty = faculty_collection.find_one(
        {"faculty_id": faculty_id}
    )

    if faculty:

        faculty["_id"] = str(faculty["_id"])
        return faculty

    return {"message": "Faculty Not Found"}


@app.put("/faculty/{faculty_id}", tags=["Faculty"])
def update_faculty(
        faculty_id: int,
        faculty: Faculty
):

    result = faculty_collection.update_one(
        {"faculty_id": faculty_id},
        {"$set": faculty.model_dump()}
    )

    return {
        "updated": result.modified_count
    }


@app.delete("/faculty/{faculty_id}", tags=["Faculty"])
def delete_faculty(faculty_id: int):

    result = faculty_collection.delete_one(
        {"faculty_id": faculty_id}
    )

    return {
        "deleted": result.deleted_count
    }


# ==================================================
# STUDENT CRUD OPERATIONS
# ==================================================

@app.post("/student", tags=["Students"])
def add_student(student: Student):

    result = student_collection.insert_one(
        student.model_dump()
    )

    return {
        "message": "Student Added Successfully",
        "id": str(result.inserted_id)
    }


@app.get("/students", tags=["Students"])
def get_students():

    students = []

    for student in student_collection.find():

        student["_id"] = str(student["_id"])
        students.append(student)

    return students


@app.get("/student/{student_id}", tags=["Students"])
def get_student(student_id: int):

    student = student_collection.find_one(
        {"student_id": student_id}
    )

    if student:

        student["_id"] = str(student["_id"])
        return student

    return {"message": "Student Not Found"}


@app.put("/student/{student_id}", tags=["Students"])
def update_student(
        student_id: int,
        student: Student
):

    result = student_collection.update_one(
        {"student_id": student_id},
        {"$set": student.model_dump()}
    )

    return {
        "updated": result.modified_count
    }


@app.delete("/student/{student_id}", tags=["Students"])
def delete_student(student_id: int):

    result = student_collection.delete_one(
        {"student_id": student_id}
    )

    return {
        "deleted": result.deleted_count
    }


# ==================================================
# RELATIONSHIP APIs
# ==================================================

@app.get("/college/{college_id}/departments", tags=["Relationships"])
def get_college_departments(college_id: int):

    departments = list(
        department_collection.find(
            {"college_id": college_id},
            {"_id": 0}
        )
    )

    return departments


@app.get("/department/{department_id}/faculty", tags=["Relationships"])
def get_department_faculty(department_id: int):

    faculty = list(
        faculty_collection.find(
            {"department_id": department_id},
            {"_id": 0}
        )
    )

    return faculty


@app.get("/department/{department_id}/students", tags=["Relationships"])
def get_department_students(department_id: int):

    students = list(
        student_collection.find(
            {"department_id": department_id},
            {"_id": 0}
        )
    )

    return students