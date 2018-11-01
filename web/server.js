const express = require('express');
const app = express();
const fill = require('lodash/fill');


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/be/feed', function (req, res) {
    res.json({
        products: fill(Array(12), {
            id: 1,
            image: "000/000/product2.jpg",
            link: "/p/spring_jacasdf_asdf_asdf_aket_p-1",
            name: "Spring JackeSpring JackeSpring Jacket",
            price: 1093232
        }, 0, 12)
    });
});

app.listen(3011);