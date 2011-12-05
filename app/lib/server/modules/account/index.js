(function() {
  var Account;
  Account = (function() {
    function Account() {
      this.balance = 0;
    }
    Account.prototype.credit = function(amount) {
      return this.balance += amount;
    };
    Account.prototype.debit = function(amount) {
      return this.balance -= amount;
    };
    Account.prototype.transferTo = function(account, amount) {
      if (this.balance < amount) {
        throw new Error("Not enough funds");
      }
      this.debit(amount);
      return account.credit(amount);
    };
    return Account;
  })();
  module.exports.create = function() {
    return new Account();
  };
}).call(this);
