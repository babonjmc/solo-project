const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());



app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => console.log('listening on port 3000'));