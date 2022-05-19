const storeBtn = document.getElementById("store-btn");
const retrieveBtn = document.getElementById("retrieve-btn");

// const dbRequest = indexedDB.open("DummyStorage", 1);
// dbRequest.onupgradeneeded = function (event) {
//   const db = event.target.result;
//   const objectStore = db.createObjectStore("Products", { keyPath: "id" });
//   objectStore.transaction.onComplete = function (event) {
//     const productStore = objectStore
//       .transaction("Products", "readwrite")
//       .objectStore("Products");
//     productStore.add({
//       id: "p1",
//       title: "First Product",
//       price: 12.99,
//       tags: ["Expensive", "LuXury"],
//     });
//   };
// };

// dbRequest.onerror = function (event) {
//   console.log("Error connecting to IndexdDB");
// };

storeBtn.addEventListener("click", () => {});

storeBtn.addEventListener("click", () => {});



// Self Try
const dbRequest = indexedDB.open('DummyDB', 1);
dbRequest.onupgradeneeded = function (event) {
    const db = event.target.result;
    const dataStore = db.createObjectStore('Products' , { keyPath: 'id' });
    dataStore.transaction.oncomplete = function (event) {
        const productStore = db.transaction('Products', 'readwrite').objectStore('Products');
        productStore.add({
            id: 'p1',
            title: 'A first element',
            price: 12.22,
            tags: ['Luxury', 'Costly']
        });
    }
};

dbRequest.onerror = function (event) {
    console.log('Error occured on connecting to indexedDB');
};