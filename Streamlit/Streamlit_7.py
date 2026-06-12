import streamlit as st

st.title("Experiment 7: First n Natural Numbers")

n = st.number_input("Enter n", min_value=1)

if st.button("Generate"):
    st.write(list(range(1, int(n)+1)))