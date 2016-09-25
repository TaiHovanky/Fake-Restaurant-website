var express = require('express');
var app = express();
var exphbs = require('express3-handlebars');
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //mentions default layout
app.set('view engine', 'handlebars');





app.get('/', function(req, res){
    res.render('restaurantIndex', {
        facts: [
  {
    sectionTitle: "aboutUs",
    info: "Thai restaurant group and the destination for THAI FOOD aficionados craving the freshest, finest, and most authentic Thai cuisine. We offer true TAMRAP KAP KHAO, or traditional, handed-down, family-style tastes. Now with four convenient locations."
  },
  {
    sectionTitle: "history",
    info: "It all started with Sam learning to cook by his mother's side as a child. Since then, his passion for cooking authentic Thai food has continued to grow. He started by working in various Thai restaurants in New York City for 2 years. Believing that he needed to return to the source, he spent 4 years in Thailand, working in kitchens in Bangkok and Chaing Mai. Upon returning to the US, he traveled throughout the country, looking to settle down and start a new restaurant. When he got to Austin, TX, he fell in love with the city. On a hot, humid summer day in 2003 - not unlike those in Thailand - Sam opened up Thai How Are You on Guadalupe street near UT campus. It quickly became a local favorite and has since expanded to various locations throughout Austin."
  },
  {
  sectionTitle: "food",
  info: "Sam’s menu exhibits a dedication to the freshest of ingredients and the very essence of true Thai taste. Shortcuts are never taken and compromises of any kind are never allowed. His menu selection is a reflection of primarily family-style Thai cuisine, based on culinary knowledge and methods that are generations old. Culinary critics rave about the authenticity and quality of the food, boasting that the food at Thai How Are You is as good or better than that which could be had in the homeland. Sam prides himself on the taste, quality, portions and price of his food, and strives to provide her customers with fast, friendly and efficient services in a welcoming atmosphere."
  }
],
        images:[
  {
    src: "http://www.girlmakesfood.com/wp-content/uploads/2012/08/Vegan-Spring-Rolls.jpg",
    title: "Spring Rolls",
    price: "$4.75",
    description: "Rice paper stuffed with rice vermicelli, vegetables, basil and mint leaves. Served with spicy peanut sauce."
  },
    {
    src: "http://tastykitchen.com/wp-content/uploads/2011/02/TKBlog-chicken-satay-9.jpg",
    title: "Chicken Satay",
    price: "$7.50",
    description: "Grilled marinated meat or tofu on skewers. Served with spicy peanut sauce"
    },
  {
    src: "http://previews.123rf.com/images/skyman/skyman1402/skyman140200012/26049097-close-up-Thai-Food-name-Fried-Fish-Cake-Tod-Mun-Pla--Stock-Photo.jpg",
    title: "Tod Mun",
    price: "$6.95",
    description: "Ground chicken mixed with Thai spices, kaffir lime leaves and chopped green bean, served with sweet and sour cucumber sauce topped with ground peanut"
    },
  {
    src: "http://www.pbs.org/food/wp-content/blogs.dir/2/files/2012/11/curry-fried-rice-1.jpg",
    title:"Fried Rice",
    price: "$8.50",
    description: "Stir-fried rice with shrimp paste Thai herb, green onions, eggs, and flower mushroom."
  },
  {
    src: "http://www.nikdaum.com/news/mai420.jpg",
    title:"Panang Curry",
    price: "$9.50",
    description: "Thai red curry with shredded magrood, and Thai basil."
  },
  {
    src: "http://drinks.seriouseats.com/images/2011/11/20111103padthai.jpg",
    title:"Pad Thai",
    price: "$9.50",
    description: "Rice stick noodles stir-fried with meat, eggs, sweet pickled radish, small tofu, bean sprouts and crushed peanuts in a tangy and sweet sauce."}
  ],
        places: [
  {
    name: "Guadalupe",
    address: "2514 Guadalupe street Austin, Texas, 78705",
    phone: "512-472-8306",
    hours: "Daily 11AM – 10PM"
  },
  {
    name: "The Village",
    address: "2700 West Anderson Lane Austin, Texas",
    phone: "512-371-9930",
    hours: "Daily 11AM – 10PM"
  },
  {
    name: "Galleria",
    address: "3929 Market Street P-100, Bee Cave, Austin 78738",
    phone: "512-263-7507",
    hours: "Daily 11AM – 10PM"
  },
  {
    name: "Shady Hollow",
    address: "9911 Brodie Lane,Austin TX 78748",
    phone: "512-366-5859",
    hours: "Daily 11AM – 10PM"
  }
]}); //automaticaly looks in Views folder so we don't mention views'
});

app.post('/', function(req, res){
    function processFields(req, res){
        var fields = [];
        var form = new formidable.IncomingForm();
        //form.uploadDir = __dirname + "/Views";
        form.on("field", function(field, value){
            fields[field] = value;
        });
        //form.on("field", function(name, value){
            //res.writeHead(200, {'Content-Type': 'text/plain'});
            
            var x = value;
            //res.end(x);
            //fs.writeFile(__dirname + '/orders.txt', x, function(err){});
        //});
        form.on("end", function(){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var y = util.inspect({
                fields: fields
            });
            res.end(y);
            fs.writeFile(__dirname + '/orders.txt', y, function(err){});
        })
        form.parse(req);
    }
    processFields(req, res);
});

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
app.listen(port);