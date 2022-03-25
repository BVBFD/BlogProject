import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import postsDataRouter from './routes/postsDataRouter.js';
import loginDatasRouter from './routes/loginDatasRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import ContactDatasModel from './models/contactDatasModel.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';

dotenv.config();

const app = express();
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use("/images", express.static(path.join(__dirname, "/image")));

const cspOptions = {
  directives: {
    // 기본 옵션을 가져옵니다.
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),

    // cloudinary 사이트의 이미지 소스를 허용합니다.
    'img-src': ["'self'", 'data:', `https://res.cloudinary.com`],
  },
};

// Helmet의 모든 기능 사용. (contentSecurityPolicy에는 custom option 적용)
app.use(
  helmet({
    contentSecurityPolicy: cspOptions,
  })
);

app.use(cors());
app.use(morgan('tiny'));

app.get('/lee', (req, res, next) => {
  console.log('Hey this is initial test code!');
  return res.status(200).send(console.log('Success!'));
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "image");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'myportfolioblogproject',
    format: async (req, file) => 'gif',
    public_id: (req, file) => req.filename,
  },
});

const upload = multer({ storage: storage });

app.post('/pic/upload', upload.single('file'), (req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.status(200).json(req.file.path);
});

// app.post("/pic/upload", upload.single("file"), (req, res, next) => {
//   res
//     .status(200)
//     .json(
//       `https://myportfolioblogproject.herokuapp.com/images/${req.body.name}`
//     );
// });

app.use('/posts', postsDataRouter);
app.use('/loginDatas', loginDatasRouter);
app.post('/contacts', async (req, res, next) => {
  try {
    const newContact = new ContactDatasModel({
      customerName: req.body.customerName,
      email: req.body.email,
      number: req.body.number,
      message: req.body.message,
    });
    !newContact && res.status(400).json('Bad Request!');
    const savedNewContact = await newContact.save();
    console.log(savedNewContact);
    res.status(201).json({ savedNewContact });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log('Mongo DB Start!'))
  .catch((err) => console.error(err));

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend is running check!');
});
