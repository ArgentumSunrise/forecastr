/* if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        cityWeather(position.coords.latitude + ',' + position.coords.longitude, '', 'f');
        firstTime = false;
    });
} else {
    cityWeather('New York, NY', '', 'f');
    $('#loading').hide();
} */

// I'll get this functional eventually... sigh...

function cityWeather(location, woeid, unitType) {
    var forecasts = {};
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: unitType,
        success: function (weather) {
            var reg = "";
            var temp = "";
            var speed = "";
            var header = "";
            var humidwind = "";
            var cityText = "";
            var reg = "";

            $('#loading').hide();

            weather.humidity = (weather.humidity ? weather.humidity : 0);
            weather.visibility = (weather.visibility ? weather.visibility : 0);

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
                weather.temp = '5800';
                weather.units.temp = 'K';
                weather.currently = 'Horrible Death';
                weather.humidity = 0;
                weather.wind.direction = 'E';
                weather.wind.speed = 900;
                weather.units.speed = 'km/s';
                weather.units.distance = 'ly';
                weather.visibility = '56.7';
                $('#metric').hide();
            }

            header += cityText + '<h1 id="temp">' + weather.temp + '&deg;' + weather.units.temp;
            $('#header').html(header);

            weather.wind.speed = Math.round(weather.wind.speed * 10) / 10;
            weather.visibility = Math.round(weather.visibility * 10) / 10;

            humidwind = '<h1 id="weather-text">' + weather.currently + '</h1>';
            humidwind += '<h1><img class="display-icon" src="imgs/display-icons/humidity.png">' + weather.humidity + '%' + '</h1>';
            humidwind += '<h1><img class="display-icon" src="imgs/display-icons/wind.png">' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed.toUpperCase() + '</h1>';
            humidwind += '<h1><img class="display-icon" src="imgs/display-icons/visibility.png">' + weather.visibility + ' ' + weather.units.distance.toUpperCase() + '</h1>';
            $('#humid-wind').html(humidwind);
            $('#second-row').append('<div id="weather"><img class="condition-icon" src="imgs/weather-icons/icon-' + weather.code + '"></div>');
            $('#second-row').show();
            // $('#loading').hide();
        },
        error: function (error) {
            $('weatherDisplay').html('<h1> We' + '&rsquo;' + 're sorry, but there appears to be an error. We cannot currently display your weather.</h1>');
        }
    });
};

function cityForecast(location, woeid, unitType) {
    var forecasts = {};
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: unitType,
        success: function (weather) {
            var html = "";
            $('#forecasts').html("");
            $('#loading').hide();

            for (var i = 0; i < 5; i++) {
                html += '<div class="forecast"><div id="forecastWeather"><img src = "imgs/weather-icons/icon-' + weather.forecast[i].code + '" alt="Forecast Icon"></div>';
                html += '<div id="forecastData"><h1>' + weather.forecast[i].day + '</h1>';
                html += '<h1><span>High:</span> ' + weather.forecast[i].high + '</h1>';
                html += '<h1><span>Low:</span> ' + weather.forecast[i].low + '</h1></div></div>';
            };
            $('#forecasts').html(html);
        },
        error: function (error) {
            $('weatherDisplay').html('<h1> We' + '&rsquo;' + 're sorry, but there appears to be an error. We cannot currently display your weather.</h1>');
        }
    })
}
