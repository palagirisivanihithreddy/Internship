import streamlit as st

st.title("Experiment 3: Greatest of Two Numbers")

a = st.number_input("First Number")
b = st.number_input("Second Number")

if st.button("Compare"):
    if a > b:
        st.success("First Number is Greater")
    elif b > a:
        st.success("Second Number is Greater")
    else:
        st.info("Both Numbers are Equal")