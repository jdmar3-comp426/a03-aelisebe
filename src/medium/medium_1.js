import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var sum = 0;
    for(let i=0; i<array.length;i++){
        sum = sum+array[i];
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    const mid = (array.length +1)/2;

    const sort = [...array].sort((a,b) => a-b);
    const isEven = sort.length %2 === 0;

    return isEven ? (sort[mid-1.5] + sort[mid-.5])/2 : sort[mid-1];
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let length1 = array.length;
    let sum1 = getSum(array);
    let mean1 = sum1/length1;
    let median1 = getMedian(array);
    var min1 = array[0];
    var max1 = array[0];
    for(let i=0; i<length1; i++){
        if(array[i]<min1){
            min1=array[i];
        }
        if(array[i]>max1){
            max1 = array[i];
        }
    }
    let varianc = variance(array, mean);
    let sd = Math.sqrt(varianc)
    return {
        length: length1,
        sum: sum1,
        mean: mean1,
        median: median1,
        min: min1,
        max: max1,
        variance: varianc,
        standard_deviation: sd
       }
}

