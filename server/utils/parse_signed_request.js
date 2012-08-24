module.exports = function(signed_request, secret) {
  var signed_request_array = signed_request.split('.');
  var encoded_sig = signed_request_array[0];
  var payload = signed_request_array[1];

  // decode the data
  var sig = new Buffer(encoded_sig, 'base64').toString('binary');
  var data = new Buffer(payload, 'base64').toString('binary');

  // error
  if (JSON.parse(data).algorithm.toUpperCase() !== 'HMAC-SHA256') {
    console.log("Error: data");
    return null;
  }

  // check sig
  //
  var hmac = require("crypto").createHmac('SHA256', secret);
  var expected_sig = hmac.update(payload).digest('binary');

  // error
  if (sig !== expected_sig) {
    console.log("Error: Signature");
    console.log("Sig:" + sig);
    console.log("Expected sig:" + expected_sig);
    return null;
  }

  return JSON.parse(data);
};