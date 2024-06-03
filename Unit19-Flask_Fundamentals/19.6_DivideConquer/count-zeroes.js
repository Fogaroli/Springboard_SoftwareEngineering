function countZeroes(arr) {
    if (arr[0] === 0) {
        return arr.length;
    } else if (arr[arr.length - 1] === 1) {
        return 0;
    }
    let maxIndex = arr.length - 1;
    let minIndex = 0;
    while (minIndex <= maxIndex) {
        let middleIndex = Math.floor((maxIndex + minIndex) / 2);
        if (arr[middleIndex] === 0 && arr[middleIndex - 1] === 1) {
            return arr.length - middleIndex;
        } else if (arr[middleIndex] === 0) {
            maxIndex = middleIndex - 1;
        } else {
            minIndex = middleIndex + 1;
        }
    }
    return "error";
}

module.exports = countZeroes;
