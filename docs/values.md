## Values

You can use many types of values in blickcss

---
### Vals

```js
_vals: {
    full: "100%"
}
```

```
w-full => width: 100% 
w-500  => width: 500px 
```

If the class object has a parameter [_vals](structure.md#vals), then first your value will be searched there, if it is not there, the script will go further

---
### Regular

```
m-20 => margin: 20px
m-50% => margin: 50% 
```

Just your value to which [_unit](./structure.md#prop--unit) can be added if it exists and if your value is a `number`

---
### Percent

```
w-1/3 => width: 33.33%
```

You can use a fractional value that the script converts to a percentage

---
### CSS variables

```
bg-$brand => background: var(--brand)
c-$red => color: var(--red)
```

Using css variables, everything that starts with `$` is a variable. [Colors](./config.md#colors) in blickcss are converted to variables

---
### Color opacity

```
bg-red/50 => background: #ff000080
bg-#0a6/65 => background: #00aa66a6
bg-$blue/20 => background: #3b82f633
bg-$foo/30 => background: var(--foo); opacity: 0.3
```

You can set the transparency of a color using `prop-color/opacity`. There are a few things to note here.  
The **hex** and **color names** can be anything, but you can also use the colors of the variables defined in [colors](./config.md#colors) so `$blue` exists in colors so it will be processed, and `$foo` will remain as is, but additionally set to `opacity`

---
### Combination values

```
m-20+30
margin: 20px 30px

border-5+solid+$blue/50
border: 5px solid #3b82f680

shadow-box-15+0+5em+$red/50
box-shadow: 15px 0 5em #ef444480
```

All of the above values can be combined using `+`