
EXAMPLE = ((window, document)->
	libs     = require './common/library.js'
	React    = libs.React
	ReactDOM = libs.ReactDOM
	$ = libs.$
	console.log(libs);
	console.log(React);
	console.log(ReactDOM);
	console.log($);
	text = ''
	print = ()-> 
		console.log(text);
		@
	reactTest = ()-> 
		# coffee andreact 無法使用jsx , 若要使用jsx則須單獨使用react
		ReactDOM.render(
			React.createElement('h1', null, 'hello react!'),
			document.getElementById('example')
		);
		@
	return module =
		reactTest : reactTest
		print : print
		init : (val)->
			text = val
			@
)(window, document)
EXAMPLE.init('a').print().reactTest()