const express=require('express');
const router=express.Router();
const{addReturns}=require('../controllers/returns');
const auth=require('../middleware/auth');
const validate=require('../middleware/validator');
const validateReturn=require('../validator/returns');
router.post('/',[auth,validate(validateReturn)],addReturns);

module.exports=router;