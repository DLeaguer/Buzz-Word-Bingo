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

app.get('/buzzwords/:id', (req, res) => {
  const { id } = req.params
  console.log('id =', id)
  const resData = words.filter(item => {
    console.log('item.id, id =', item.id, id)
    return id == item.id
  })
  console.log('resData =', resData)
  res.json(resData)
})

app.post('/addbuzzword', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`)
})