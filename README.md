# yaml-to-properties

A util to convert files in .yml format into .properties format.
Currently only supports single file conversion.

## Install

```
npm install yaml2properties --save-dev
```
## Usage

Example yaml 

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

```
yaml2properties -c config.json
```
