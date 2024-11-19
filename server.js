import express from 'express';

const app = express();
app.listen(3000, () => {
    console.log('Server is Running on http://localhost:3000/');
});

app.get("/", (req, res) => {
    res.status(200)
    .send(
        "lorem ipsum dolor sit amet"
    );
});