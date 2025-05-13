const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
    const sorted = array.toSorted((a, b) => a - b);
    if(sorted.length % 2 === 0){
        return getMean([sorted[sorted.length / 2], sorted[(sorted.length / 2) - 1]]);
    }
    else return sorted[Math.floor(sorted.length / 2)];
}

const getMode = (array) => {
    const counts = {};
    array.forEach(el => counts[el] = counts[el] ? counts[el] + 1 : 1);
    if(new Set(Object.values(counts)).size === 1) return null;
    const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    const mode = Object.keys(counts).filter(el => counts[el] === counts[highest]);
    return mode.join(", ");
}

const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
    const mean = getMean(array);
    const variance = array.reduce((acc, el) => {
        const difference = el - mean;
        const squared = difference ** 2;
        return acc + squared;
    }, 0) / array.length;
    return variance;
}

const getStandardDeviation = (array) => {
    return Math.sqrt(getVariance(array));
}

const calculate = () => {
    const value = document.querySelector("#numbers").value;
    const array = value.split(/,\s*/g);
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

    const mean = getMean(numbers);
    document.querySelector("#mean").textContent = mean;

    const median = getMedian(numbers);
    document.querySelector("#median").textContent = median;

    const mode = getMode(numbers);
    document.querySelector("#mode").textContent = mode;

    const range = getRange(numbers);
    document.querySelector("#range").textContent = range;

    const variance = getVariance(numbers);
    document.querySelector("#variance").textContent = variance;

    const standardDeviation = getStandardDeviation(numbers);
    document.querySelector("#standardDeviation").textContent = standardDeviation;
}
