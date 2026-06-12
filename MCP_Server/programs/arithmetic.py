def arithmetic(a, b):
    return {
        "addition": a+b,
        "subtraction": a-b,
        "multiplication": a*b,
        "division": a/b if b != 0 else "Cannot divide by zero"
    }