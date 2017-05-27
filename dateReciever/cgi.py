import urllib.request
from bs4 import BeautifulSoup

request=r'http://www.videocardbenchmark.net/gpu_value.html'
conten=urllib.request.urlopen(request)
html=conten.read().decode('utf-8')
soup=BeautifulSoup(html,"html.parser")
count=0
datalist=soup.find_all("td",class_="chart")
datadict={}
while(count<len(datalist)):
    name=datalist[count].contents[0].string
    print(name)
    # tag=datalist[count].find_next_sibling()
    # print(tag.contents[0].contents[1].string)
    if(count+1<len(datalist)):
        score = datalist[count + 1].contents[0].string
        print(score[1:])
        # datadict[name] = score
    count+=2

# print('start')
# print(datadict)