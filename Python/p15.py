name = input("Enter student name: ")

maths = int(input("Maths marks: "))
physics = int(input("Physics marks: "))
chemistry = int(input("Chemistry marks: "))

total = maths + physics + chemistry

if total >= 270:
    grade = "A"
elif total >= 210:
    grade = "B"
elif total >= 150:
    grade = "C"
else:
    grade = "D"

print("Name:", name)
print("Total:", total)
print("Grade:", grade)