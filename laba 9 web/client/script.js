import { generateArray, sortArray, findMin } from './arrayModule.js';

const originalArray = generateArray(100, 10, 60);
const sortedArray = sortArray([...originalArray]);
const minValue = findMin(originalArray);

function displayArray(array, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.className = 'array-cell';
            cell.textContent = array[i * 10 + j];
            container.appendChild(cell);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayArray(originalArray, 'original-array');
    document.getElementById('min-value').textContent = minValue;

    document.getElementById('sort-btn').addEventListener('click', () => {
        document.querySelector('.container').classList.add('hidden');
        document.getElementById('result-page').classList.remove('hidden');
        displayArray(sortedArray, 'sorted-array');
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        document.querySelector('.container').classList.remove('hidden');
        document.getElementById('result-page').classList.add('hidden');
    });
});