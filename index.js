const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const app = express();

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME
  cloud_name: "dpnmrrich",
  api_key: "836887264638138",
  api_secret: "Y6Sq__gmIlehWUnTZgJ9O68hxlY"
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

app.get("/myget", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/mypost", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let result;
  let imageArray = [];

  // To upload multiple images
  if (req.files) {
    for (let i = 0; i < req.files.samplefile.length; i++) {
      result = await cloudinary.uploader.upload(req.files.samplefile[i].tempFilePath, {
        folder: "users"
      });

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url
      });

    };
  };

  /*
  // This is used for single image upload
  // let file = req.files.samplefile; // We're taking samplefile from postform.ejs

  // result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: 'users'
  // })
  */

  console.log(result);

  details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray
  };
  console.log(details);
  res.send(details);
});

app.get("/mygetform", (req, res) => {
  res.render("getform");
});

app.get("/mypostform", (req, res) => {
  res.render("postform");
});

app.listen(4000, () => {
  console.log(`Server is running at PORT 4000`);
});