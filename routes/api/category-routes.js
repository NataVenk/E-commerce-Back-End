const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  const catData = await Category.findAll();
  return res.json(catData);
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  try{
    const catData = await Category.findByPk(req.params.id, {
      // JOIN with product, using category id
      include: [{ model: Product, where 'category_id = id' }]
    }).then return res.json(catData);


    // const catData = await Category.findByPk(req.params.id);
 
    // return res.json(catData);

    if (!catData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find one category by its `id` value
  // be sure to include its associated Products


router.post('/', async(req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // create a new category


router.put('/:id', async (req, res) => {
  Category.update(
    {
    id: req.body.id,
    category_name: req.body.category_name,
    }
  )
  
  // update a category by its `id` value
});

router.delete('/:id', async(req, res) =>  {
  const catData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });

  return res.json(catData);

});
  // delete a category by its `id` value


module.exports = router;
