var Arrivals = (function() {
	function ArrivalViewModel() { 
		var self = this;
        self.title = "";
        self.status = "";
        self.time = "";
    }

    function ArrivalApiService() { 
        var self = this;

        
        self.getAll = function() {
        return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', './api/data.json');

        request.onload = function() {

        if (request.status === 200) {

               resolve(JSON.parse(request.response));
        } else {

                        reject(Error(request.statusText));
               }
       };

        request.onerror = function() {

				reject(Error("Network Error"));
       };
		request.send();
       });
        };
	}

	function ArrivalAdapter() {  
        var self = this;

    self.toArrivalViewModel = function(data) {
        if (data) {
					var vm = new ArrivalViewModel();
					vm.title = data.title;
					vm.status = data.status;
					vm.time = data.time;
					return vm;
				}
					return null;
			};

    self.toArrivalViewModels = function(data) {
        if (data && data.length > 0) {
			return data.map(function(item) {
            return self.toArrivalViewModel(item);
        });
        }
			return [];
        };
    }

	function ArrivalController(arrivalApiService, arrivalAdapter) { 													
		var self = this;
			self.getAll = function() {
            
					return arrivalApiService.getAll().then(function(response) {
					return arrivalAdapter.toArrivalViewModels(response);
            });
        };
    }



		var arrivalApiService = new ArrivalApiService();
		var arrivalAdapter = new ArrivalAdapter();


		var arrivalController = new ArrivalController(arrivalApiService, arrivalAdapter);    
					return {
	loadData: function() { 

			document.querySelector(".arrivals-list").classList.add('loading')
			arrivalController.getAll().then(function(response) {

            Page.vm.arrivals(response);
            document.querySelector(".arrivals-list").classList.remove('loading')
         });
      }
    }

})();