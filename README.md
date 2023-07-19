### Small library for quickly creating styles via classes and special attributes. An alternative to Tailwind.

## Getting Started

### Installation
To use CLI run the following commands

```shell
npm i blickcss
```
```shell
npx blickcss
```
After that, you will see the configuration file for setting up the library. The src folder will also appear by default (if it doesn't exist) with the `src/output.css` file. All you need to do is add HTML files to src and start creating masterpieces. All this can be customized in the configuration file `blick.config.js`.

Add this to the configuration file to remove unnecessary css code from `output.css` so that only your styles remain
```js
reset: false,
root: false,
useAttr: false,
autoFlex: false,
wrapper: false,
```
***

Or add the following script tag in the `<head>` of your HTML file if you want use it via CDN.

```html
<script src="https://unpkg.com/blickcss"></script>
```

***

### Usage

To style any element, add a class using the `property-value` or `state:property-value` pattern.

```html
<div class="m-20 p-12+35 bg-red c-white h:c-#f00 md:bg-$brand">Hello, BlickCSS!</div>
```
CSS output:
```css
.m-20 {
  margin: 20px
}
.p-12\+35 {
  padding:12px 35px
}
.bg-red {
  background: red
}
.c-white {
  color: white
}
.h\:c-\#f00:hover {
  color: #f00
}
@media (min-width: 768px){
  .md\:bg-\$brand {
    background: var(--brand)
  }
}
```

---

#### You can find a list of all available classes [here](https://blick.netlify.app/docs/classes/).

#### Visit [this site](https://blick.netlify.app) for more info.

#### Try it out [PLAYGROUND](https://playcode.io/1243248).

---

## Features

- Converts class names to CSS properties based on a predefined object.
- Supports special attributes like flex, text, and grid for enhanced styling.
- Handles pseudo-classes and media queries.
- Provides dynamic values, constants, CSS variables, and percentages for flexible styling.
- Easy configuration options to customize the conversion object.
---

### Conversion Object

BlickCSS has a special object that the library uses to create classes, attributes, colors, states, media queries, and much more. For example, here is an object with classes that you can use. They all have a certain structure to give you more flexibility in creating styles. You can modify this object to add, change, or remove properties directly through `window.blick` or `blick` (if you are using a CDN) or in `blick.config.js` (if you are using the CLI). 

Here's an example of an object with classes:

```js
{
  m: { prop: "margin:$", def: "px" },
  p: { prop: "padding:$", def: "px" },
  w: {
    prop:"width:$",
    def:"px",
    vals: {
      full: "100%",
      half: "50%",
      min: "min-content",
      fit: "fit-content",
      max: "max-content",
      screen: "100vw"
    }
  },
  flex: {
    one: "display:flex",
    prop: "flex:$",
    ...
  },
  abs: "position:absolute"
  // ... other properties ...
}
```

- key - means the first part of the class is separated by a dash `(m -> margin, p -> padding)`.

- prop - defines a CSS property using the `$` character, your value will be inserted instead of `$` `(m-20 -> margin: 20px)`.

- def - used in conjunction with `prop`, it sets the unit of measurement for numeric values. If the end of the numeric value is not a number, def will not be added `(m-2em -> margin: 2em)`.

- vals - prepared values that will be substituted for `$` `(w-full -> width:100%)`.

- one - means one css class without a value `(flex -> display:flex)`.

### Combining classes with nested objects

it is possible to create chains of classes from nested objects, you can combine levels with hyphens (`-`). In this example, `foo-bar-qux-...` represents a chain of classes derived from the nested object structure.

```js
{
  foo: {
    bar: {
      qux: { prop:"something:$" }
    }
  }
}
```
```js
class="foo-bar-qux-10" // something:10
```

Based on this capability, you can create complex class structures.

```js
{
  over: {
    one: "overflow:auto"
    prop: "overflow:$",
    x: {
      prop:"overflow-x:$"
      hide:"overflow-x:hidden"
    },
    y: {
      prop:"overflow-y:$",
      vals:{
       hide:"hidden"
      }
    }
  }
}
```
```js
class="over-scroll"   // overflow: scroll
class="over-x-scroll" // overflow-x: scroll
class="over-hide"     // overflow: hide
class="over-y-hide"   // overflow-y: hidden
class="over"          // overflow: auto
```

### Property as a function

Functions in `prop` give you complete control over the output of the generated CSS. Using functions, you can define dynamic styles based on specific conditions or calculations.
  The function takes a parameter (often called "val") that represents the value passed to the function.

Here are some examples to demonstrate the use of functions for class properties:

```js
{
     text: {
       prop: ({ val }) => isNaN(val) ? `color:${val}` : `font-size:${val}px`,
     },
     fs: {
       prop: "font-size:$",
       def: "px",
       rand: {
         one: () => `font-size:${Math.floor(Math.random() * 64)}px`
       }
     }
}
```

In the first example, the `text` property is assigned a function as its `prop`. The function checks if the value is a number. If it's a number, it generates a CSS property for the font size; otherwise it generates a CSS property for the color.
```js
class="text-24" // font-size: 24px
class="text-red" // color: red
```
In the second example, the `fs` property includes a nested `rand` object that contains the `one` property as a function ("one" means no value is required). The function generates a random font size value between 0 and 64 pixels.
```js
class="fs-rand" // font-size: {random number}px
```
In this case, each time the page is loaded the `fs-rand` class will apply a different font size value.


### Special Attributes

BlickCSS supports special attributes to enhance styling and semantics of your code. Currently, it supports `flex`, `text`, and `grid`.   

#### Flex Attribute

The `flex` attribute is used for flexbox styling. It accepts two values: a dynamic value and a constant value. The dynamic value can be any number, representing the gap, while the constant value represents the flex-direction.
flex="15 col" would translate to gap: 15px; flex-direction: column. Here, `col` is a predefined value, while `15` represents a dynamic value (any digit represents `gap`).
```html
<div flex="15 col">...</div>
```
```css
output
[flex~="15"]{ gap: 15px }
[flex~="col"]{ flex-direction: column }
```

<!-- Example: `flex="15 col"` sets the gap to `15px` and the flex-direction to `column`. -->

#### Text Attribute

The `text` attribute is used for font styling. It allows you to specify multiple font properties within a single attribute. Each property is separated by a space. The values 24 and red are not predefined properties; if the algorithm does not find a matching property, it checks if the first character is a digit (indicating a font size) or a non-digit character (indicating a color). This applies only within the text="" attribute.
```html
<div text="24 #f00 bold">...</div>
```
```css
output
[text~="24"]{ font-size: 24px }
[text~="#f00"]{ color: #f00 }
[text~="bold"]{ font-weight: bold }
```

<!-- Example: `text="24 red bold"` sets the font-size to `24px`, color to `red`, and font-weight to `bold`. -->

#### Grid Attribute

The `grid` attribute is used for CSS grid styling. It allows you to define multiple grid properties using a single attribute.
```html
<div grid="12 cols-3">...</div>
```
```css
output
[grid~="12"]{ gap: 12px }
[grid~="cols-3"]{ grid-template-columns: repeat(3, 1fr) }
```
   
You can change attributes name in config: 

```js
blick.attr.flex = "data-flex"
blick.attr.text = "txt"
blick.attr.grid = "grd"
// or
blick.config({
  attr: {
    flex: "data-flex",
    text: "txt",
    grid: "grd"
  }
})
```
```html
<div txt="14 #f0f line"></div>
```

<!-- Example: `grid="12 cols-3"` sets the gap to `12px`, and the grid-template-columns to `repeat(3, 1fr)`. -->


### Pseudo-classes

BlickCSS supports any pseudo-classes (`hover`, `active`, `focus`, ...). To use a pseudo-class, prefix the class name with the pseudo-class followed by a colon.

Example: `class="hover:bg-blue"` sets the background to `blue` when hovering over the element.

You can also use shorthand notations for pseudo-classes. For example, `h:bg-blue` has the same effect as `hover:bg-blue`.

### Media Queries

BlickCSS provides support for media queries based on default screen sizes.   
The default screen sizes are:
- `sm`: `@media (min-width: 576px) { ... }`
- `md`: `@media (min-width: 768px) { ... }`
- `lg`: `@media (min-width: 992px) { ... }`
- `xl`: `@media (min-width: 1200px) { ... }`

To apply styles based on a specific media query, prefix the class name with the desired media query.

Example: `md:bg-orange` sets the background color to `orange` for screens larger than or equal to `768px`.

### Values and Modifiers

BlickCSS allows you to customize values and modifiers for more flexibility in styling.

- Numbers: If a class name contains a number value (e.g., `m-20`), the default unit specified in the conversion object (`def: "px"` in this case) will be added to the value. However, if the number ends with a non-numeric character (e.g., `m-20%`), the default unit will not be added.
```js
class="r-123" // border-radius: 123px
class="r-5em" // border-radius: 5em
```
- CSS Variables: You can use the `$` symbol before a value to indicate that it should be treated as a CSS variable. For example, `c-$foo` sets the color to the CSS variable `--foo`.
```js
class="fs-$my-var" // font-size: var(--my-var) 
```
- Percentages: If the value contains a slash (`/`), it will be treated as a percentage. i.n. the JS expression `num1 / num2 * 100` is executed. For example, `w-1/2` sets the width to `50%`.
```js
class="h-1/4" // font-size: height: 25%
```
- Multiple Values: You can use the plus symbol (`+`) to combine multiple values. For example, `m-10+20` sets the margin to `10px` on the top and bottom and `20px` on the left and right.
```js
class="p-0+30" // padding: 0px 30px
```
- Combination with Other Types: You can combine values with other types of values using the plus symbol (`+`). For example, `b-2+solid+$baz` sets the border width to `2px`, the border style to `solid`, and the border color to the CSS variable `--baz`.
```js
class="outline-3+dashed+$bar" // outline: 3px dashed var(--bar)
```

### Configuration

You can customize the conversion object by using the `blick.config()` function. This function allows you to add, change, or delete properties in the `blick` object.

Example:

```js
blick.config({
  class:{
    // Add 
    color:{ prop:"color:$" }
    // Modify
    p: { prop: "padding:$", def: "em" },
    // Or remove a property
    m: null
  },
  screen:{
    sm:"480px"
  },
  states:{
    sel:":selection"
  }
});
```

or can be changed directly via the object chain

```js
blick.class.color = { prop: "color:$" }
blick.class.p.def = "em"
blick.class.m = null
blick.screen.sm = "480px"
blick.states.sel =":selection"
```

In this example, we added the `color` property, modified `p` property and removed the `m` property from the conversion object, also changed some other settings.

## BlickCss vs Tailwind

```http
tailwind: m-[25px]

blickcss: m-25



tailwind: text-[2em]

blickcss: fs-2em



tailwind: text-[#629fea]

blickcss: c-#629fea



tailwind: py-[30px] px-[10px]

blickcss: p-30+10



tailwind: bg-[var(--foo)]

blickcss: bg-$foo



tailwind: w-[calc(23_/_85_*_100%)]

blickcss: w-23/85



tailwind: bg-gradient-to-r from-[#54bd59] to-[#629fea]

blickcss: grad-0+#54bd59+#629fea


---: using attributes :---

tailwind: class="text-[23px] text-[#629fea] font-bold text-center"

blickcss: text="23 #f2d5b6 bold center"



tailwind: class="flex flex-col md:flex-row justify-center align-center gap-[15px]"

blickcss: flex="col md:row jc-c ai-c 15"
```

### Update 1.2.8
1. Now you can flexibly configure states for media queries using an **array** or a **raw string** that will be inserted after `@media`.
```js
// use an array for the range of min, max values
blick.config({
  screen: {
    sm: ['screen', 500], // (screen) and (max-width: 500px)
    md: [500, 1000], // (min-width: 500px) and (max-width: 1000px)
    lg: 1000 // (min-width: 1000px)
  }
})
```
The `screen` object defines states that are written to the class before `:`, for example `md:bg-red`. The syntax is very versatile, that is, you can write the value in any way convenient for you, everything will work properly. 
- `md: [min, max]` - will be converted to the string `(min-width: {min}px) and (max-width: {min}px)`.
- `md: [min]` - one value in the array will mean `(min-width: {min}px)`
- `md: ['20rem', 640]` - the array can have a value as a string to set the value with the unit you need `(min-width: 20rem) and (max-width: 640px)`
- `md: 460`, `md: '20rem'` - the value can be written directly, the same logic will be used as in the array `(min-width: 460px)`, `(min-width: 20rem)`
- `md: '(min-width: 20rem) and (max-width: 640px)'` - you can also write a raw string that will be inserted directly into the  media queries.
The keys of the `screen` object can be custom, you can write any prefix of your own that will define your own  media queries parameters.
---
2. Added the ability to easily set transparency for a color using `/`.
```js
class="bg-red/50"   // background: #ff000080
class="c-$green/34" // color: #22c55e57
class="bc-#00f/86"  // border-color: #0000ffdb
```
You can use any color format, color name, hex, rgb, and even using the `$var-name` variable (more on this below). The script will convert your color to a normal `hex`, provided you use a `/` between the color and transparency. The transparency value is arbitrary. As shown above, the variable `$green` was used, but this will not work with your variable, for example `bg-$foo/25`, it will turn into `background: var(--foo); opacity: 0.25`. For this to work with your color in a variable, you need to write it in a configuration object (the best option is to write it in hex format).
```js
blick.config({
  colors: {
    teal: {
      def:"#078989" // default color ( $teal )
      1: "#16bfbf"  // using numbers you can write shades ( $teal-1 )
    },
    // other colors
  }
})
```
You can then use this color in your markup, for example `bg-$teal/25` -> `background:#07898940`.   
[Here you can read more about colors](https://developer.mozilla.org/docs/Web/CSS/color_value).

3. Added a new class to the standard theme:
  - `sq-*` -> `width: *; height: *` - creates a square, * this is your value, the default unit is `px`

4. Performance has been improved

***

## Conclusion

BlickCSS is a beginner-friendly JavaScript library that simplifies applying CSS styles using class names. With its intuitive syntax and support for special attributes, pseudo-classes, and media queries, BlickCSS empowers developers to easily create stylish and responsive web designs.

For more information and advanced usage, please refer to the [BlickCSS Site](https://blick.netlify.app/). 

## License

BlickCSS is released under the [MIT License](https://github.com/ghtx280/blickcss/blob/main/LICENSE.md).

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us at [telegram](https://t.me/eeqq25) or [e-mail](mailto:antkor.yt.s@gmail.com).

Happy styling with BlickCSS!



