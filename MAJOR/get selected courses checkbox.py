
# coding: utf-8

# In[5]:

import csv
import pandas as pd
import numpy as np
import os 
import sys
import json

path = "F:/major_project-main/major_project-main/"
 
#my_list = json.load(sys.stdin)
data = json.load(sys.stdin)
name = "User"
email = data['email']

# In[15]:

courses_list = data['courses_list']


# In[17]:

df = pd.read_csv(path+"MAJOR/latest_courses_selected_checkbox.csv")
flag=0
courses_seletcted_str = ",".join(courses_list)
#print(courses_seletcted_str)
for index, row in df.iterrows():
    if(row['Email'] == email):
        row['Course ID'] = courses_seletcted_str
        flag =1
        break

if(flag == 0):    
    df.loc[len(df.index)] = [email, courses_seletcted_str]

df.to_csv(path+"MAJOR/latest_courses_selected_checkbox.csv",index=False)
#df


# In[ ]:




# In[ ]:



