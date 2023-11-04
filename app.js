const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials/'))

// Add the route handlers here:

app.get('/', (req, res) => {

  res.render('index');
});


app.get("/beers", (req, res) => {

  punkAPI.getBeers()
    .then((beersResponse) => {
      return beersResponse

    })
    .then((beersResponse) => {
      res.render("beers", { beersResponse })
    })
    .catch(error => console.log(error))
})


/* punkAPI.getRandom()
  .then((responseFromAPI) => {
    return responseFromAPI[0]
  })

  .then(randomBeer => {
    res.render("random-beer", { randomBeer })
    console.log(randomBeer)
  }) */



app.get("/random-beer", (req, res) => {

  punkAPI.getRandom()
    .then((responseFromAPI) => {
      return responseFromAPI[0]
    })

    .then(randomBeer => {
      res.render("random-beer", { randomBeer })
      console.log(randomBeer)
    })

    .catch(error => console.log("cannot get random beer", error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
