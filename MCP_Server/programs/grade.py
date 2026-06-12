def calculate_grade(name, maths, physics, chemistry):
    total = maths + physics + chemistry
    percentage = total / 3

    if percentage >= 90:
        grade = "A"
    elif percentage >= 75:
        grade = "B"
    elif percentage >= 60:
        grade = "C"
    else:
        grade = "D"

    return {
        "name": name,
        "total": total,
        "percentage": percentage,
        "grade": grade
    }