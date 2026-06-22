import streamlit as st
import pandas as pd

# Set the page title
st.title("CSV Data Viewer")

# Option 2: Add a file uploader (Bonus feature for better UX)
st.divider()
st.sidebar.header("Upload Settings")
uploaded_file = st.sidebar.file_uploader("Choose a CSV file", type="csv")

if uploaded_file is not None:
    user_df = pd.read_csv(uploaded_file)
    st.subheader("Uploaded File Preview")
    
    st.write(user_df.head(10))