const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// reference to ES6 promise implementation

// bofore called only one time
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
  .once('open', () => {done();})
  .on('error', (error) =>{
    console.warn('Error', error);
  });
});

// beofreEach called before each test
/*beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test
    done();
    // signal to mocha to run next test
  });
});
*/

// beofreEach called before each test
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test
    const {users,comments,blogPosts} = mongoose.connection.collections;
    users.drop(()=>{
      comments.drop(()=>{
        blogPosts.drop(()=>{
          done();
        });
      });
    });
    // signal to mocha to run next test
  });
});
