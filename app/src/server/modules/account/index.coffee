class Account 
	constructor: ->
		@balance = 0
	
	credit: (amount) ->
		@balance += amount
	
	debit: (amount) ->
		@balance -= amount
	
	transferTo: (account, amount) ->
		throw new Error("Not enough funds") if @balance < amount

		@debit amount
		account.credit amount

module.exports.create = ->
	return new Account()