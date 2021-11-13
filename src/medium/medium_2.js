import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
var citympg = mpg_data.map(a => a.city_mpg);
var citystat = getStatistics(citympg);
var highmpg = mpg_data.map(a => a.highway_mpg);
var highwaystat = getStatistics(highmpg);
var years = mpg_data.map(a => a.year);
var yearStat = getStatistics(years);
var hybridc = mpg_data.map(a => a.hybrid);
var totalCar = hybridc.length
var countH = 0;
for(let i=0; i<totalCar; i++){
    if (hybridc[i] === true){
        countH = countH+1;
    }

}


export const allCarStats = {
    avgMpg: {city: citystat['mean'], highway: highwaystat['mean']},
    allYearStats: yearStat,
    ratioHybrids: countH/totalCar

};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

var yearArr = mpg_data.map(a => a.year, a.city_mpg, a.highway_mpg, a.hybrid);
const arrByYear = {};
for(let i=0; i<yearArr.length; i++){
    if(yearArr[i] in arrByYear){
        if(yearArr[i].hybrid===true){
            arrByYear[yearArr[i].year].hybrid.city.push(yearArr[i].city_mpg);
            arrByYear[yearArr[i].year].hybrid.highway.push(yearArr[i].highway_mpg);
        } else {
            arrByYear[yearArr[i].year].notHybrid.city.push(yearArr[i].city_mpg);
            arrByYear[yearArr[i].year].notHybrid.highway.push(yearArr[i].highway_mpg);
        }
    } else {
        arrByYear[yearArr[i].year] = {"hybrid": {"city":[], "highway": []}, "notHybrid":{"city":[], "highway":[]}};
        if(yearArr[i].hybrid===true){
            arrByYear[yearArr[i].year].hybrid.city.push(yearArr[i].city_mpg);
            arrByYear[yearArr[i].year].hybrid.highway.push(yearArr[i].highway_mpg);
        } else {
            arrByYear[yearArr[i].year].notHybrid.city.push(yearArr[i].city_mpg);
            arrByYear[yearArr[i].year].notHybrid.highway.push(yearArr[i].highway_mpg);
        }
    }
}

const yearObj = {};
for(var key in arrByYear){
    yearObj[key]={key: {"hybrid":{"city":getStatistics(arrByYear[key].hybrid.city)['mean'], "highway": getStatistics(arrByYear[key].hybrid.highway)['mean']}, "notHybrid": {"city": getStatistics(arrByYear[key].notHybrid.city)['mean'], "highway": getStatistics(arrByYear[key].notHybrid.highway)['mean']}}}
}


var model = mpg_data.map(a => a.make, a.model_number, a.hybrid);
var hybridmodel = model.filter(a => a.hybrid===true);
var mHybrids = [];
for(let i=0; i<hybridmodel.length; i++){
    if(hybridmodel[i].make in mHybrids){
        mHybrids[hybridmodel[i].make].hybrids.push(hybridmodel[i].model_number)
    } else {
        mHybrids.push({"make": hybridmodel[i].make, "hybrids": [hybridmodel[i].model_number]})
    }
}
mHybrids.sort((a,b) => (a.hybrids.length > b.hybrids.length ? -1:1));

export const moreStats = {
    makerHybrids: mHybrids,
    avgMpgByYearAndHybrid: yearObj
};
