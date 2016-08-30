const test = require('tape');
const catcha = require('../src');
const {getTestData} = require('./utils');
test('catcha test -- easy module', (assert) => {
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
    deleteTemporaryImage: true,
  };
  const kitten = catcha(settings);
  getTestData('easy')
    .map((image) =>
      kitten(image.path)
        .then((text) => {
          assert.equal(text, image.text);
        })
    , {concurrency: 1})
    .then(() => assert.end())
    .catch(assert.end);
});

test('catcha test -- easy2 module', (assert) => {
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
    deleteTemporaryImage: true,
  };
  const kitten = catcha(settings);
  getTestData('easy2')
    .map((image) =>
      kitten(image.path)
        .then((text) => {
          assert.equal(text, image.text);
        })
    , {concurrency: 1})
    .then(() => assert.end())
    .catch(assert.end);
});

test('catcha test -- intermediate module', (assert) => {
  const settings = {
    transforms: [
      {key: 'resize', value: '120'},
      {key: 'threshold', value: '5%'},
      {key: 'blur', value: '20'},
      {key: 'threshold', value: '35%'},
      {key: 'blur', value: '1'},
    ],
    digitOnly: true,
    deleteTemporaryImage: true,
  };
  const kitten = catcha(settings);
  getTestData('intermediate')
    .map((image) =>
      kitten(image.path)
        .then((text) => {
          assert.equal(text, image.text);
        })
    , {concurrency: 1})
    .then(() => assert.end())
    .catch(assert.end);
});

test('catcha test -- hard module', (assert) => {
  const settings = {
    transforms: [
      {key: 'resize', value: '240x100'},
      {key: 'level', value: '0,0,10%'},
      {key: 'threshold', value: '5%'},
      {key: 'blur', value: '20'},
    ],
    deleteTemporaryImage: true,
    transformFunction: (text) => text.toLowerCase().replace(/[^\d\w]/g, ''),
  };
  const kitten = catcha(settings);
  getTestData('hard')
    .map((image) =>
      kitten(image.path)
        .then((text) => {
          assert.equal(text, image.text);
        })
    , {concurrency: 1})
    .then(() => assert.end())
    .catch(assert.end);
});
