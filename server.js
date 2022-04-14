// Require Express.js
const express = require('express')
const minimist = require('minimist')


var argz = minimist(process.argv.slice(2))

const port = argz["port"] || 5000
const app = express()


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function coinFlip() {
    var num = getRandomInt(3)
    if (num == 0){
      return "heads"
    }
    else{
      return "tails"
    }
  }
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
  function coinFlips(flips) {
    var flipArray = [];
    for (let i = 0; i < flips; i++){
      flipArray.push(coinFlip());
    }
    return flipArray;
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
  function countFlips(array) {
    var headcount = 0;
    var tailcount = 0;
    for (let i = 0; i < array.length; i++){
      if (array[i] == 'heads'){
        headcount = headcount + 1;
      }
      else{
        tailcount = tailcount + 1
      }
    }
    return {heads: headcount, tails: tailcount};
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
  function flipACoin(call) {
    var mycall = call;
    var myflip = coinFlip();
    var myresult = 'lose';
    if (flip == call){
      myresult = 'win'
    }
  
    return {call: mycall, flip: myflip, result: myresult };
  }
  




// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});


app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });




app.get('/app/flip/', (req,res) => {
    res.status(200).json({"flip" : coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    res.status(200).json({"raw": flips, "summary" : countFlips(flips)})
        
});

app.get('/app/flip/call/heads', (req,res) => {
    res.status(200).json(flipACoin("heads"))
})
app.get('/app/flip/call/tails', (req,res) => {
    res.status(200).json(flipACoin('tails'))
})

