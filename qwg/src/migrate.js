var versionUpgrades = {
    "1.8":{
        newVersion:"1.9",
        migrate: function () {
            console.log("hello");
        }
    },
    "1.9":{
        newVersion:"2.0",
        migrate: function () {
            console.log("hello2");
        }
    }
};

