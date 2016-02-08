<big><h1 align="center">catcha</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/catcha">
    <img src="https://img.shields.io/npm/v/catcha.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/raabbajam/catcha">
    <img src="https://img.shields.io/coveralls/raabbajam/catcha.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/raabbajam/catcha">
    <img src="https://img.shields.io/travis/raabbajam/catcha.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/catcha">
    <img src="http://img.shields.io/npm/dm/catcha.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/raabbajam/catcha.svg">
    <img src="https://david-dm.org/raabbajam/catcha.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/raabbajam/catcha/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/catcha.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>
Quick and easy captcha resolver.
</big></p>


## Install

```sh
npm i --save catcha
```

## Usage

```js
import catcha from "catcha";

const settings = {
  transforms: [
    {key: 'resize', value: '240x100'},
    {key: 'colorspace', value: 'gray'},
    {key: 'negate'},
    {key: 'threshold', value: '12%'},
    {key: 'blur', value: '10 '},
    {key: 'threshold', value: '43%'},
    {key: 'negate'},
  ],
  digitOnly: true,
  deleteTemporaryImage: false,
};
const kitten = catcha(settings);
kitten('/tmp/path/to/image/.{tiff,png,jpg}')
  .then((text) => {
    console.log(text); // 314400
  });
```

## Settings

transforms: array of key and value for transforms. Will be passed verbatim to ImageMagick parameter.
deleteTemporaryImage: default to true. Delete converted image via transforms settings.
deleteSourceImage: default to false. Delete source image.
resolveBeforeCleaning: default to true. Resolve immediately after OCR ran, without waiting cleaning finished.

## TODO

- Accept more image processing libraries. OpenCV, etc.
- Added skewed image detection and auto-deskewing.
- Added training method where user input images and expected output then kitten will find the best tranforms settings.

## License

MIT © [Raabb Ajam](http://github.com/raabbajam)

[npm-url]: https://npmjs.org/package/catcha
[npm-image]: https://img.shields.io/npm/v/catcha.svg?style=flat-square

[travis-url]: https://travis-ci.org/raabbajam/catcha
[travis-image]: https://img.shields.io/travis/raabbajam/catcha.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/raabbajam/catcha
[coveralls-image]: https://img.shields.io/coveralls/raabbajam/catcha.svg?style=flat-square

[depstat-url]: https://david-dm.org/raabbajam/catcha
[depstat-image]: https://david-dm.org/raabbajam/catcha.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/catcha.svg?style=flat-square
