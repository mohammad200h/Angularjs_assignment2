(function () {
'use strict';

angular.module('shoppingApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var toBuy = this;

  toBuy.showList= ShoppingListService.showBuyList();
  toBuy.show = 0;


  toBuy.Update = function(index){
    ShoppingListService.ListBoughtItems_adder(index);
    ShoppingListService.ListToBuyItems_remover(index);
    toBuy.show = ShoppingListService.ToBuyShow();

  };


}
AlreadyBoughtController.$inject = ['ShoppingListService','$scope'];
function AlreadyBoughtController(ShoppingListService,$scope) {
  var bought=this;

  bought.showList = ShoppingListService.showBoughtList();
  bought.hide =  1;



  $scope.$watch(function(){
        bought.hide =  ShoppingListService.BoughtShow();
  });

}










function ShoppingListService() {
  var service = this;

  var toBuyItems  = [{name:'chicken',quantity:2},{name:'banana',quantity:3},{name:'apple',quantity:5},{name:'soup',quantity:1},{name:'water',quantity:5},{name:'poop',quantity:10}];
  var boughtItems = [];
  var counter = 0 ;
  var sizeOfArray = toBuyItems.length;



  service.ListBoughtItems_adder = function(index){

      counter++;
    var item = {
      name: toBuyItems[index].name,
      quantity: toBuyItems[index].quantity,
      counter :counter
    };

    boughtItems.push(item);
    service.ToBuyShow();
  };
  service.ListToBuyItems_remover  = function(index){

    toBuyItems.splice(index,1);

  };

  service.showBuyList = function(){
    return toBuyItems;
  };
  service.showBoughtList = function(){
    return boughtItems;
  };


  service.ToBuyShow= function(){
    if(toBuyItems.length==0){
      return 1;
    }else{
      return 0;
    }
  };
  service.BoughtShow= function(){
    if(toBuyItems.length == 6){
      return 1;
    }else{
      return 0;
    }
  };




}


})();
