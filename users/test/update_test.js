const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save().then(() => done());
    });

    function assertName(operation, done) {
        operation.then(() => User.find({})).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    }

    it('instance type set and save', (done) => {
        // in memory change not in DB
        joe.set('name', 'Alex');
        // call save after set
        assertName(joe.save(), done);
    });

    it('A model instacne can update', (done) => {
        assertName(joe.update({name: 'Alex'}), done);
    });

    it('A model class can update', (done) => {
      assertName(
        User.update({name : 'Joe'}, { name: 'Alex'}),
        done
      );
    });

    it('A model class can update one record', (done) => {
      assertName(
        User.findOneAndUpdate({name : 'Joe'}, { name: 'Alex'}),
        done
      );
    });

    it('A model class can find a record by ID update', (done) => {
      assertName(
        User.findByIdAndUpdate({_id : joe._id}, { name: 'Alex'}),
        done
      );
    });
    // use xit instead of it to skip a test caser
    xit('Increment a user postCount by 1', (done) => {
      User.update({name: 'Joe'}, { $inc: {likes : 1}})
       .then(() => User.findOne({name: 'Joe'}))
       .then((user) => {
         assert(user.likes === 1);
         done();
       });
    });
});
