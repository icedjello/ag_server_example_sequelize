const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const environment = require('./config.json').test;
app.use(express.json());

const cors = require("cors");
app.use(cors({}));
const port = 3000;

const sequelize = new Sequelize(environment.database, environment.username, environment.password, {
    host: environment.host,
    dialect: environment.dialect,
    additional: {timeStamps: false}
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
const Database = sequelize.define('swimming_2008', {
    athlete: {type: Sequelize.STRING, allowNull: false},
    age: {type: Sequelize.INTEGER, allowNull: false},
    country: {type: Sequelize.STRING, allowNull: false},
    gold: {type: Sequelize.INTEGER, allowNull: false},
    silver: {type: Sequelize.INTEGER, allowNull: false},
    bronze: {type: Sequelize.INTEGER, allowNull: false}
}, {
    timestamps: false
});

Database.sync({force: true})
    .then(() => {
        const rowData = require('./rowData/rowData');

        async function addDataToDB(rowData) {
            for (let row of rowData) {
                await Database.create(row);
            }
        }

        addDataToDB(rowData).then(() => console.log('DATA INSERTED INTO DATABASE'));
    });

app.listen(port, () => console.log(`example app listening on port http://localhost:${port}`));

app.get('/allData', function (request, response) {
    Database.findAll({}).then(data => response.json(data));
});
