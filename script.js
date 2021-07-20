'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = ''){
    const html = `<article class="country ${className}">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
}

const renderErr = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
};

/////////////////////////////////////// 
/****************
const getCountryData = function(country){
// Declare AJAX call object
const request = new XMLHttpRequest();
// open takes 2 params: second is the URL 
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// send the request
request.send();

// we call callback function as soon as requst is loaded, we use eventlistener
request.addEventListener('load', function(){
    // the result is in JSON format
    // console.log(this.responseText);
    // we need to convert it JS object and destructure it
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
})
}

getCountryData('russia');
getCountryData('iran');
getCountryData('china');
*******************/

////////////////////////////////
// Welcome to Callback Hell
/*
const getCountryAndNeighbor = function(country){
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    
    request.addEventListener('load', function(){
        // console.log(this.responseText);
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        // Render country 1
        renderCountry(data);

        // Get neighbor country (2)
        const [neighbor] = data.borders;

        if(!neighbor) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        // search country by code (alpha)
        request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
        request2.send();

        request2.addEventListener('load', function(){
            const data2 = JSON.parse(this.responseText);
            console.log(data2);
        
            renderCountry(data2, 'neighbour');
        })
    });
    };

    getCountryAndNeighbor('usa');
    */

   // Callback hell
   // setTimeout(function(){
   //     console.log('1 second passed');
   //     setTimeout(function(){
   //         console.log('2 seconds passed');
   //         setTimeout(function(){
   //             console.log('3 seconds passed');
   //             setTimeout(function(){
   //                 console.log('4 seconds passed');
   //             },1000)
   //         },1000)
   //     },1000)
   // },1000)

   
    // PROMISES
    /*
    const getCountryData = function(country){
        // on returned promise from fetch() we call then() method that takes callback function as a parameter. that callback function's argument is the result of fetch() which is 'response' in our case
        fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response){
            console.log(response);
            // we need to read the response. we use json() method for this
            // json() method is also an asynchronous function which returns promise
            return response.json();
            // the result of the returned value is the data that we want. we need to call then() again with callback function to see the actual data
        }).then(function(data){
            console.log(data);
            renderCountry(data[0]);
        })
    };*/

    /*
    // simplified - same as above (this one shows country and its neighbor and the neighbor of the neighbor)
    const getCountryData = function(country){
        // Country 1
        fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((response) => response.json())
        .then((data)=> {
            renderCountry(data[0]);
            const neighbor = data[0].borders[0];
            if(!neighbor) return;

            // Country 2
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
        })
        .then(response => response.json())
        .then(data => {
            renderCountry(data, 'neighbour')

            const neigh2 = data.borders[0];
            if(!neigh2) return;

            // Country 3
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neigh2}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'));
    };
    */
   const getJSON = function(url, errorMsg = 'Something went wrong'){
       return fetch(url).then( response => {
           if(!response.ok) {
               throw new Error(`${errorMsg} ${response.status}`);
           }
           return response.json();
       })
   }

    /****** // same as under but detailed
    const getCountryData = function(country){
        // Country 1
        fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(
        (response) => {
            // create our own error i case of inexisting country, the error is propagated down to catch block immediately with err. message
            if(!response.ok) throw new Error(`Country not found (${response.status})`);

            return response.json()
        })
        .then((data)=> {
            renderCountry(data[0]);
            // const neighbor = data[0].borders[0];
            const neighbor = 'asdsad';

            if(!neighbor) return;

            // Country 2
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
        })
        .then(response => {
            if(!response.ok) throw new Error(`Country not found (${response.status})`);
            return response.json()
        })
        .then(data => {
            renderCountry(data, 'neighbour')
        })
        // add catch() method at the end to handle errors
        .catch(err => {
            // console.error(`${err}🔥`);
            renderErr(`Something went wrong! 🔥🔥🔥 ${err.message}. Try again later!`);
        })
        // finally() gets executed no matter the promise is fulfilled or rejected
        .finally(()=>{
            countriesContainer.style.opacity = 1;
        });
    };
    *****/
    
    const getCountryData = function(country){
        // Country 1
        getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
        .then((data)=> {
            renderCountry(data[0]);
            const neighbor = data[0].borders[0];
            // const neighbor = 'asdsad';
            console.log(neighbor);
            if(!neighbor) throw new Error('No neighbor found!');

            // Country 2
            return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbor}`, 'Country not found');
        })
        .then(data => {
            renderCountry(data, 'neighbour')
        })
        // add catch() method at the end to handle errors
        .catch(err => {
            // console.error(`${err}🔥`);
            renderErr(`Something went wrong! 🔥🔥🔥 ${err.message}. Try again later!`);
        })
        // finally() gets executed no matter the promise is fulfilled or rejected
        .finally(()=>{
            countriesContainer.style.opacity = 1;
        });
    };

    btn.addEventListener('click', function(){
        getCountryData('russia');
    })

    getCountryData('Russia'); // trying to read inexisting country data