import pandas as pd
import json
# Load the Excel file
df = pd.read_excel('languages.xlsx')

# Create a dictionary from each row in the DataFrame
data = {}
for index, row in df.iterrows():
    data[row[0]] = row[19]

# Save the dictionary as a JSON file
with open('urdu.json', 'w') as f:
    json.dump(data, f)
