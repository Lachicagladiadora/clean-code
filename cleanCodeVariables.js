// CLEAN CODE

//VARIABLES
// 1. Use meaningful and pronounceable names
const yyyymmdd = moment().format("yyyy-mm-dd"); // It should not be done
const currentDate = moment().format("yyyy-mm-dd"); // As you should do

// 2. Use same vocabulary for the same type of variables
const getUser = "Pepito";
const getData = { name: "Pepito", age: "34" };

// 3. Use searchable names
// We read more code than we write. It is important that the code is readable and searchable.

setTimeout(fun, 84600000); // It should not be done
// What does 84600000 mean?

const millisecondsPerDay = 84600000; // As you should do
setTimeout(fun, millisecondsPerDay);

// 4. Use explanatory variables
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);

// 5. Avoid Mental Mapping ->  clarify and give a representative name to what we are doing
const locations = ["Argentina", "Brazil", "Chile", "Uruguay"];
// It should not be done
locations.forEach((u) => {
  f1();
  f2();
  f3(u);
});
// As you should do
locations.forEach((location) => {
  f1();
  f2();
  f3(location);
});

// 6. Do not include unnecessary context in your code ->  If your class/object says something; don't repeat it inside variables
const car = { brandCar: "Honda", modelCar: "Accord" }; // It should not be done
const auto = { brand: "Honda", model: "Accord" }; // As you should do

// 7. Use predefined parameters instead of conditionals -> Predefined arguments are more organized than conditionals
// It should not be done
createStore = (nameUsed) => {
  const nameUsed = nameUsed || "undefined";
  // stuff
};
// As you should do
createStore = (nameUsed = "undefined") => {
  // stuff
};

// It should not be done

// As you should do
