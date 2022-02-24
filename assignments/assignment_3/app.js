//import
const express = require('express');
const faker = require('faker');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

//setting static files if any needed
app.use(express.static('public'))
app.use('css', express.static(__dirname + 'public/css'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');


var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
    
app.post('/user/add', urlencodedParser, (req, res) => {
   users.push({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    city: req.body.city,
    profession: req.body.profession

   })
   res.redirect("/");
});
   

const users = []
for(let i = 0; i < 5; i++ ){
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: i +21,
        city: faker.address.city(),
        profession: faker.company.companyName()
    })
}
// console.log(users);

app.get('', (req, res) => {
    res.render('index', {users})
})

app.get('/form', (req, res) => {
    res.render('form')
})


app.listen(port, () => console.info(`sever is running on port ${port}`))