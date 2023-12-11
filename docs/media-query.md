## Media queries

To display a style on a certain screen size, you need to write a number in [state](./states.md)

```
512:bg-red
```

This means that the background will be red if the screen width is larger than 512px

```
m-600:bg-red
```

If you add `m-` (in [config](./config.md) it is `maxPrefix`) to the number, it means that this style will be applied at a width less than 600px (`max-width: 600px`)

---
### Variables
```js
screen: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}
```

```
md:bg-red
```

This means that the style will be applied on a screen width greater than `768px`.

As with everything in blickcss, these values can be edited in [configuration](./config.md)

```js
config({
    screen: {
        md: 600
        foo: "60rem",
        bar: [0,500],
        baz: "(max-width:800px)"
    }
})
```

You can specify either a simple `number` that will mean `(min-width: $px)`, or a range [from, to] of the screen size, or just write it as a `string`.

---
### Read more: 
[Configuration](./config.md)