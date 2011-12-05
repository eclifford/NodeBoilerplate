# Account = require("../modules/account")
# assert = require("assert")
# accounts = require("../mocks/accounts")
# require "should"
# module.exports =
#   "initial balance should be zero": ->
#     account = Account.create()
#     account.should.have.property "balance"
#     account.balance.should.eql 0

#   "credit should increase the balance": ->
#     account = Account.create()
#     account.credit 10
#     account.balance.should.eql 10

#   "debit should decrease the balance": ->
#     account = Account.create()
#     account.debit 10
#     account.balance.should.eql -10

#   "transfer should credit one account and debit another": ->
#     account1 = Account.create()
#     account1.credit 20
#     account2 = Account.create()
#     account1.transferTo account2, 5
#     account1.balance.should.eql 15
#     account2.balance.should.eql 5

#   "transfer should throw error if not enough funds": ->
#     account1 = Account.create()
#     account1.credit 5
#     account2 = Account.create()
#     assert.throws ->
#       account1.transferTo account2, 10
  
#   "has two users": ->
