const Product = require('../models/product.model');
const traject = require('../models/traject.model');
var bcrypt = require('bcrypt');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('hola i am here nigger');
};

//Connexion
exports.product_login = function (req, res, callback) {
  Product.find({ pseudo: req.body.pseudo })
  .exec(function (err, Product) {
      if (err) {
        return res.status(404)
      } 
      else if (Product != undefined && Product.length){
        bcrypt.compare(req.body.password, Product[0].password, function (err, result) {
        if (result == true) {
          //req.session.userId = Product[0].id;
          // Si le mot de passe correspond a l'identifiant
          return res.sendStatus(200)
        } else {
          // Si le mot de passe ne correspond pas a l'identifiant
          return res.sendStatus(404)
        }
      })
    } else{
      // En cas d'erreur d'autre type
      return res.status(404).send("erreur")
    }
    });
}


//Deconnexion
exports.product_logout = function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.send("deconnexion");
          }
        });
      }
};

//Create User
exports.product_create = function (req, res) {

    let product = new Product(
        {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password
        
        }
    
    );
    
    Product.find( {pseudo :product.pseudo}, function (err, ProductFind) {
        if (err) return next(err);
        if(ProductFind.length){
            console.log("utilisateur deja present")
            var present = "Utilisateur déja inscrit"
            res.send(present)

        }else{
            console.log("Utilisateur non present")
            Product.create(product, function (error, user) {
                if (error) {
                  return next(error);
                } 
                else {
                  req.session.userId = user._id;
                  return res.status(200).send(req.session.userId)
                }
              });
        }
       })

    
};

//Create trajet
exports.product_create_trajet = function (req, res) {

  let trajet = new traject(
      {
        dateDepart: req.body.heureDepart,
        heureDepart: req.body.heureDepart,
        lieuDepart: req.body.lieuDepart,
        lieuArrive: req.body.lieuArrive,
        pseudo:req.body.pseudo
      
      }  
    );
    
    console.log(trajet)

    traject.create(trajet, function (error) {
      if (error) {
        return next(error);
      } 
      else {
        return res.status(200).send("Produit créé")
      }
    });
  }

//read all user
exports.product_all = function (req, res) {
    Product.find( function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
};

//read all traject
exports.product_all_traject = function (req, res) {
  traject.find( function (err, traject) {
      if (err) return next(err);
      res.json(traject);
  })
};

//read
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//update
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};
//delete
exports.product_delete = function (req, res) {
    Product.remove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};