const mongoose = require('mongoose');

main().then(() => console.log('Connection Successful'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const postSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);


const addData = async () => {
  // let user1 = new User({
  //   name: 'Avneesh',
  //   email: 'avneesh@gmail.com',
  // })
  let user = await User.findOne({name : 'Avneesh'});
  let post2 = new Post({
    content: 'Bye bye',
    likes: 77,
  })
  post2.user = user;

  let b = await post2.save();
  console.log(b);
}
// addData()

const find = async ()=>{
    let res = await Post.find({}).populate('user');

    console.log(res[0]);
}

find()