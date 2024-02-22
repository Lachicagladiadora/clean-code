// FUNCTIONS

// 1. Two or fewer arguments -> simple tests,
// if you have more two arguments then your function is to do much,
// if you needing lot arguments,use an object

// Bad
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
createMenu("Foo", "Bar", "Baz", true);

// Good
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});

// 2. Isolate a function to one action
// Bad
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// Good
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}
function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}

// 3. Function names should say what they do
// Bad
function addToDate(date, month) {
  // ...
}
const firstDate = new Date();
// It's hard to tell from the function name what is added
addToDate(firstDate, 1);

// Good
function addMonthToDate(month, date) {
  // ...
}
const date = new Date();
addMonthToDate(1, date);

// 4. Functions should only be one level of abstraction
// When you have more than one level of abstraction your function is usually doing too much. Splitting up functions leads to reusability and easier testing.
// Bad
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    });
  });
  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });
  ast.forEach((node) => {
    // parse...
  });
}

// Good
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach((node) => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach((token) => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}

// 5. Remove duplicate code
// Removing duplicate code means creating an abstraction that can handle this set of different things with just one function/module/class.
// Bad
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink,
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio,
    };

    render(data);
  });
}

// Good
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience,
    };

    switch (employee.type) {
      case "manager":
        data.portfolio = employee.getMBAProjects();
        break;
      case "developer":
        data.githubLink = employee.getGithubLink();
        break;
    }

    render(data);
  });
}

// 6. Set default objects with Object.assign
// Bad
const firstMenuConfig = {
  title: null,
  body: "Bar",
  buttonText: null,
  cancellable: true,
};

function createMenu(config) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}
createMenu(firstMenuConfig);

// Good
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true,
};
function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true,
    },
    config
  );
  return finalConfig;
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}
createMenu(menuConfig);

// 7. Don't use flags as function parameters
//  Split out your functions if they are following different code paths based on a boolean.
// Bad
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}

// Good
function createFile(name) {
  fs.create(name);
}
function createTempFile(name) {
  createFile(`./temp/${name}`);
}

// 8. Avoid Side Effects (part 1)
// Due to the lack of typing, it is important to consider whether the APIs are consistent

// Bad
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let firstName = "Ryan McDermott";
function splitIntoFirstAndLastName() {
  names = names.split(" ");
}
splitIntoFirstAndLastName();
console.log(firstName); // ['Ryan', 'McDermott'];

// Good
function splitIntoFirstAndLastName(name) {
  return name.split(" ");
}
const userName = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(userName);
console.log(userName); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];

// 9. Avoid Side Effects (part 2)
//Be careful when changing mutable values such as objects or arrays, it is best to clone them and with a function modify the clone with the necessary changes

// Bad
const addItemsToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};

// Good
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};

// 10. Don't write to global functions
// Bad
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter((elem) => !hash.has(elem));
};

// Good
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter((elem) => !hash.has(elem));
  }
}

// 11. Favor functional programming over imperative programming
// Javascript is not a functional language, but it prioritizes functional programming
// Bad
const programmerOutputB = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];

let totalOutputB = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}

// Good
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];

const totalOutput = programmerOutput.reduce(
  (totalLines, output) => totalLines + output.linesOfCode,
  0
);

// 12. Encapsulate conditionals
// Bad
if (fsm.state === "fetching" && isEmpty(listNode)) {
  // ...
}
// Good
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode);
}
if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}

// 13. Avoid negative conditionals
// Bad
function isDOMNodeNotPresent(node) {
  // ...
}
if (!isDOMNodeNotPresent(node)) {
  // ...
}

// Good
function isDOMNodePresent(node) {
  // ...
}
if (isDOMNodePresent(node)) {
  // ...
}

// 14. Avoid conditionals
// A function must do only one thing, therefore it should not have conditionals, instead you can use polymorphism

// Bad
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case "777":
        return this.getMaxAltitude() - this.getPassengerCount();
      case "Air Force One":
        return this.getMaxAltitude();
      case "Cessna":
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}

// Good
class Airplane {
  // ...
}
class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}
class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}
class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}

// 15. Avoid type-checking (part 1)
// Before typing arguments into a function. The first thing to consider is consistent APIs.

// Bad
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location("texas"));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location("texas"));
  }
}

// Good
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location("texas"));
}

// 16. Avoid type-checking (part 2)
// if you needing use types, use typescript and not only javascript

// Bad
function combine(val1, val2) {
  if (
    (typeof val1 === "number" && typeof val2 === "number") ||
    (typeof val1 === "string" && typeof val2 === "string")
  ) {
    return val1 + val2;
  }
  throw new Error("Must be of type String or Number");
}

// Good
function combine(val1, val2) {
  return val1 + val2;
}

// 17. Don't over-optimize
// optimize only what is necessary

// Bad
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}

// Good
for (let i = 0; i < list.length; i++) {
  // ...
}

// 18. Remove dead code
// Dead code is just as bad as duplicate code. Delete it.
// Bad
function oldRequestModule(url) {
  // ...
}
function newRequestModule(url) {
  // ...
}
const re = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");

// Good
function newRequestModule(url) {
  // ...
}
const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");
