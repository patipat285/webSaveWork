


module.exports.findsearch = function (req, modelMongo, data) {
    return new Promise((resolve, reject) => {
      modelMongo.find(data,(err, doc) => {

         if (err) {
          reject(err);
         }
         resolve(doc);



       });
    });

  }



  module.exports.createCustomer = function (req, modelMongo, data) {
    return new Promise((resolve, reject) => {
      modelMongo.create(data,(err, doc) => {
         if (err) {
          reject(err);
         }
         resolve(doc);


       });
    });

  }


  module.exports.findAllCustomer = function (req, modelMongo) {
    return new Promise((resolve, reject) => {
      modelMongo.find((err, doc) => {
         if (err) {
          reject(err);
         }
         resolve(doc);

       });
    });

  }


  module.exports.findCustomerById = function (req, modelMongo,id) {
    return new Promise((resolve, reject) => {
      modelMongo.findById(id,(err, doc) => {
         if (err) {
          reject(err);
         }
         resolve(doc);

       });
    });

  }


  module.exports.deleteCustomerById = function (req, modelMongo,id) {
    return new Promise((resolve, reject) => {
      modelMongo.findByIdAndDelete(id,(err, doc) => {
         if (err) {
          reject(err);
         }
         resolve(doc);

       });
    });

  }



  module.exports.updatecustomer = function (req, modelMongo,id , data) {
    return new Promise((resolve, reject) => {
      modelMongo.findByIdAndUpdate(id,data,(err, doc) => {

         if (err) {
          reject(err);
         }
         resolve(doc);



       });
    });

  }


  module.exports.selectanddeletecustomer = function (req, modelMongo,id) {
    return new Promise((resolve, reject) => {
      modelMongo.deleteOne(id,(err, doc) => {

         if (err) {
          reject(err);
         }
         resolve(doc);
         console.log("doc : : : ",doc)



       });
    });

  }
