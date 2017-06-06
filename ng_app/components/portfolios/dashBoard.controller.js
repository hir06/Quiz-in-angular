(function() {
    "use strict";
    angular.module('QuizApp.dashBoard.controllers', [])
        .controller('dashBoardController', dashBoardController);

    dashBoardController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService', 'appConstants'];

    function dashBoardController($rootScope, $scope, $route, $location, $timeout, $interval, AppService, appConstants) {
        var _this = this;


        window.scrollTo(0, 0);
        _this.AppService = AppService;
        _this.userName = "";
        _this.userEmail = "";
        _this.userPhone = "";
        _this.login = false;
        _this.loginUser = loginUser;
        _this.openPushPopUp = openPushPopUp;
        _this.showAllAnswer = showAllAnswer;
        _this.showGraph = showGraph;
        _this.queState = [true, false, false, false, false];
        _this.correctAns = [];
        _this.ans = [];
        _this.boolArr = [];
        _this.myData = [];
        _this.shoqQue = shoqQue;
        _this.saveAns = saveAns;

        _this.showAnswer = false;
        $('#onepush-modal').openModal();
        //all Questions and answers stored here can have this as separate json file
        _this.data = [{
                "id": 0,
                "que": "Which of the following attribute triggers event when the window loses focus?",
                "options": {
                    "A": "onbeforeload",
                    "B": "onblur",
                    "C": "onlostfocus",
                    "D": "lostfocus"
                },
                "answer": "B"
            },
            {
                "id": 1,
                "que": " Which of the following attribute triggers event when the window gets focus?",
                "options": {
                    "A": "focus",
                    "B": "onfocus",
                    "C": "onformchange",
                    "D": "onforminpt"
                },
                "answer": "B"
            },
            {
                "id": 2,
                "que": "Which of the following attribute triggers events when a form gets user input? ",
                "options": {
                    "A": "focus",
                    "B": "onfocus",
                    "C": "onformchange",
                    "D": "onforminpt"
                },
                "answer": "D"
            },
            {
                "id": 3,
                "que": "Which of the following tag represents a section of the document intended for navigation in HTML5? ",
                "options": {
                    "A": "footer",
                    "B": "nav",
                    "C": "section",
                    "D": "dialog"
                },
                "answer": "B"
            },
            {
                "id": 4,
                "que": " Which of the following tag provides a hint to the user of what can be entered in the field in HTML5?",
                "options": {
                    "A": "output",
                    "B": "placeholder",
                    "C": "autofocus",
                    "D": "required"
                },
                "answer": "B"
            },


        ];
        //when user clicks on login mark him as authenticated user and move further
        function loginUser() {
            _this.login = true;
            $('#onepush-modal').closeModal();
        }

        function shoqQue(id) {

            if (queState[id - 1] == true) return true;

            else
                return false;
        }

        function saveAns(object) {
            var id = object.target.id.split('')[0];
            var tempAns = object.target.id.split('')[1];
            _this.ans[id] = tempAns;
            console.log(_this.ans);
            //afte clicking wait for a second while moving to next question
            $timeout(
                function() {
                    if (id < _this.data.length - 1) {
                        _this.queState[parseInt(id) + 1] = true;
                        _this.queState[id] = false;
                    }
                    //alert("Called after delay.");
                },
                1000);



        }
        //to show all the questions
        function showAllAnswer() {
            _this.showAnswer = true;
            for (var i = 0; i <= _this.data.length; i++) {
                _this.queState[i] = true;
                document.getElementById(i + _this.ans[i]).checked = true;


            }

        }


        //to generate a graph
        function showGraph() {
            $('#graph-modal').openModal();
            _this.myData = [];
            for (var i = 0; i < _this.data.length; i++) {
                _this.correctAns[i] = _this.data[i].answer;
                if (_this.correctAns[i] == _this.ans[i]) {
                    _this.boolArr[i] = 1;
                } else {
                    _this.boolArr[i] = 0;
                }
            }
            for (var i = 0; i < _this.data.length; i++) {
                var obj = {
                    name: i + 1,
                    y: _this.boolArr[i]

                };
                _this.myData.push(obj);
            }
            // Create the chart
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'This graph shows your answers'
                },

                xAxis: {
                    type: 'Question'
                },
                yAxis: {
                    title: {
                        text: 'Total percent mark'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{

                    data: _this.myData

                }]

            });
        }

        //function to be called to get json data from service
        // function fetchdashBoard() {
        //     var promiseObj = dashBoardService.fetchdashBoard();
        //     promiseObj.then(function success(data) {

        //             _this.data = data;


        //         },
        //         function error() {
        //             Materialize.toast("Couldn't load Questions!", 4000, "red")
        //         });
        // }


        //to get login popup
        function openPushPopUp() {

            $('#onepush-modal').openModal();
        }



        // fetchdashBoard();

    }

})();