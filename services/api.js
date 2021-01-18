import axios from 'axios'

/**
 * todo: hide api_key from url
 *
 * as i know, the safest way to hide url from console network is
 * make request from server side, so we need to create another API
 * to send request to target url
 */

export const get = (url, response, error) => {
  let target = url + '?api_key=' + process.env.API_KEY
  if (url.includes('?')) {
    target = url + '&api_key=' + process.env.API_KEY
  }
  axios.get(target).then(response).catch(error)
}

export const getImage = (path) => {
  let result = null
  if (path) {
    result = 'https://image.tmdb.org/t/p/w200' + path
  }
  return result
}
