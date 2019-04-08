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
var nextArrival = "";
var minutesAway = "";
var currentTime = moment().format("HH:mm");

$("#first-train-time-input").timepicker({ timeFormat: "HH:mm" });
    $("#setTimeButton").off();
    $("#setTimeButton").on("click", function (event) {
        event.preventDefault();
        $("#first-train-time-input").timepicker("setTime", currentTime);
       // console.log("hola "+currentTime);
    });

$("#add-train").off();
$("#add-train").on("click", function (event) {
    event.preventDefault();
    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    //$(".test2").text(currentTime);
    //console.log(firstTrain);

    database.ref().push({
        TrainName: train,
        Destination: destination,
        Frequency: frequency,
        FirstTrain: firstTrain,
        //NextArrival: nextArrival,
        //MinutesAway: minutesAway
    });
});

database.ref().on("child_added", function (childSnapshot) {
    var tr = $("<tr>");
    var tdTrain = $("<td>");
    var tdDestination = $("<td>");
    var tdFrequency = $("<td>");
    var tdNextArrival = $("<td>");
    var tdMinutesAway = $("<td>");
    var nextArrival;
    var minutesAway;
    currentTime = moment().format("HH:mm");
    
    var frequencyMin=childSnapshot.val().Frequency;

    var firstTrainTime=moment(childSnapshot.val().FirstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainTime), "minutes");
    var tRemainder = diffTime % frequencyMin;
    var tMinutesTillTrain = frequencyMin - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    //console.log("first train "+firstTrainTime);
   // console.log("hour "+ hour);
   // console.log("minutes "+ minutes);


   // var hoursIntoMinutes=hour*60;
    //var totalMinutes=hoursIntoMinutes+minutes;

    //console.log("hours into minutes: "+hoursIntoMinutes);
    //console.log("total minutes: "+totalMinutes);

    console.log("first train time: "+firstTrainTime);

    console.log("current time: "+currentTime);

    console.log("frequency: "+frequencyMin);

    var otherTrain=moment().add(frequencyMin, "minutes").format("HH:mm");
    console.log("current time plus frequency which is wrong btw: "+otherTrain);
    

    tdTrain.attr("class", "train-name");
    tdDestination.attr("class", "destination");
    tdFrequency.attr("class", "frequency");
    tdNextArrival.attr("class", "next-arrival");
    tdMinutesAway.attr("class", "minutes-away");



    console.log(childSnapshot.val().TrainName);
    console.log(childSnapshot.val().Destination);
    console.log(childSnapshot.val().Frequency);
    //console.log(childSnapshot.val().NextArrival);
    //console.log(childSnapshot.val().MinutesAway);

    $("tbody").append(tr);
    tr.append(tdTrain);
    tr.append(tdDestination);
    tr.append(tdFrequency);
    tr.append(tdNextArrival);
    tr.append(tdMinutesAway);

    tdTrain.text(childSnapshot.val().TrainName);
    tdDestination.text(childSnapshot.val().Destination);
    tdFrequency.text(childSnapshot.val().Frequency);
    tdNextArrival.text(moment(nextTrain).format("hh:mm"));
    tdMinutesAway.text(tMinutesTillTrain);



    //$("#train-name").text(childSnapshot.val().TrainName);
    //$("#destination").text(childSnapshot.val().Destination);
    //$("#frequency").text(childSnapshot.val().Frequency);
    //$("#nextArrival").text(childSnapshot.val().TrainName);
    // $("#minutesAway").text(childSnapshot.val().TrainName);


})
})