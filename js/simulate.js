/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
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
    $(".btn_min_trigger").unbind("click");

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

    $(".fbs, .mbs").show();
    $("#img_set_script_play").attr("src", "img/icon/play.png");
    $(".btn_min_trigger").attr("src", "img/icon/bullet_toggle_minus.png");
    $(".btn_min_trigger").css({
        height: "10px",
        top: 3,
        width: "10px"
    });
    SGI.sim_run = false;
}


function simulate(target) {
    if (!SGI.sim_run) {
        var regaObjects = homematic.regaObjects;
        var regaIndex = homematic.regaIndex;
        var uiState = homematic.uiState;


        function getState(id) {
            return homematic.uiState["_" + id]["Value"]
        }

        function setState(id, data) {
            uiState["_" + id]["Value"] = data;
        }

        function setObject(id, data) {
            if (uiState["_" + id] == undefined) {
                uiState.attr("_" + id, { Value: 0, Timestamp: "", LastChange: ""});
            }
        }

        function schedule(data) {
        }

        function subscribe(data) {
        }

        function execCmd(data) {
        }


        function log(data) {
            $("#sim_output").prepend("<tr><td style='width: 100px'>" + gettime_m() + "</td><td>" + data + "</td></tr>");
        }

        function pushover(data) {
            $("#sim_output").prepend("<tr><td style='width: 100px'>" + gettime_m() + "</td><td><b style='color: blue'>Pushover: </b>" + data.message + "</td></tr>");
        }

        function email(data) {
            $("#sim_output").prepend("<tr><td style='width: 100px'>" + gettime_m() + "</td><td><b style='color: blue'>E-Mail: </b>" + data.to + '<br>' + data.subject + '<br>' + data.text + "</td></tr>");
        }

        function simout(key, data) {

            var output = key.split("_");
            var fbs = output[0] + "_" + output[1];
            var codebox = $("#" + PRG.fbs[fbs]["parent"]).parent().attr("id");
            var cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "*"});

            var err_text = "";


            if (cons.length < 1) {
                cons = SGI.plumb_inst.inst_mbs.getConnections({source: key})
            }
            if (cons.length < 1) {
                cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste_ch"});
            }
            if (cons.length < 1) {
                cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste_dp"});
            }
            if (cons.length < 1) {
                cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste_var"});
            }
            if (cons.length < 1) {
                cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "expert"});
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
                this.removeOverlay("sim");
                this.addOverlay(
                    ["Custom", {
                        create: function () {
                            return $('<div>\
                    <p id="overlay_' + id + '" class="sim_overlay ui-corner-all">' + data + '</p>\
                    </div>');
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
            $(".fbs, .mbs").hide();
            $("#img_set_script_play").attr("src", "img/icon/playing.png");
            $(".btn_min_trigger").attr("src", "img/icon/start.png");
            $(".btn_min_trigger").css({
                height: "15px",
                top: 0,
                width: "15px"
            });
            log("Start");

            eval(script)
            $(".btn_min_trigger").bind("click", function () {
                if (SGI.sim_run) {

                    var trigger = $(this).parent().parent().attr("id");
                    console.log(this.mbs_id)
                    $.each(PRG.struck.trigger, function () {
                        console.log(this.mbs_id)
                        if (this.mbs_id == trigger) {
                            $.each(this.target, function () {
                                console.log(this + "()")
                                eval(this + "(" + JSON.stringify(SGI.start_data.valueOf()) + ")");
                            });
                            return false
                        }
                    })
                }
            });
            SGI.sim_run = true;
        }
        catch (err) {
            console.log(err)
            var t = new Date();
            $("#sim_output").prepend("<tr><td  style='width: 100px'>" + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + ":" + t.getMilliseconds() + "</td><td>" + err + "</td></tr>");
        }
    } else {


    }


}

