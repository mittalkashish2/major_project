import csv
import pandas as pd
import numpy as np
import os 

path = "C:/Users/admin/OneDrive/Desktop/"

name = "Ashutosh"
email = "koulashutosh@gmail.com"
interests_list = ["Programming"]

df = pd.read_csv(path+"MAJOR/recent_interests.csv")

flag = 0
for index, row in df.iterrows():
    print(row['Name'], row['Email'])
    if(row['Email'] == email):
        row['Interests'] = ",".join(interests_list)
        flag = 1
        
if(flag == 0):
    interests_str = ",".join(interests_list)
    new_row = {'Name':name, 'Email':email, 'Interests': interests_str}
    df = df.append(new_row, ignore_index=True)
    print(df)


df.to_csv(path+"MAJOR/recent_interests.csv",index=False)

df_syll = pd.read_csv(path+"MAJOR/final_syll.csv")

df_areas = pd.read_csv(path+"MAJOR/final_interests.csv")

dict = {}
for i in interests_list:
    #print(i)
    dict[i] = 1


courses = []
similarity = []
for index, row in df_syll.iterrows():
    print(row['Course Id'].strip())
    courses.append(row['Course Id'].strip())
    similarity.append(0)



def func(str1,str2):
    str1 = str1.split(" ")
    str2 = str2.split(" ")
    print(str1)
    print(str2)
    return len(list(set(str1)&set(str2)))




for index, row in df_areas.iterrows():
    if row['Interests'] in dict.keys():
    #find percentage similarity of interest and course description
        for index_1, row_1 in df_syll.iterrows():
            similarity_temp = func(row['Stemmed Related Words'],row_1['Stemmed Description'])
            print(similarity_temp)
            similarity[index_1]=similarity[index_1]+similarity_temp
        
yx = zip(similarity, courses) 
yx=sorted(yx)
courses_sorted = [x for y, x in yx]
courses_to_be_displayed = courses_sorted[-10:]

        


