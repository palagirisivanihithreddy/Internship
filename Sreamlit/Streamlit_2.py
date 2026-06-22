import streamlit as st

st.title("Experiment 2: Check Voting Eligibility")

age = st.number_input("Enter Age", min_value=0)

if st.button("Check"):
    if age >= 18:
        st.success("Eligible to Vote")
    else:
        st.error("Not Eligible to Vote")