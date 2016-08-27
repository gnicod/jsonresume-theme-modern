var fs = require('fs');
var _ = require('lodash')
var Mustache = require('mustache');

function render(resumeObject) {

	_.each(resumeObject.education, function(e){
    if( !e.area || !e.studyType ){
      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
    }  else {
      e.educationDetail = e.area + ", "+ e.studyType;
    }
	});
	resumeObject.profiles = {};

	_.each(resumeObject.basics.profiles, function(profile){
    	resumeObject.profiles[profile.network] = profile.username;
	});
	//console.log(resumeObject.profiles);
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
    console.log(theme);
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}
