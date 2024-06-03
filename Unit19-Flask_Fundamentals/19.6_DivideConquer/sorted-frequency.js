function sortedFrequency(arr, number) {
    let numberStart = 0;
    let numberEnd = arr.length - 1;
    if (arr[0] !== number) {
        let maxIndex = arr.length - 1;
        let minIndex = 0;
        while (minIndex <= maxIndex) {
            let middleIndex = Math.floor((maxIndex + minIndex) / 2);
            if (
                arr[middleIndex] === number &&
                arr[middleIndex - 1] !== number
            ) {
                numberStart = middleIndex;
                break;
            } else if (arr[middleIndex] >= number) {
                maxIndex = middleIndex - 1;
            } else {
                minIndex = middleIndex + 1;
            }
        }
        if (minIndex > maxIndex) {
            return -1;
        }
    }
    if (arr[arr.length - 1] !== number) {
        let maxIndex = arr.length - 1;
        let minIndex = 0;
        while (minIndex <= maxIndex) {
            let middleIndex = Math.floor((maxIndex + minIndex) / 2);
            if (
                arr[middleIndex] === number &&
                arr[middleIndex + 1] !== number
            ) {
                numberEnd = middleIndex;
                break;
            } else if (arr[middleIndex] > number) {
                maxIndex = middleIndex - 1;
            } else {
                minIndex = middleIndex + 1;
            }
        }
    }
    return numberEnd - numberStart + 1;
}

module.exports = sortedFrequency;
