function ExtensionUpgrader(versionUpgrades) {
    return {
        test: function(previousVersion, thisVersion) {
            while (previousVersion != thisVersion) {
                var upgrade = versionUpgrades[previousVersion];
                console.log("upgrade from [" + previousVersion + "] to [" + upgrade.newVersion + "]");
                upgrade.migrate();
                previousVersion = upgrade.newVersion;
            }
            return true;
        },
        upgrade:function (previousVersion, thisVersion, callback) {
            while (previousVersion != thisVersion) {
                var upgrade = versionUpgrades[previousVersion];
                console.log("upgrade from [" + previousVersion + "] to [" + upgrade.newVersion + "]");
                upgrade.migrate();
                previousVersion = upgrade.newVersion;
            }
            if(callback) callback(thisVersion);
        }
    };
}
