// IMPORTACIONES

const express     = require('express')
const app         = express()
const mongoose    = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
    return
  })
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   Recipe.create()
  // })
  

  // INVOCAR LAS VARIABLES DE ENTORNO (EL ARCHIVO .env)
 require('dotenv').config()
 // ACTIVA LA CARPETA PUBLIC
 app.use(express.static('public'))
 // ACTIVA HANDLEBARS EN LUGAR DE HTML
 app.set("view engine", "hbs")
 

 //RUTAS

 app.get("/", (req, res) => {
 /*  const RecipeOne = {
    title: "Rigatoni alla Genovese",
    level: "Easy Peasy",
    ingredients: [
      "2 pounds red onions, sliced salt to taste",
      "2 (16 ounce) boxes uncooked rigatoni",
      "1 tablespoon chopped fresh marjoram leaves",
      "1 pinch cayenne pepper",
      "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
    ],
    cuisine: "Italian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
    duration: 220,
    creator: "Chef Luigi"
   }

   Recipe.create(RecipeOne, (err, newRecipe) => {
     if(err){
        console.log(`Hubo un error:  ${err}`)
        return
     } 
  */
     mongoose.connection.close(() => process.exit(0));
  
  Recipe.insertMany(data)
    .then((createRecipes) => {
      createRecipes.forEach((recipe) => {
        console.log(recipe.title)
      })
    })

  Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then(() => console.log("Recipe Updated"))

  Recipe.deleteOne({ title: 'Carrot Cake'})  
  .then(() => console.log("Carrot cake Deleted"))

    .catch(error => {
      console.error('Error connecting to the database', error);
    });
 
   res.render("index")

  })


  app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo")
})