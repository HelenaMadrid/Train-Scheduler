$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCgZNabfQp6-0e6Q8NnB5iJcTCAX_IvOXY",
        authDomain: "train-scheduler-7e867.firebaseapp.com",
        databaseURL: "https://train-scheduler-7e867.firebaseio.com",
        projectId: "train-scheduler-7e867",
        storageBucket: "",
        messagingSenderId: "138799081197"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var train = "";
    var destination = "";
    var frequency = "";
    var arrayTrain = [];
    var arraylenght=arrayTrain.length;

    function updateTime() {
        var currentTime = moment().format('HH:mm:ss');
        $("#currentTime").html("<strong>Current Time: </strong><br>" + currentTime);
    }
    //updateTime();
    setInterval(updateTime, 1000);

    $("#first-train-time-input").timepicker({ timeFormat: "HH:mm" });

    $("#add-train").off();
    $("#add-train").on("click", function (event) {
        event.preventDefault();
        train = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
            TrainName: train,
            Destination: destination,
            Frequency: frequency,
            FirstTrain: firstTrain
        });

        $("#train-input").text(" ");
        $("#destination-input").text(" ");
        $("#first-train-time-input").text(" ");
        $("#frequency-input").text(" ");

    });
function otra(){
    console.log(arrayTrain);
    arrayTrain.forEach(function(element){
        console.log(element.frequency);
        var frequency=element.frequency;
        var firsttrain=moment(element.firsttrain, "HH:mm").subtract(1, "years");
        var timeDifference=moment().diff(moment(firsttrain),"minutes");
        var tRemainder=timeDifference % frequency;
        minutesAway = frequency - tRemainder;
        nextTrain = moment().add(minutesAway, "minutes");
        
    })
}

    database.ref().on("child_added", function (childSnapshot) {
        var tr = $("<tr>");
        var tdTrain = $("<td>");
        var tdDestination = $("<td>");
        var tdFrequency = $("<td>");
        var tdNextArrival = $("<td>");
        var tdMinutesAway = $("<td>");
        var nextTrain;
        var minutesAway;
       // var nowTime = moment();

        tdTrain.attr("class", "train-name");
        tdDestination.attr("class", "destination");
        tdFrequency.attr("class", "frequency");
        tdNextArrival.attr("class", "next-arrival");
        tdMinutesAway.attr("class", "minutes-away");

        $("tbody").append(tr);
        tr.append(tdTrain);
        tr.append(tdDestination);
        tr.append(tdFrequency);
        tr.append(tdNextArrival);
        tr.append(tdMinutesAway);

       // var frequencyMin = childSnapshot.val().Frequency;
        //var firstTrainTime = moment(childSnapshot.val().FirstTrain, "HH:mm").subtract(1, "years");
        //var timeDifference = nowTime.diff(moment(firstTrainTime), "minutes");
        //var tRemainder = timeDifference % frequencyMin;
        //var minutesAway = frequencyMin - tRemainder;
        //var nextTrain = moment().add(minutesAway, "minutes");
        
        tdTrain.text(childSnapshot.val().TrainName);
        tdDestination.text(childSnapshot.val().Destination);
        tdFrequency.text(childSnapshot.val().Frequency);
        //tdNextArrival.text(moment(nextTrain).format("HH:mm"));
        //tdMinutesAway.text(minutesAway);

        var object = {
            name: childSnapshot.val().TrainName,
            destinatio: childSnapshot.val().Destination,
            frequency: childSnapshot.val().Frequency,
            firsttrain: childSnapshot.val().FirstTrain
        }
        arrayTrain.push(object);

        otra();
        tdNextArrival.text(moment(nextTrain).format("HH:mm"));
        tdMinutesAway.text(minutesAway);
    });
    
})

