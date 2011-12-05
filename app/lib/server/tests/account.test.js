(function() {
  var Account, assert;
  Account = require("../modules/account");
  assert = require("assert");
  require("should");
  module.exports = {
    "initial balance should be zero": function() {
      var account;
      account = Account.create();
      account.should.have.property("balance");
      return account.balance.should.eql(0);
    },
    "credit should increase the balance": function() {
      var account;
      account = Account.create();
      account.credit(10);
      return account.balance.should.eql(10);
    },
    "debit should decrease the balance": function() {
      var account;
      account = Account.create();
      account.debit(10);
      return account.balance.should.eql(-10);
    },
    "transfer should credit one account and debit another": function() {
      var account1, account2;
      account1 = Account.create();
      account1.credit(20);
      account2 = Account.create();
      account1.transferTo(account2, 5);
      account1.balance.should.eql(15);
      return account2.balance.should.eql(5);
    },
    "transfer should throw error if not enough funds": function() {
      var account1, account2;
      account1 = Account.create();
      account1.credit(5);
      account2 = Account.create();
      return assert.throws(function() {
        return account1.transferTo(account2, 10);
      });
    }
  };
}).call(this);
