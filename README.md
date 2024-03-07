### Small library for quickly creating styles via classes and special attributes. An alternative to Tailwind.

## Getting Started

### Installation

Just add the script to `<head>`, that's all you need
```html
<script src="https://unpkg.com/blickcss"></script>
```

OR

Just 2 commands to start using
```shell
npm i blickcss
```
```shell
npx blick
```

***


### [WEBSITE](https://blick.netlify.app) - Visit the website for more information



### [DOCS](https://blick.netlify.app/docs) - Read the documentation to get started



### [PLAYGROUND](https://blick.netlify.app/play) - Try it right now

---

## Features

- Converts class names to CSS properties based on a predefined object.
- Supports special attributes like flex, text, and grid for enhanced styling.
- Handles pseudo-classes and media queries.
- Provides dynamic values, constants, CSS variables, and percentages for flexible styling.
- Easy configuration options to customize the conversion object.
---

## BlickCss vs Tailwind

```html
tailwind: <div class="m-[25px]">

blickcss: <div class="m-25">



tailwind: <div class="text-[2em]">

blickcss: <div class="fs-2em or text-2em">



tailwind: <div class="text-[#ff0000]">

blickcss: <div class="c-#ff0000 or text-#ff0000">



tailwind: <div class="py-[10px] px-[30px]">

blickcss: <div class="p-10+30">



tailwind: <div class="bg-[--foo]">

blickcss: <div class="bg-$foo">



tailwind: <div class="w-[calc(23_/_85_*_100%)]">

blickcss: <div class="w-23/85">



WITH USING ATTRIBUTES:

tailwind: <div class="text-[23px] text-[#ff0000] font-bold text-center">

blickcss: <div text="23 #ff0000 bold center">



tailwind: <div class="flex gap-[15px] flex-col md:flex-row justify-center align-center">

blickcss: <div flex="15 col md:row center">
```

## Conclusion

BlickCSS is a beginner-friendly JavaScript library that simplifies applying CSS styles using class names. With its intuitive syntax and support for special attributes, pseudo-classes, and media queries, BlickCSS empowers developers to easily create stylish and responsive web designs.

For more information and advanced usage, please refer to the [BlickCSS Site](https://blick.netlify.app/). 

## License

BlickCSS is released under the [MIT License](https://github.com/ghtx280/blickcss/blob/main/LICENSE.md).

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us at [telegram](https://t.me/eeqq25) or [e-mail](mailto:ghtx280@gmail.com).

Happy styling with BlickCSS!


