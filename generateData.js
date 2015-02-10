var fs = require('fs');

var numberOfContacts = 50;
var numberOfGroups = 4;
var numberOfCustomFields = 3;

var cfBindingFixtures = "[\n";
var cfBindingId = 1;

var customFieldFixtures = [
		{id: 1, label: "Evlilik Yıldönümü", type: "date"},
		{id: 2, label: "Baba adı", type: "text", possibleAnswers: ["Ali", "Mehmet", "Osman", "Yaşar"]},
		{id: 3, label: "Son alışveriş tarihi", type: "date"},
		];

function generateContacts(numberOfContacts) {
    var names = ["Ali", "Mehmet", "Ayşe", "Osman", "Sevgi", "Mert", "Murat", "Zeynep", "Nuray"];
    var lastNames = ["Yılmaz", "Balaban", "Arslan", "Demir", "Serter", "Pektemir", "Kara"];
    var numberPrefixes = ["549", "553", "532", "542", "533", "530", "555"];
    var streetNames = ["Bahçeli", "Demirci", "Sahilyolu", "Zerdali", "Kahraman", "Bezirgan"];
    var streetTypes = ["Sokak", "Caddesi", "Bulvarı"];
    var provinces = ["Sarıyer", "Beşiktaş", "Üsküdar", "Maltepe", "Şişli", "Beykoz"];
    var emailProviders = ["gmail", "yahoo", "hotmail"];

    // fs.openSync('generated-contacts.js', "w+");
    var contactFixtures = "[\n";
    for (var i = 1; i <= numberOfContacts; i++) {
        var randomName = names[Math.floor(Math.random() * names.length)];
        var randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        var randomNumberPrefix = numberPrefixes[Math.floor(Math.random() * numberPrefixes.length)];
        var randomStreetName = streetNames[Math.floor(Math.random() * streetNames.length)];
        var randomStreetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
        var randomProvince = provinces[Math.floor(Math.random() * provinces.length)];
        var randomEmailProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];

        var randomDateOfBirth = new Date(
            Math.floor(Math.random() * 40 + 1950),
            Math.floor(Math.random() * 12 + 1),
            Math.floor(Math.random() * 28 + 1));

        var randomAddress = randomStreetName + " " + randomStreetType + " No: " + Math.floor(Math.random() * 150 + 1) + "/" + Math.floor(Math.random() * 25 + 1) + " " + randomProvince + " / İSTANBUL";

        var randomEmailAdress = randomName.toLowerCase() + "." + randomLastName.substring(0, 1).toLowerCase() + "@" + randomEmailProvider + ".com";
        var randomEmailAdress2 = randomName.toLowerCase() + randomDateOfBirth.getYear() + "@" + randomEmailProvider + ".com";

        var randomPhoneNumber = randomNumberPrefix + Math.floor(Math.random() * 9000000 + 1000000);
        var randomPhoneNumber2 = randomNumberPrefix + Math.floor(Math.random() * 9000000 + 1000000);

        var groupMembershipCount = Math.floor(Math.random() * numberOfGroups + 1);
        var randomGroups = [];

        for (var k = 1; k <= groupMembershipCount; k++) {
            randomGroups.push(k);
        };

        
        var bindings = [];

        for (var j = 1; j <= numberOfCustomFields; j++) {
            var bindingHasValue = Math.floor(Math.random() + 2);

        	var bindingValue = (customFieldFixtures[j-1].type === 'date') ? 
				        	new Date(
					            Math.floor(Math.random() * 40 + 1970),
					            Math.floor(Math.random() * 12 + 1),
					            Math.floor(Math.random() * 28 + 1)) : customFieldFixtures[j-1].possibleAnswers[Math.floor(Math.random() + customFieldFixtures[j-1].possibleAnswers)];

            if(!bindingHasValue) bindingValue = undefined;
			var bindingField = customFieldFixtures[j-1].id;

            cfBindingFixtures = cfBindingFixtures.concat(JSON.stringify({id: cfBindingId, customField: bindingField, value: bindingValue, 
                                                                        label: customFieldFixtures[j-1].label,
                                                                        type: customFieldFixtures[j-1].type}) + ",\n");
            bindings.push(cfBindingId++);
        };

        var contact = {
            id: i,
            firstName: randomName,
            lastName: randomLastName,
            primaryPhoneNumber: randomPhoneNumber,
            secondaryPhoneNumber: randomPhoneNumber2,
            primaryEmailAddress: randomEmailAdress,
            secondaryEmailAddress: randomEmailAdress2,
            dateOfBirth: randomDateOfBirth,
            address: randomAddress,
            canReceiveMessages: i % 4 != 0,
            groups: randomGroups,
            customFieldBindings: bindings
        }
        contactFixtures = contactFixtures.concat(JSON.stringify(contact) + ",\n");
        // fs.appendFileSync('generated-contacts.js', JSON.stringify(contact) + ",\n");
    };

    contactFixtures = contactFixtures.concat(']');
    cfBindingFixtures = cfBindingFixtures.concat(']');
    return contactFixtures;
}

function generateCustomFieldBindings(){
		var customFieldBindingNumber = Math.floor(Math.random() * numberOfGroups + 1);
        var bindings = [];

        for (var k = 1; k <= groupMembershipCount; k++) {
            randomGroups.push(k);
        };
}

var contactFixtures = generateContacts(numberOfContacts);



var fixtureLoaderTemplate = fs.readFileSync("fixture-initializers.js.template", "utf8");
var fileContent = fixtureLoaderTemplate
.replace('%contacts%', contactFixtures)
.replace('%customFields%', JSON.stringify(customFieldFixtures, null, 2))
.replace('%customFieldBindings%', cfBindingFixtures);
fs.writeFileSync('app/initializers/fixture-loaders.js', fileContent);
