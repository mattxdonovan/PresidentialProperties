var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

var pageToVisit = "http://www.yourbostonapartments.com/";

  request(pageToVisit, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  addToBeg();
  function addToBeg () {
    fs.writeFile('seeds/pres.js', "exports.seed = function(knex, Promise) {"+ '\n' + "return knex('presprops').del()"+ '\n' + ".then(function () {"+ '\n' + "return Promise.all(["+ '\n');
  };

var properties = $('article.property-listing-simple');
  properties.each(function( index ) {
   var aptTitle = $(this).find('h3.entry-title').text().trim();
   var aptPrice = $(this).find('div.price-wrapper > span.price').first().text().trim();
   var aptBedrooms = $(this).find('div.meta-inner-wrapper > span.meta-item-value').first().text().trim();
   var aptBathrooms = $(this).find('div.meta-inner-wrapper > span.meta-item-value').eq(1).text().trim();
   var aptType = $(this).find('div.meta-inner-wrapper > span.meta-item-value').eq(2).text().trim();
   var aptStatus = $(this).find('div.meta-inner-wrapper > span.meta-item-value').last().text().trim();
   var aptThumbLink = $(this).find('.property-thumbnail img').attr("src");
   console.log(properties.length,index);
   console.log("Title: " + aptTitle);
   console.log("Price: " + aptPrice);
   console.log("Bedrooms: " + aptBedrooms);
   console.log("Bathrooms: " + aptBathrooms);
   console.log("Type:" + aptType);
   console.log("Status:" + aptStatus);
   console.log("Picture Link:" + aptThumbLink);
   console.log("-----------------------------------------------------------------------------------------------------------");
   if  (index === properties.length-1){
     fs.appendFile('seeds/pres.js', "knex('presprops').insert({title: " + "'" +aptTitle+ "', price: '" +aptPrice+ "', bedrooms: " +aptBedrooms + "," + "bathrooms: " +aptBathrooms+ ", type: '" +aptType+ "' , status: '" +aptStatus+ "' , piclink: '" +aptThumbLink+ "' " + '})'+ "\n");
   } else {
     fs.appendFile('seeds/pres.js', "knex('presprops').insert({title: " + "'" +aptTitle+ "', price: '" +aptPrice+ "', bedrooms: '" +aptBedrooms + "' ," + "bathrooms: '" +aptBathrooms+ "' , type: '" +aptType+ "' , status: '" +aptStatus+ "' , piclink: '" +aptThumbLink+ "' " + '}),'+ "\n");
   }
    });


  addToEnd();
 });

function addToEnd () {
  fs.appendFile('seeds/pres.js', "]);" + '\n' + "});" + '\n' + "};" );
};
