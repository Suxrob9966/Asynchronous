'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');

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
  countriesContainer.style.opacity = 1;
}

const renderErr = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
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
    *********/


    /*********
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

    // btn.addEventListener('click', getCountryData.bind(null,'china'));

    // getCountryData('Russia'); // trying to read inexisting country data
*********************/


    /***************
    // Resolved promise
    console.log("Test start");
    setTimeout(()=> console.log('0 sec timer'), 0); // will be stored in callback queue
    Promise.resolve('Resolved promise 1').then(res => console.log(res)); // will be stored in micro tasks queue
    Promise.resolve('Resolved promise 2').then(res => {
        for(let i =0; i< 10000; i++){}
        console.log(res)
    }); // will be stored in micro tasks queue. tasks in this queue have higher priority over the callback queue and will be done first
    console.log('Test end');
    *****/


    // Creating promises
    /******
    // Promise constructor takes one parameter - executor function which in turn takes two parameters: resolve and reject. 
    // then resolve method is called if the promise is fulfilled and reject if not.
    const lotteryPromise = new Promise(function(resolve, reject){
        console.log('Lottery draw is happening');
           setTimeout(function(){
            if(Math.random() >= 0.5){
                resolve('You win 💰');
            }else{
                reject( new Error('You lost your money 😛'));
            };
        }, 2000);
    });
    // if resolved promise goes into then() method and if rejected it will go into catch() method
    lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
    ******/

    /*********
    // Promisifying setTimoeout
    const wait = function(seconds){
        return new Promise(function(resolve){
            setTimeout(resolve, seconds * 1000);
        });
    };

   /* wait(1)
    .then(()=>{
        console.log('I waited for 1 second');
        return wait(1);
    })
    .then(()=>{
        console.log('I waited for 2 seconds');
        return wait(1);
    })
    .then(()=>{
        console.log('I waited for 3 seconds');
        return wait(1);
    })
    .then(()=> console.log('I waited for 4 seconds')); */

    // The above with callback hell
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

   // Creating resolve and reject
//    Promise.resolve('Something').then(x => console.log(x));
//    Promise.reject(new Error('Problem')).catch(x => console.error(x));
// **********/


/**************
// Promisifying geolocation
const getPosition = function(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position), 
        //     err => reject(err));
        navigator.geolocation.getCurrentPosition(resolve, reject); // the same as above. getCurrentPosition accepts two parameters: success and error. in our case resove and reject
    });
};

// getPosition().then(pos => console.log(pos)).catch(err => console.error(err));

const whereAmI = function(){
    
    getPosition().then(pos => {
        const {latitude, longitude} = pos.coords;
        // console.log(latitude,longitude);

    return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
  })
    .then(response => {
        // console.log(response);
        if(!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })  
    .then(response => response.json())
    .then(data => {
        renderCountry(data[0]);
    })  
    .catch(err => {
        // console.log(`Something went wrong (${err.message})`);
        renderErr(`Something went wrong (${err.message}) 🔥`);
    })
    .finally(() => countriesContainer.style.opacity = 1);
}

btn.addEventListener('click', whereAmI);
******************/

/***************** 
// Coding challenge #2

    const wait = function(seconds){
        return new Promise(function(resolve){
            setTimeout(resolve, seconds * 1000);
        });
    };

const createImage = function(imgPath){
    return new Promise(function(resolve, reject){
      const img = document.createElement('img');
       img.src = imgPath;

    img.addEventListener('load', function(){
            images.append(img);
            resolve(img);
        })
       
    img.addEventListener('error', function(){
        reject(new Error('Invalid image URL'));
    });
        
    });
    
};

let currentImage;

createImage('img/img-1.jpg')
.then(img => {
    currentImage = img;
    console.log('Image 1 has loaded');
    return wait(2);
})
.then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
})
.then(img => {
    currentImage = img;
    console.log('Image 2 has loaded');
    return wait(2);
})
.then(() => {
    currentImage.style.display = 'none';
})
.catch(err => console.error(err));


// function createImage2(url){
//     const img = document.createElement('img');
//     img.src = url;
//     img.addEventListener('load', function(e){
//         // e.preventDefault();
//         images.append(img);
//     })
// }
*******************/

/// ASYNC   AWAIT
const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject); 
    });
};

const whereAmI = async function(){

    try{
    // Geolocation
    const pos = await getPosition();

    const {latitude, longitude} = pos.coords;

    // Reverse geocoding 
    const resGeo = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
    if(!resGeo.ok) throw new Error('Annoying problem!');
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);
    
    // Country data
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res)); // exactly the same as under ( the old way)
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
    if(!res.ok) throw new Error('No such country!');
    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);

    // return res.json(); // the old way
     return  `You are in ${dataGeo.city}, ${dataGeo.country}`;
    }catch(err){
        console.log(err);
        renderErr(`Something went wrong 🤷‍♂️ ${err.message}`);

        // Reject promise returned from async function (rethrowing error)
        throw err;
    }
};

// whereAmI('uzbekistan').then(data => console.log(data[0].name)) // the old way
console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

// whereAmI()
// .then(city => console.log(`2: ${city}`))
// .catch(err => console.error(`2: ${err.message}`))
// .finally(() => console.log('3: Finished getting location'));

// same as above with IFI function
(async function(){
    try{
         const city = await whereAmI();
         console.log(`2: ${city}`);
    }catch(err){
        console.log(`2: ${err.message}`);
    }
    console.log('3: Finished getting location');
})();    