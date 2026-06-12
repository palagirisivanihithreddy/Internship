import streamlit as st
import pandas as pd

st.title("Experiment 9: Multiplication Table of 9")

data = []

for i in range(1, 11):
    data.append([i, 9 * i])

st.table(pd.DataFrame(data, columns=["Multiplier", "Result"]))