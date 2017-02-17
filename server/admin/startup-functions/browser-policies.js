/*
* Browser Policies
* Browser policy customizations.
* Documentation: https://atmospherejs.com/meteor/browser-policy
*/

customBrowserPolicies = function(){
  BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
}

