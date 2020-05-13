const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

// Home
router.get('/', (req, res) => {
    res.render('recipes/index.html');
});

module.exports = router

// Getting all
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().then(recipes => {
      res.render('recipes/show.html', {recipes: recipes});
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



module.exports = router
