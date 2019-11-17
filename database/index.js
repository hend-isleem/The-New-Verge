var mongoose = require('mongoose');
const config = require("../config.js");

const uri = process.env.mongoURI|| config.mongoURI;
// let uri = "mongodb+srv://theverge:theverge@cluster0-6cwqc.mongodb.net/TheVerge?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'TheVerge'
  })
  .catch((error) => console.log('this is error!', error));

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});



var itemSchema = mongoose.Schema({
  quantity: Number,
  description: String
});

var Item = mongoose.model('Item', itemSchema);

// var test = new Item({
//   quantity: 1,
//   description: "test1"  
// })
// test.save();


var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      console.log("there was an err")
      // callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;