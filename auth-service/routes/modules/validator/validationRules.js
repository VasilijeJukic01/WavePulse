const { body } = require('express-validator');

const registerValidationRules = [
    body('username')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username requires minimum 3 characters'),
    body('firstname')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 1 }).withMessage('First name requires minimum 2 characters'),
    body('lastname')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 1 }).withMessage('Last name requires minimum 2 characters'),
    body('email')
        .isEmail().withMessage('Email must be valid'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password requires minimum 8 characters')
];

const loginValidationRules = [
    body('username').isString(),
    body('password').isString()
];

const changePasswordValidationRules = [
    body('newPassword').isString().isLength({ min: 8 })
];

const editProfileValidationRules = [
    body('username')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username requires minimum 3 characters'),
    body('firstname')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 1 }).withMessage('First name requires minimum 1 character'),
    body('lastname')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 1 }).withMessage('Last name requires minimum 1 character'),
    body('email')
        .isEmail().withMessage('Email must be valid')
];

const updateAccountValidationRules = [
    body('username')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username requires minimum 3 characters'),
    body('firstname')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 1 }).withMessage('First name requires minimum 1 character'),
    body('lastname')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 1 }).withMessage('Last name requires minimum 1 character'),
    body('email')
        .isEmail().withMessage('Email must be valid'),
    body('role')
        .isString().withMessage('Role must be a string'),
    body('countryId')
        .isInt().withMessage('Country ID must be an integer'),
    body('accountStatus')
        .isString().withMessage('Account status must be a string')
];

const updatePasswordValidationRules = [
    body('password')
        .isString().isLength({ min: 8 }).withMessage('Password requires minimum 8 characters')
];

module.exports = {
    registerValidationRules,
    loginValidationRules,
    changePasswordValidationRules,
    editProfileValidationRules,
    updateAccountValidationRules,
    updatePasswordValidationRules
};