## States

### Pseudo classes

```
hover:c-red
```

To add any [pseudo class](./states.md) to your style, just write it before the class

```
focus:active:bg-blue
```

You can combine several [pseudo classes](./states.md)

```
foo:flex => .foo\:flex:foo {...}
```
In fact, everything you write will appear after the selector


```
h:fs-24   => .h\:fs-24:hover 
f:bc-cyan => .f\:bc-cyan:focus 
c:bold    => .c\:bold:checked 
```

But you must admit that writing `hover` or `focus` every time takes up a lot of space, so you can use the abbreviation

These abbreviations can be found in [blick.states](./config.md)


---
### Dark mode

To make a certain style work only with a dark theme, you can add dark before the class

```
dark:c-white
```

It turns into 

```
.dark .dark\:c-white {...}
```

That is, somewhere above, usually in the `<body>` or `<html>`, you need to add `class="dark"` for this to work

Or you can use [autoTheme](./config.md#autotheme-experimental) to have this class automatically added   
***works only with C version** only

```js
autoTheme: true
```

Add this line to your [configuration](./config.md#autotheme-experimental)


---
### Own cuts

You can also change the keyword `dark`, or the abbreviation for `pseudo class` to something else, for this you need to set the previous value to `null` in [configuration](./config.md) and add a new one, the new value must be a function that returns a string

```js
config({
    states: {
        dark: null,
        dk: (selector) => ".dk " + selector
    }
})
```


---
### Read more: 
[Configuration](./config.md)

---
### [home](./main.md)