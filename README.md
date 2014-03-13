# Description
phantom-check will check errors:
- javascript errors
- 404 errors (broken url)
- 401 errors (authentication)

it will give the correct exit codes to use in a shell script

# Why?
- wget,curl etc.. don't get the js errors
- seleniums/webdriver don't get the broken links 

# Installation
```
npm install -g phantom-check
```

# Usage
```
$ phantom-check http://google.be 
```
