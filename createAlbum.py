from datetime import datetime
import os
import pathlib
import shutil
import requests

title = 'test12' #str(input('What is the album title? \n'))
description = 'test123' #str(input('What is the album sub title? \n'))
photographer = 'Dennis Holmström'
albumURL = r'C:\Users\daeho\Pictures\export\Export-20221117-Hockey-KIK-BHC-J18-RS' #str(input('What is the album URL? \n'))
imageArray = []

def unix2date(unix):
    return datetime.utcfromtimestamp(unix).strftime('%Y%m%d')

for file in pathlib.Path(albumURL).iterdir():
    filename = os.path.split(file)[1]
    date = unix2date((os.path.getctime(file)))
    
    imageObj = {
        "filename": filename,
        "photographer": photographer,
       # "date": date
    }
    imageArray.append(imageObj)

#date = imageArray[0]['date']

url = 'http://localhost:5000/api/v1/album'
myobj = {
    "title": title,
    "description": description,
    "images": imageArray,
}

x = requests.post(url, json = myobj)

print(x)