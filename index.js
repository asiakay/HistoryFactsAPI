const express = require('express');
const app = express();

// Sample data for Black history facts
const facts = require('./facts.json');

// Endpoint for all facts
app.get('/facts', (req, res) => {
  // Filter by category if specified in query parameter
  if (req.query.category) {
    const filteredFacts = facts.filter(fact => fact.category === req.query.category);
    res.json(filteredFacts);
  } else {
    res.json(facts);
  }
});

// Endpoint for specific fact by ID
app.get('/facts/:id', (req, res) => {
  const fact = facts.find(fact => fact.id === parseInt(req.params.id));
  if (fact) {
    res.json(fact);
  } else {
    res.status(404).send('Fact not found');
  }
});

// Endpoint for random fact
app.get('/facts/random', (req, res) => {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  res.json(randomFact);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
