/***************************************
 ************  TASK 1 ******************
 ***************************************/
const numbers = [1, 2, 3, 4, 5];
const numGreater5 = numbers.filter(val => val > 5);
const mappedNumbers = numbers.map(val => ({num: val}));
const multipliedArray = numbers.reduce((prevVal, curVal, index, numbers) => prevVal * curVal, 1);
console.log('array with num breater than 5 : ' + numGreater5); 
console.log('mapped numbers ==> ');
console.log(mappedNumbers);
console.log('multipliedArray : ' + multipliedArray);

/***********************************
 *********** TASK 2 ****************
 ***********************************/
function findMaxAndMin(...numbers) {
    let currMax = numbers[0];
    let currMin = numbers[0];
    numbers.forEach((number, index, numbers) => {
        if(number > currMax) {
            currMax = number;
        }
        if(number < currMin) {
            currMin = number;
        }
    });
    return [currMin, currMax];
}
const [minNumInArr, maxNumInArr] = findMaxAndMin(...numbers);
console.log('smallest number in array : ' + minNumInArr + '\nlargest number in array : ' + maxNumInArr);

/*************************************
 ************  TASK 3 ****************
 *************************************/
const sampleSet = new Set();
sampleSet.add(10);
sampleSet.add(20);
sampleSet.add(30);
sampleSet.add(40);
sampleSet.add(50);
sampleSet.add(10);
console.log(sampleSet);