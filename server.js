import express from 'express';
import routes from './src/routes/postsRoutes.js';

const app = express();
app.use(express.static('uploads'))
routes(app);

app.listen(3000, () => {
    console.log('Server is Running on http://localhost:3000/posts');
});


