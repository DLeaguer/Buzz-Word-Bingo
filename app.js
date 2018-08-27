const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// make some routes

app.get('/', (req, res) => {
  res.send('HELLO WORLD!')
})

const nextId = 3;
const words = [
  {
    id: 1,
    buzzWord: 'Agile is amazing',
    points: '1000'
  },
  {
    id: 2,
    buzzWord: 'Social-Mobile',
    points: '100'
  }
]

app.get('/buzzwords', (req, res) => {
  res.json(words)
})

app.get('/buzzword/:id', (req, res) => {})

app.post('/addbuzzword', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`)
})