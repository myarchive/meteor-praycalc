Package.describe({
	name: 'alisalaah:praycalc',
	summary: 'Islamic prayer times calculator smart package - replaces praytimes',
	version: '2.0.1',
	git: 'https://github.com/alisalaah/meteor-praycalc.git'
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.2');
	api.use(['ui'], 'client');
	api.use(['blaze'], 'client');
	api.use(['templating'], 'client');
	api.use('alisalaah:suncalc@2.0.1', 'client');
	
    api.add_files("praycalc.js", "client");
});
