/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */

function gettime() {

    var _time = new Date();
    var time = _time.getHours() + ":" + _time.getMinutes() + ":" + _time.getSeconds();
    return time
}
function gettime_m() {

    var _time = new Date();
    var time = _time.getHours() + ":" + _time.getMinutes() + ":" + _time.getSeconds() + ":" + _time.getMilliseconds();
    return time
}

function stopsim() {
    for (i = 0; i < 100; i++) {

        window.clearTimeout(i);
        $.each($("#sim_output").children(), function () {
            $(this).remove();
        })

    }

    $.each(SGI.plumb_inst, function () {

        var con = this.getConnections();

        $.each(con, function () {
            var $con = this
            var over = this.getOverlays();
            $.each(over, function () {

                $con.removeOverlay("sim")
            });

        });


    });
}


function simulate(callback) {
    var regaObjects = homematic.regaObjects;
    var regaIndex = homematic.regaIndex;
    var uiState = homematic.uiState;


    function getState(id) {
        return homematic.uiState["_" + id]["Value"]
    }
    function setState(id,data) {
      uiState["_" + id]["Value"] = data;
    }
    function setObject(id,data){
        if (uiState["_"+id] == undefined){
            uiState.attr("_" + id, { Value: 0, Timestamp: "", LastChange: ""});
        }
    }

    function log(data) {
        $("#sim_output").prepend("<tr><td style='width: 100px'>" + gettime_m() + "</td><td>" + data + "</td></tr>");
    }

    function simout(key, data) {

        var output = key.split("_");
        var fbs = output[0] + "_" + output[1];
        var codebox = $("#" + PRG.fbs[fbs]["parent"]).parent().attr("id");
        var cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "singel"});

        var err_text = "";

        if (cons.length < 1) {
            cons = SGI.plumb_inst.inst_mbs.getConnections({source: key})
        }
        if (cons.length < 1) {
            cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste"});
        }

        if (data == "run") {

            data = "Start um \n" + gettime()
        } else if ($.isArray(data)) {
            var _data = "";
            $.each(data, function () {
                _data += this + "\n";
            });
            data = _data

        }

        $.each(cons, function () {
            var id = this.id;
            this.addOverlay(
                ["Custom", {
                    create: function () {
                        return $('<div>\
                    <p id="overlay_' + id + '" class="sim_overlay ui-corner-all">' + data + '</p>\
                    </div>\
                                            ');
                    },
                    id: "sim"
                }]
            );

            $("#overlay_" + id)
                .mouseenter(function () {
                    $(this).addClass("overlay_expand")
                        .parent().css({"z-index": 2000});
                })
                .mouseleave(function () {
                    $(this).removeClass("overlay_expand")
                        .parent().css({"z-index": 1000});
                });
        });
    }


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    try {
        var script = Compiler.make_prg(true);
    }
    catch (err) {
        var err_text = "";

        if (err == "TypeError: this.output[0] is undefined") {
            err_text = " <b style='color: red'>Error:</b> Offene ausgänge gefunden"
        } else {
            err_text = err
        }

        var t = new Date();
        $("#sim_output").prepend("<tr><td  style='width: 100px'>" + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + ":" + t.getMilliseconds() + "</td><td>" + err_text + "</td></tr>");
    }

//    console.log(script);
    try {
        log("Start");
        eval(script)
    }
    catch (err) {
        console.log(err)
        var t = new Date();
        $("#sim_output").prepend("<tr><td  style='width: 100px'>" + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + ":" + t.getMilliseconds() + "</td><td>" + err + "</td></tr>");
    }

    return callback
}

