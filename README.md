### Small library for quickly creating styles via classes and special attributes. An alternative to Tailwind.

## Getting Started

### Installation

```html
<script src="https://unpkg.com/blickcss@2.0"></script>
```

OR

```shell
npm i blickcss
```
```shell
npx blickcss
```
***

## Dosc

**!!! Important** Read the [documentation](./docs/main.md) before get started with BlickCss.


## PLAYGROUND & other

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

## BlickCss vs Tailwind

```html
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

## Conclusion

BlickCSS is a beginner-friendly JavaScript library that simplifies applying CSS styles using class names. With its intuitive syntax and support for special attributes, pseudo-classes, and media queries, BlickCSS empowers developers to easily create stylish and responsive web designs.

For more information and advanced usage, please refer to the [BlickCSS Site](https://blick.netlify.app/). 

## License

BlickCSS is released under the [MIT License](https://github.com/ghtx280/blickcss/blob/main/LICENSE.md).

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us at [telegram](https://t.me/eeqq25) or [e-mail](mailto:antkor.yt.s@gmail.com).

Happy styling with BlickCSS!


