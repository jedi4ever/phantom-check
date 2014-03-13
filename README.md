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
$ phantom-check http://google.be  --ignore=http://somethirdparty.com
```

# Sample output

```
Phantom is checking http://vlaanderen.be

Error:TypeError: instanceof called on an object with an invalid prototype property.
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_DTCzlhuyzELRYiqSj0nVhjpUxPYgM1lHVFpKzqBgIBg.js","line":1414,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_DTCzlhuyzELRYiqSj0nVhjpUxPYgM1lHVFpKzqBgIBg.js","line":1423,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_DTCzlhuyzELRYiqSj0nVhjpUxPYgM1lHVFpKzqBgIBg.js","line":1479,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_DTCzlhuyzELRYiqSj0nVhjpUxPYgM1lHVFpKzqBgIBg.js","line":2079,"function":""}

Error:TypeError: 'undefined' is not a function (evaluating '$(d.$publicationFull + ' aside nav ul', context).showMore({text: Drupal.t('Older publications')})')
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_DTCzlhuyzELRYiqSj0nVhjpUxPYgM1lHVFpKzqBgIBg.js","line":1352,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/VMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":163,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":4,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":165,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":499,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":4,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":4,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":4,"function":""}
{"file":"http://www.vlaanderen.be/sites/default/files/js/js_oCVMDTeSNt-_QxknevWyf6yO5OzmME3AhRz3ggZgNtg.js","line":4,"function":""}


Page http://vlaanderen.be has errors
```
