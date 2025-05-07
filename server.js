const express = require('express');
const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '/'))); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submitForm', (req, res) => {
    const formData = req.body;

    let textData = "";
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            textData += formData[key] + "\n";
        }
    }

    fs.writeFile('data.txt', textData, (err) => {
        if (err) {
            console.error(err); 
            return res.status(500).send('Ошибка при записи в data.txt');
        }
        console.log('Data written to data.txt');
    });

    const xmlDoc = xmlbuilder.create('data')
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            xmlDoc.ele(key, formData[key]);
        }
    }

    fs.writeFile('data.xml', xmlDoc.end({ pretty: true }), (err) => {
        if (err) {
            console.error(err); 
            return res.status(500).send('Ошибка при записи в data.xml');
        }
        console.log('Data written to data.xml');
    });

    res.send('Данные успешно сохранены!');
});

app.get('/getTextData', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err); 
            return res.status(500).send('Ошибка чтения файла data.txt');
        }
        res.send(data);
    });
});

app.get('/getXmlData', (req, res) => {
    fs.readFile('data.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err); 
            return res.status(500).send('Ошибка чтения файла data.xml');
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});