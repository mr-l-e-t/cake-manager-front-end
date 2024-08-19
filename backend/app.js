import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});
const delay = ms => new Promise(res => setTimeout(res, ms));
app.get('/api/cakes', async (req, res) => {
    //  await delay(5000);
    // console.log("inside axios' fetchCakes(). Waited 5s");
  const cakesFileContent = await fs.readFile('./data/cakes.json');
  let cakes = JSON.parse(cakesFileContent).filter((cake)=> !cake.isDeleted);


  res.json(
     cakes.map((cake) => ({
      id: cake.id,
      title: cake.title,
      description: cake.description,
      image_url: cake.image_url,
      ingredients: cake.ingredients?.map((ingredient) =>({
        id: ingredient.id,
        ingredient: ingredient.ingredient
      })),
    })),
  );
});


app.get('/api/cake/:id', async (req, res) => {
  const { id } = req.params;
  //  await delay(3000);
  // console.log("inside axios' fetchCakes(). Waited 3s");
  const cakesFileContent = await fs.readFile('./data/cakes.json');
  const cakes = JSON.parse(cakesFileContent);

  const cake = cakes.find((cake) => cake.id == id);

  if (!cake || cake.isDeleted) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no cake could be found.` });
  }

  setTimeout(() => {
    res.json({ cake });
  }, 1000);
});

app.post('/api/cake', async (req, res) => {
  const { cake } = req.body;

  if (!cake) {
    return res.status(400).json({ message: 'cake object is required' });
  }

  if (
    !cake.title?.trim() ||
    !cake.description?.trim() ||
    !cake.image_url?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid cake details provided.' });
  }

  const cakesFileContent = await fs.readFile('./data/cakes.json');
  const cakes = JSON.parse(cakesFileContent);
  const ingredients = cakes.findLast((cake)=> cake?.ingredients).ingredients;
  
  //add id to ingredients - if available
  var lastIngredientID = +ingredients[ingredients.length-1].id;
  if ( Array.isArray(cake.ingredients) && cake.ingredients.length){
    const ingredientsWithID = cake.ingredients.map(ing => ({id: ++lastIngredientID, ...ing}));
    cake.ingredients = [...ingredientsWithID];    
  }

  //get last cake id and increment it by one
  const latestCakeID =+cakes[cakes.length-1].id;
  const newCake = {
    id: latestCakeID+1,
    ...cake,
    isDeleted: false,
  };

  cakes.push(newCake);

  await fs.writeFile('./data/cakes.json', JSON.stringify(cakes));

  res.json({ cake: newCake });
});

app.put('/api/cake/:id', async (req, res) => {
  const { id } = req.params;
  const { cake: cake } = req.body;  
  if (!cake) {
    return res.status(400).json({ message: 'cake is required' });
  }

  if (
    !cake.title?.trim() ||
    !cake.description?.trim() ||
    !cake.image_url?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid cake details provided.' });
  }

  const cakesFileContent = await fs.readFile('./data/cakes.json');
  const cakes = JSON.parse(cakesFileContent);

  const cakeIndex = cakes.findIndex((cake) => cake.id == id);

  if (cakeIndex == -1) {
    return res.status(404).json({ message: 'cake not found' });
  }

  cakes[cakeIndex] = {
    id,
    ...cake,
  };

  await fs.writeFile('./data/cakes.json', JSON.stringify(cakes));

  setTimeout(() => {
    res.json({ cake: cakes[cakeIndex] });
  }, 1000);
});

app.delete('/api/cake/:id', async (req, res) => {
  const { id } = req.params;
  console.log("inside delete cake");
  const cakesFileContent = await fs.readFile('./data/cakes.json');
  const cakes = JSON.parse(cakesFileContent);

  const cakeIndex = cakes.findIndex((cake) => cake.id == id);

  if (cakeIndex == -1) {
    return res.status(404).json({ message: 'cake not found' });
  }

  cakes[cakeIndex] = {
    id,
    ...cakes[cakeIndex],
    isDeleted: true
  };

  await fs.writeFile('./data/cakes.json', JSON.stringify(cakes));

  setTimeout(() => {
    res.json({ message: 'Cake deleted' });
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
