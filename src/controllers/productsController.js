const { categories } = require("../data/dataBase");
const db = require("../database/models");

module.exports = {
  detail: (req, res) => {
    db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "images",
        },
      ],
    })
      .then((product) => {
        db.Product.findAll({
          where: {
            subcategoryId: product.subcategoryId,
          },
          include: [
            {
              association: "images",
            },
          ],
        }).then((products) => {
          res.render("productDetail", {
            sliderTitle: "Productos relacionados",
            sliderProducts: products,
            product,
            session: req.session,
          });
        });
      })
      .catch((err) => console.log(err));

    /* let productID = +req.params.id;
        
        let product = products.find(product => product.id === productID)
        let sliderProducts = products.filter(item => item.category === product.category)

        res.render('productDetail', {
            sliderTitle : "Productos relacionados",
            sliderProducts,
            product,
            categories,
            session: req.session
        }) */
  },
  category: (req, res) => {
    db.Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "subcategories",
          include: [
            {
              association: "products",
              include: [
                {
                  association: "images",
                },
              ],
            },
          ],
        },
      ],
    }).then((category) => {
      let subcategories = category.subcategories;
      let products = [];
      subcategories.forEach((subcategory) => {
        subcategory.products.forEach((product) => products.push(product));
      });
      res.render("categories", {
        category,
        products,
        session: req.session,
      });
    });

    /* Busco la categoría solicitada */
    /*   let category = categories.find(category => {
            return category.id === +req.params.id
        }) */
    /* Busco los productos que correspondan a esa categoría */
    //let categoryProducts = products.filter(product => +product.category === +req.params.id)

    /* Busco las subcategorias que corresponden a la categoria seleccionada */
    /*   let subCategories = [];
        categoryProducts.forEach(product => {
            if(!subCategories.includes(product.subcategory)){
                subCategories.push(product.subcategory)
            }
        });

        res.render('categories', {
            category,
            products: categoryProducts,
            subCategories,
            categories,
            session: req.session
        }) */
  },
};
