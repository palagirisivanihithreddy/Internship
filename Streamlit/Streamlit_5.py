import streamlit as st

st.title("Experiment 5: Arithmetic Operations")

a = st.number_input("First Number")
b = st.number_input("Second Number")

if st.button("Calculate"):
    st.write("Addition =", a + b)
    st.write("Subtraction =", a - b)
    st.write("Multiplication =", a * b)

    if b != 0:
        st.write("Division =", a / b)
    else:
        st.error("Division by Zero")