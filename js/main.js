if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        cityWeather(position.coords.latitude + ',' + position.coords.longitude, '', 'f');
    });
} else {
    cityWeather('New York, NY', '', '');
}

function cityWeather(location, woeid, unitType) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: unitType,
        success: function (weather) {
            var reg = "";
            var temp = "";
            var speed = "";
            $('#second-row').html('<div id="humid-wind"></div>');
            if (weather.country == 'United States' || weather.country == 'Canada') {
                reg = weather.region;
            } else {
                reg = weather.country;
            }
            var header = '<h1 id="city">' + weather.city + ", " + reg + '</h1>';
            header += '<h1 id="temp">' + weather.temp + '&deg;' + weather.units.temp;
            $('#header').html(header);

            var humidwind = '<h1 id="weather-text">' + weather.currently + '</h1>';
            humidwind += '<h1 id="humidity">Hum ' + weather.humidity + '%' + '</h1>';
            humidwind += '<h1 id="wind">' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed.toUpperCase() + ' ' + '</h1>';
            $('#humid-wind').html(humidwind);
            $('#second-row').append('<div id="weather"><i class="fa fa-sun-o"></i></div>');
            $('#metric').show();
            $('#loading').hide();
        },
        error: function (error) {
            $('weatherDisplay').html('<h1 id="error"> We' + '&rsquo;' + 're sorry, but there appears to be an error. We cannot currently display your weather.</h1>');
        }
    });
};