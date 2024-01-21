const express = require('express')
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes); 

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));