
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

### Conversion Object

BlickCSS uses a conversion object called `blick`, which contains CSS properties and their corresponding class names. You can modify this object to add, change, or remove properties.

Here's an example of the conversion object:

```javascript
{
  m: { prop: "margin:$", def: "px" },
  p: { prop: "padding:$", def: "px" },
  // ... other properties ...
}
```

In this example, the `m` property represents margin, and the `p` property represents padding. Each property has a `prop` key that defines the CSS property using placeholders represented by `$`. The `def` key provides the default unit (`px` in this case) to be added if a number value is used.

---
#### You can find a list of all available classes [here](https://blick.netlify.app/docs/classes/){:target="_blank"} 
---

### Special Attributes

BlickCSS supports special attributes to enhance styling and semantics of your code. Currently, it supports `flex`, `text`, and `grid`.

#### Flex Attribute

The `flex` attribute is used for flexbox styling. It accepts two values: a dynamic value and a constant value. The dynamic value can be any number, representing the gap, while the constant value represents the flex-direction.
flex="15 col" would translate to gap: 15px; flex-direction: column. Here, `col` is a predefined value, while `15` represents a dynamic value (any digit represents `gap`).
```css
html:
  <div flex="15 col">...</div>
css:
  [flex~="15"]{ gap: 15px }
  [flex~="col"]{ flex-direction: column }
```

<!-- Example: `flex="15 col"` sets the gap to `15px` and the flex-direction to `column`. -->

#### Text Attribute

The `text` attribute is used for font styling. It allows you to specify multiple font properties within a single attribute. Each property is separated by a space. The values 24 and red are not predefined properties; if the algorithm does not find a matching property, it checks if the first character is a digit (indicating a font size) or a non-digit character (indicating a color). This applies only within the text="" attribute.
```css
html:
  <div text="24 #f00 bold">...</div>
css:
  [text~="24"]{ font-size: 24px }
  [text~="#f00"]{ color: #f00 }
  [text~="bold"]{ font-weight: bold }
```

<!-- Example: `text="24 red bold"` sets the font-size to `24px`, color to `red`, and font-weight to `bold`. -->

#### Grid Attribute

The `grid` attribute is used for CSS grid styling. It allows you to define multiple grid properties using a single attribute.
```css
html:
  <div grid="12 cols-3">...</div>
css:
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
```css
r-123 -> border-radius: 123px
```
- CSS Variables: You can use the `$` symbol before a value to indicate that it should be treated as a CSS variable. For example, `c-$foo` sets the color to the CSS variable `--foo`.
```css
fs-$some-var -> font-size: var(--some-var)
```
- Percentages: If the value contains a slash (`/`), it will be treated as a percentage. i.n. the JS expression `num1 / num2 * 100` is executed. For example, `w-1/2` sets the width to `50%`.
```css
h-1/4 -> height: 25%
```
- Multiple Values: You can use the plus symbol (`+`) to combine multiple values. For example, `m-10+20` sets the margin to `10px` on the top and bottom and `20px` on the left and right.
```css
p-0+30 -> padding: 0px 30px
```
- Combination with Other Types: You can combine values with other types of values using the plus symbol (`+`). For example, `b-2+solid+$baz` sets the border width to `2px`, the border style to `solid`, and the border color to the CSS variable `--baz`.
```css
outline-3+dashed+$bar -> outline: 3px dashed var(--bar)
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



