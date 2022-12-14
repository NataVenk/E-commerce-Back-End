const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {

  const tagData = await Tag.findAll();
  return res.json(tagData)
});

router.get('/:id', async(req, res) => {
  
  const tagData = await Tag.findByPk(req.params.id, {
    // JOIN with product, using category id
    include: [Product],
  })
   return res.json(tagData);
 
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async(req, res) => {
 
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {

  try{
    const{id, tag_name} = req.body;
    const updateTag = await Tag.update(
      {id, tag_name},
  {
    where: {
      id: req.params.id
    }
  });
  res.json(updateTag);
}
  catch(err){
    res.status(404).json(err);
  }
});

router.delete('/:id',  async(req, res) =>  {

  const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });

  return res.json(tagData);

});

module.exports = router;
