const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/bringEatz";

module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---" + err);
    else {
      console.log("connected to mongo");

      const foodCollection = await mongoose.connection.db.collection("foods");
      console.log("foodCollection: ", foodCollection);

      foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection(
          "foodcategories"
        );
        console.log("categoryCollection: ", categoryCollection);

        categoryCollection.find({}).toArray(async function (err, Catdata) {
          console.log("Catdata: ", Catdata);
          callback(err, data, Catdata);
        });
      });
    }
  });
};
