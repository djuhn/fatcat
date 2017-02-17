Template.changepw.events({
  'submit #changePasswordForm': function(e, t) {
    e.preventDefault();
 
    var changePasswordForm = $(e.currentTarget),
        newPW = changePasswordForm.find('#newPW').val(),
        oldPW = changePasswordForm.find('#oldPW').val();
        confirmPW = changePasswordForm.find('#confirmPW').val();

if (newPW === confirmPW) {

 Accounts.changePassword(oldPW, newPW, function(a,e) {
  // console.log(a);
  var v = '';
  if(a) {
    v = 'Error: ' + a.reason;
    Bert.alert(v, 'danger');
  } else {
    v = "Success - password changed";
    Bert.alert(v, 'success');
      Router.go('/');
  }


 });
  
  } else {

Bert.alert('Passwords do not match', 'danger');

}
    return false;
  },
});