import streamlit as st

st.title("Experiment 12: Factors of a Number")

num = st.number_input("Enter Number", min_value=1, step=1)

if st.button("Find Factors"):
    factors = []

    for i in range(1, int(num)+1):
        if num % i == 0:
            factors.append(i)

    st.write(factors)