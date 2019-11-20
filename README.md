# Dale
Built with [Next.js](https://nextjs.org/).

## Install
```sh
yarn
```

## Develop
```sh
yarn dev
```

## Docs
```sh
yarn docz:dev
```

## Testing deploy
```sh
now --name=dalecacique
# or
now --name=dalecampeon
```

## Info

### 1. Installing packages shows unmet peer dependencies for bootstrap

When running `yarn` or `yarn install`, it may show you these warnings:

```sh
warning " > bootstrap@4.3.1" has unmet peer dependency "jquery@1.9.1 - 3".
warning " > bootstrap@4.3.1" has unmet peer dependency "popper.js@^1.14.7".
warning " > slick-carousel@1.8.1" has unmet peer dependency "jquery@>=1.8.0".
```

Don't worry, we're just using `bootstrap` to import styles for `react-bootstrap`, so it's not necessary to install these unmet peer dependencies. The same applies to `slick-carousel` that's just here to import styles so `jquery` is not needed.

---

## Utilities

### classNames

Use the package [classnames](https://github.com/JedWatson/classnames#usage)

```js
import classNames from 'classnames'

classNames('foo', 'bar'); // => 'foo bar'
```

### Color
```js
import Color from 'color'

Color('#D44639').darken(.2)
```
