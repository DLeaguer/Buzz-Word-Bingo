const express = require('express');
const app = express();
const bp = require('body-parser')

const PORT = process.env.PORT || 8080;

app.use(bp.urlencoded({ extended: true }))
// make some routes

app.get('/', (req, res) => {
  res.send('HELLO WORLD!')
})

let nextId = 3;
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

app.get('/buzzwords/:id/', (req, res) => {
  const { id } = req.params
  console.log('id =', id)
  const resData = words.filter(item => {
    console.log('item.id =', item.id)
    // console.log('id =', id)
    // return id == item.id
    return item.id == id
  })
  console.log('resData =', resData)
  res.json(resData[0])
})

app.post('/addbuzzword', (req, res) => {
  console.log('req.body =', req.body)
  const wordObject = req.body
  console.log('wordObject =', wordObject)
  wordObject.id = nextId
  console.log('wordObject.id =', wordObject.id)
  words.push(wordObject)
  console.log('words =', words)
  res.redirect(`/buzzwords/${nextId}/`)
  console.log('what now!!!')
  nextId++
  console.log('did this work nexId =', nextId)
  // res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`)
})