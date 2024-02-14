// FUNCTIONS

// 1. Two or fewer arguments -> simple tests,
// if you have more two arguments then your function is to do much,
// if you needing lot arguments,use an object

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
// Good
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}

// 3. Function names should say what they do
// Good
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);

// 4. Functions should only be one level of abstraction
// When you have more than one level of abstraction your function is usually doing too much. Splitting up functions leads to reusability and easier testing.
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
