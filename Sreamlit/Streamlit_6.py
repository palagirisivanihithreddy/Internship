import streamlit as st

st.title("Experiment 6: First 10 Natural Numbers")

if st.button("Show"):
    st.write(list(range(1, 11)))