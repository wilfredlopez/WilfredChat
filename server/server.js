const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public'); //to use public path

var app = express();
// to use public folder
app.use(express.static(publicPath));





app.get('/', (req, res) =>{
    res.render('/index.html');
});

app.listen(process.env.PORT || 3000, () =>{
    console.log("listening on port", process.env.PORT || 3000);
});
