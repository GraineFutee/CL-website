const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const url = require('url')

// Home
router.get('/', (req, res) => {
    res.render('recipes/index.html')
});

// Getting all
router.get('/recipes', async (req, res) => {
  try {
    var searchData = url.parse(req.url, true)
    searchData = searchData.query
    if (searchData.searchData === undefined) {
      const recipes = await Recipe.find().then(recipes => {
        res.render('recipes/show.html', {recipes: recipes})
      })
    } else {
      const recipes = await Recipe.find({ $or: [{"name" : {$regex : ".*" + searchData.searchData + ".*"}}, {ingredients: {$regex : ".*" + searchData.searchData + ".*"}}]}).then(recipes => {
        res.render('recipes/show.html', {recipes: recipes, search: searchData.searchData})
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one

router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id).then(recipe => {
    res.render('recipes/showOne.html', {recipe: recipe})
  },
  err => res.status(500).send(err))
});

module.exports = router
