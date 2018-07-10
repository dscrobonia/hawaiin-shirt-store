const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const encrypt = require('btoa')

const app = express();
const port = process.env.PORT || 5000;
const stripee_payment_api_key = "1234asdfa123"

app.get('/api/pay', (req, res) => {

  // encrypt credit card number
  var encryptedCard = encrypt(req.query.ccnum)

  // decrease supply
  decreaseSupplyBy(req.query.itemname, req.query.quantity)

  // send transaction through stripee
  stripeeTransaction(stripee_payment_api_key, encryptedCard, req.query.cost)

  // send response
  res.send({ express: 'Thank you for paying!' });
});
function stripeeTransaction(key, encryptedCard, cost) {

  console.log('transaction sent: ' + key + ', ' + encryptedCard + ', ' + cost)
  return;

  stipeeApi.sendTransation(key, encryptedCard, cost);
}

function decreaseSupplyBy(itemname, quantity) {
  console.log('item: ' + itemname + ' decreased by ' + quantity)
  return;

  MongoClient.connect('14.14.14.14', function(err, client) {
    assert.equal(null, err);
  
    const db = client.db('inventory');

    // todo: change to decrease amount, not just se quantity
    db.collections('inventory').updateOne({'item': itemname} , { $set: { 'quantity' : quantity } }, 
      function(err, result) {
        assert.equal(err, null);
        console.log(result);
      });  
  
    client.close();
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
