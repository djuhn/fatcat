// helper for datatable
TabularTables = {};

FeedbackUsers = new Mongo.Collection('FeedbackUsers');

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

Places = new Mongo.Collection('Places');
Trusts = new Mongo.Collection('Trusts');
Hospitals = new Mongo.Collection('Hospitals');
Trainees = new Mongo.Collection('Trainees');
Feedback = new Mongo.Collection('Feedback');

TabularTables.Feedback = new Tabular.Table({
    name: "Feedback",
    collection: Feedback,
    columns: [
        {data: "trust", title: "Trust"},
        {data: "hospital", title: "Hospital"},
        {data: "workplacestring", title: "Workplaces"},
        {data: "consultant", title: "Consultant"},
        {data: "feedback", title: "Feedback"},
    ],
    allow: function(userId) {
        if (Roles.userIsInRole(userId, ['sysadmin', 'CT'], 'default-group')) {
            return true
        } else {
            return false; // don't allow this person to subscribe to the data
        }
    },
    selector: function(userId) {
        if (Roles.userIsInRole(userId, 'sysadmin', 'default-group')) {
            return {}
        } else {
            var h = Roles.getRolesForUser(userId, 'hospitals');
            var n = Hospitals.findOne({ _id: h[0] });
            if(typeof n !== "undefined") { return { Hospital: n.Hospital } } else { return false }
        }
    }
});

TabularTables.Trainees = new Tabular.Table({
    name: "Trainees",
    collection: Trainees,
    columns: [
        {data: "email", title: "Email"},
        {data: "workplacestring", title: "Workplaces"},
        {data: "Asked", title: "Asked",
        render: function (val, type, doc) {
                if (val === false) {
                  return "Yes";
                } else {
                  return "No";
                }
              }
        },
        {data: "Reminded", title: "Reminded",
        render: function (val, type, doc) {
                if (val === false) {
                  return "Yes";
                } else {
                  return "No";
                }
              }
        },
        {data: "Responded", title: "Responded",
        render: function (val, type, doc) {
                if (val === false) {
                  return "Yes";
                } else {
                  return "No";
                }
              }
        },
    ],
    allow: function(userId) {
        if (Roles.userIsInRole(userId, ['sysadmin', 'CT'], 'default-group')) {
            return true
        } else {
            return false; // don't allow this person to subscribe to the data
        }
    },
    selector: function(userId) {
        if (Roles.userIsInRole(userId, 'sysadmin', 'default-group')) {
            return {}
        } else {
            var h = Roles.getRolesForUser(userId, 'hospitals');
            var n = Hospitals.findOne({ _id: h[0] });
            if(typeof n !== "undefined") { return { Hospital: n.Hospital } } else { return false }
        }
    }
});

TabularTables.Places = new Tabular.Table({
    name: "Places",
    collection: Places,
    columns: [
        { data: "Trust", title: "Trust" },
        { data: "Hospital", title: "Hospital" },
        { data: "Department", title: "Department" },
    ],
    allow: function(userId) {
        if (Roles.userIsInRole(userId, ['sysadmin', 'CT'], 'default-group')) {
            return true
        } else {
            return false; // don't allow this person to subscribe to the data
        }
    },
    selector: function(userId) {
        if (Roles.userIsInRole(userId, 'sysadmin', 'default-group')) {
            return {}
        } else {
            var h = Roles.getRolesForUser(userId, 'hospitals');
            var n = Hospitals.findOne({ _id: h[0] });
            if(typeof n !== "undefined") { return { Hospital: n.Hospital } } else { return false }
        }
    }

});

TabularTables.Trusts = new Tabular.Table({
    name: "Trusts",
    collection: Trusts,
    columns: [
        { data: "Trust", title: "Trust" },
    ],
    allow: function(userId) {
        if (Roles.userIsInRole(userId, ['sysadmin', 'CT'], 'default-group')) {
            return true
        } else {
            return false; // don't allow this person to subscribe to the data
        }
    },
    selector: function(userId) {
        if (Roles.userIsInRole(userId, 'sysadmin', 'default-group')) {
            return {}
        } else {
            var h = Roles.getRolesForUser(userId, 'hospitals');
            var n = Hospitals.findOne({ _id: h[0] });
            if(typeof n !== "undefined") { return { Trust: n.Trust } } else { return false}
        }
    }
});

TabularTables.Hospitals = new Tabular.Table({
    name: "Hospitals",
    collection: Hospitals,
    columns: [
        { data: "Trust", title: "Trust" },
        { data: "Hospital", title: "Hospital" },


    ],
    allow: function(userId) {
        if (Roles.userIsInRole(userId, ['sysadmin', 'CT'], 'default-group')) {
            return true
        } else {
            return false; // don't allow this person to subscribe to the data
        }
    },
    selector: function(userId) {
        if (Roles.userIsInRole(userId, 'sysadmin', 'default-group')) {
            return {}
        } else {
            var h = Roles.getRolesForUser(userId, 'hospitals');
            var n = Hospitals.findOne({ _id: h[0] });
            if(typeof n !== "undefined") {return { Hospital: n.Hospital } } else { return false}
        }
    }
});

TabularTables.FeedbackUsers = new Tabular.Table({
    name: "Feedback Users",
    collection: FeedbackUsers,
    columns: [
        { data: "email", title: "Email" },
        { data: "surname", title: "Surname" },
        { data: "firstname", title: "Firstname" },
        /*    {data: "level", title: "Access Level",
                  render: function (val, type, doc) {
                      if (val == 10) { return "System Admin"; }
                      if (val == 9) { return "Head of School"; }
                      if (val == 8) { return "Regional Advisor"; }
                      if (val == 7) { return "Deputy Regional Advisor"; }
                      if (val == 6) { return "Training Programme Director"; }
                      if (val == 5) { return "College Tutor" }
                  }
            },*/
        {
            data: "workplacestring",
            title: "Workplaces",
            /*          render: function (val, type, doc) {
                        var x = "<span class='label label-default'>";
                        if (val instanceof Array) {
                          _.forEach(val, function(e) {
                           x = x + val;             
                          });
                          x = x + "</span>";
                            return x;
                        } else {
                            x = x + "Nil</span>";
                        }
                        return x
                    }*/
        }
    ],
    allow: function(userId) {
        if (Roles.userIsInRole(userId, ['sysadmin', 'CT'], 'default-group')) {
            return true
        } else {
            return false; // don't allow this person to subscribe to the data
        }
    },
    // only let CT see data from own hospital
    selector: function(userId) {
        if (Roles.userIsInRole(userId, 'sysadmin', 'default-group')) {
            return {}
        } else {
            var h = Roles.getRolesForUser(userId, 'hospitals');
            var n = Hospitals.findOne({ _id: h[0] });
            if(typeof n !== "undefined") { return { Hospital: n.Hospital } } else { return false}
        }
    }
});
