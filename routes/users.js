const express = require('express');

const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/users');
const User = require('../models/user');
const isAuth = require('../middlewares/auth').auth;

router.post(
  '/signup',
  [
    body('email', 'Please enter a valid email')
      .isEmail()
      .custom((value, { req }) => User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('Email address already exists');
        }
      }))
      .normalizeEmail(),
    body('name', 'Name must be greater than 5 characters')
      .isLength({ min: 5 })
      .trim()
      .notEmpty(),
    body('country', 'Country must be greater than 5 characters')
      .isLength({ min: 5 })
      .trim()
      .notEmpty(),
    body('password', 'Password must be greater than 5 characters')
      .isLength({ min: 5 })
      .trim(),
    body('age', 'Age must be a number').notEmpty().isInt(),
    body('mobile', 'mobile must be in the right format')
      .notEmpty()
      .isMobilePhone(),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      return true;
    }),
  ],
  userController.signup,
);

router.post('/login', userController.login);
router.get('/logout', isAuth, userController.logout);
router.get('/loginHistory', isAuth, userController.loginHistory);
router.get('/:id', isAuth, userController.profile);
router.patch(
  '/:id',
  [
    body('name', 'Name must be greater than 5 characters')
      .optional().isLength({ min: 5 })
      .trim(),
    body('country', 'Country must be greater than 5 characters')
      .optional().isLength({ min: 5 })
      .trim(),
    body('age', 'Age must be a number').isInt(),
    body('mobile', 'mobile must be in the right format')
      .notEmpty()
      .isMobilePhone(),
  ],
  isAuth,
  userController.updateUser,
);
router.delete('/:id', isAuth, userController.deleteUser);

module.exports = router;
