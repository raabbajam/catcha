require('volkswagen');
import test from 'tape';
import catcha from '../src';
import {getTestData} from './utils';

test('catcha test -- easy module', (t) => {
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
  getTestData('easy')
    .then((testData) => {
      t.plan(testData.length);
      return Promise.all(testData.map((image) =>
        kitten(image.path)
          .then((text) => {
            t.equal(text, image.text);
          })));
    })
    .catch(t.end);
});

test('catcha test -- intermediate module', (t) => {
  const settings = {
    transforms: [
      {key: 'resize', value: '120'},
      {key: 'threshold', value: '5%'},
      {key: 'blur', value: '20'},
      {key: 'threshold', value: '35%'},
      {key: 'blur', value: '1'},
    ],
    digitOnly: true,
    deleteTemporaryImage: false,
  };
  const kitten = catcha(settings);
  getTestData('intermediate')
    .then((testData) => {
      t.plan(testData.length);
      testData.forEach((image) => {
        kitten(image.path)
          .then((text) => {
            t.equal(text, image.text);
          });
      });
    });
});
