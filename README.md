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
now alias set deployed-url.now.sh dalecampeon.now.sh
```

### Removing testing deploy
```sh
now rm dalecampeon.now.sh
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

There are much color manipulation you can do. See [color](https://github.com/Qix-/color).

```js
import Color from 'color'

Color('#D44639').darken(.2)
Color('#D44639').fade(.2)
```

### Placeholders

If anytime you need an image placeholder, feel free to use the [https://placehold.jp/](https://placehold.jp/) website. You can call a images like: [https://placehold.jp/390x220.png](https://placehold.jp/390x220.png). **Important**: always write `//placehold.jp/` or make sure it'll work with and without `https`. Production server will always work in `https`. If needed, you can get `HTTPS_PROTOCOL` from [constants/constants.js](constants/constants.js), like so:

```js
import { HTTP_PROTOCOL } from 'constants/constants'

const myUrl = `${HTTP_PROTOCOL}://placehold.jp/390x220.png`
```

### SVGs

For svgs where you need to interact changin color etc., use the package [react-svg](https://github.com/tanem/react-svg)

```js
import ReactSVG from 'react-svg'

<ReactSVG src="/static/icons/facebook.svg" />
```
