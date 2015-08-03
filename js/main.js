if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        cityWeather(position.coords.latitude + ',' + position.coords.longitude, '', 'f');
    });
} else {
    cityWeather('New York, NY', '', 'f');
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
            var cityText = "";
            var header = "";
            var humidwind = "";
            var specialCase = false;
            $('#second-row').html('<div id="humid-wind"></div>');
            if (weather.country == 'United States' || weather.country == 'Canada') {
                reg = weather.region;
                cityText = '<h1 id="city">' + weather.city + ", " + reg + '</h1>'
            } else if (weather.country != weather.city) {
                reg = weather.country;
                cityText = '<h1 id="city">' + weather.city + ", " + reg + '</h1>';
            } else if (weather.country == weather.city) {
                cityText = '<h1 id="city"> ' + weather.city + ' </h1>';
            };

            $('#metric').show();

            if (location == "The Sun" || location == 'the sun' || location == 'sun' || location == 'Sun') {
                cityText = '<h1 id="city">The Sun</h1>';
                weather.temp = '&#x7E;' + '5800';
                weather.units.temp = 'K';
                weather.currently = 'Fiery Inferno of Death';
                weather.humidity = 0;
                weather.wind.direction = 'E';
                weather.wind.speed = 900;
                weather.units.speed = 'km/s';
                $('#metric').hide();
            }
            header = cityText;
            header += '<h1 id="temp">' + weather.temp + '&deg;' + weather.units.temp;
            $('#header').html(header);

            humidwind = '<h1 id="weather-text">' + weather.currently + '</h1>';
            humidwind += '<h1 id="humidity">Hum ' + weather.humidity + '%' + '</h1>';
            humidwind += '<h1 id="wind">' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed.toUpperCase() + ' ' + '</h1>';
            $('#humid-wind').html(humidwind);
            $('#second-row').append('<div id="weather"><i class="fa fa-sun-o"></i></div>');
            $('#second-row').show();
            $('#loading').hide();
        },
        error: function (error) {
            $('weatherDisplay').html('<h1 id="error"> We' + '&rsquo;' + 're sorry, but there appears to be an error. We cannot currently display your weather.</h1>');
        }
    });
};