window.addEventListener('online', function(e) { 

		console.log("You are online");
		Page.hideOfflineWarning();
		Arrivals.loadData();
		}, false);

		ko.applyBindings(Page.vm);