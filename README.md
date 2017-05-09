# yaml-to-properties

A util to convert files in .yml format into .properties format.

## Usage

Example

```
"KEY1":
  "KEY2": "Hello"
  "KEY3":"World"
```

result into a file containing

```
KEY1.KEY2=Hello
KEY1.KEY3=World
```

Example config.json

```
{
    src: "c:\json\myfiles\file.yml",
    dist: "c:\properties\converted.properties"
}
```

and run with 

`json-to-properties -c config.json`

### -r, --reverse

Performs the reversal process, converting .properties files into .json files.

Example 
```
KEY1.KEY2=Hello
KEY3=World
```

result into a file containing

```
{
    "KEY1": {
        "KEY2": "Hello"
    },
    "KEY3":"World"
}
```
