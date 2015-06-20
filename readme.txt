install:
npm install nodejs-database


var db=require('nodejs-database');
var collection='test';
var collection=db.create(collection);
var success=collection.add({'id':'2'});
var record=collection.find();
console.log(record);


more iNFO and learn API pls see the website of tutor http://linthay.info .
