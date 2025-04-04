let cars = JSON.parse(localStorage.getItem('parkingCars')) || [];
let nextId = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;

const carTable = document.getElementById('carTable').querySelector('tbody');
const selectId = document.getElementById('selectId');
const minMaxInfo = document.getElementById('minMaxInfo');
const propertyDisplay = document.getElementById('propertyDisplay');

function init() {
    updateTable();
    updateSelect();
}

function updateTable() {
    carTable.innerHTML = '';
    cars.forEach(car => {
        const row = carTable.insertRow();
        
        row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.carName}</td>
            <td>${car.ownerName}</td>
            <td>${car.carNumber}</td>
            <td>${car.parkingTime}</td>
            <td></td>
        `;
        
        const propsCell = row.cells[5];
        let propsHtml = '';
        
        for (const key in car) {
            if (!['id', 'carName', 'ownerName', 'carNumber', 'parkingTime'].includes(key)) {
                propsHtml += `<div><strong>${key}:</strong> ${car[key]}</div>`;
            }
        }
        
        propsCell.innerHTML = propsHtml || '-';
    });
    
    localStorage.setItem('parkingCars', JSON.stringify(cars));
}

function updateSelect() {
    selectId.innerHTML = '<option value="">-- Выберите ID --</option>';
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = car.id;
        selectId.appendChild(option);
    });
}

document.getElementById('addBtn').addEventListener('click', () => {
    const car = {
        id: nextId++,
        carName: document.getElementById('carName').value,
        ownerName: document.getElementById('ownerName').value,
        carNumber: document.getElementById('carNumber').value,
        parkingTime: parseInt(document.getElementById('parkingTime').value)
    };
    
    cars.push(car);
    updateTable();
    updateSelect();
    document.getElementById('carForm').reset();
});

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('carForm').reset();
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    const selectedId = parseInt(selectId.value);
    if (!selectedId) return;
    
    if (confirm(`Удалить запись с ID ${selectedId}?`)) {
        cars = cars.filter(car => car.id !== selectedId);
        updateTable();
        updateSelect();
    }
});

document.getElementById('minMaxBtn').addEventListener('click', () => {
    if (cars.length === 0) {
        minMaxInfo.innerHTML = '<p class="error">Нет данных об автомобилях</p>';
        return;
    }
    
    const minTime = Math.min(...cars.map(car => car.parkingTime));
    const maxTime = Math.max(...cars.map(car => car.parkingTime));
    
    const minCars = cars.filter(car => car.parkingTime === minTime);
    const maxCars = cars.filter(car => car.parkingTime === maxTime);
    
    let info = `<p><strong>Минимальное время стоянки (${minTime} ч):</strong><br>`;
    minCars.forEach(car => {
        info += `${car.carName} (${car.carNumber})<br>`;
    });
    
    info += `</p><p><strong>Максимальное время стоянки (${maxTime} ч):</strong><br>`;
    maxCars.forEach(car => {
        info += `${car.carName} (${car.carNumber})<br>`;
    });
    
    minMaxInfo.innerHTML = info;
});

document.getElementById('addPropertyBtn').addEventListener('click', () => {
    const propName = document.getElementById('newPropertyName').value.trim();
    const propValue = document.getElementById('newPropertyValue').value.trim();
    
    if (!propName || !propValue) {
        propertyDisplay.innerHTML = '<p class="error">Заполните оба поля!</p>';
        return;
    }
    
    cars.forEach(car => {
        car[propName] = propValue;
    });
    
    propertyDisplay.innerHTML = `
        <p class="success">Добавлено новое свойство для всех автомобилей:</p>
        <p><strong>${propName}</strong>: ${propValue}</p>
    `;
    
    updateTable();
    
    document.getElementById('newPropertyName').value = '';
    document.getElementById('newPropertyValue').value = '';
});

window.addEventListener('DOMContentLoaded', init);