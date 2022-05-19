const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');
const usedId  = '12345';
const user = {
    name: 'Kathir',
    age: 30,
    hobbies: ['Sports', 'Cooking']
};

storeBtn.addEventListener('click', () => {
    localStorage.setItem('userId', usedId);
    sessionStorage.setItem('userObj', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
    const extractedUserId = localStorage.getItem('userId');
    const extractedUserObj = JSON.parse(sessionStorage.getItem('userObj'));
    console.log(`extractedUserId: ${extractedUserId}`);
    console.log(`extractedUserObj:`, extractedUserObj);
});