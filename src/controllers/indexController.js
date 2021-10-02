const { carousel} = require("../data/dataBase");
const db = require("../database/models");
const { Op } = require('sequelize')

module.exports = {
  index: (req, res) => {
      db.Product.findAll({ //Encontra todos los productos
          where: { // donde
              discount: { // el valor de la columna (database) "discount"
                  [Op.gte]: 5 // sea mayor o igual a 5
              }
          },
          include: [{association: "images"}]
      })
      .then(products => {
        res.render("index", {
            sliderTitle: "Ofertas especiales",
            sliderProducts: products,
            carousel,
            session: req.session,
          })
      })
      .catch(error => console.log(error))
  },
};
