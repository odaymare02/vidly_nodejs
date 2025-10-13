const Customer = require("../models/customerModel");


exports.getCustomer = async (req, res) => {
  const customers = await Customer.find().sort("name");
  if (customers.length === 0) {
    const error = new Error("no customer found");
    error.statusCode = 404;
    throw error;
  }
  const total = await Customer.countDocuments();
  res.json({
    total,
    data: customers,
  });
};

exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(customer);
};
exports.addCustomer = async (req, res) => {
  // const { error } = validateCustomer(req.body);
  // if (error) {
  //   const errorObj = new Error(error.details.map((e) => e.message).join(", "));
  //   errorObj.statusCode = 400;
  //   throw errorObj;
  // }
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();
  res.status(201).json(customer);
};
exports.updateCustomer = async (req, res) => {
  // const { error } = validateCustomerUpdated(req.body);
  // if (error) {
  //   const errorObj = new Error(error.details.map((e) => e.message).join(", "));
  //   errorObj.statusCode = 400;
  //   throw errorObj;
  // }

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 400;
    throw error;
  }

  res.status(200).json(customer);
};
exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 400;
    throw error;
  }
  res.status(200).json(customer);
};
