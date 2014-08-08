    // Force Variablen

    // Timeout Variablen

    // CCU.IO Objekte
    // Trigger
    var start_data = {
        "id": 0,
        "name": "Sim_Data",
        "newState": {
            "value": 0,
            "timestamp": 0,
            "ack": 0,
            "lastchange": 0
        },
        "oldState": {
            "value": 0,
            "timestamp": 0,
            "ack": 0,
            "lastchange": 0
        },
        "channel": {
            "id": 0,
            "name": "Sim_Data",
            "type": "Sim_Data",
            "funcIds": "Sim_Data",
            "roomIds": "Sim_Data",
            "funcNames": "Sim_Data",
            "roomNames": "Sim_Data"
        },
        "device": {
            "id": 0,
            "name": "Sim_Data",
            "type": "Sim_Data"
        }
    };
    codebox_1(start_data); //Program_1
    function codebox_1(data) {
        var linput_5_out = regaObjects[1703]["Channels"];
        var lfdevice_43_out = [];
        for (var i = 0; i < linput_5_out.length; i++) {
            if (regaObjects[linput_5_out[i]]["Parent"] != undefined) {;
                if (regaObjects[regaObjects[linput_5_out[i]]["Parent"]]["HssType"] == "HM-CC-RT-DN") {
                    lfdevice_43_out.push(linput_5_out[i]);
                }
            }
        }
        var lfchannel_44_out = [];
        for (var i = 0; i < lfdevice_43_out.length; i++) {
            if (regaObjects[lfdevice_43_out[i]]["ChnLabel"] == "CLIMATECONTROL_RT_RECEIVER") {
                lfchannel_44_out.push(lfdevice_43_out[i]);
            }
        };
        var lfdp_42_out = [];
        for (var i = 0; i < lfchannel_44_out.length; i++) {
            var _dp = regaObjects[lfchannel_44_out[i]]["DPs"]
            for (var property in _dp) {
                if (property == "BATTERY_STATE") {
                    lfdp_42_out.push(_dp[property])
                }
            }
        };
        var _out1 = [];
        var _out2 = [];
        var _out3 = [];
        for (var i = 0; i < lfdp_42_out.length; i++) {
            if (regaObjects[lfdp_42_out[i]]["ValueType"] == 4) {
                var val = getState(lfdp_42_out[i]).toFixed(1)
            } else {
                var val = getState(lfdp_42_out[i])
            } if (val != 9999 || 9999 == "") {
                _out1.push(val.toString());
                _out2.push(regaObjects[regaObjects[lfdp_42_out[i]]["Parent"]].Name);
                _out3.push(regaObjects[regaObjects[regaObjects[lfdp_42_out[i]]["Parent"]]["Parent"]].Name);
            }
            lfwert_41_out1 = _out1.join("<br>");
            lfwert_41_out2 = _out2.join("<br>");
            lfwert_41_out3 = _out3.join("<br>");
        }
        log("test_filter -> Program_1 -> " + lfwert_41_out1);
        log("test_filter -> Program_1 -> " + lfwert_41_out2);
        log("test_filter -> Program_1 -> " + lfwert_41_out3);
    }