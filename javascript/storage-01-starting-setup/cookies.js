const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = '12345CookieId';
const user = {
    name: 'Kathir',
    age: 30,
    hobbies: ['Sports', 'Cooking']
};

storeBtn.addEventListener('click', () => {
    // here max-age=5 denotes maximum time this cookie can exist is 5 seconds
    document.cookie = `userId=${userId}; max-age=60`; 
    document.cookie = `userOBJ=${JSON.stringify(user)}`;
});

retrieveBtn.addEventListener('click', () => {
    const cookies = document.cookie;
    console.log(`User cookies saved: `, cookies);
    const singleCookie = cookies.split(';');
    const cookieData = singleCookie.map(cookie => cookie.trim());
    console.log(cookieData[1].split('='));
})