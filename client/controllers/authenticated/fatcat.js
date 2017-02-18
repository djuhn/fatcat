

Session.set('li', 'ov');

Template.index.helpers({
    'CT': function() {
        Meteor.call('AmICT', Meteor.userId(), function(exception, result) {
            if (exception) {
                Session.set('AmICT', false);
            } else {
                // no error
                Session.set('AmICT', result);
            }
        });
        return Session.get('AmICT');
    },
    'SysAdmin': function() {
        Meteor.call('SysAdmin', Meteor.userId(), function(exception, result) {
            if (exception) {
                Session.set('SysAdmin', false);
            } else {
                // no error
                Session.set('SysAdmin', result);
            }
        });
        return Session.get('SysAdmin');
    },
    'Hospital': function() {
        Meteor.call('MyCT', Meteor.userId(), function(exception, result) {
            if (exception) {
                Session.set('MyCT', error);
            } else {
                // no error
                Session.set('MyCT', result);
            }
        });
        return Session.get('MyCT');
    },
    'HowManyHospitals': function() {
        var x = Meteor.user();
        if (x) {
            Meteor.call('HowManyHospitals', x, function(exception, result) {
                if (exception) {
                    // error caught
                    Session.set('HowManyHospitals', error);
                } else {
                    // no error
                    Session.set('HowManyHospitals', result);
                }
            });
            return Session.get('HowManyHospitals');
        }
    },
    'SystemUsers': function() {
        var x = Meteor.user();
        if (x) {
            Meteor.call('SystemUsers', x, function(exception, result) {
                if (exception) {
                    // error caught
                    Session.set('SystemUsers', error);
                } else {
                    // no error
                    Session.set('SystemUsers', result);
                }
            });
            return Session.get('SystemUsers');
        }
    },
    'HowManyConsultants': function() {
        var x = Meteor.user();
        if (x) {
            Meteor.call('HowManyConsultants', x, function(exception, result) {
                if (exception) {
                    // error caught
                    Session.set('HowManyConsultants', error);
                } else {
                    // no error
                    Session.set('HowManyConsultants', result);
                }
            });
            return Session.get('HowManyConsultants');
        }
    }
});

Template.trainees.events({
    'click #addTrainee': function(e) {
        Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
            Session.set('activeTrusts', result);
            Meteor.call('getHospitals', Meteor.userId(), '', function(error, result) {
                Session.set('activeHospitals', result);
                Meteor.call('getDepartments', Meteor.userId(), '', '', function(error, result) {
                    Session.set('activeDepartments', result);
                    $('#DepartmentList').select2();
                    $('#addingTrainee').modal();
                });
            });
        });
    },
    'change #TraineeDeptTrustList': function(e) {
        var y = $('#TraineeDeptTrustList').val();
        var x = 'Trust name changed: need to grab Hospitals in ' + y;
        console.log(x);
        Meteor.call('getHospitals', Meteor.userId(), y, function(error, result) {
            Session.set('activeHospitals', result);
        });

        Meteor.call('getDepartments', Meteor.userId(), y, '', function(error, result) {
            Session.set('activeDepartments', result);
        });
    },
    'change #HospitalList': function(e) {
        var y = $('#HospitalList').val();
        var v = $('#TraineeDeptTrustList').val();
        var x = 'Hospital name changed: need to grab Departments in ' + v + ' trust working in ' + y + ' hospital';
        console.log(x);
        Meteor.call('getDepartments', Meteor.userId(), v, y, function(error, result) {
            Session.set('activeDepartments', result);
        });
    },
    'click #SubmitAddTrainee': function(e) {
        e.preventDefault();
        // console.log('Submit triggered');
        $('.modal-footer > .btn').hide();
        $('#TraineeWorking').show();
        var c = $('#newTraineeEmail').val();
        var b = $('#DepartmentList').val();
        // console.log(b);
        Meteor.call('addtrainee', Meteor.userId(), c, 1, b, function(error, result) {
            if (!error) {
                Bert.alert('Trainee added', 'success');
                $("#addingTrainee").modal('hide');
                $('.modal-footer > .btn').show();
                $('#TraineeWorking').hide();
                $('#newTraineeName').val('');
                $('#newTraineeFirstName').val('');
                $('#newTraineeEmail').val('');
                $('#DepartmentList').val('');
            } else {

                Bert.alert(error, 'danger');
            }
        });
    },
});



