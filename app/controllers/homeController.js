'use strict';

app.controller('homeController', ['$scope', '$rootScope', '$location', 'localStorageService', 'TrendsService',
	function($scope, $rootScope, $location, localStorageService, TrendsService) {
		
		$scope.init = init;
		$scope.search = search;
		// $scope.interestByRegion = interestByRegion;
		// $scope.interestOverTime = interestOverTime;

		function init() {
			// search();
			init_JQVmap();
		}

		function search() {
			interestByRegion();
			interestOverTime();
		}

		function interestByRegion() {
			TrendsService.interestByRegion($scope.searchTerm)
			.then(function(response) {
				console.log(response);
				$scope.$apply(function () {
					$scope.regionData = response.data.geoMapData;

					// var values = $scope.regionData;

				});

				console.log($scope.data);
			}, function(err) {
				//
			});
		}

		function interestOverTime() {
			TrendsService.interestOverTime($scope.searchTerm)
			.then(function(response) {
				console.log(response);
				$scope.$apply(function () {
					$scope.data = response.data.timelineData;

					var values = $scope.data;
					var chartData = {
						type:"line",
						data:{
							labels:[],
							datasets:[
								{
									label:"My First dataset",
									backgroundColor:"rgba(38, 185, 154, 0.31)",
									borderColor:"rgba(38, 185, 154, 0.7)",
									pointBorderColor:"rgba(38, 185, 154, 0.7)",
									pointBackgroundColor:"rgba(38, 185, 154, 0.7)",
									pointHoverBackgroundColor:"#fff",
									pointHoverBorderColor:"rgba(220,220,220,1)",
									pointBorderWidth:1,
									fill:false,
									data:[]
								}
							]
						},
						options:{
							responsive:true,
							maintainAspectRatio:false,
							elements:{
								line:{
									tension:0
								}
							},
							showXLabels: 10
							
						}
					}

					
					for (var i = 0; i < values.length; i ++) {
						chartData.data.labels.push(values[i].formattedTime);
						chartData.data.datasets[0].data.push(values[i].value[0]);
					}

					//	Crea el chart en el elemento indicado
					new Chart(document.getElementById("lineChart"), chartData);
				});

            console.log($scope.data);
         }, function(err) {
				//
			});
		}

		function init_JQVmap() {
			"undefined" != typeof jQuery.fn.vectorMap && (console.log("init_JQVmap"), $("#world-map-gdp").length && $("#world-map-gdp").vectorMap({
				map: "world_en",
		      backgroundColor: null,
				color: "#ffffff",
				hoverOpacity: .7,
				selectedColor: "#666666",
				enableZoom: !0,
				showTooltip: !0,
				values: sample_data,
				scaleColors: ["#E6F2F0", "#149B7E"],
				normalizeFunction: "polynomial"
		   }), $("#usa_map").length && $("#usa_map").vectorMap({
				map: "usa_en",
				backgroundColor: null,
				color: "#ffffff",
				hoverOpacity: .7,
				selectedColor: "#666666",
				enableZoom: !0,
				showTooltip: !0,
				values: sample_data,
				scaleColors: ["#E6F2F0", "#149B7E"],
				normalizeFunction: "polynomial"
		   }))
		}

		$scope.init();
	}
]);