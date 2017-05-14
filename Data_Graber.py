import urllib.request
import http.cookiejar
import json
# by yezhongyi

# cookie=http.cookiejar.CookieJar()
# handler=urllib.request.HTTPCookieProcessor(cookie)
# opener=urllib.request.build_opener(handler)
# response=opener.open('http://www.baidu.com')
# for item in cookie:
#     print('Name='+item.name)
#     print('Value='+item.value)


# filename='cookie.txt'
# cookie=http.cookiejar.MozillaCookieJar(filename)
# handler=urllib.request.HTTPCookieProcessor(cookie)
# opener=urllib.request.build_opener(handler)
# response=opener.open('http://www.baidu.com')
# cookie.save(ignore_discard=True,ignore_expires=True)
from  urllib.request import urlopen
html=urlopen("https://api.github.com/search/users?q=language:php")
data=html.read()
l=json.loads(data)
print(l['total_count'])