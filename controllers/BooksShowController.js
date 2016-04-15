angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;


  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id
  }).then(function successCallback(response) {
    vm.book = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.editBook = function (book) {
    console.log('book: ', book);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id,
      data: vm.book
    }).then(function successCallback(json) {
      // don't need to do anything!
      console.log('json: ',json);
      console.log('Edit Success!');
      console.log(book);
      console.log('routeParams: ',$routeParams.id);
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  };

  vm.deleteBook = function (book) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id
    }).then(function successCallback(json) {
      console.log('Delete Success!');
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

}
