import streamlit as st
import pandas as pd

st.title("Experiment 8: Multiplication Table")

num = st.number_input("Enter Number", step=1)

if st.button("Generate"):
    data = []

    for i in range(1, 11):
        data.append([i, num * i])

    st.table(pd.DataFrame(data, columns=["Multiplier", "Result"]))