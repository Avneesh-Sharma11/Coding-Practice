const mongoose = require('mongoose');

main().then(() => console.log('Connection Successful'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new mongoose.Schema({
  username: String,
  addresses: [
    {
      _id : false,
      location: String,
      city: String
    }
  ]
})

const user = mongoose.model('user', userSchema);

const adduser = async () => {
  let user1 = new user({
    username: 'Avneesh Sharma',
    addresses: [
      {
        location: '209217 Paigupur bithoor',
        city: 'Kanpur'
      }
    ]
  })
  user1.addresses.push({ location: '208001 Bithoor', city: 'Kanpur' })
  let result = await user1.save();
  console.log(result)
}
adduser()