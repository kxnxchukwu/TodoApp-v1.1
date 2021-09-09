const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', function (req, res){
    let day = date.getDate();
    res.render('list', {listTitle : day, newListItem : items})
});

app.post('/', function (req, res){
    let item = req.body.nextitem;

    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function (req, res) {
    res.render('list', {listTitle: 'Work', newListItem: workItems});
})

app.post('/work', function (req, res) {
    let item = req.body.nextitem;
    workItems.push(item);
    res.redirect('/work');
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on Port 3000")
});
