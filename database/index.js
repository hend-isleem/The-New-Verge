const mongoose = require("mongoose");
const faker = require("faker");
const config = require("../config.js");
// const uri = 'mongodb+srv://hend:sleepyash@cluster0-ozydj.mongodb.net/TheVerge?retryWrites=true&w=majority';

const uri = process.env.mongoURI || config.mongoURI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "TheVerge"
  })
  .catch(error => console.log("this is error!", error));

const { connection } = mongoose;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

// const itemSchema = mongoose.Schema({
//   quantity: Number,
//   description: String,
// });
// const Item = mongoose.model('Item', itemSchema);

// var test = new Item({
//   quantity: 1,
//   description: "test1",
// })
// test.save();

// the Auther schema
const autherSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  password: { type: String }
});

// the article schema
const articleSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  authorId: { type: Number },
  title: { type: String },
  summary: { type: String },
  imgUrl: { type: String },
  body: { type: String },
  topic: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// creating the models
const Auther = mongoose.model("Auther", autherSchema);
const Article = mongoose.model("Article", articleSchema);

// selectAll to get data from db depeding on the model i send.
const selectAll = function(model, callback) {
  model.find({}, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// saveAuther to save Auther from the dummyData file..
// const saveAuther = function () {
//   for (let i = 4; i < 104; i += 1) {
//     const one = new Auther({
//       id: i,
//       name: faker.name.findName(),
//       password: faker.internet.password(),
//     });
//     one.save();
//   }
//   console.log('ALL WAS ADDED');
// };
// saveAuther();

// saveArt to save articles from the dummyData file..
// const saveArt = function() {
//     for (let i = 1; i < 101; i++) {
//         const art = new Article({
//             id: i,
//             autherId: i+3,
//             title: faker.company.companyName(),
//             sammary: faker.hacker.phrase(),
//             imgUrl: faker.image.business(),
//             body: faker.lorem.paragraphs((paragraph_count = 14)),
//             topic: faker.hacker.noun(),
//             date: faker.date.past()
//         });
//         art.save();
//     }
//     console.log("ALL WAS ADDED");
// };
// saveArt();

// module.exports.saveAuther = saveAuther;
// module.exports.saveArt = saveArt;
module.exports.selectAll = selectAll;
module.exports.Auther = Auther;
module.exports.Article = Article;
