const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  characteristics: {
    type: [String],
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  equipment: {
    type: [String],
    default: ['Aucun']
  },
  history: {
    type: String,
    default: 'No history for the moment ...'
  },
  preparation: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  grade: {
    type: Number,
    default: 5
  },
  picture: {
    type: String
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
