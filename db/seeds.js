const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-ldn-project-1';
mongoose.connect(dbURI);

const Set = require('../models/set');
const User = require('../models/user');
Set.collection.drop();
User.collection.drop(); //wipes clean db and loads the below info

User
.create([{
  username: 'mikeydee',
  email: 'mike@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
}, {
  username: 'AlexB',
  email: 'alex@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
}])

.then((users) => {
  console.log(`${users.length} users created`);

  return Set
  .create([{
    name: 'Ill Beats',
    tracks: 'Madonna- Die Another Day, DJ Shadow- Organ Donor, Ice Cube- It Was A Good Day'
  }, {
    name: 'Classics',
    tracks: 'Elvis Presley- A Little Less Conversation, Destinys Child- independant Woman, TLC- No Scrubs, Hanson- Mmmbop'
  }]);
})
  .then((sets) => {
    console.log(`${sets.length} sets created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
