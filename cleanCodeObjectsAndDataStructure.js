// OBJECTS AND DATA STRUCTURE

// 1. Use getters and setters
// Bad
function makeBankAccount() {
  // ...
  return {
    balance: 0,
    // ...
  };
}
const account = makeBankAccount();
account.balance = 100;

// Good
function makeBankAccount() {
  // this one is private
  let balance = 0;
  // a "getter", made public via the returned object below
  function getBalance() {
    return balance;
  }
  // a "setter", made public via the returned object below
  function setBalance(amount) {
    // ... validate before updating the balance
    balance = amount;
  }
  return {
    // ...
    getBalance,
    setBalance,
  };
}
const account = makeBankAccount();
account.setBalance(100);

// 2. Make objects have private members
// This can be accomplished through closures (for ES5 and below).
