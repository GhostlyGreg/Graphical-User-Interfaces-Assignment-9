/*************************************************************************************
 Name:           Gregory James Caldwell Jr. 
 Email:          Gregory_Caldwell@student.uml.edu or DevilishCrusader@yahoo.com
 Creation Date:  12/04/2014
 Summary:        This is a main file containing javascript code for Assignment 9
 Filename:       main.js
*************************************************************************************/

/*************************************************************************************
 Sorce:          Profressor Jesse M. Heines 
 Link:           https://teaching.cs.uml.edu/~heines/91.461/91.461-2014-15f/461-assn/code/Assn09-Starter/jmh-assn09-v4.html
 Changes?:       Modified to display the data input by the users for the tab titles
                 also changed some a lot of the syntax and comments to fix my style.  
*************************************************************************************/

// This line of code ensures that all variables are declared before use. 
"use strict"; 

// The number of the last column sorted, initialized to the "Student Name" column
// Worth noting this is regular javascript code. 
var lastSortColumnNo = 2;

// a flag indicating whether the last sort was ascending (true) or descending (false)
// Worth noting this is regular javascript code. 
var lastSortDescending = false;

// Setting up AngularJS module, note that name must be the
// same as that in the ng-app attribute of the html tag. 
var myApp = angular.module('MTGApp', []);

// Setting a constant to the JSON file - Data.json
myApp.constant("jsonUrl", "Data.json");

// Adding the logic to the ng-app controller.
myApp.controller('MTGInfo',
  /**  Read JSON data using Ajax - adapted from Pro AngularJS, p. 149.
    *  @param $scope  the standard AngularJS model scope
    *  @param $http   the built-in AngularJS http object containing the get function
    *  @param jsonURL the app constant containing the JSON file path (defined above)
    **/
  function($scope, $http, jsonUrl) {
    $scope.jsonData = {}; // Initializes an object in the model's scope.
    $http.get(jsonUrl) // Performs the Ajax call.
      .success(function(data) { // Execute this function if the Ajax succeeded. 
        $scope.jsonData.data = data; // Set the model's jsonData.data property to the
		                             // data returned by the Ajax call
      }) 
      .error(function(error) { // Execute this function if the Ajax failed.
        $scope.jsonData.error = error; // Set the model's jsonData.error property to the
		                               // error returned by the Ajax call
      }); 

    // Setting the initial sort field (student name) and sort order (ascending)
    $scope.sortField = "name";
    $scope.sortDescending = false;

    /**
      *  Sort column clicked in either ascending or descending order.
      *  
	  *  Note that this could also be accomplished using the built-in AngularJS orderBy
      *    filter and manipulating the sort field and reverse parameters.
      *  
	  *  Also note that this code could also have been incorporated into the ng-click
      *    directives on the table's th elements, but doing it here gave me more central
      *    control, and I think that this function makes what's going on clearer and
      *    therefore easier to maintain.
      *  
	  *  @param colNo the number of the column header clicked
      **/
    $scope.sortColumn = function(colNo) {
      $scope.sortDescending = lastSortColumnNo === colNo && !lastSortDescending;
      // True to sort in descending order. 
	  // False to sort in ascending order.
      // **Will be false if sorting a new column or last sort was descending.**
      if (colNo === 2) {
        // Column number 2 is the "Name" column. 
        $scope.sortField = "name";
      } else if (colNo === 3) {
        // Column number 3 is the "Mana Cost" column.
        $scope.sortField = "manaCost";
      } else if (colNo === 4) {
        // Column number 4 is the "Type" column.
        $scope.sortField = "type";
      } else if (colNo === 5) {
        // Column number 5 is the "Creatures Power" column.
        $scope.sortField = "power";
      } else if (colNo === 6) {
        // Column number 6 is the "Creatures Toughness" column.
        $scope.sortField = "toughness";
      } else if (colNo === 7) {
        // Column number 7 is the "Card Artist" column.
        $scope.sortField = "artist";
      } else if (colNo === 8) {
        // Column number 8 is the "Card Text" column.
        $scope.sortField = "text";
      } else if (colNo === 9) {
        // Column number 9 is the "Card Flavor Text" column.
        $scope.sortField = "flavor";
      }
  
      // Saving the sort parameters for the next column clicked. 
      lastSortDescending = $scope.sortDescending;
      lastSortColumnNo = colNo;
    }
  }
);