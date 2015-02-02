
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var Stripe = require('stripe');
// Replace this with your Stripe secret key, found at https://dashboard.stripe.com/account/apikeys
var stripe_secret_key = "sk_test_cmF6f52RMUGJu2bcSVth21tX";

Stripe.initialize(stripe_secret_key);

Parse.Cloud.define("createCustomer", function(request, response) {   
  Stripe.Customers.create({
    account_balance: 0,
    description: request.params.customerName,
    card: request.params.token
  }, {
    success: function(httpResponse) {
      response.success(httpResponse);
    },
    error: function(httpResponse) {
      response.error(httpResponse.message);
    }
  });
});

Parse.Cloud.define("createCharge", function(request, response) {
  Stripe.Charges.create({
    amount: request.params.amount,
    currency: "usd",
    customer: request.params.customer
  }, {
    success: function(httpResponse) {
      response.success(httpResponse.id);
    },
    error: function(httpResponse) {
      response.error(httpResponse.message);
    }
  });
});