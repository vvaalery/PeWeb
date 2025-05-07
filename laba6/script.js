class KindergartenGroups {
    constructor() {
        this.groups = new Map([
            ["Младшая группа (3-4 года)", new Set(["Иванов", "Петров", "Сидоров"])],
            ["Средняя группа (4-5 лет)", new Set(["Кузнецов", "Смирнов", "Васильев"])],
            ["Старшая группа (5-6 лет)", new Set(["Попов", "Фёдоров", "Николаев"])]
        ]);
        
        this.initSelects();
        this.renderGroups();
        this.setupEventListeners();
    }
    
    initSelects() {
        const groupSelectAdd = document.getElementById('group-select-add');
        const headingSelect = document.getElementById('heading-select');
        
        this.groups.forEach((_, groupName) => {
            const option1 = document.createElement('option');
            option1.value = groupName;
            option1.textContent = groupName;
            groupSelectAdd.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = groupName;
            option2.textContent = groupName;
            headingSelect.appendChild(option2);
        });
    }
    
    renderGroups() {
        const container = document.getElementById('groups-container');
        container.innerHTML = '';
        
        this.groups.forEach((children, groupName) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            
            const heading = document.createElement('h2');
            heading.textContent = groupName;
            groupDiv.appendChild(heading);
            
            const select = document.createElement('select');
            children.forEach(child => {
                const option = document.createElement('option');
                option.value = child;
                option.textContent = child;
                select.appendChild(option);
            });
            groupDiv.appendChild(select);
            
            container.appendChild(groupDiv);
        });
    }
    
    addChild() {
        const groupName = document.getElementById('group-select-add').value;
        const childName = document.getElementById('child-name-add').value.trim();
        const position = document.getElementById('position-select').value;
        
        if (!childName) {
            alert('Введите фамилию ребенка');
            return;
        }
        
        const children = this.groups.get(groupName);
        if (!children) return;
        
        const childrenArray = Array.from(children);
        
        switch(position) {
            case 'start':
                childrenArray.unshift(childName);
                break;
            case '1':
                childrenArray.splice(1, 0, childName);
                break;
            case '2':
                childrenArray.splice(2, 0, childName);
                break;
            case 'end':
                childrenArray.push(childName);
                break;
        }
        
        this.groups.set(groupName, new Set(childrenArray));
        this.render();
    }
    
    editHeading() {
        const headingIndex = parseInt(document.getElementById('heading-select').value);
        const newHeading = document.getElementById('new-heading').value.trim();
        
        if (!newHeading) {
            alert('Введите новый заголовок');
            return;
        }
        
        const oldHeading = Array.from(this.groupTitles)[headingIndex];
        
        if (this.groups.has(oldHeading)) {
            const children = this.groups.get(oldHeading);
            this.groups.delete(oldHeading);
            this.groups.set(newHeading, children);
        }
        
        this.groupTitles.delete(oldHeading);
        this.groupTitles.add(newHeading);
        
        this.render();
    }
}

class KindergartenEditor extends KindergartenGroups {
    constructor() {
        super();
    }
    
    insertChildAtPosition(groupName, childName, position) {
        if (!this.groups.has(groupName)) return false;
        
        const children = this.groups.get(groupName);
        const childrenArray = Array.from(children);
        childrenArray.splice(position, 0, childName);
        this.groups.set(groupName, new Set(childrenArray));
        
        this.render();
        return true;
    }
    
    updateHeadingByIndex(index, newTitle) {
        const titles = Array.from(this.groupTitles);
        if (index < 0 || index >= titles.length) return false;
        
        const oldTitle = titles[index];
        
        if (this.groups.has(oldTitle)) {
            const children = this.groups.get(oldTitle);
            this.groups.delete(oldTitle);
            this.groups.set(newTitle, children);
        }
        
        this.groupTitles.delete(oldTitle);
        this.groupTitles.add(newTitle);
        
        this.render();
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const kindergarten = new KindergartenEditor();
});