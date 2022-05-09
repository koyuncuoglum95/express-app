import express from 'express';
import data from './data/user.json';

const app = express();
const PORT = 3000;

// The following one is debug in express.js
// "debug": "set DEBUG=express:* & nodemon ./index.js --exec babel-node -e js"

// This is for proxies
app.use('trust proxy', 'loopback');

// This is for the public folder on path /
app.use(express.static('public'));

// method to use JSON
//app.use(express.json())

// method to use JSON with forms
app.use(express.urlencoded({extended: true}));

// this is for images folder on path images
app.use('/images', express.static('images'));

// req.body = {}
app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.get('/', (req, res) =>
    // get data first
    res.json(data)
);

// next is next function
app.get('/item/:id', (req, res, next) => {
    // This is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id); // Number is converting string to integer
    console.log(user);
    console.log(data[user]);
    // middleware uses req.object
    console.log(`Request from: ${req.originalUrl}`); // shows url like /item/:id
    console.log(`Request type: ${req.method}`); // shows the type of request like post,get
    // Everything above is middleware
    res.send(data[user]);
    next(); //goes next function
}, (req, res) =>
    console.log('Did you get the right data?')
);

// app.route shorther way doing requests
app.route('/item')
    .get((req, res) => {
        throw new Error(); // This is showing error
        // res.download('images/rocket.jpg')
        // res.redirect('http://www.linkedin.com')
        // res.end()
        // res.send(`a get request with /item route on port ${PORT}`)
    })
    .put((req, res) =>
        res.send(`a put request with /newItem route on port ${PORT}`)
    )
    .delete((req, res) =>
        res.send(`a delete request with /item route on port ${PORT}`)
);

// res.status(500) allow us to show error more smoothly
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red Alert ! Red Alert ! : ${err.stack}`)
})

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    console.log(data);
});
