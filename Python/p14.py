n = int(input("Enter number of elements: "))

numbers = []

for i in range(n):
    num = int(input("Enter element: "))
    numbers.append(num)

print("List =", numbers)
print("Sum =", sum(numbers))