const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

  it('requires a user name', (done) => {
      const user = new User({name: undefined});
      // user.validate() // async
      const validationResult = user.validateSync();
      //console.log(validationResult);
      const { message } = validationResult.errors.name;

      assert(message === 'Name is required.');
      done();
  });

  it('requires a user name longer than 2', (done) => {
      const user = new User({name: 'aa'});
      // user.validate() // async
      const validationResult = user.validateSync();
      //console.log(validationResult);
      const { message } = validationResult.errors.name;

      assert(message === 'Name must be longer than 2 characters.');
      done();
  });

  it('disallows invalid records from being saved', (done) => {
      const user = new User({name:'al'});
      user.save()
        .then()
        .catch((validationResult) => {
          const {message} = validationResult.errors.name;
          assert(message === 'Name must be longer than 2 characters.');
          done();
        });
  });
});
