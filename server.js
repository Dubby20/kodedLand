const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const routes = require('./routes');

const PORT = 4000;

const app = express();

mongoose.Promise = global.Promise

let db = mongoose.connect('mongodb://kodedland:kodedland@ds125113.mlab.com:25113/kodedland').then(() => {
    console.log('Database successfully connected')
}).catch((err) => {
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use('/', routes);

// app.get('/', (req, res) => {
//     res.send('Home Page');
// })

  





app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
})