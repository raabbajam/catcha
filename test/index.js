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
      t.plan(1);
      const expectedTest = testData.length;
      let finishedTest = 0;
      let success = false;
      testData.forEach((image) => {
        kitten(image.path)
          .then((text) => {
            if (text === image.text) {
              success = true;
            }
            if (expectedTest === ++finishedTest) {
              t.equal(success, true);
              t.end();
            }
          });
      });
    });
});

test.only('catcha test -- easy2 module', (t) => {
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
    deleteTemporaryImage: false,
  };
  const kitten = catcha(settings);
  getTestData('easy2')
    .then((testData) => {
      t.plan(1);
      const expectedTest = testData.length;
      let finishedTest = 0;
      let success = true;
      testData.forEach((image) => {
        kitten(image.path)
          .then((text) => {
            console.log(text, '=== ', image.text);
            if (text !== image.text) {
              success = false;
            }
            if (expectedTest === ++finishedTest) {
              t.equal(success, true);
              t.end();
            }
          });
      });
    });
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
      t.plan(1);
      const expectedTest = testData.length;
      let finishedTest = 0;
      let success = false;
      testData.forEach((image) => {
        kitten(image.path)
          .then((text) => {
            if (text === image.text) {
              success = true;
            }
            if (expectedTest === ++finishedTest) {
              t.equal(success, true);
              t.end();
            }
          });
      });
    });
});

test('catcha test -- hard module', (t) => {
  const settings = {
    transforms: [
      {key: 'resize', value: '240x100'},
      {key: 'level', value: '0,0,10%'},
      {key: 'threshold', value: '5%'},
      {key: 'blur', value: '20'},
    ],
    deleteTemporaryImage: false,
    transformFunction: (text) => text.toLowerCase().replace(/[^\d\w]/g, ''),
  };
  const kitten = catcha(settings);
  getTestData('hard')
    .then((testData) => {
      t.plan(1);
      const expectedTest = testData.length;
      let finishedTest = 0;
      let success = false;
      testData.forEach((image) => {
        kitten(image.path)
          .then((text) => {
            if (text === image.text) {
              success = true;
            }
            console.log(`"${text}": "${image.text}"`);
            if (expectedTest === ++finishedTest) {
              t.equal(success, true);
              t.end();
            }
          });
      });
    });
});
