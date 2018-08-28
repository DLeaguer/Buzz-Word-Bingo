const express = require('express');
const app = express();
const bp = require('body-parser')

const PORT = process.env.PORT || 8080;

app.use(bp.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`\n${req.method} request at: ${req.url}`);
  next();
});

app.use(express.static('public'))

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html")
// })

// app.get('/css/styles.css', (req, res) => {
//   res.sendFile(__dirname + '/public/css/styles.css')
// })

let Objects = []
let words = []
let totalScore = 0

app.get('/buzzwords', (req, res) => {
  res.json(Objects)
  console.log('Objects =')
  console.log(Objects);
})

app.post('/buzzwords', (req, res) => {
  // console.log('req.body =', req.body)
  const wordObj = req.body
  // console.log('wordObj =', wordObj)
  // console.log('wordObj.buzzWord =', wordObj.buzzWord)
  // console.log('words', words)
  // console.log('Objects.length before =', Objects.length)
  if (words.includes(wordObj.buzzWord)) {
    console.log('  **buzzword already posted')
    res.send({ success: false})
  } 
  else if (Objects.length > 1) {
    console.log('  **limit of buzzwords reached')
    res.send({ 'success': false})
  }
  else {
    console.log('wordObj.buzzWord =', wordObj.buzzWord)
    words.push(wordObj.buzzWord)
    Objects.push(wordObj)
    console.log('Objects =')
    console.log(Objects)
    console.log('words =', words)
    console.log('Objects.length after post =', Objects.length)
    res.send({ "success": true})
    console.log('successful post what now!!!')
  }
})

app.post('/reset', (req, res) => {
  const reset = req.body
  console.log('reset =', reset)
  Objects = []
  words = []
  totalScore = 0
  res.send({ 'success': true })
})

app.delete('/buzzwords', (req, res) => {
  const wordObj = req.body
  console.log('wordObj =', wordObj)
  if (words.includes(wordObj.buzzWord)) {
    Objects = Objects.filter(element => {
        return element.buzzWord !== wordObj.buzzWord
    })
    res.send({ success: true})
    console.log('buzzword DELETED')
  }
  else {
    res.send({ success: false})
    console.log('buzzword NOT deleted')
  }  
})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`)
})