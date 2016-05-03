'use strict';
(function(module){	
	var initialize = function(app, path, resource, data){

		app.route('/book')
		   .get(function(req, res) {
		   		
		   		if( req.session.book){
		   			console.log(req.session);
		   		}else{
		   			req.session.book = {name : 'head first redis'};
		   			console.log('empty');
		   		}

		   		res.send('Get a random book');

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