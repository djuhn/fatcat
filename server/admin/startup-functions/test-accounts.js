/*
* Generate Test Accounts
* Creates a collection of test accounts automatically on startup.
*/

generateTestAccounts = function(){


  var users = [
        {name:"Normal User",email:"normal@test.test",roles:[]},
        {name:"System Admin",email:"sysadmin@test.test",roles:['sysadmin']},
        {name:"College Tutor",email:"ct@test.test",roles:['CT']}
      ];

  _.each(users, function (user) {

    var userEmail = user.email,
        checkUser = Meteor.users.findOne({"emails.address": userEmail});

    var id;
if ( !checkUser ) {
    id = Accounts.createUser({
      email: user.email,
      password: "apple1",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles, 'default-group');
    }
}
  });
}
