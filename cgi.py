import urllib.request
from bs4 import BeautifulSoup

request=r'http://www.videocardbenchmark.net/common_gpus.html'
conten=urllib.request.urlopen(request)
html=conten.read().decode('utf-8')
soup=BeautifulSoup(html,"html.parser")
for tag in soup.find_all("td",class_="chart"):
    if(tag.contents):
        print(tag.contents[0].string)
    subtag=tag.find_next_sibling()
    if(subtag!=None and subtag.contents):
        print(subtag.contents[0].contents[1])