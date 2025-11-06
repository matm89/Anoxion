const { body, query } = require("express-validator");


//Validators schemas
const validateDevice = [
  body('device').trim().isString().notEmpty().withMessage('Require Device').escape(),

  body('state.e-stop').optional().isBoolean().withMessage('e-stop should be a boolean type'),

  body('state.connected').optional().isBoolean().withMessage('connecter should be a boolean type'),
  
  body('state.last_check').optional().custom((value) => {
    if (typeof value !== 'number' || typeof value !== 'bigint') {
      throw new Error ('state.last_check should be a number');
    }
    if (value < 0) throw new Error ('state.last_check should be bigger than 0');
    return true;
  })
];


const validateMail = [
  (req, res, next) => {
    if (req.method === 'GET') {
      return query('email').isEmail().normalizeEmail()(req, res, next);
    } else {
      return body('email').isEmail().normalizeEmail()(req, res, next);
    }
  },
  body('name').optional().trim().isLength({ min:2}).escape(),
];

const validateUser = [
  (req, res, next) => {
    if (req.method === 'GET') {
      return query('user').trim()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage('Username is required and must be at least 2 characters long')(req, res, next);
    } else {
      return body('user').trim()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage('Username is required and must be at least 2 characters long')(req, res, next);
    }
  },
  body('name').optional().trim().isLength({ min: 2 }).escape(),
];

const validateProcess = [
  body('process_id').trim().notEmpty().withMessage('process_id is required').isString().escape(),

  body('user').trim().notEmpty().withMessage('user is required').isString().escape(),

  body('device').trim().notEmpty().withMessage('device is required').isString().escape(),

  body('timestamp').trim().notEmpty().withMessage('timestamp is required').isISO8601().withMessage('timestamp must be a valid date string'),

  body('state').optional().trim().isString().escape(),

  body('values').optional().isObject().withMessage('values must be an object'),

  body('values.O2').optional().isNumeric().withMessage('O2 must be a number'),

  body('values.temp').optional().isNumeric().withMessage('temp must be a number'),

  body('values.hum').optional().isNumeric().withMessage('hum must be a number'),

  body('iostate').optional().isObject().withMessage('iostate must be an object'),

  body('iostate.n2_dry').optional().isBoolean().withMessage('iostate.n2_dry must be boolean'),

  body('iostate.n2_wet').optional().isBoolean().withMessage('iostate.n2_wet must be boolean'),

  body('iostate.start').optional().isBoolean().withMessage('iostate.start must be boolean'),
  
  body('iostate.stop').optional().isBoolean().withMessage('iostate.stop must be boolean'),

  body('iostate.e-stop').optional().isBoolean().withMessage('iostate.e-stop must be boolean')
];

module.exports = {validateDevice, validateUser, validateMail, validateProcess}