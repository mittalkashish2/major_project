
# coding: utf-8

# In[3]:

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
interests_list = data['interests_list']

#print(email)
#print(my_list)
 
future_aspirations = data['future_aspirations']

df = pd.read_csv(path+"MAJOR/recent_interests.csv")

flag = 0
for index, row in df.iterrows():
    if(row['Email'] == email):
        row['Interests'] = ",".join(interests_list)
        flag = 1
        
if(flag == 0):
    interests_str = ",".join(interests_list)
    new_row = {'Name':name, 'Email':email, 'Interests': interests_str}
    df = df.append(new_row, ignore_index=True)


df.to_csv(path+"MAJOR/recent_interests.csv",index=False)

df_syll = pd.read_csv(path+"MAJOR/final_syll.csv")

df_areas = pd.read_csv(path+"MAJOR/final_interests.csv")

dict = {}
for i in interests_list:
    dict[i] = 1


courses = []
similarity = []
for index, row in df_syll.iterrows():
    courses.append(row['Course Id'].strip())
    similarity.append(0)



def func(str1,str2):
    str1 = str1.split(" ")
    str2 = str2.split(" ")
    return len(list(set(str1)&set(str2)))




for index, row in df_areas.iterrows():
    if row['Interests'] in dict.keys():
    #find percentage similarity of interest and course description
        for index_1, row_1 in df_syll.iterrows():
            similarity_temp = func(row['Stemmed Related Words'],row_1['Stemmed Description'])
            similarity[index_1]=similarity[index_1]+similarity_temp
        
yx = zip(similarity, courses) 
yx=sorted(yx)
courses_sorted = [x for y, x in yx]
courses_to_be_displayed = courses_sorted[-20:]
courses_to_be_displayed.reverse()


        




# In[4]:

df = pd.read_csv(path+"MAJOR/student_data.csv")


# In[ ]:




# In[5]:

flag=0
courses_taken = ""
for index, row in df.iterrows():
    if(row['Email'] == email):
        courses_taken=courses_taken+(row['Courses Taken'])
        flag=1
        break

courses_taken_list = courses_taken.split(",")
my_dict = {}
for i in courses_taken_list:
    my_dict[i] = 1

if(flag == 1):
    #remove already courses taken from list
    for i in courses_to_be_displayed:
        if(my_dict.__contains__(i)):
            courses_to_be_displayed.remove(i)

#print(courses_to_be_displayed)


# In[ ]:




# In[6]:

courses_to_be_displayed_final = courses_to_be_displayed[:5]
courses_to_be_displayed_names = []
df = pd.read_csv(path+"MAJOR/final_syll.csv")
for i in courses_to_be_displayed_final:
    for index, row in df.iterrows():
        if(row['Course Id'].strip() == i.strip()):
            courses_to_be_displayed_names.append(row['Course Name'])
            break


# In[ ]:




# In[7]:

# df = pd.read_csv(path+"MAJOR/student_courses_recommended.csv")


# In[ ]:




# In[8]:

# flag = 0;
# for index, row in df.iterrows():
#     if(row['Email'] == email):
#         #person has been recommended some courses
#         recommended_course_str = ",".join(courses_to_be_displayed_final)
#         row['Courses Recommended'] = recommended_course_str
#         flag=1
#         break
        
# if(flag == 0):
#     #person was never recommended
#     recommended_course_str = ",".join(courses_to_be_displayed_final)
#     df.loc[len(df.index)] = [name, email, recommended_course_str] 
    
# #store the dataframe to csv again
# df.to_csv(path+"MAJOR/student_courses_recommended.csv",index=False)


# In[9]:

print(json.dumps({"course_id":courses_to_be_displayed_final,"course_name":courses_to_be_displayed_names}))

# print(courses_to_be_displayed_final)
# print(courses_to_be_displayed_names)


# In[ ]:




# In[ ]:



