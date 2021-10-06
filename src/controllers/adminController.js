const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  signin: (req, res) => {
    res.render("adminLogin");
  },
  dashboard: (req, res) => {
    res.render("adminIndex", {
      session: req.session,
    });
  },
  products: (req, res) => {
    db.Product.findAll().then((products) => {
      res.render("adminProducts", {
        products,
        session: req.session,
      });
    });
  },
  productsCreate: (req, res) => {
    let categoriesPromise = db.Category.findAll();
    let subcategoriesPromise = db.Subcategory.findAll();

    Promise.all([categoriesPromise, subcategoriesPromise])
      .then(([categories, subcategories]) => {
        res.render("adminProductCreateForm", {
          categories,
          subcategories,
          session: req.session,
        });
      })
      .catch((err) => console.log(err));
  },
  productStore: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }

    if (errors.isEmpty()) {

      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      let { name, price, discount, category, subcategory, description } =
        req.body;

      db.Product.create({
        name,
        price,
        discount,
        subcategoryId: subcategory,
        description,
      })
      .then(product => {
          if(arrayImages.length > 0){
              let images = arrayImages.map(image => {
                  return {
                      image: image,
                      productId: product.id
                  }
              })
              db.ProductImage.bulkCreate(images)
                .then(() => res.redirect('/admin/products'))
                .catch(err => console.log(err))
          }
      })

      /*       let lastId = 1;

      products.forEach((product) => {
        if (product.id > lastId) {
          lastId = product.id;
        }
      });

      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      let { name, price, discount, category, subcategory, description } =
        req.body;

      let newProduct = {
        id: lastId + 1,
        name,
        price,
        description,
        discount,
        category,
        subcategory,
        image: arrayImages.length > 0 ? arrayImages : "default-image.png",
      };

      products.push(newProduct);

      writeProductsJSON(products);

      res.redirect("/admin/products"); */
    } else {
      res.render("adminProductCreateForm", {
        subcategories,
        categories,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  productEdit: (req, res) => {
    let product = products.find((product) => product.id === +req.params.id);
    res.render("adminProductEditForm", {
      categories,
      subcategories,
      product,
      session: req.session,
    });
  },
  productUpdate: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      let { name, price, discount, category, subcategory, description } =
        req.body;

      products.forEach((product) => {
        if (product.id === +req.params.id) {
          (product.id = product.id),
            (product.name = name),
            (product.price = price),
            (product.description = description),
            (product.discount = discount),
            (product.category = category),
            (product.subcategory = subcategory),
            (product.image = arrayImages > 0 ? arrayImages : product.image);
          console.log(product);
        }
      });
      writeProductsJSON(products);

      res.redirect("/admin/products");
    } else {
      let product = products.find((product) => product.id === +req.params.id);

      res.render("adminProductEditForm", {
        subcategories,
        categories,
        product,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  productDestroy: (req, res) => {
    products.forEach((product) => {
      if (product.id === +req.params.id) {
        let productToDestroy = products.indexOf(product);
        products.splice(productToDestroy, 1);
      }
    });

    writeProductsJSON(products);

    res.redirect("/admin/products");
  },
};
