import pandas as pd

def read_csv(file_path):
    df = pd.read_csv(file_path)
    return df.head(10).to_dict()