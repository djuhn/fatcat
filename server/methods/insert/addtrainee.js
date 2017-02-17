Meteor.methods({
    addtrainee: function(callinguser, email, level, workplaces) {

        if (Roles.userIsInRole(callinguser, 'sysadmin', 'default-group')||Roles.userIsInRole(callinguser, 'CT', 'default-group')) {
            console.log('Call from a sysadmin or CT');
            // Check the argument. Assuming an Object type here.
            check(email, String);
            check(level, Number);
            check(workplaces, Match.Where(function(places) {
                _.each(places, function(place) {
                    if (!check(place, String)) return false
                })
                return true
            }));
            var x = "<span class='label label-default'>";
            _.each(workplaces, function(place) {
                y = Places.findOne({ _id: place });
                x = x + y.Trust + " &gt; " + y.Hospital + " &gt; " + y.Department + "</span><br><span class='label label-default'>";
            });
            x = x + "</span>";
            var emailReg = '/^' + email + '$/i';
            checkExisting = Trainees.findOne({email: {$regex: eval(emailReg)}});
            if (!checkExisting) {
            // Perform the insert.
            try {
                var exampleId = Trainees.insert({ email: email, level: level, workplaces: workplaces, workplacestring: x, Hospital: y.Hospital, Asked: false, Reminded: false, Responded: false });
                return exampleId;
            } catch (exception) {
                // If an error occurs, return it to the client.
                return exception;
            }
        } else {
            // already exists
            console.log('Duplicate caught');
            throw new Meteor.Error(14, 'This trainee already exists in the system', 'Duplicate detected');
            return
        }
        } else {
            console.log('DENIED: call from someone without enough access');
            throw new Meteor.Error(101, 'Error 403: Not Authorized', 'Access level not high enough.');
            return
        }
    }
});
