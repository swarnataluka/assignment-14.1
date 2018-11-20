var Page = (function() {
// declare the view model used within the page
	function ViewModel() {
		var self = this;
		self.arrivals = ko.observableArray([]);
	}
// displays the view model through the Page module
	return{
			vm: new ViewModel();
       
			request.onload = function() {
			if (request.status === 200) {
// success
// creates online element with HTML loaded from online.html template
			var onlineMessageElement = document.createElement("div");
			onlineMessageElement.setAttribute("id", "online");
			onlineMessageElement.innerHTML = request.responseText;
			document.getElementById("main").appendChild(onlineMessageElement);
			}else {
// error retrieving file
			console.warn('Error retrieving offline.html');
			}
			};
			request.onerror = function() {
// network errors
			console.error('Connection error');
		};          
		request.send();
	}
})();