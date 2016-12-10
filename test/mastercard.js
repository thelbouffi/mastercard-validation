let expect = require('chai').expect;
let creditcard = require('../lib/mastercard');

describe('Test mastercard-validation functions', function(){

  describe('#validateMasterCard()', function(){
    it('should return invalid response if there is no card', function(){

    })
    it('should return invalid response on invalid card', function(){

    })
    it('should return valid response on valid card', function(){

    })
  })

  describe('#hasMasterCardPatterns()', function(){
    it('should return true for correct mastercard code pattern', function(){

    })
    it('should return false for wrong mastercard code pattern', function(){

    })
  })

  describe('#isValidCvv()', function(){
    it('should return true for valid cvv', function(){

    })
    it('should return false for invalid cvv', function(){

    })
  })

  describe('#isExpired()', function(){
    it('should return true if the credit card has expired', function(){

    })
    it('should return false if the credit card has not expired', function(){

    })
    it('should return true when the card has expired last month', function() {

     });
    it('should return false when the card is expiring this month', function() {

     });
  })

  describe('#isValidExpiryYear()', function(){
    it('should return true for valid expiry year', function(){

    })
    it('should return false for invalid expiry year', function(){

    })
  })

  describe('#isValidExpiryMonth()', function(){
    it('should return true for valid expiry month', function(){

    })
    it('should return false for invalid expiry month', function(){

    })
  })

  describe('#isValidCardNumber()', function(){
    it('should return true for valid card code numbers', function(){

    })
    it('should return false for numbers that pass luhn but doesn\'t has mastercard code Pattern', function(){

    })
  })

  describe('#luhn()', function(){
    it('should return true for valid credit card code', function(){

    })
    it('should return false for invalid credit card code', function(){

    })
  })

})
