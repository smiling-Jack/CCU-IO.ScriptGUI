// Force Variablen
var string_3_out_force = undefined;
var string_3_out_force = undefined;
var zahl_4_out_force = undefined;
var toint_0_out_force = undefined;
var tofloat_1_out_force = undefined;
var tostring_2_out_force = undefined;
// Timeout Variablen

// CCU.IO Objekte
// Trigger
//Programm_0
function codebox_0(data) {
    var string_3_out = 22,5;
    simout("string_3_out", string_3_out);
    simout("string_3_out", string_3_out);
    string_3_out = string_3_out_force || string_3_out;
    string_3_out = string_3_out_force || string_3_out;
    var zahl_4_out = 99;
    simout("zahl_4_out", zahl_4_out);
    zahl_4_out = zahl_4_out_force || zahl_4_out;
    var toint_0_out = parseInt(string_3_out);
    simout("toint_0_out", toint_0_out);
    toint_0_out = toint_0_out_force || toint_0_out;
    var tofloat_1_out = parseFloat(string_3_out);
    simout("tofloat_1_out", tofloat_1_out);
    tofloat_1_out = tofloat_1_out_force || tofloat_1_out;
    var tostring_2_out = zahl_4_out.toString();
    simout("tostring_2_out", tostring_2_out);
    tostring_2_out = tostring_2_out_force || tostring_2_out;
    log(" -> Programm_0 -> " + tostring_2_out);
    log(" -> Programm_0 -> " + tofloat_1_out);
    log(" -> Programm_0 -> " + toint_0_out);
};