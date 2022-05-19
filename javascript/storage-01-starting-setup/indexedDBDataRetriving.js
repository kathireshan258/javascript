const storeBtn = document.getElementById("store-btn");
const retrieveBtn = document.getElementById("retrieve-btn");

let db;
let i = 0;
storeBtn.addEventListener("click", () => {
    if (!db) {
        return;
    }
    const productStore = db.transaction('Products', 'readwrite').objectStore('Products');
        productStore.add({
            id: `p${++i}`,
            title: 'A first element',
            price: 12.22,
            tags: ['Luxury', 'Costly']
        });
});

retrieveBtn.addEventListener("click", () => {
    const productStore = db.transaction('Products', 'readwrite').objectStore('Products');
    const request = productStore.get(`p${i}`);
    request.onsuccess = function () {
        console.log(request.result);
    };
});


// Self Try
const dbRequest = indexedDB.open('DummyDB', 1);
dbRequest.onupgradeneeded = function (event) {
     db = event.target.result;
    const dataStore = db.createObjectStore('Products' , { keyPath: 'id' });
};

dbRequest.onsuccess = function (event) {
    db = event.target.result;
}

dbRequest.onerror = function (event) {
    console.log('Error occured on connecting to indexedDB');
};