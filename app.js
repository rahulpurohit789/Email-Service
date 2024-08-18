import express from 'express';

import emailController from './controllers/emailcontroller.js';
import { upload } from './services/Emailservice.js';  // Import the upload middleware
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', upload.array('attachments'), emailController.sendEmailController);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
