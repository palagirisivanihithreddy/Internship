import streamlit as st

st.title("Experiment 10: Sum of Digits")

num = st.number_input("Enter Number", min_value=0, step=1)

if st.button("Calculate"):
    total = sum(map(int, str(int(num))))
    st.success(f"Sum of Digits = {total}")