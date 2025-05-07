export function generateArray(size, min, max) {
    return Array.from({ length: size }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

export function sortArray(array) {
    return [...array].sort((a, b) => a - b);
}

export function findMin(array) {
    return Math.min(...array);
}