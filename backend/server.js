const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello CENRO')
})


// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
})