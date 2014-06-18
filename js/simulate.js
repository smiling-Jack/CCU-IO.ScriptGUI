/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

function gettime() {

    var _time = new Date();
    var time = _time.toLocaleTimeString();
    return time
}

function gettime_m() {

    var _time = new Date();
    var time = _time.toLocaleTimeString() + "." + _time.getMilliseconds();
    return time
}

function stopsim() {
    if (SGI.sim_run == true) {


        $("#img_set_script_stop").stop(true, true).effect({
            effect: "highlight",
            complete: function () {


                $("*").finish();

                window.clearAllTimeouts();
                window.clearAllIntervals();

                $.each($("#sim_output").children(), function () {
                    $(this).remove();
                });
                $.each(SGI.plumb_inst, function () {

                    var con = this.getAllConnections();

                    $.each(con, function () {
                        this.removeOverlay("sim")
                    });
                });


                SGI.sim_run = false;

            }
        });

        $("#prg_panel").find("select, input:not(.force_input)").each(function () {
            $(this).removeAttr('disabled');
        });
        $(".error_fbs").removeClass("error_fbs");

        $("#img_set_script_play").attr("src", "img/icon/play.png");

        $(".btn_min_trigger").unbind("click");
        $(".btn_min_trigger").attr("src", "img/icon/bullet_toggle_minus.png");
        $(".btn_min_trigger").css({
            height: "10px",
            top: 3,
            width: "10px"
        });
        $(".fbs, .mbs").show();
    }
}


function simulate(target) {
    if (!SGI.sim_run) {

        var regaObjects = homematic.regaObjects;
        var regaIndex = homematic.regaIndex;
        var uiState = homematic.uiState;

        $(".fbs, .mbs").hide();
        $("#img_set_script_play").attr("src", "img/icon/playing.png");
        $(".btn_min_trigger").attr("src", "img/icon/start.png");
        $(".btn_min_trigger").css({
            height: "15px",
            top: 0,
            width: "15px"
        });

        $("#prg_panel").find("select, input:not(.force_input)").each(function () {
            $(this).attr({
                'disabled': 'disabled'
            });
        });

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

            var sim_script = js_beautify(Compiler.make_prg(true).toString());
        }
        catch (err) {
            var err_text = "";

            if (err == "TypeError: this.output[0] is undefined") {
                err_text = " <b style='color: red'>Error:</b> Offenen Ausgang gefunden"
            } else  if (err == "TypeError: this.input[0] is undefined") {
                err_text = " <b style='color: red'>Error:</b> Offenen Eingang gefunden"
            } else{
                err_text = err
            }

            $("#sim_output").prepend("<tr><td  style='width: 100px'>" + gettime_m() + "</td><td>" + err_text + "</td></tr>");


            $("#" + Compiler.last_fbs).addClass("error_fbs");
            $("#" + Compiler.last_fbs).effect("bounce") ;
        }

//    console.log(script);
        try {
            log("Start");
            eval(sim_script);
            $(".btn_min_trigger").bind("click", function () {
                if (SGI.sim_run) {

                    var trigger = $(this).parent().parent().attr("id");
                    $.each(PRG.struck.trigger, function () {
                        if (this.mbs_id == trigger) {
                            $.each(this.target, function () {
                                eval(this + "(" + JSON.stringify(SGI.start_data.valueOf()) + ")");
                            });
                            return false
                        }
                    })
                }
            });

            $(document).on("change", '.force_input', "", function (e) {
                var x = $(e.target).data("info").toString();
                var force = $(e.target).val();
                if (force == "" || force == undefined || force == "undefined" || force == NaN) {
                    eval(x + "_force = undefined ;");
                } else if (force == "true") {
                    eval(x + "_force = 1 ;");
                } else if (force == "false") {
                    eval(x + "_force = 0 ;");
                } else if (isNaN(force)) {
                    eval(x + "_force = '" + force.toString() + "';");
                } else {
                    eval(x + "_force = " + force + ";");
                }
            });

            SGI.sim_run = true;
            $("#img_set_script_play").finish().effect("highlight");
        }
        catch (err) {
            var real_script = js_beautify(Compiler.make_prg().toString());
            var _sim_script = sim_script.split(/\n/);
            var _real_script = real_script.split(/\n/)
            var sim_error_line_text = _sim_script[err.lineNumber - 1];
            var sim_error_line = _sim_script.indexOf(sim_error_line_text) + 1;
            var real_error_line = _real_script.indexOf(sim_error_line_text) + 1;


            for (var i = sim_error_line; i > 1; i--) {
                if (_sim_script[i].split("xxxxxxxxxxxxxxxxxxxx ").length > 1) {
                    $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).addClass("error_fbs");
                    $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).effect("bounce") ;
                    i = 0;
                }
            }

            $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Zeilentext:</b>" + sim_error_line_text + "</td></tr>");
            $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Fehler in Zeile:</b> " + real_error_line + "</td></tr>");
            $("#sim_output").prepend("<tr><td  style='width: 100px'>" + gettime_m() + "</td><td style='color: red'>" + err + "</td></tr>");

            SGI.sim_run = true;
//            stopsim();
        }
    }


}

