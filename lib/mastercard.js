/* eslint-disable no-bitwise */

const DEFAULTS = {
  patterns: {
    cardPattern: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}$/,
    cvvPattern: /^\d{3}$/,
  },
  expiryMonths: {
    min: 1,
    max: 12,
  },
  expiryYears: {
    min: 2000,
    max: 2100,
  },
};

/**
 * Check the validity of the card number
 * @param {String} number The card number
 */
function hasMasterCardPatterns(number) {
  const { patterns } = DEFAULTS;
  return patterns.cardPattern.test(number);
}

/**
 * Luhn algorithm implementation
 * @param {*} number The number to check
 */
function luhn(number) {
  if (/[^\d]+/.test(number) || typeof number !== 'string' || !number) {
    return false;
  }

  let nCheck = 0;
  let bEven = false;
  let nDigit;

  for (let i = number.length - 1; i >= 0; i -= 1) {
    nDigit = ~~number.charAt(i);

    if (bEven) {
      nDigit *= 2;
      if (nDigit > 9) {
        nDigit -= 9;
      }
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
}

/**
 * Validate the card Number
 * @param {*} number The number to validate
 */
function isValidCardNumber(number) {
  return hasMasterCardPatterns(number) && luhn(number);
}

/**
 * Validate month value
 * @param {*} month Month to validate
 */
function isValidExpiryMonth(month) {
  const settings = DEFAULTS.expiryMonths;

  if (typeof month === 'string' && month.length > 2) {
    return false;
  }

  return month >= settings.min && month <= settings.max;
}

/**
 * Validate month expiry
 * @param {*} year Year to validate
 */
function isValidExpiryYear(year) {
  const settings = DEFAULTS.expiryYears;

  if (typeof year === 'string' && year.length !== 4) {
    return false;
  }

  return year >= settings.min && year <= settings.max;
}

/**
 * Check a month/year has been expired
 * @param {*} month The month
 * @param {*} year The year
 */
function isExpired(month, year) {
  const expiration = new Date(year, month);

  return Date.now() >= expiration;
}

/**
 * Check the validity of a CVV number
 * @param {*} cvv The CVV number
 */
function isValidCvv(cvv) {
  const { patterns } = DEFAULTS;
  return patterns.cvvPattern.test(cvv);
}

/**
 * Check the master card information validity
 * @param {String} card The card object
 */
function validateMasterCard(card) {
  const c = card || {};
  return {
    card: c,
    validCardNumber: isValidCardNumber(c.number),
    validExpiryMonth: isValidExpiryMonth(c.expiryMonth),
    validExpiryYear: isValidExpiryYear(c.expiryYear),
    validCvv: isValidCvv(c.cvv),
    isExpired: isExpired(c.expiryMonth, c.expiryYear),
  };
}

/**
 * Export Public functions
 */
module.exports = {
  validateMasterCard,
  hasMasterCardPatterns,
  isValidCvv,
  isExpired,
  isValidExpiryYear,
  isValidExpiryMonth,
  isValidCardNumber,
  luhn,
};
