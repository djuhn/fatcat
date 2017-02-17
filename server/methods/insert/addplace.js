/*
 * Methods: Insert - Example
 * Example of a method used for inserting into the database.
 */

Meteor.methods({
    addplace: function(callinguser, Trust, Hospital, Department) {
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            // Check the argument. Assuming an Object type here.
            check(Trust, String);
            check(Hospital, String);
            check(Department, String);
            var TrustReg = '/^' + Trust + '$/i';
            var HospitalReg = '/^' + Hospital + '$/i';
            var DepartmentReg = '/^' + Department + '$/i';
            checkPlace = Places.findOne({ Trust: { $regex: eval(TrustReg) }, Hospital: { $regex: eval(HospitalReg) }, Department: { $regex: eval(DepartmentReg) } });
            if (!checkPlace) {

                // Perform the insert.
                try {
                    var exampleId = Places.insert({ Trust: Trust, Hospital: Hospital, Department: Department });
                    return exampleId;
                } catch (exception) {
                    // If an error occurs, return it to the client.
                    return exception;
                }

            } else {
                // already exists
                console.log('Duplicate caught');
                throw new Meteor.Error(11, 'This workplace already exists', 'Duplicate detected');
                return

            }
        } else {
            console.log('DENIED: call from someone without enough access');
            throw new Meteor.Error(102, 'Error 403: Not Authorized', 'Access level not high enough.');
            return
        }
    },
    addtrust: function(callinguser, Trust) {
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            // Check the argument. Assuming an Object type here.
            check(Trust, String);
            var TrustReg = '/^' + Trust + '$/i';
            checkPlace = Trusts.findOne({Trust: {$regex: eval(TrustReg)}});
            if (!checkPlace) {
            // Perform the insert.
            try {
                var exampleId = Trusts.insert({ Trust: Trust });
                return exampleId;
            } catch (exception) {
                // If an error occurs, return it to the client.
                return exception;
            }
        } else {
            // already exists
            console.log('Duplicate caught');
            throw new Meteor.Error(12, 'This trust already exists', 'Duplicate detected');
            return
        }
        } else {
            console.log('DENIED: call from someone without enough access');
            throw new Meteor.Error(103, 'Error 403: Not Authorized', 'Access level not high enough.');
            return
        }
    },
    addhospital: function(callinguser, Trust, Hospital) {
        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')) {
            console.log('Call from a sysadmin');
            // Check the argument. Assuming an Object type here.
            check(Trust, String);
            check(Hospital, String);
            var TrustReg = '/^' + Trust + '$/i';
            var HospitalReg = '/^' + Hospital + '$/i';
            checkPlace = Hospitals.findOne({ Trust: { $regex: eval(TrustReg) }, Hospital: { $regex: eval(HospitalReg) } });
            if (!checkPlace) {

            // Perform the insert.
            try {
                var exampleId = Hospitals.insert({ Trust: Trust, Hospital: Hospital });
                return exampleId;
            } catch (exception) {
                // If an error occurs, return it to the client.
                return exception;
            }
        } else {
           // already exists
           console.log('Duplicate caught');
           throw new Meteor.Error(13, 'This hospital already exists', 'Duplicate detected');
           return 
        }
        } else {
            console.log('DENIED: call from someone without enough access');
            throw new Meteor.Error(104, 'Error 403: Not Authorized', 'Access level not high enough.');
            return
        }
    }
});
