const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello Welcome to CENRO')
})

// routes
require('./routes/base.routes')(app);

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
})