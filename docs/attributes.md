## Attributes

In blickcss, by default, you can use 3 attributes

## text

This attribute is used for working with text, you can easily set the font size, color, thickness, and other parameters.

```js
text="20 red bold center"
```

If you write any number, it can be a simple `20` or together with the `20px` unit, as long as the first character is a number, then it will be `font-size`.

But sizes like 100, 200, 300, ... won't work because they are used for `font-weight`, you can get around it by writing `100px`.

If you write a non-numeric value, such as `red`, `#f0f`, `$blue`, it will be `color`.  

If you write `24/500` or `24/500/36`, it will create several additional properties.

```
text="... 24/500 ..."
-------------
font-size: 24px;
font-weight: 500;
```

```
text="... 24/500/36 ..."
----------------
font-size: 24px;
font-weight: 500;
line-height: 36px;
```

If we use `red/50` it will mean the transparency of the color

```
text="... red/50 ..."
-------------
color: #ff000080;
```

Works the same way as [color/opacity](./values.md#color-opacity), but only for `color`

Everything else is prescribed values that are taken from [blick.attr.text](./config.md)




## flex

The flex attribute is used to work with `display: flex`.

```js
flex="15 col center"
```

If you write any number, it can be a simple `15` or together with the unit `15px`, as long as the first character is a number, it will be `gap`.

```
flex="15 col center"
--------------------
gap: 15px;
flex-direction: column;
justify-content: center;
align-items: center;
```

Everything else is prescribed values that are taken from [blick.attr.flex](./config.md)


## grid

The grid attribute is used to work with `display: grid`.

```js
grid="30 cols-2 rows-3"
```

If you write any number, it can be a simple `30` or together with the unit `30px`, as long as the first character is a number, it will be `gap`.


```
grid="30 cols-2 rows-3"
--------------------
gap: 30px;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(3, 1fr);
```

Everything else is prescribed values that are taken from [blick.attr.grid](./config.md)

## Use with states and media queries

You can very easily use these attributes in combination with [states](./states.md) and [media queries](./media.md)

```js
text="20 500:red bold sm:center"
flex="15 m-md:col center"
```

## Additionally

For example, so that you can write
```
flex="20+30"
```
This will mean `gap: 20px 30px`, that is, everything is the same as in [values](./values.md)

You can add custom attributes, read more about it here [custom attributes](./structure.md#attributes)


---
### [home](./main.md)