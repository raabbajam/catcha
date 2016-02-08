import test from 'tape';
import catcha from '../src';
import { getTestData } from './utils';

test('catcha test -- easy module', (t) => {
  const settings = {};
  const kitten = catcha(settings);
  getTestData('easy')
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

test('catcha test -- intermediate module', (t) => {
  const settings = {};
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
