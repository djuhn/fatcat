// var users = [
//       {name:"Normal User",email:"normal@example.com",roles:[]},
//       {name:"JP Lomas",email:"jp.lomas@gmail.com",roles:['sysadmin']},
//       {name:"Sophie Bishop",email:"test@test.com",roles:['CT']}
//     ];

// _.each(users, function (user) {
//   var id;

//   id = Accounts.createUser({
//     email: user.email,
//     password: "apple1",
//     profile: { name: user.name }
//   });

//   if (user.roles.length > 0) {
//     // Need _id of existing user record so this call must come
//     // after `Accounts.createUser` or `Accounts.onCreate`
//     Roles.addUsersToRoles(id, user.roles, 'default-group');
//   }

// });


 // > Roles.setUserRoles('9igmhr9N99TpBno9p', '2xedhgJvufpzRuSNZ', 'hospitals');
// > Roles.setUserRoles('8x4gdCMJNcMRh5Jgw', 'sysadmin', 'default-group')
//
// Roles.getRolesForUser('8x4gdCMJNcMRh5Jgw','hospitals') => which hospital you're CT for
// (if Roles.getRolesForUser('8x4gdCMJNcMRh5Jgw','default-group') = 'CT')

