const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', { autoescape: true, express: app, watch: true })

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

const middleware = (req, res, next) => {
  if (req.query.age) {
    return next()
  }
  return res.redirect('/')
}

app.get('/major', middleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', middleware, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(3000)
