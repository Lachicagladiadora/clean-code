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
// Bad
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let firstName = "Ryan McDermott";
function splitIntoFirstAndLastName() {
  name = name.split(" ");
}
splitIntoFirstAndLastName();
console.log(firstName); // ['Ryan', 'McDermott'];

// Good
function splitIntoFirstAndLastName(name) {
  return name.split(" ");
}
const name = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(name);
console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
