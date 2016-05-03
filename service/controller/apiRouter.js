'use strict';
(function(module){	
	var initialize = function(app, path, resource, data){

		app.route('/book')
		   .get(function(req, res) {
		   		res.send('Get a random book');
		   		if( req.session){
		   			//has book
		   			console.log(req.session);
		   		}else{
		   			//write book
		   		
		   			console.log('empty');
		   		}

		   })
		   .post(function(req, res) {
		   		res.send('Add a book');
		   })
		   .put(function(req, res) {
		   		res.send('Update the book');
		   })
		   .delete(function(req, res) {
		   		res.send('delete the book');
		   });

	};
	
	module.exports = {
		initialize : initialize
	};
})(module);