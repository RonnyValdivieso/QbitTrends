'use strict';

app.controller('homeController', ['$scope', '$rootScope', '$location', 'localStorageService', 'TrendsService',
	function($scope, $rootScope, $location, localStorageService, TrendsService) {
		
		$scope.init = init;
		$scope.search = search;
		$scope.interestOverTimeWidget = false;
		$scope.interestByRegionWidget = false;
		$scope.relatedTopicsWidget = false;
		$scope.relatedQueriesWidget = false;
		$scope.loader = false;
		// $scope.interestByRegion = interestByRegion;
		// $scope.interestOverTime = interestOverTime;

		$scope.values = [];
		$scope.options = [
			{label: "Past 5 years", value: "past_5_years"},
			{label: "Past 12 months", value: "past_12_months"},
			{label: "Past 90 days", value: "past_90_days"},
			{label: "Past 30 days", value: "past_30_days"},
			{label: "Past 7 days", value: "past_7_days"},
			{label: "Past 1 day", value: "past_1_day"},
			{label: "Past 4 hours", value: "past_4_hours"},
			{label: "Past 1 hour", value: "past_1_hour"}
		];
		$scope.selectedTime = {label: "Past 12 months", value: "past_12_months"};

		function init() {
			// search();
			init_JQVmap();
			init_daterangepicker();
			init_countries();
		}

		function search() {
			$scope.loader = true;
			interestByRegion();
			interestOverTime();
			relatedTopics();
			relatedQueries();
		}

		function interestByRegion() {
			TrendsService.interestByRegion($scope.searchTerm)
			.then(function(response) {
				// console.log(response);
				$scope.$apply(function () {
					$scope.regionData = response.data.geoMapData;

					var place;

					for (var i = 0; i < $scope.regionData.length; i++) {
						place = JSON.parse('{"'+$scope.regionData[i].geoCode.toLowerCase()+'":"'+$scope.regionData[i].value[0]+'"}');
						// console.log(place);
						$scope.values.push(place);
					}

					// $scope.interestByRegionWidget = true;
				});

			}, function(err) {
				//
			});
		}

		function interestOverTime() {
			TrendsService.interestOverTime($scope.searchTerm)
			.then(function(response) {
				// console.log(response);
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
					$scope.interestOverTimeWidget = true;
					$scope.loader = false;
				});
		 }, function(err) {
				//
			});
		}

		function relatedTopics() {
			TrendsService.relatedTopics($scope.searchTerm)
			.then(function(response) {
				console.log(response);
				$scope.$apply(function () {
					$scope.topics = response.data.rankedList;
					$scope.topTopics = $scope.topics[0].rankedKeyword;
					$scope.risingTopics = $scope.topics[1].rankedKeyword;

					$scope.relatedTopicsWidget = true;
					
				});

			console.log($scope.data);
		 }, function(err) {
				//
			});
		}

		function relatedQueries() {
			TrendsService.relatedQueries($scope.searchTerm)
			.then(function(response) {
				console.log(response);
				$scope.$apply(function () {
					$scope.queries = response.data.rankedList;
					$scope.topQueries = $scope.queries[0].rankedKeyword;
					$scope.risingQueries = $scope.queries[1].rankedKeyword;

					for (var i = 0; i < $scope.topQueries.length; i++) {
						$scope.topQueries[i].id = i+1;
					}
					for (var i = 0; i < $scope.risingQueries.length; i++) {
						$scope.risingQueries[i].id = i++;
					}

					console.log($scope.topQueries);

					$scope.relatedQueriesWidget = true;
					
				});

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
				values: $scope.values,
				scaleColors: ["#E6F2F0", "#149B7E"],
				normalizeFunction: "polynomial"
		   }))
		}

		function init_daterangepicker() {

			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');
		
			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
			};

			var optionSet1 = {
			  startDate: moment().subtract(29, 'days'),
			  endDate: moment(),
			  minDate: '01/01/2012',
			  maxDate: '12/31/2015',
			  dateLimit: {
				days: 60
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: false,
			  timePickerIncrement: 1,
			  timePicker12Hour: true,
			  ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'MM/DD/YYYY',
			  separator: ' to ',
			  locale: {
				applyLabel: 'Submit',
				cancelLabel: 'Clear',
				fromLabel: 'From',
				toLabel: 'To',
				customRangeLabel: 'Custom',
				daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				firstDay: 1
			  }
			};
			
			$('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
			$('#reportrange').daterangepicker(optionSet1, cb);
			$('#reportrange').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
			});
			$('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			$('#options1').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			});
			$('#options2').click(function() {
			  $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			});
			$('#destroy').click(function() {
			  $('#reportrange').data('daterangepicker').remove();
			});
   
		}

		function init_countries() {
			TrendsService.getCountries()
			.then(function(response) {
				var children = response.children;
				children.push({name:response.name, id:response.id});
				$scope.countries = children;
				$scope.selectedCountry = $scope.countries[$scope.countries.length - 1];
			});
		}

		$scope.init();
	}
]);