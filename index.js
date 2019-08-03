//

var angular=require("angular");

var app=angular.module("app",[require("angular-route")])
require('./src/v2/route')(app);
try{
  if (angular.element(document).data().$scope) {

  } else {
    angular.bootstrap(document, [app.name]);   
  }
  
}catch(e){}

// console.log(app);
// angular.bootstrap(document, [app.name]); 
// angular.element(document).ready(() => {
  
//     // 
  
//   // console.log(app);
// });
