const rawData = require("./rowData.json");
const swimming2008 = rawData.filter(it => it.year === 2008 && it.sport === 'Swimming');

module.exports = swimming2008.map(function (it) {
    return {
        athlete: it.athlete,
        age: it.age,
        country: it.country,
        gold: it.gold,
        silver: it.silver,
        bronze: it.bronze
    };
});


