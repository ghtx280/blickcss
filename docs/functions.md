## Functions


BlickCss provides access to certain of its functions.


---
### Parser

```js
blick.parser("h:m-20", "class")
```

The first parameter is a token (one class), the second parameter is which attribute the first parameter refers to. The result should be a structure like this

```js
{
    states: [
        { raw: "h", val: ":hover", type: "pseudo" }
    ],
    styles: [
        {
            src: { _prop: "margin:$", unit: "px" },
            path: [ "m" ],
            prop: "margin:$",
            values: [ { val: "20px", raw: "20" } ],
            rawVal: "20",
            val: "20px",
            unit: "px",
            join: " ",
            important: false
        }
    ],
    attr: "class",
    selector: ".h\\:m-20",
    rawSelector: ".h\\:m-20",
    token: "h:m-20"
}
```
More info [here](./parser.md)


---
### CreateRule

A function that uses a parser, but it outputs ready-made css code.

```js
blick.createRule("h:m-20", "class")

// output:
[ [], ".h\\:m-20:hover{margin:20px}" ]
```

You will get an array with two elements. The first contains the parameters for [media query](./media-query.md), the second element is the css code.

```js
blick.createRule("md:m-20", "class")

// output:
[
    [{ raw: "md", val: "(min-width:768px)", type: "media" }],
    ".md\\:m-20{margin:20px}"
]
```

Separation into media queries and css code, so that there is not a lot of the same type of code and you do not create 1000 of the same media queries.

---
### Html

This function does not process individual tokens, but the entire html code, it is used to generate styles in the CLI version (installed via `npm i blickcss`).

```js
blick.html(
    '<div class="m-foo flex">',
    {
        class: {
            m: { foo: "test:123" }
        }
    }
)

// output:
".m-foo{test:123}.flex{display:flex}"
```

The first parameter is the html code, the second parameter is [config](./config.md).  
When the function is called, the main blick object is duplicated, and changed based on the configuration passed in the second parameter, if the configuration is not passed, then the main object is used, or rather the previous one, so the next call to this function will not duplicate the object, but will use the previous one, provided that you did not pass the configuration as the second parameter.

---
### Clone

```js
const blick_copy = blick.clone()
const class_copy = blick.clone("class")
```

If you do not pass the parameter, a copy of the entire object will be created and it will be returned as a result of the function.    
You can also pass 1 parameter, this is the key of the internal object, it will create a copy of the specified object using the passed key and return it.


---
### Config

Read more [here](./config.md)


---
### GetStyleTag

```js
blick.getStyleTag()
```
Returns the element that contains all generated styles.  
*Works only in the CDN version

---
### GetHex

```js
blick.getHex("red") // "#ff0000"
blick.getHex("rgba(255,0,0)") // "#ff0000"
```

Converts a color to `hex` format.  
*Works only in the CDN version


---
### [home](./main.md)


