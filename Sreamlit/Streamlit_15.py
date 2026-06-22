import streamlit as st

st.title("Experiment 15: Student Grade Calculation")

name = st.text_input("Student Name")

maths = st.number_input("Maths", 0, 100)
physics = st.number_input("Physics", 0, 100)
chemistry = st.number_input("Chemistry", 0, 100)

if st.button("Calculate"):
    total = maths + physics + chemistry

    if total >= 270:
        grade = "A"
    elif total >= 210:
        grade = "B"
    elif total >= 150:
        grade = "C"
    else:
        grade = "D"

    st.write("Name:", name)
    st.write("Total:", total)
    st.success(f"Grade = {grade}")