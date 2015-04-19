this.pcTimes = function(lat,lng,qiyam) {
	now = new Date();
	
	// Add Asr + Hanafi Asr to SunCalc
	var solr = SunCalc.getTimes(now, lat, lng);
	var noon = SunCalc.getPosition(solr['solarNoon'], lat, lng);
	var angl1 = ( Math.atan( 1 / ( 1 / Math.tan(noon['altitude']) + 1 ) ) ) * 180/Math.PI;
	var angl2 = ( Math.atan( 1 / ( 1 / Math.tan(noon['altitude']) + 2 ) ) ) * 180/Math.PI;
	SunCalc.addTime(angl1, 'a1Morning', 'a1Afternoon');
	SunCalc.addTime(angl2, 'a2Morning', 'a2Afternoon');
	
	// Now get the complete real object "solar"
	var solar = SunCalc.getTimes(now, lat, lng);

	// Build Array for displaying
	var times = {
		Fajr: solar["nightEnd"],
		Sunrise: solar["sunrise"],
		Dhuhr: solar["solarNoon"],
		Asr: solar["a1Afternoon"],
		Maghrib: solar["sunset"],
		Isha: solar["night"]
	};
	
	// Add Qiyam?
	if (qiyam) {
		var tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000)); // 86,400,000 ms
		var solarTom = SunCalc.getTimes(tomorrow, lat, lng);
		var nightLen = solarTom['sunrise'] - solar['sunset'];
		var twoThird = new Date(solarTom['sunset'].getTime() + ((nightLen / 3) *2));
		//times.push({name:"Qiyam",value:twoThird});
		times["Qiyam"] = twoThird;
	}
		
	return times;
};

this.qiblahDirection = function(lat,lng) {
	PI = Math.PI;
	if (isNaN(lat-0.0) || isNaN(lng-0.0)) {
		alert("Non-numeric entry/entries");
		return "???";
	}
	if ((lat-0.0)>(90.0-0.0) || (lat-0.0)<(-90.0-0.0)) {
		alert("Latitude must be between -90 and 90 degrees");
		return "???";
	}
	if ((lng-0.0)>(180.0-0.0) || (lng-0.0)<(-180.0-0.0)) {
		alert("Longitude must be between -180 and 180 degrees");
		return "???";
	}
	if (Math.abs(lat-21.4)<Math.abs(0.0-0.01) && Math.abs(lng-39.8)<Math.abs(0.0-0.01)) return "Any";	//Mecca
	phiK = 21.4*PI/180.0;
	lambdaK = 39.8*PI/180.0;
	phi = lat*PI/180.0;
	lambda = lng*PI/180.0;
	psi = 180.0/PI*Math.atan2(Math.sin(lambdaK-lambda),Math.cos(phi)*Math.tan(phiK)-Math.sin(phi)*Math.cos(lambdaK-lambda));
	d = (psi < 0) ? 360+psi : psi;
	return d;
	return Math.round(psi);	
};
