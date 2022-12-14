const isPrime = (num: number): boolean => {
  if (num <= 1) {
    return false;
  }
  if (num % 2 === 0 && num > 2) {
    return false;
  }
  const s = Math.sqrt(num);
  for (let i = 3; i <= s; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const shuffle = (array: number[]): number[] => {
  const newArray = [...array];
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
};

export const generateShuffledPrimeNumbers = (): number[] => {
  const primeNumbers = Array.from(Array(55), (_, i) => i + 1).filter(num =>
    isPrime(num)
  );

  const shuffledSliced = shuffle([...primeNumbers, ...primeNumbers]);
  return shuffledSliced;
};
