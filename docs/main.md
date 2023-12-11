## Documentation

#### BlickCss is a powerful library that allows you to style html elements by writing styles in classes and special attributes

```html
<div 
    class="h:bg-red dark:c-white flex-center"
    flex="20 md:col center wrap"
    text="24 white bold m-lg:center"
>
```
The script analyzes these properties [parses](./parser.md) them and creates styles.


```js
class="flex upper bold"
```

These words are called Properties (**prop**), it can be single or have a value, they are written with `-`


```js
class="flex-center fs-24 c-#fff m-10+20"
```
Also `prop` can have a specific [state](./states.md), it can be 1 or more, they are written with `:` and are located before `prop`

```js
class="h:bg-red md:c:h-500"
```

Here `h` is an abbreviation for `hover`, `c` is `checked`, `md` is [media query](./media-query.md), that is, the property for which this state is written will be displayed at the size of `md`, it is `768px` and more

```js
class="flex! bg-blue/50!"
```

Behind you can add `!` to make it `!important`.

```
props
props-values
states:props
states:props-values
```

If you put it all together, classes and attributes are written according to this template.

### Read more:
**[Properties](./props.md)**  
**[Values](./values.md)**  
**[States](./states.md) & [Media queries](./media-query.md)**  

**For advanced**

**[Configuration](./config.md)**  
**[Parser](./parser.md)**  
**[Functions](./functions.md)**  
**[Structure of classes and attributes](./structure.md)**