Template.users.events({
    'click #addConsultant': function(e) {
        Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
            Session.set('activeTrusts', result);
            Meteor.call('getHospitals', Meteor.userId(), '', function(error, result) {
                Session.set('activeHospitals', result);
                Meteor.call('getDepartments', Meteor.userId(), '', '', function(error, result) {
                    Session.set('activeDepartments', result);
                    $('#DepartmentList').select2();
                    $('#addingConsultant').modal();
                });
            });
        });
    },
    'change #ConsultantDeptTrustList': function(e) {
        var y = $('#ConsultantDeptTrustList').val();
        var x = 'Trust name changed: need to grab Hospitals in ' + y;
        console.log(x);
        Meteor.call('getHospitals', Meteor.userId(), y, function(error, result) {
            Session.set('activeHospitals', result);
        });

        Meteor.call('getDepartments', Meteor.userId(), y, '', function(error, result) {
            Session.set('activeDepartments', result);
        });
    },
    'change #HospitalList': function(e) {
        var y = $('#HospitalList').val();
        var v = $('#ConsultantDeptTrustList').val();
        var x = 'Hospital name changed: need to grab Departments in ' + v + ' trust working in ' + y + ' hospital';
        console.log(x);
        Meteor.call('getDepartments', Meteor.userId(), v, y, function(error, result) {
            Session.set('activeDepartments', result);
        });
    },
    'click #SubmitAddConsultant': function(e) {
        e.preventDefault();
        // console.log('Submit triggered');
        $('.modal-footer > .btn').hide();
        $('#ConsultantWorking').show();
        var y = $('#newConsultantName').val();
        var v = $('#newConsultantFirstName').val();
        var c = $('#newConsultantEmail').val();
        var b = $('#DepartmentList').val();
        // console.log(b);
        Meteor.call('addconsultant', Meteor.userId(), y, v, c, 1, b, function(error, result) {
            if (!error) {
                Bert.alert('Consultant added', 'success');
                $("#addingConsultant").modal('hide');
                $('.modal-footer > .btn').show();
                $('#ConsultantWorking').hide();
                $('#newConsultantName').val('');
                $('#newConsultantFirstName').val('');
                $('#newConsultantEmail').val('');
                $('#DepartmentList').val('');
            } else {

                Bert.alert(error, 'danger');
            }
        });
    },
});

Template.navbar.helpers({
    'highlightov': function(e) {
        var x = Session.get('li');
        if (x == 'ov') {
            return "active"
        }
    },
    'highlightwo': function(e) {
        var x = Session.get('li');
        if (x == 'wo') {
            return "active"
        }
    },
    'highlightus': function(e) {
        var x = Session.get('li');
        if (x == 'us') {
            return "active"
        }
    },
    'highlightry': function(e) {
        var x = Session.get('li');
        if (x == 'ry') {
            return "active"
        }
    },
    'highlightpe': function(e) {
        var x = Session.get('li');
        if (x == 'pe') {
            return "active"
        }
    },
    'highlightho': function(e) {
        var x = Session.get('li');
        if (x == 'ho') {
            return "active"
        }
    }
});
Template.navbar.events({
    'click #ov': function(e) {
        Session.set('li', 'ov');
    },
    'click #wo': function(e) {
        Session.set('li', 'wo');
    },
    'click #us': function(e) {
        Session.set('li', 'us');
    },
    'click #ry': function(e) {
        Session.set('li', 'ry');
    },
    'click #pe': function(e) {
        Session.set('li', 'pe');
    },
    'click #ho': function(e) {
        Session.set('li', 'ho');
    }
});

