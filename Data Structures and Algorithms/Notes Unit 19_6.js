function myBinarySearch(arr, number){
    let count = 0
    let startIndex = 0
    let endIndex = arr.length -1
    if (arr[startIndex === number]) {return (startIndex,count)}
    if (arr[endIndex === number]) {return (endIndex,count)}
    let i = 0
    while (arr[i] !== number){
        count++
        i = Math.floor((endIndex - startIndex) / 2)
        if (arr[i] === number){
            return (i , count)
        } else if (arr[i] > number) {
            endIndex = i
        } else {
            startIndex = i
        }

    }
    return -1
}

myArray = [1,3,5,6,7,12,23,26,29,34,36,37,38,42,45,47,53,55,59,67,69,70,71,73,75,79]

console.log(myBinarySearch([myArray, 1]))
console.log(myBinarySearch([myArray, 36]))
console.log(myBinarySearch([myArray, 55]))
console.log(myBinarySearch([myArray, 78]))
console.log(myBinarySearch([myArray, 79]))