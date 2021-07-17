'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////// 

// First AJAX call
const request = new XMLHttpRequest();
// open takes 2 params: second is the URL 
request.open('GET', 'https://restcountries.eu/rest/v2/name/uzbekistan');
// send the request
request.send();

// we call callback function as soon as requst is loaded, we use eventlistener
request.addEventListener('load', function(){
    // the result is in JSON format
    // console.log(this.responseText);
    // we need to convert it JS object 
    const data = JSON.parse(this.responseText);
    console.log(data);
})
