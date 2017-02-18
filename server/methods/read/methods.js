/*
 * Methods: Read - Example
 * Example of a method used for reading from the database.
 */

Meteor.methods({
    getTrusts: function(callinguser) {
        // Check the argument. Assuming a String type here.
        //check(argument, String);

        // Perform the read.
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            var exampleItem = Trusts.find({}, { fields: { 'Trust': 1 } }).fetch();

        } else {
            if (Roles.userIsInRole(callinguser, 'CT', 'default-group')) {
                var h = Roles.getRolesForUser(callinguser, 'hospitals');
                var n = Hospitals.findOne({ _id: h[0] });
                if(typeof n !== "undefined") { var exampleItem = Trusts.find({ 'Trust': n.Trust }, { fields: { 'Trust': 1 } }).fetch(); }
            } else {
                console.log('DENIED: call from someone without enough access');
                // user not authorized. do not publish secrets
                throw new Meteor.Error(105, 'Error 403: Not Authorized', 'Access level not high enough.');

            }
        }

        // If the read fails (no documents found), throw an error.
        if (!exampleItem) {
            throw new Meteor.Error(501, 'Error 500: Not Found', 'No documents found.');
        }

        // Return either the result or the error.
        return exampleItem;
    },
    getHospitals: function(callinguser, Trust) {
        // Check the argument. Assuming a String type here.
        check(Trust, String);
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            if (Trust == '') {
                Trust = Trusts.findOne().Trust;
            }
            // Perform the read.
            var exampleItem = Hospitals.find({ 'Trust': Trust }, { fields: { 'Hospital': 1 } }).fetch();
        } else {
            if (Roles.userIsInRole(callinguser, 'CT', 'default-group')) {
                var h = Roles.getRolesForUser(callinguser, 'hospitals');
                var n = Hospitals.findOne({ _id: h[0] });
                if(typeof n !== "undefined") { var exampleItem = Hospitals.find({ 'Hospital': n.Hospital }, { fields: { 'Hospital': 1 } }).fetch(); }
            } else {
                console.log('DENIED: call from someone without enough access');
                // user not authorized. do not publish secrets
                throw new Meteor.Error(106, 'Error 403: Not Authorized', 'Access level not high enough.');
            }
        }
        // If the read fails (no documents found), throw an error.
        if (!exampleItem) {
            throw new Meteor.Error(502, 'Error 500: Not Found', 'No documents found.');
        }

        // Return either the result or the error.
        return exampleItem;
    },
    getDepartments: function(callinguser, Trust, Hospital) {
        // Check the argument. Assuming a String type here.
        check(Trust, String);
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            if (Trust == '') {
                Trust = Trusts.findOne().Trust;
            }
            check(Hospital, String);
            if (Hospital == '') {
                Hospital = Hospitals.findOne({ 'Trust': Trust }).Hospital;
            }
            // Perform the read.
            var exampleItem = Places.find({ 'Trust': Trust, 'Hospital': Hospital }, { fields: { 'Department': 1 } }).fetch();

        } else {
            if (Roles.userIsInRole(callinguser, 'CT', 'default-group')) {
                var h = Roles.getRolesForUser(callinguser, 'hospitals');
                var n = Hospitals.findOne({ _id: h[0] });
                if(typeof n !== "undefined") {
                    var exampleItem = Places.find({ 'Hospital': n.Hospital }, { fields: { 'Department': 1 } }).fetch();
                }
            } else {
                console.log('DENIED: call from someone without enough access');
                // user not authorized. do not publish secrets
                throw new Meteor.Error(107, 'Error 403: Not Authorized', 'Access level not high enough.');
            }
        }
        // If the read fails (no documents found), throw an error.
        if (!exampleItem) {
            throw new Meteor.Error(503, 'Error 500: Not Found', 'No documents found.');
        }

        // Return either the result or the error.
        return exampleItem;
    },
    availableLevels: function() {
        // calling user... [This has been superceded architecturally by Roles]
        //console.log(Meteor.user());
    },
    readPlace: function(e) {
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            y = Places.findOne({ _id: e });
            if (y) {
                var x = "<span class='label label-default'>";
                x = x + y.Trust + "&gt;" + y.Hospital + "&gt;" + y.Department + "</span><br><span class='label label-default'>"
                x = x + "</span>";
            } else {
                var x = "Nil";
            }
            console.log(x);
            return x
        } else {
            console.log('DENIED: call from someone without enough access');
            throw new Meteor.Error(106, 'Error 403: Not Authorized', 'Access level not high enough.');
            return
        }
    }

});