Template.hospitals.events({
    'click tbody > tr': function(event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (!rowData) return; // Won't be data if a placeholder row is clicked
        console.log(rowData);
    },
    'click #addTrust': function(e) {
        $('#addingTrust').modal();
    },
    'click #addHospital': function(e) {
        Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
            Session.set('activeTrusts', result);
            $('#addingHospital').modal();
        });
    },
    'click #SubmitAddTrust': function(e) {
        // note same code recycled below
        e.preventDefault();
        // console.log('Submit triggered');
        $('.modal-footer > .btn').hide();
        $('#TrustWorking').show();
        var y = $('#newTrustName').val();
        Meteor.call('addtrust', Meteor.userId(), y, function(error, result) {
            $('#TrustWorking').hide();
            $('.modal-footer > .btn').show();
            if (!error) {
                $("#addingTrust").modal('hide');

                $('#newTrustName').val('');
                Bert.alert('Trust added', 'success');
                Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
                    Session.set('activeTrusts', result);
                });
            } else {
                Bert.alert(error, 'danger');
            }
        });
    },
    'click #SubmitAddHospital': function(e) {
        // note same code recycled below
        e.preventDefault();
        // console.log('Submit triggered');
        $('.modal-footer > .btn').hide();
        $('#HospitalWorking').show();
        var y = $('#newHospitalName').val();
        var v = $('#TrustList').val();
        Meteor.call('addhospital', Meteor.userId(), v, y, function(error, result) {
            $('.modal-footer > .btn').show();
            $('#HospitalWorking').hide();
            if (!error) {
                $("#addingHospital").modal('hide');

                $('#newHospitalName').val('');
                Bert.alert('Hospital added', 'success');
                Meteor.call('getHospitals', Meteor.userId(), v, function(error, result) {
                    Session.set('activeHospitals', result);
                });
            } else {
                Bert.alert(error, 'danger');
            }
        });
    },
    'submit': function(e) {
        e.preventDefault();
        // console.log('Submitted form... probably need to account for ENTER being pressed.');
        if ($('#addingTrust').hasClass('in')) {
            // console.log('Enter pressed on Adding Trust');
            // pasted from above
            $('.modal-footer > .btn').hide();
            $('#TrustWorking').show();
            var y = $('#newTrustName').val();
            Meteor.call('addtrust', Meteor.userId(), y, function(error, result) {
                $('.modal-footer > .btn').show();
                $('#TrustWorking').hide();
                if (!error) {
                    $("#addingTrust").modal('hide');

                    $('#newTrustName').val('');
                    Bert.alert('Trust added', 'success');
                    Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
                        Session.set('activeTrusts', result);
                    });
                } else {
                    Bert.alert(error, 'danger');
                }
            });
        }
        if ($('#addingHospital').hasClass('in')) {
            console.log('Enter pressed on Adding Hospital');
            // pasted from above
            $('.modal-footer > .btn').hide();
            $('#HospitalWorking').show();
            var y = $('#newHospitalName').val();
            var v = $('#TrustList').val();
            Meteor.call('addhospital', Meteor.userId(), v, y, function(error, result) {
                $("#addingHospital").modal('hide');
                $('.modal-footer > .btn').show();
                $('#HospitalWorking').hide();
                $('#newHospitalName').val('');
                if (!error) {
                    Bert.alert('Hospital added', 'success');
                } else {
                    Bert.alert(error, 'danger');
                }
                Meteor.call('getHospitals', Meteor.userId(), function(error, result) {
                    Session.set('activeHospitals', result);
                });
            });
        }
    }
});

