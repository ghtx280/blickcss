## Configuration

Here we come to the most interesting part.
To be able to customize blick, you need to know how it works. blick is divided into 2 parts:  

1. Functions that are needed to do the work, they perform [parsing](./parser.md), create styles, analyze the code, and so on 

2. A large object that contains everything you need to do the function, you can change this object as you like.
   

*If you are using the cdn version, then go to the console and write blick, press enter and you will see this object

That is, if you need to change something, just write 

```js
blick.class.flex = "new value"
blick.screen.md = 850
blick.time = true
```

But this is not very convenient to configure everything in one place, I recommend using `blick.config({...})`, it does exactly the same thing, but it's just easier to write

```js
blick.config({
    class: {
        flex: "new value"
    },
    screen: {
        md: 850
    },
    time: true
})
```

Now let's talk about what blickcss has to offer. The examples below show the default values.


---
### class

```js
class: {
    m: { ... },
    bg: { ... },
    flex: { ... },
    ...
}
```

This is the object where you can change the classes used in blickcss.  
**Before changing classes** read how to create them [structure](./structure.md)


---
### attr

```js
attr: {
    text: { ... },
    flex: { ... },
    grid: { ... },
}
```

This is an object where you can change and add attributes used in blickcss.  
**Important!!!** Before changing attributes, read how to create them [structure](./structure.md#attributes)  
[More](./attributes.md)


---
### states

```js
states: {
    h: ":hover",
    c: ":checked",
    f: ":focus",
    ...
    dark: (sel) => ".dark " + sel
}
```
Here you can change and add abbreviations for states  
[Read more](./states.md) 


---
### screen

```js
screen: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}
```
Here you can change and add screen sizes  
[Read more](./media-query.md#variables) 


---
### colors

```js
colors: {
    black: "#000",
    white:"#fff" ,
    red: {
        def: "#ef4444"
        1: "#fee2e2",
        2: "#fca5a5",
        ...
    },
    ...
}
```

Here you can change and add colors.  
These colors are converted to CSS variables

```css
:root{
    --black: #000;
    --white: #fff;
    --red: #ef4444;
    --red-1: #fee2e2;
    --red-2: #fca5a5;
    ...
}
``` 
They are also used when you set the transparency of a color

```js
class="bg-$red/50" // background-color: #ef444480;
```

[Read more](./values.md#color-opacity) 


---
### font

```js
font: {
    main:  "system-ui,-apple-system,sans-serif",
    serif: "serif",
    mono:  "monospace",
    sans:  "sans-serif",
}
```

Here you can change and add fonts that you will use.   
Just like colors, these fonts are converted to CSS variables  


```css
:root{
    ...
    --font-main: system-ui,-apple-system,sans-serif;
    --font-serif: serif;
    --font-mono: monospace;
    --font-sans: sans-serif;
    ...
}
```
`--font-main` is used as the default font. 


---
### reset

```js
reset: "*,::after,::before{box-sizing:border-box;..."
```

Рядок який додається на початок, відповідає за скидання та нормалізацію стилів. Ви можете написати свій або просто зробити його як `null` щоб видалити його.


---
### root

```js
root: true
```

Responsible for adding colors and fonts to `:root`, if set to `false` then `:root` will not be added, but you can still use the colors `bg-$red/50`


---
### maxPrefix

```js
maxPrefix: "m-"
```

String used to set `max-width` in [media queries](./media-query.md)


---
### autoTheme (experimental)

```js
autoTheme: false
```
Parameter responsible for automatic installation of the theme based on the system theme. If set to `true`, then `<html>` will be set to `dark`.  
*Works only with the cdn version.

---
### autoFlex

```js
autoTheme: true
```

If set to 'true', the style will add 

```css
[class*="flex-"],
[class*="jc-"],
[class*="ai-"],
[class*="gap-"]{
    display:flex
}
```
This means that `display: flex` will be applied automatically to elements that have classes `flex`, `jc`, `ai` or `gap`.

---
### wrapper

```js
wrapper: ".wrapper"
```
Selector for [wrapper](./wrapper.md)



---
### time

```js
time: false
```
If set to `true`, the console will display the time for which blickcss generates styles (works only in the CDN version).


---
### version

```js
version: "2.0"
```
Read only. `blick.version`   



---
### Read more:   
**[Functions](./functions.md)**  
**[Properties](./props.md)**  
**[Values](./values.md)**  
**[States](./states.md) & [Media queries](./media-query.md)** 


---
### [home](./main.md)