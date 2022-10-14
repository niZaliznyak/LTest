export const generateUniqueArray = (arrayLength, maxNumber) => {

    let randomNumbers = [];

    function generateNumber(maxNr) {
        let random = (Math.random() * maxNr).toFixed();

        random = Number(random);

        if(!randomNumbers.includes(random)) {
            randomNumbers.push(random);
            return random;
        } else {
            if(randomNumbers.length < maxNr) {
            return  generateNumber(maxNr);
            } else {
            console.log('No more numbers available.')
            return false;
            }
        }
    }

    const newArray = Array.from(Array(arrayLength), () => generateNumber(maxNumber));

    return newArray;
}

export const shuffle = (array) => {
    const newArray = [...array];
    newArray.sort(() => Math.random() - 0.5);
    return newArray;
}