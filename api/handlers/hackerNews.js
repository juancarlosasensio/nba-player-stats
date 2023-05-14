const fetch = require('node-fetch');
const jsdom = require('jsdom');
const processErrorResponse = require('../utils/processErrorResponse.js');
const { filterEmptyURL, sortByDate } = require('../utils/hnDataFilters');

const getArticlesByQuery = async (req, res) => {
  const { query } = req.params
  console.log("You've hit /api/hackerNewsTest with query: ", query)
  try { 
    const URL = `https://hn.algolia.com/api/v1/search?query=${query}`;
    const response = await fetch(URL, {
      host: 'hn.algolia.com',
      port: process.env.PORT || 8081,
      path: `/api/v1/search?query=${query}`,
      method : 'GET'
    });
    const data = await response.json();
    const articles = data.hits;

    const filteredArticles = articles.filter(filterEmptyURL);
    filteredArticles.sort(sortByDate)

    res.status(200).json(filteredArticles);

  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage); 
  }
}
const getFrontPageArticles = async (req, res) => {
  console.log("You've hit /api/hackerNewsTest with no 'query' param. You'll get front page results.")
  try { 
    const URL = `http://hn.algolia.com/api/v1/search?tags=story,front_page`;
    const response = await fetch(URL, {
      host: 'hn.algolia.com',
      port: process.env.PORT || 8081,
      path: '/api/v1/search?tags=front_page',
      method : 'GET'
    });
    const data = await response.json();
    const filteredArticles = data.hits.filter(filterEmptyURL);
    
    res.status(200).json(filteredArticles);

  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage); 
  }
}

module.exports = {
  getArticlesByQuery,
  getFrontPageArticles,
};