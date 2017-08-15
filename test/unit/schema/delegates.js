var Zschema = require('../../../helpers/z_schema.js');
var schema = require('../../../schema/delegates.js');
var node = require('../../node.js');

var expect = node.expect;
var validator = new Zschema();

describe('delegates', function () {

	describe('enableForging', function () {
		it('should return false when secret is undefined', function () {
			var testObject = {secret: undefined};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Missing required property: secret');
		});

		it('should return false when secret is null', function () {
			var testObject = {secret: null};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type null');
		});

		it('should return false when secret is number', function () {
			var testObject = {secret: 1};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type integer');
		});

		it('should return false when secret is empty string', function () {
			var testObject = {secret: ''};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too short (0 chars), minimum 1');
		});
		
		it('should return false when secret longer than 100 characters', function () {
			var testObject = {secret: new Array(101).fill('x').join('')};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too long (101 chars), maximum 100');
		});

		it('should return false when secret longer than 100 characters', function () {
			var testObject = {secret: new Array(101).fill('x').join('')};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too long (101 chars), maximum 100');
		});

		it('should return false when publicKey is an invalid hex string', function () {
			var invalidPublicKey = 'zd3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f';
			var testObject = {
				secret: node.gAccount.password,
				publicKey: invalidPublicKey
			};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Object didn\'t pass validation for format publicKey: zd3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f');
		});

		it('should return false when publicKey is of invalid length', function () {
			var invalidPublicKey = '3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f';
			var testObject = {
				secret: node.gAccount.password,
				publicKey: invalidPublicKey
			};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Object didn\'t pass validation for format publicKey: 3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f');
		});

		it('should return true when publicKey is of 0 length', function () {
			var testObject = {
				secret: node.gAccount.password,
				publicKey: ''
			};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(true);
		});

		it('should return true when secret length is a valid string', function () {
			var testObject = {secret: 'valid-secret'};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(true);
		});
		
		it('should return true when secret and publicKey are valid', function () {
			var testObject = {
				secret: node.gAccount.password,
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.enableForging)).to.equal(true);
		});
	});

	describe('disableForging', function () {

		it('should return false when secret is undefined', function () {
			var testObject = {secret: undefined};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Missing required property: secret');
		});

		it('should return false when secret is null', function () {
			var testObject = {secret: null};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type null');
		});

		it('should return false when secret is number', function () {
			var testObject = {secret: 1};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type integer');
		});

		it('should return false when secret is empty string', function () {
			var testObject = {secret: ''};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too short (0 chars), minimum 1');
		});
		
		it('should return false when secret longer than 100 characters', function () {
			var testObject = {secret: new Array(101).fill('x').join('')};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too long (101 chars), maximum 100');
		});

		it('should return false when secret longer than 100 characters', function () {
			var testObject = {secret: new Array(101).fill('x').join('')};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too long (101 chars), maximum 100');
		});

		it('should return false when publicKey is an invalid hex string', function () {
			var invalidPublicKey = 'zd3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f';
			var testObject = {
				secret: node.gAccount.password,
				publicKey: invalidPublicKey
			};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Object didn\'t pass validation for format publicKey: zd3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f');
		});

		it('should return false when publicKey is of invalid length', function () {
			var invalidPublicKey = '3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f';
			var testObject = {
				secret: node.gAccount.password,
				publicKey: invalidPublicKey
			};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Object didn\'t pass validation for format publicKey: 3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f');
		});

		it('should return true when publicKey is of 0 length', function () {
			var testObject = {
				secret: node.gAccount.password,
				publicKey: '' 
			};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(true);
		});

		it('should return true when secret length is a valid string', function () {
			var testObject = {secret: 'valid-secret'};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(true);
		});
		
		it('should return true when secret and publicKey are valid', function () {
			var testObject = {
				secret: node.gAccount.password,
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.disableForging)).to.equal(true);
		});
	});

	describe('toggleForging', function () {

		it('should return false when key is undefined', function () {
			var testObject = {
				key: undefined,
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Missing required property: key');
		});

		it('should return false when key is null', function () {
			var testObject = {
				key: null,
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type null');
		});

		it('should return false when key is number', function () {
			var testObject = {
				key: 12,
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type integer');
		});

		it('should return false when key is empty string', function () {
			var testObject = {
				key: '',
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too short (0 chars), minimum 1');
		});
		
		it('should return false when key longer than 100 characters', function () {
			var testObject = {
				key: new Array(101).fill('x').join(''),
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('String is too long (101 chars), maximum 100');
		});

		it('should return false when publicKey is undefined', function () {
			var testObject = {
				key: node.gAccount.key,
				publicKey: undefined
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Missing required property: publicKey');
		});

		it('should return false when key is null', function () {
			var testObject = {
				key: node.gAccount.key,
				publicKey: null,
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Expected type string but found type null');
		});

		it('should return false when publicKey when is an invalid hex string', function () {
			var invalidPublicKey = 'zd3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f';
			var testObject = {
				key: node.gAccount.key,
				publicKey: invalidPublicKey
			};


			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Object didn\'t pass validation for format publicKey: zd3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f');
		});

		it('should return false when publicKey when is of invalid length', function () {
			var invalidPublicKey = '3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f';
			var testObject = {
				key: node.gAccount.key,
				publicKey: invalidPublicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(false);
			expect(validator.getLastErrors().map(function (error) {
				return error.message;
			})).to.include('Object didn\'t pass validation for format publicKey: 3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f');
		});

		it('should return true when publicKey is of 0 length', function () {
			var testObject = {
				key: node.gAccount.key,
				publicKey: ''
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(true);
		});

		it('should return true when key and publicKey are valid', function () {
			var testObject = {
				key: node.gAccount.key,
				publicKey: node.gAccount.publicKey
			};

			expect(validator.validate(testObject, schema.toggleForging)).to.equal(true);
		});
	});
});