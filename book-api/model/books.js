const {v4: uuid } = require('uuid');
const data = [{
  "id": uuid(),
  "title": "Atomic Habits",
  "author": "James Clear",
  "year": 2018
},
{
  "id": uuid(),
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
},
{
  "id": uuid(),
  "title": "Deep Work",
  "author": "Cal Newport",
  "year": 2016
},
{
  "id": uuid(),
  "title": "Educated",
  "author": "Tara Westover",
  "year": 2018
},
{
  "id": uuid(),
  "title": "Thinking, Fast and Slow",
  "author": "Daniel Kahneman",
  "year": 2011
}
]

module.exports = data;