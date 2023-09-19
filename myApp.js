require('dotenv').config();
//moongoatlas database id:
// username : maxmonthonkachana2 pass :a3bM4ySgPKiUnA5H ip: 0.0.0.0/0
let url = 'mongodb+srv://maxmonthonkachana2:a3bM4ySgPKiUnA5H@freecodecamp.2syq8co.mongodb.net/'
/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
/** 2) Create a 'Person' Model */
let peopleSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})
/** 3) Create and Save a Person */
let Person = mongoose.model('Person', peopleSchema)
var createAndSavePerson = function (done) {
  var janeFonda = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  janeFonda.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
}

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
/** 5) Use `Model.find()` */
var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/** 6) Use `Model.findOne()` */
var findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 7) Use `Model.findById()` */
var findPersonById = function (personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 8) Use `Model.findedit()` to save and condition */
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
/** 9) Use `Model.update()` to save and new option to return */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};
/** 10) problem this option to section delete */
var removeById = function (personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if (err) return console.log(err);
      done(null, removedDoc);
    }
  );
};
/** 11) problem this option need a condition callback with error to respone */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  })
};
/** 12) modify qurey search  */
var queryChain = function (done) {
  var foodToSearch = "burrito"
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 'asc' }).limit(2).select
    ('-age').exec(function (error, searchResult) {
      if (error) return console.log(error)
      done(null, searchResult)
    })

}
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;