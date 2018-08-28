const express = require('express')
const app = express()
const bp = require('body-parser')

const PORT = process.env.PORT || 8080



// ** MIDDLEWARE **

app.use(bp.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`\n${req.method} request at: ${req.url}`)
  next()
});

// ** TO GET ALL USE OF PUBLIC FOLDER **
app.use(express.static('public'))



// ** ROUTES  **

let Objects = []
let words = []
let totalScore = 0

app.get('/buzzwords', (req, res) => {
  res.json(Objects)
  console.log('Objects =')
  console.log(Objects);
  console.log('totalScore =', totalScore)
})

app.post('/buzzwords', (req, res) => {
  // console.log('req.body =', req.body)
  const wordObj = req.body
  // console.log('wordObj =', wordObj)
  // console.log('wordObj.buzzWord =', wordObj.buzzWord)
  // console.log('words', words)
  // console.log('Objects.length before =', Objects.length)
  if (words.includes(wordObj.buzzWord)) {
    console.log('  ** buzzword already posted')
    res.send({ "success": false})
  } 
  else if (Objects.length > 1) {
    console.log('  ** limit of buzzwords reached')
    res.send({ "success": false})
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
  const resetObj = req.body
  console.log('resetObj =', resetObj)
  console.log('resetObj.reset =', resetObj.reset)
  if (resetObj.reset = true) {
    Objects = []
    words = []
    totalScore = 0
    res.send({ "success": true })
    console.log('reset SUCCESSFUL')
  }
  else {
    res.send({ "success": false})
    console.log('COULD NOT reset')
  }
})

app.delete('/buzzwords', (req, res) => {
  const wordObj = req.body
  console.log('wordObj =', wordObj)
  if (words.includes(wordObj.buzzWord)) {
    Objects = Objects.filter(element => {
        return element.buzzWord !== wordObj.buzzWord
    })
    words = words.filter(element => {
      return element !== wordObj.buzzWord
    })
    res.send({ "success": true})
    console.log('buzzword DELETED')
  }
  else {
    res.send({ "success": false})
    console.log('  ** buzzword NOT FOUND')
  }  
})

app.post('/heard', (req, res) => {
  const heard = req.body
  console.log('heard =', heard)
  if (words.includes(heard.buzzWord)) {
    Objects.filter(element => {
      console.log('element =', element)
      if (element.buzzWord === heard.buzzWord)
      totalScore += Number(element.points)
      element['heard'] = true
    })
    res.send( `{ "totalScore": ${totalScore} }`)
    console.log('totalScore =', totalScore)
  }
  else {
    res.send({ "success": false })
    console.log('  ** buzzword NOT FOUND')
  }
})

app.put('/buzzwords', (req, res) => {
  const wordObj = req.body
  console.log('wordObj =', wordObj)
  console.log('totalScore before newScore =', totalScore)
  if (words.includes(wordObj.buzzWord)) {
    Objects.forEach(element => {
      if (element.buzzWord === wordObj.buzzWord) {
        // console.log('element.buzzWord =', element.buzzWord)
        // console.log('element.points before =', element.points)
        // console.log('wordObj.points =', wordObj.points)
        element.points = Number(wordObj.points)
        // console.log('element.points after =', element.points)
        totalScore += Number(element.points)
        console.log('totalScore =', totalScore)
        element['heard'] = true
      }
    })
    res.send(`{ "success": true, "newPoints": ${wordObj.points}, "newScore": ${totalScore}`)
    console.log(`UPDATED newPoints for ${wordObj.buzzWord} = ${wordObj.points} \nUPDATED newScore = ${totalScore} \nUPDATED Objects with "heard": true`)
  }
  else {
    res.send({ "success": false })
    console.log('  ** COULD NOT UPDATE')
  }
})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`)
})