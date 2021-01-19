import axios from 'axios'
const express = require('express')
const app = express()

const get = (url, res) => {
  let key = '?api_key='
  if (url.includes('?')) { key = '&api_key=' }
  const target = process.env.VUE_APP_API_URL + '/' + url + key + process.env.VUE_APP_API_KEY
  axios.get(target).then((response) => {
    res.json(response.data)
  })
}

app.get('/playing', (req, res) => {
  get('movie/now_playing', res)
})
app.get('/movie', (req, res) => {
  get('discover/movie?sort_by=popularity.desc', res)
})
app.get('/tv', (req, res) => {
  get('discover/tv?sort_by=popularity.desc', res)
})
app.get('/search/:query', (req, res) => {
  get('search/movie?query=' + req.params.query, res)
})
app.get('/detail/:id', (req, res) => {
  get('movie/' + req.params.id, res)
})
app.get('/credit/:id', (req, res) => {
  get('movie/' + req.params.id + '/credits', res)
})

module.exports = {
  path: '/api',
  handler: app
}
