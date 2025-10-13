const express=require('express');
const router=express.Router();
const {login}=require('../controllers/auth');
const validateauth=require('../validator/auth/validate');
const validator=require('../middleware/validator');
router.post('/',validator(validateauth),login);
module.exports=router;