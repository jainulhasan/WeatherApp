const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const hbs = require('hbs');

const staticpath = path.join(__dirname, "../public");
const path1 = path.join(__dirname, "../templates/views");

const path2 = path.join(__dirname, "../templates/partials");
hbs.registerPartials(path2)
app.set('views', path1);
app.set('view engine', 'hbs');
app.use(express.static(staticpath))

app.get("", (req, res) => {
    res.render('index');
})
app.get("/about", (req, res) => {

    res.render('about');
})
app.get("/weather", (req, res) => {
    res.render('weather');
})
app.get("*", (req, res) => {
    res.render('errorpage', {
        errorMsg: 'Opps!! Page not found'
    })
})
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})