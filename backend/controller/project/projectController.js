const express = require("express");
const router = express.Router();
const projectModel = require("../../model/project");



router.get("/getDataProject", (req, res) => {
  projectModel.find(req.body, (err, data) => {
    if (err) {
      res.send({
        result: "failed"
      });
    } else {
      res.send(data);
    }
  });
});


router.get("/getDataProjectforupdate/:_id", (req, res) => {
  projectModel.findById(req.params._id, (err, data) => {
    if (err) {
      res.send({
        result: "failed"
      });
    } else {
      res.send({
        result : "success",
        dataProject : data

      });
    }
  });
});



router.put("/updateProject/:_id", (req,res)=>{
  let dataProject = {
    projectName : req.body.projectName,
   };
  console.log("dataProject", dataProject)
   projectModel.findByIdAndUpdate(
     req.params._id,{ $set : dataProject }, {new: true}, (err,data) =>{
     if(err){
       res.send({
         result: "failed"
       });
     }else {
       res.send({
        result : "success",
        dataProject : data

        });
     }
   })
 })



router.post("/createProject", (req, res) => {

    let projectName = req.body.projectName;
    projectModel.create(req.body, (err, doc) => {
      if (err) {
        res.send({
          result: "failed"
        });
      }
      res.send({
        result: "success",
        projectName: projectName,
      });
    });
  });




router.delete("/deleteDataProject/:_id", (req, res) => {
  projectModel.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) {
      res.send({
        result: "failed"
      });
    } else {
      res.send({
        result : "success",
        });
    }
  });
});


router.post("/searchListProject", async (req, res) => {
  try {

    let data = {};
    if(req.body.projectName) {
      data.projectName =  new RegExp (req.body.projectName,"i")
    }

    let responseData = await mongoservice.findsearch(req, projectModel, data);
    res.send(responseData)

  } catch (error) {
    console.log("error", error)
    res.send('error')
  }

});


// router.get("/getAllDataProject", async (req, res) => {
//   try {
//    let responseData = await mongoservice.findAllCustomer(req, projectModel);
//    res.send(responseData)

//   } catch (error) {
//     console.log(error)
//     res.send('error')
//   }
// });



module.exports = router;
