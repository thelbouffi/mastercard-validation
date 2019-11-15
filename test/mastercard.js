const { expect } = require('chai');
const { it, describe } = require('mocha');
const creditcard = require('..');

describe('Test mastercard-validation functions', () => {
  describe('#validateMasterCard()', () => {
    it('should return invalid response if there is no card', done => {
      const validation = creditcard.validateMasterCard();
      expect(validation.card).to.deep.equal({});
      expect(validation.validCardNumber).to.equal(false);
      expect(validation.validExpiryMonth).to.equal(false);
      expect(validation.validExpiryYear).to.equal(false);
      expect(validation.validCvv).to.equal(false);
      expect(validation.isExpired).to.equal(false);
      done();
    });
    it('should return invalid response on invalid card', done => {
      const card = {
        number: '4111111111111112',
        expiryMonth: '13',
        expiryYear: '2100',
        cvv: '463',
      };
      const validation = creditcard.validateMasterCard(card);
      expect(validation.card).to.equal(card);
      expect(validation.validCardNumber).to.equal(false);
      expect(validation.validExpiryMonth).to.equal(false);
      expect(validation.validExpiryYear).to.equal(true);
      expect(validation.validCvv).to.equal(true);
      expect(validation.isExpired).to.equal(false);
      done();
    });
    it('should return valid response on valid card', done => {
      const card = {
        number: '5430574372474752',
        expiryMonth: '05',
        expiryYear: '2100',
        cvv: '087',
      };
      const validation = creditcard.validateMasterCard(card);
      expect(validation.card).to.equal(card);
      expect(validation.validCardNumber).to.equal(true);
      expect(validation.validExpiryMonth).to.equal(true);
      expect(validation.validExpiryYear).to.equal(true);
      expect(validation.validCvv).to.equal(true);
      expect(validation.isExpired).to.equal(false);
      done();
    });
  });

  describe('#isValidCardNumber()', () => {
    it('should return true for valid card code numbers', done => {
      expect(creditcard.isValidCardNumber('5267417426560259')).to.equal(true);
      expect(creditcard.isValidCardNumber('5429339123914800')).to.equal(true);
      expect(creditcard.isValidCardNumber('5555555555554444')).to.equal(true);
      done();
    });
    it('should return false for numbers that pass luhn but does not has mastercard code Pattern', done => {
      expect(creditcard.isValidCardNumber('5610591081018250')).to.equal(false);
      expect(creditcard.isValidCardNumber('3566002020360505')).to.equal(false);
      expect(creditcard.isValidCardNumber('6331101999990016')).to.equal(false);
      done();
    });
  });

  describe('#hasMasterCardPatterns()', () => {
    it('should return true for correct mastercard code pattern', done => {
      expect(creditcard.hasMasterCardPatterns(5489876561389844)).to.equal(true);
      expect(creditcard.hasMasterCardPatterns('5110681872341907')).to.equal(true);
      done();
    });
    it('should return false for wrong mastercard code pattern', done => {
      expect(creditcard.hasMasterCardPatterns(54898765613844)).to.equal(false);
      expect(creditcard.hasMasterCardPatterns('5110681841907')).to.equal(false);
      done();
    });
  });

  describe('#luhn()', () => {
    it('should return true for valid credit card code', done => {
      expect(creditcard.luhn('378734493671000')).to.equal(true);
      expect(creditcard.luhn('5610591081018250')).to.equal(true);
      expect(creditcard.luhn('3566002020360505')).to.equal(true);
      expect(creditcard.luhn('5555555555554444')).to.equal(true);
      expect(creditcard.luhn('6331101999990016')).to.equal(true);
      done();
    });
    it('should return false for invalid credit card code', done => {
      expect(creditcard.luhn('5105105105105101')).to.equal(false);
      expect(creditcard.luhn('4111111111111112')).to.equal(false);
      expect(creditcard.luhn(378734493671000)).to.equal(false);
      expect(creditcard.luhn(5610591081018250)).to.equal(false);
      expect(creditcard.luhn(3566002020360505)).to.equal(false);
      expect(creditcard.luhn(5555555555554444)).to.equal(false);
      expect(creditcard.luhn(6331101999990016)).to.equal(false);
      expect(creditcard.luhn('')).to.equal(false);
      expect(creditcard.luhn(null)).to.equal(false);
      expect(creditcard.luhn({})).to.equal(false);
      expect(creditcard.luhn(' ')).to.equal(false);
      expect(creditcard.luhn(undefined)).to.equal(false);
      expect(creditcard.luhn([])).to.equal(false);
      expect(creditcard.luhn('abc')).to.equal(false);
      done();
    });
  });

  describe('#isValidCvv()', () => {
    it('should return true for valid cvv', done => {
      expect(creditcard.isValidCvv(213)).to.equal(true);
      expect(creditcard.isValidCvv('123')).to.equal(true);
      done();
    });
    it('should return false for invalid cvv', done => {
      expect(creditcard.isValidCvv(13)).to.equal(false);
      expect(creditcard.isValidCvv(1113)).to.equal(false);
      expect(creditcard.isValidCvv(14)).to.equal(false);
      expect(creditcard.isValidCvv('1')).to.equal(false);
      expect(creditcard.isValidCvv('')).to.equal(false);
      expect(creditcard.isValidCvv(null)).to.equal(false);
      expect(creditcard.isValidCvv({})).to.equal(false);
      expect(creditcard.isValidCvv(' ')).to.equal(false);
      expect(creditcard.isValidCvv(undefined)).to.equal(false);
      expect(creditcard.isValidCvv([])).to.equal(false);
      expect(creditcard.isValidCvv('abc')).to.equal(false);
      done();
    });
  });

  describe('#isExpired()', () => {
    it('should return true if the credit card has expired', done => {
      expect(creditcard.isExpired(2, 2013)).to.equal(true);
      done();
    });
    it('should return false if the credit card has not expired', done => {
      expect(creditcard.isExpired(9, 2100)).to.equal(false);
      done();
    });
    it('should return true when the card has expired last month', done => {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      expect(creditcard.isExpired(date.getMonth() + 1, date.getFullYear())).to.equal(true);
      done();
    });
    it('should return false when the card is expiring this month', done => {
      const date = new Date();
      expect(creditcard.isExpired(date.getMonth() + 1, date.getFullYear())).to.equal(false);
      done();
    });
  });

  describe('#isValidExpiryYear()', () => {
    it('should return true for valid expiry year', done => {
      expect(creditcard.isValidExpiryYear(2100)).to.equal(true);
      expect(creditcard.isValidExpiryYear(2000)).to.equal(true);
      expect(creditcard.isValidExpiryYear(2016)).to.equal(true);
      expect(creditcard.isValidExpiryYear('2100')).to.equal(true);
      expect(creditcard.isValidExpiryYear('2000')).to.equal(true);
      expect(creditcard.isValidExpiryYear('2017')).to.equal(true);
      done();
    });
    it('should return false for invalid expiry year', done => {
      expect(creditcard.isValidExpiryYear('AZ12')).to.equal(false);
      expect(creditcard.isValidExpiryYear(212)).to.equal(false);
      expect(creditcard.isValidExpiryYear(12333)).to.equal(false);
      expect(creditcard.isValidExpiryYear('A1512')).to.equal(false);
      expect(creditcard.isValidExpiryYear(1999)).to.equal(false);
      expect(creditcard.isValidExpiryYear(2101)).to.equal(false);
      expect(creditcard.isValidExpiryYear('')).to.equal(false);
      expect(creditcard.isValidExpiryYear(null)).to.equal(false);
      expect(creditcard.isValidExpiryYear({})).to.equal(false);
      expect(creditcard.isValidExpiryYear(' ')).to.equal(false);
      expect(creditcard.isValidExpiryYear(undefined)).to.equal(false);
      expect(creditcard.isValidExpiryYear([])).to.equal(false);
      done();
    });
  });

  describe('#isValidExpiryMonth()', () => {
    it('should return true for valid expiry month', done => {
      expect(creditcard.isValidExpiryMonth(1)).to.equal(true);
      expect(creditcard.isValidExpiryMonth(12)).to.equal(true);
      expect(creditcard.isValidExpiryMonth(2)).to.equal(true);
      expect(creditcard.isValidExpiryMonth(6)).to.equal(true);
      expect(creditcard.isValidExpiryMonth('2')).to.equal(true);
      expect(creditcard.isValidExpiryMonth('09')).to.equal(true);
      done();
    });
    it('should return false for invalid expiry month', done => {
      expect(creditcard.isValidExpiryMonth(0)).to.equal(false);
      expect(creditcard.isValidExpiryMonth(13)).to.equal(false);
      expect(creditcard.isValidExpiryMonth('a2')).to.equal(false);
      expect(creditcard.isValidExpiryMonth('')).to.equal(false);
      expect(creditcard.isValidExpiryMonth(null)).to.equal(false);
      expect(creditcard.isValidExpiryMonth({})).to.equal(false);
      expect(creditcard.isValidExpiryMonth(' ')).to.equal(false);
      expect(creditcard.isValidExpiryMonth(undefined)).to.equal(false);
      expect(creditcard.isValidExpiryMonth([])).to.equal(false);
      done();
    });
    it('should return false for string invalid months', done => {
      expect(creditcard.isValidExpiryMonth('123')).to.equal(false);
      done();
    });
  });
});
