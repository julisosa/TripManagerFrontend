var app = angular.module('mainApp', []);

app.controller('ticket', function ($scope, $http) {

    $http.get("https://localhost:44386/api/Ticket")
        .then(function (response) {
            console.log(response)
            $scope.tickets = response.data;
        })

    $http.get("https://localhost:44386/api/City")
        .then(function (response) {
            console.log(response)
            $scope.cities = response.data;
        })

    $http.get("https://localhost:44386/api/Vehicle")
        .then(function (response) {
            console.log(response)
            $scope.vehicles = response.data;
        })

    $scope.data = {}

    $scope.Save = function () {
        //weather alert
        console.log($scope.data)

        const currentCity = $scope.cities.find(city => city.id == $scope.data.cityId);
        console.log(currentCity)

        $http.get("https://api.weatherapi.com/v1/forecast.json?" +
            "key=e7e131419519431b99a144505220804&" +
            "q=" + currentCity.name + "&" +
            "days=3&" +
            "aqi=no&" +
            "alerts=no")
            .then(function (response) {
                console.log(response.data)

                const selectedDayWeather = response.data.forecast.forecastday.find(item => new Date(item.date + 'T00:00:00').getTime() == $scope.data.depart.getTime());

                console.log(selectedDayWeather.day.condition.text)

                if (selectedDayWeather.day.condition.text.includes('rain') || selectedDayWeather.day.condition.text.includes('thunder')) {
                    $scope.weatherAlert = true;

                    return;
                    
                }
                else {
                        $http.post("https://localhost:44386/api/Ticket", $scope.data)
                            .then(function (response) {
                                console.log(response);
                                $('#staticBackdrop').modal('hide');
                            });
                    }
            });

        
    }
})
