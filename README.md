## mastercard-validation

mastercard-validation is a module that help you validate a MASTERCARD credit card.

### Basic Usage

To use this module you only have to insert the visa credit card informations into the method `validateMasterCard()`, as shown on the example bellow.
```javascript
var mastercard = require('mastercard-validation');
var card = {
  number: '5430574372474752',
  expiryMonth: '05',
  expiryYear: '2017',
  cvv: '087'
};
var validation = mastercard.validateMasterCard(card);
```

So `console.log(validateMasterCard())` will return an object like this:

```javascript
{ card:
   { number: '5430574372474752',
     expiryMonth: '05',
     expiryYear: '2017',
     cvv: '087' },
  validCardNumber: true,
  validExpiryMonth: true,
  validExpiryYear: true,
  validCvv: true,
  isExpired: false }

```
#### Check also
[visa-validation](https://www.npmjs.com/package/visa-validation)
