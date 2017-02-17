/*
* Generate Test Accounts
* Creates a collection of test accounts automatically on startup.
*/

generateTestAccounts = function(){


  var users = [
        {name:"Normal User",email:"normal@example.com",roles:[]},
        {name:"JP Lomas",email:"jp.lomas@gmail.com",roles:['sysadmin']},
        {name:"Sophie Bishop",email:"test@test.com",roles:['CT']}
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
