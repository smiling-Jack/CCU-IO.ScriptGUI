// Timeout Variablen
var brake_0;
function brake_0_in1(data) {
    brake_0 = setTimeout(function () {
        codebox_1(data);
    }, 1)
}// CCU.IO Objekte
// Trigger
var start_data = {    id: 0, name: "Engine_Start", newState: {        value: 0, timestamp: 0, ack: 0, lastchange: 0, }, oldState: {            value: 0, timestamp: 0, ack: 0, lastchange: 0, }, channel: {            id: 0, name: "Engine_Start", type: "Engine_Start", funcIds: "Engine_Start", roomIds: "Engine_Start", funcNames: "Engine_Start", roomNames: "Engine_Start", }, device: {            id: 0, name: "Engine_Start", type: "Engine_Start", }};
brake_0_in1(start_data);//Programm_1
function codebox_1(data) {
    var true_1_out = true;
    simout("true_1_out", true_1_out);
    pushover({message: true_1_out});
}