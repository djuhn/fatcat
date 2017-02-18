/*
* Methods: Utility - Example
* Example of a method used for performing a function on the server.
*/

// Example third-party API stub to call.
// This should be deleted and is only here as an example.
// var chipotle = {
//   getBurrito: function(burrito){
//     return burrito;
//   }
// }

Meteor.methods({
  HowManyHospitals: function(callingUser){
    // Check the argument. Assuming an Object type here.
    check(callingUser, Object);
    // Perform the function.
    try {
      if (Roles.userIsInRole(callingUser, 'sysadmin', 'default-group')||Roles.userIsInRole(callingUser, 'CT', 'default-group')) {
       return Hospitals.find().count(); 
     }
    } catch(exception) {
      // If an error occurs, return it to the client.
      console.log('error on hospital count: ' + exception);   
      return exception;
    }
  },
  HowManyConsultants: function(callingUser){
    // Check the argument. Assuming an Object type here.
    check(callingUser, Object);
    // Perform the function.
    try {
      if (Roles.userIsInRole(callingUser, 'sysadmin', 'default-group')||Roles.userIsInRole(callingUser, 'CT', 'default-group')) {
       return FeedbackUsers.find().count(); 
     }
    } catch(exception) {
      // If an error occurs, return it to the client.
      console.log('error on consultant count: ' + exception); 
      return exception;
    }
  },
  SystemUsers: function(callingUser){
    // Check the argument. Assuming an Object type here.
    check(callingUser, Object);
    // Perform the function.
    try {
      if (Roles.userIsInRole(callingUser, 'sysadmin', 'default-group')||Roles.userIsInRole(callingUser, 'CT', 'default-group')) {
       return Meteor.users.find().count();
        }
    } catch(exception) {
      // If an error occurs, return it to the client.
      console.log('error on system user count: ' + exception); 
      return exception;
    }
  },
  AmICT: function(callingUser){
    var x = Roles.userIsInRole(callingUser,'CT','default-group');
    return x
  },
  SysAdmin: function(callingUser){
    var x = Roles.userIsInRole(callingUser,'sysadmin','default-group');
    return x
  },
  MyCT: function(callingUser){
    var x = Roles.userIsInRole(callingUser,'CT','default-group');
    if (x) {
      var h = Roles.getRolesForUser(callingUser,'hospitals');
       var n = Hospitals.findOne({_id:h[0]});
       // console.log(h);
       // console.log(n);
       if (n) {
        return n.Hospital 
      } else {
        return "unknown"
      }
    }
  }
});
