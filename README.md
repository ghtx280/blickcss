#### BlickCSS is a small library (~20kb) for quick styling by converting class names into CSS properties. It provides a simple and intuitive way to apply styles using familiar class names. An alternative to Tailwind. for those who do not want to use prepared templates, but write their own property values.
  
#### Visit [this site](https://blick.netlify.app) for more info.

#### Try it out [playground](https://playcode.io/1243248)

---

## Features

- Converts class names to CSS properties based on a predefined object.
- Supports special attributes like flex, text, and grid for enhanced styling.
- Handles pseudo-classes and media queries.
- Provides dynamic values, constants, CSS variables, and percentages for flexible styling.
- Easy configuration options to customize the conversion object.

## Getting Started

### Installation

To use BlickCSS in your project, you have two options:

1. CDN: Add the following script tag in the head section of your HTML file.

```html
<script src="https://unpkg.com/blickcss"></script>
```

2. Manual: Copy the code from the `dist` folder and include it in your project.

### Usage

To apply styles with BlickCSS, simply add class names to your HTML elements. Each class name corresponds to a CSS property.

```html
<div class="m-20 bg-red c-white">Hello, BlickCSS!</div>
```
CSS output:
```css
.m-20 { margin: 20px }
.bg-red { background: red }
.c-white { color: white }
```
In the example above, the class name `m-20` sets the margin to `20px`, `bg-red` sets the background to `red`, and `c-white` sets the text color to `white`.

---
#### You can find a list of all available classes [here](https://blick.netlify.app/docs/classes/)
---

### Conversion Object

BlickCSS uses a conversion object called `blick`, which contains CSS properties and their corresponding class names. You can modify this object to add, change, or remove properties.

Here's an example of the conversion object:

```javascript
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
  }
  // ... other properties ...
}
```

In this object, the key means the property `m` is `margin`, `p` is `padding`. `prop`, defines a CSS property using placeholders represented by `$`. Instead of `$`, your value will be inserted, if the value is only a number, a `def` will be added at the end which gives the default unit (`px` in this case) (`m-5 -> margin:5px`). `vals` are prepared values that will be substituted instead of `$` (`w-full -> width:100%`)

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
```html
<div class="foo-bar-qux-10"></div>
```

Based on this capability, you can create complex class structures.

```js
{
   over: {
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
     // you can also write it in a key if you only use `prop`
     text: ({ val }) => isNaN(val) ? `color:${val}` : `font-size:${val}px`,
     fs: {
       rand: {
         one: () => `font-size:${Math.floor(Math.random() * 64)}px`
       }
     }
}
```

In the first example, the `text` property is assigned a function as its `prop`. The function checks if the value is a number. If it's a number, it generates a CSS property for the font size; otherwise it generates a CSS property for the color.
```html
<div class="text-24">Element with font size: 24px</div>
<div class="text-red">Element with color: red</div>
```
In the second example, the `fs` property includes a nested `rand` object that contains the `one` property as a function ("one" means no value is required). The function generates a random font size value between 0 and 64 pixels.
```html
<div class="fs-rand">Element with random font size</div>
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

<!-- Example: `grid="12 cols-3"` sets the gap to `12px`, and the grid-template-columns to `repeat(3, 1fr)`. -->

### Pseudo-classes

BlickCSS supports pseudo-classes like `hover`, `active`, and `focus`. To use a pseudo-class, prefix the class name with the pseudo-class followed by a colon.

Example: `class="hover:bg-blue"` sets the background to `blue` when hovering over the element.

You can also use shorthand notations for pseudo-classes. For example, `h:bg-blue` has the same effect as `hover:bg-blue`.

### Media Queries

BlickCSS provides support for media queries based on default screen sizes. The default screen sizes are `sm` (576px), `md` (768px), `lg` (992px), and `xl` (1200px). To apply styles based on a specific media query, prefix the class name with the desired media query.

Example: `md:bg-orange` sets the background color to `orange` for screens larger than or equal to `768px`.

### Values and Modifiers

BlickCSS allows you to customize values and modifiers for more flexibility in styling.

- Numbers: If a class name contains a number value (e.g., `m-20`), the default unit specified in the conversion object (`px` in this case) will be added to the value. However, if the number ends with a non-numeric character (e.g., `m-20%`), the default unit will not be added.
```http
input:  r-123
output: border-radius: 123px
```
- CSS Variables: You can use the `$` symbol before a value to indicate that it should be treated as a CSS variable. For example, `c-$foo` sets the color to the CSS variable `--foo`.
```http
input:  fs-$var
output: font-size: var(--var) 
```
- Percentages: If the value contains a slash (`/`), it will be treated as a percentage. i.n. the JS expression `num1 / num2 * 100` is executed. For example, `w-1/2` sets the width to `50%`.
```http
input:  h-1/4
output: height: 25%
```
- Multiple Values: You can use the plus symbol (`+`) to combine multiple values. For example, `m-10+20` sets the margin to `10px` on the top and bottom and `20px` on the left and right.
```http
input:  p-0+30
output: padding: 0px 30px
```
- Combination with Other Types: You can combine values with other types of values using the plus symbol (`+`). For example, `b-2+solid+$baz` sets the border width to `2px`, the border style to `solid`, and the border color to the CSS variable `--baz`.
```http
input:  outline-3+dashed+$bar
output: outline: 3px dashed var(--bar)
```

### Configuration

You can customize the conversion object by using the `blick.config()` function. This function allows you to add, change, or delete properties in the `blick` object.

Example:

```javascript
blick.config({
  class:{
    // Add or modify properties
    p: { prop: "padding:$", def: "em" },
    // Remove a property
    m: null
  }
});
```

In this example, we added the `p` property and removed the `m` property from the conversion object.

## Conclusion

BlickCSS is a beginner-friendly JavaScript library that simplifies applying CSS styles using class names. With its intuitive syntax and support for special attributes, pseudo-classes, and media queries, BlickCSS empowers developers to easily create stylish and responsive web designs.

For more information and advanced usage, please refer to the [BlickCSS Site](https://blick.netlify.app/). 

## License

BlickCSS is released under the [MIT License](https://github.com/ghtx280/blickcss/blob/main/LICENSE.md).

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us at [telegram](https://t.me/eeqq25) or [e-mail](mailto:antkor.yt.s@gmail.com).

Happy styling with BlickCSS!



