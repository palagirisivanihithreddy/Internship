import streamlit as st

st.title("Experiment 1: Check Even or Odd")

num = st.number_input("Enter a Number", step=1)

if st.button("Check"):
    if num % 2 == 0:
        st.info("Even Number")
    else:
        st.error("Odd Number")