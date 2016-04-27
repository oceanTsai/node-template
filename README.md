# node-template
node web template

# Need
1. install nodejs


# Folder
service/config/** 		// runtime config of app server.

service/configTmp/** 	// environment template of app server.

service/webResource/**	// web resource (babel coffee react sass) 

web/dist                // 



# CLI
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