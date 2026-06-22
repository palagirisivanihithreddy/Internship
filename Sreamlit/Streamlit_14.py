import streamlit as st

st.title("Experiment 14: Sum of Elements in a List")

numbers = st.text_input(
    "Enter Numbers separated by spaces"
)

if st.button("Calculate"):
    nums = list(map(int, numbers.split()))
    st.write("Sum =", sum(nums))