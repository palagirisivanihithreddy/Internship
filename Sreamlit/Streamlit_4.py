import streamlit as st

st.title("Experiment 4: Sign of a Number")

num = st.number_input("Enter Number")

if st.button("Check Sign"):
    if num > 0:
        st.success("Positive")
    elif num < 0:
        st.error("Negative")
    else:
        st.info("Zero")