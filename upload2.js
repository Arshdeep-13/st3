import express from "express";
const app = express();
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "multer-output/");
  },
  filename: function (req, file, cb) {
    if (file.mimetype) {
      cb(null, file.originalname);
    } else {
      const uniqueSuffix = file.mimetype.split("/");
      cb(null, file.originalname + "." + uniqueSuffix[1]);
    }
  },
});

const size = 10000 * 1024 * 1024; // 100MB
const destination = multer({
  storage: storage,
  limits: { fieldSize: size },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      cb(null, true);
    } else {
      cb(new Error("only jpg and png files are supported!!!"), false);
    }
  },
});
// const destination = multer({ dest: "multer-output/" });

app.get("/", (req, res) => {
  res.send("hello world");
});
app.post(
  "/profile",
  destination.fields([{ name: "avatar", maxCount: 2 }]),
  (req, res, next) => {
    res.send(req.files);
  }
);

app.listen(3000, () => {
  console.log("Server started");
});
