module.exports=function(app) {
  
  app.config(["$routeProvider",function($routeProvider){
    console.log(app,'ssssssssssssssssssssss');
    $routeProvider.when("/",{ 
      template:"<h1>aaaaaaaaaaaaaaaaaaaaaasdasdasd</h1>"
    })
  }])
}