Template.workplaces.events({
    'click tbody > tr': function(event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (!rowData) return; // Won't be data if a placeholder row is clicked
        console.log(rowData);
    },
    'click #addDepartment': function(e) {
        Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
            Session.set('activeTrusts', result);
            Meteor.call('getHospitals', Meteor.userId(), '', function(error, result) {
                Session.set('activeHospitals', result);
                $('#addingDepartment').modal();
            });
        });
    },

    'change #DeptTrustList': function(e) {
        var y = $('#DeptTrustList').val();
        var x = 'Trust name changed: need to grab Hospitals in ' + y;
        console.log(x);
        Meteor.call('getHospitals', Meteor.userId(), y, function(error, result) {
            Session.set('activeHospitals', result);
        });
    },
    'click #SubmitAddDepartment': function(e) {
        // note same code recycled below
        e.preventDefault();
        // console.log('Submit triggered');
        $('.modal-footer > .btn').hide();
        $('#DepartmentWorking').show();
        var y = $('#newDepartmentName').val();
        var v = $('#DeptTrustList').val();
        var c = $('#HospitalList').val();
        Meteor.call('addplace', Meteor.userId(), v, c, y, function(error, result) {
            $('.modal-footer > .btn').show();
            $('#DepartmentWorking').hide();
            if (!error) {
                $("#addingDepartment").modal('hide');

                $('#newDepartmentName').val('');
                Bert.alert('Department added', 'success');
            } else {
                Bert.alert(error, 'danger');
            }
        });
    },
    'submit': function(e) {
        e.preventDefault();
        // console.log('Submitted form... probably need to account for ENTER being pressed.');
        if ($('#addingDepartment').hasClass('in')) {
            console.log('Enter pressed on Adding Department');
            // pasted from above
            $('.modal-footer > .btn').hide();
            $('#DepartmentWorking').show();
            var y = $('#newDepartmentName').val();
            var v = $('#DeptTrustList').val();
            var c = $('#HospitalList').val();
            Meteor.call('addplace', Meteor.userId(), v, c, y, function(error, result) {
                $("#addingDepartment").modal('hide');
                $('.modal-footer > .btn').show();
                $('#DepartmentWorking').hide();
                $('#newDepartmentName').val('');
                if (!error) {
                    Bert.alert('Department added', 'success');
                } else {
                    Bert.alert(error, 'danger');
                }
            });
        }
    }
});


Meteor.call('getTrusts', Meteor.userId(), function(error, result) {
    Session.set('activeTrusts', result);
});

Meteor.call('getHospitals', Meteor.userId(), '', function(error, result) {
    Session.set('activeHospitals', result);
});

Meteor.call('getDepartments', Meteor.userId(), '', '', function(error, result) {
    Session.set('activeDepartments', result);
});

Meteor.call('availableLevels', function(error, result) {
    Session.set('availableLevels', result);
});

Template.workplaces.helpers({
    'trusts': function() {
        x = Session.get('activeTrusts');
        // console.log(x);
        return x
    },
    'hospitals': function() {
        x = Session.get('activeHospitals');
        // console.log(x);
        return x
    }
});
Template.users.helpers({
    'trusts': function() {
        x = Session.get('activeTrusts');
        // console.log(x);
        return x
    },
    'hospitals': function() {
        x = Session.get('activeHospitals');
        // console.log(x);
        return x
    },
    'departments': function() {
        x = Session.get('activeDepartments');
        // console.log(x);
        return x
    },
    'levels': function() {
        x = Session.get('availableLevels');
        return x
    }
});
Template.trainees.helpers({
    'trusts': function() {
        x = Session.get('activeTrusts');
        // console.log(x);
        return x
    },
    'hospitals': function() {
        x = Session.get('activeHospitals');
        // console.log(x);
        return x
    },
    'departments': function() {
        x = Session.get('activeDepartments');
        // console.log(x);
        return x
    },
    'levels': function() {
        x = Session.get('availableLevels');
        return x
    }
});
