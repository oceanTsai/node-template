# description
1. node web template is WEB structure.   
2. Express is web framework.   
3. Swig is view template engine.   

# Guid
1. need install nodejs.  (請先安裝 nodejs )

# Getting started
1. npm install   
2. gulp clean   
3. gulp dev   
4. gulp build   
5. node ./service/appCore/test.js  or npm start


# Folder
service/appCore 		//app server core code

service/config/** 		// runtime config of app server.

service/configTmp/** 	// environment template of app server.

service/controller      // controller layer of MVC

service/model 		    // model layer of MVC

service/views      		// view layer of MVC

service/webResource/**	// web resource (babel coffee react sass) 

web/dist                // build output



# gulp CLI
gulp					// default action.   
gulp info				// pring current environment info.   
gulp production			// change environment to production.   
gulp test				// change environment to test.   
gulp dev				// change environment to dev devlopers.   
gulp clean				// delete temp and dist floder.   
gulp babel				// compile babel to javascript and merge js model.   
gulp coffee				// compile coffeeScript to javascript and merge js model.   
gulp sass				// compile sass to css and merge css model and minfy.   
gulp build				// 