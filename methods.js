const fetch = require('node-fetch');
const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

 const getPhotos = async () => {
    try {
        let response = await fetch(photosUrl);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    }
    catch(error) {
        console.log(error);
    }
}


const getIds = async (albumId = null) => {
    try {
        let response = await fetch(photosUrl);
        if (response.ok) {
            let jsonResponse = await response.json();
            if (albumId) {
            var filteredByAlbum = jsonResponse.filter(element => element.albumId === albumId);
            console.log(filteredByAlbum.forEach(element => console.log(element.id)));
            }
            else {
            console.log(jsonResponse.forEach(element => console.log(element.id)));
            }
    }
}
    catch(error) {
        console.log(error);
    }
}

//getIds();


const getUrls = async (albumId = null) => {
    try {
        let response = await fetch(photosUrl);
        if (response.ok) {
            let jsonResponse = await response.json();
            if (albumId) {
            var filteredByAlbum = jsonResponse.filter(element => element.albumId === albumId);
            console.log(filteredByAlbum.forEach(element => console.log(element.url)));
            }
            else {
            console.log(jsonResponse.forEach(element => console.log(element.url)));
            }
    }
}
    catch(error) {
        console.log(error);
    }
}

//getUrls();


const getCount = async () => {
    try {
        let response = await fetch(photosUrl);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse.length);
    }
}
    catch(error) {
        console.log(error);
    }
}

//getCount();

const getByIds = async (id) => {
    try {

        let response = await fetch(photosUrl);
        if (response.ok) {
            let jsonResponse = await response.json();
            let idArray = id.map(x => {
                return parseInt(x, 32);
            });
            let filteredByIds = jsonResponse.filter(element => {
                return idArray.includes(element.id);
            });
            console.log(filteredByIds);
        }
    }
    catch(error) {
        console.log(error);
    }
}

getByIds([1,2]);