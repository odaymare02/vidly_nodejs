const express = require("express");
const router = express.Router();

const {getCustomer,getCustomerById,addCustomer,updateCustomer,deleteCustomer}=require('../controllers/customer');
const validateObjecId = require("../middleware/validateObjecId");
const validateCustomerA=require('../validator/customer/validateCustomerAdded');
const validateCustomerU=require('../validator/customer/validateCustomerUpdated');
const validator=require('../middleware/validator');
router.get('/',getCustomer);
router.get('/:id',validateObjecId,getCustomerById);
router.post('/',validator(validateCustomerA),addCustomer);
router.put('/',validator(validateCustomerU),updateCustomer);
router.delete('/',deleteCustomer);

module.exports = router;

