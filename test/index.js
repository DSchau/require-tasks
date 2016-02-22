import { expect } from 'chai';

import requireTasks from '../src/';

describe('require-tasks', () => {
  const args = ['red', 'green', 'blue'];
  const tasks = requireTasks([
    './test/fixtures/tests',
    './test/fixtures/tests-two'
  ], { camelcase: true })(...args);

  describe('object behavior', () => {
    it('merges objects withs same name', () => {
      expect(tasks.obj).to.be.defined;
      expect(tasks.obj).to.have.keys([
        'method',
        'otherMethod'
      ]);
    });
  });

  describe('function behavior', () => {
    it('unwraps function with supplied arguments', () => {
      expect(tasks.args).to.be.defined;
      expect(tasks.args()).to.deep.equal(args);
    });

    it('unwraps default function with supplied arguments (es6)', () => {
      expect(tasks.es6).to.be.defined;
      expect(tasks.es6.default()).to.equal('es6');
    });

    it('extends function that returns object', () => {
      expect(tasks.extend).to.be.defined;
      expect(tasks.extend).to.have.keys([
        'src',
        'assets'
      ]);
    });

    it('works with commonJs', () => {
      const task = tasks['common-js'];
      expect(tasks.commonJs).to.be.defined;
      expect(tasks.commonJs()).to.equal('commonJs');
    });
  });
});
