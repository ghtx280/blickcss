## Properties

These are CSS properties such as `margin`, `padding`, `color`, `background`, etc.
```
bg-red max-w-24 c-white flex
```
В данному випадку `bg`, `max-w`, `c` та `flex` це властивості
Вони можуть мати заначення як `bg` або не мати як `flex`

Properties can also be in the form of a chain, such as `max-w'

```css
.max-w-500 { max-width: 500px }
.max-h-250 { max-height: 250px }
```

Here max-w is a chain of nested properties, under the hood in blickcss it looks like this

```js
max: {
    w: { ... },
    h: { ... }
}
```

This can be customized! [Learn how](./config.md)  
###  Read more:   
**[Values](./values.md)**  
**[States](./states.md) & [Media queries](./media-query.md)** 

---
### [home](./main.md)