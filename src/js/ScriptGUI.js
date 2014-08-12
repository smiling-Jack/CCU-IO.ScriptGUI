/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */
//var deep = require('deep-diff')
    try{
        var fs = require('fs');
        process.on("uncaughtException", function(e) { SGI.info_box(e.stack)});
    }
catch (err){

}



var scope;

var PRG = {
    struck: {
        codebox: {},
        trigger: [],
        control: []
    }
};

var SGI = {
    socket: {},
    settings: {},
    zoom: 1,
    theme: "",
    fbs_n: 0,
    mbs_n: 0,
    scope_init: {},

    grid: 9,

    str_theme: "ScriptGUI_Theme",
    str_settings: "ScriptGUI_Settings",
    str_prog: "ScriptGUI_Programm",
    str_tollbox: "ScriptGUI_Toolbox",

    sim_run: false,

    file_name: "",
    prg_store: "www/ScriptGUI/",
    example_store: "www/ScriptGUI/example/",
    key: "",
    plumb_inst: {
        inst_mbs: undefined
    },

    start_data: {
        id: 0,
        name: "Sim_Data",
        newState: {
            value: 0,
            timestamp: 0,
            ack: 0,
            lastchange: 0
        },
        oldState: {
            value: 0,
            timestamp: 0,
            ack: 0,
            lastchange: 0
        },
        channel: {
            id: 0,
            name: "Sim_Data",
            type: "Sim_Data",
            funcIds: "Sim_Data",
            roomIds: "Sim_Data",
            funcNames: "Sim_Data",
            roomNames: "Sim_Data"
        },
        device: {
            id: 0,
            name: "Sim_Data",
            type: "Sim_Data"
        }
    },

    Setup: function () {


//// Setze Theme
//        var theme =  scope.setup.theme;
//        if (theme == undefined) {
//            theme = "dark-hive"
//        }
//        $("#theme_css").remove();
//        $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui.min.css"/>');

// Setze Sprache
        SGI.language = scope.setup.lang;








//        try {
//            SGI.socket.emit("readJsonFile", "www/ScriptGUI/ScriptGUI_settings.json", function (data) {
//                SGI.settings = data;
//
//                SGI.socket.emit("getSettings", function (data) {
//                    SGI.settings.ccu = data;
//                    SGI.settings.latitude = data.latitude;
//                    SGI.settings.longitude = data.longitude;
//                })
//            });
//        }
//        catch (err) {
//
//        }


        $("#setup_dialog").dialog({
            modal: false,
            width: 600,
            maxWidth: "80%",
            height: 400,
            maxHeight: "80%",
            open: function(){
                SGI.Setup_dialog()
            },
            close: function () {
                fs.writeFile("setup.json", JSON.stringify(scope.setup), function (err) {
                    if (err) throw err;

               });
            }
        });

        $("#setup_dialog").dialog("close");

        jsPlumb.ready(function () {

            SGI.mbs_inst();

        });
        // translate XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.each($(".translate"), function () {
            var $this = this;
            $($this).text(SGI.translate($($this).text()))

        });
        $.each($(".title_translate"), function () {
            var $this = this;
            $($this).attr("title", (SGI.translate($($this).attr("title"))))

        });

        // slider XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $("#sim_output").prepend("<tr><td style='width: 100px'>Script Log</td><td></td></tr>");


        $("#prg_body").perfectScrollbar({
            wheelSpeed: 60,
            top: "50%",
            left: "50%"
        });

        $("#toolbox_body").perfectScrollbar({
            wheelSpeed: 60
        });

        $("#sim_output_body").perfectScrollbar({
            wheelSpeed: 20
        });


        $(".ps-scrollbar-x, .ps-scrollbar-y").addClass("ui-state-default frame_color_dark");


        // Toolbox XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $(".toolbox").hide();


        var box_init = storage.get(SGI.str_tollbox) || ["Allgemain", "alg"];
        // Make btn Toolboxauswahl
        $("#toolbox_select").xs_combo({
            addcssButton: "xs_button_toolbox",
            addcssMenu: "xs_menu_toolbox",
            addcssFocus: "xs_focus_toolbox",
            cssText: "xs_text_toolbox item_font",
            time: 750,
            val: box_init[0],
            data: [
                SGI.translate("Allgemein"),
                SGI.translate("Programme"),
                SGI.translate("Logic"),
                SGI.translate("Listen Filter"),
                SGI.translate("Get Set Var"),
                SGI.translate("Convert"),
                SGI.translate("Math."),
                SGI.translate("Singel Trigger"),
                SGI.translate("Zeit Trigger"),
                SGI.translate("Trigger Daten"),
                SGI.translate("Expert")
            ]

        });


        $("#toolbox_" + box_init[1]).show();

        // Toolboxauswahl
        $("#toolbox_select").change(function () {
            var val = $("#toolbox_select").xs_combo();
            var box = "";

            if (val == SGI.translate("Allgemein")) {
                box = "alg"
            }
            if (val == SGI.translate("Programme")) {
                box = "prog"
            }
            if (val == SGI.translate("Logic")) {
                box = "logic"
            }
            if (val == SGI.translate("Listen Filter")) {
                box = "filter"
            }
            if (val == SGI.translate("Get Set Var")) {
                box = "io"
            }
            if (val == SGI.translate("Singel Trigger")) {
                box = "s_trigger"
            }
            if (val == SGI.translate("Zeit Trigger")) {
                box = "t_trigger"
            }
            if (val == SGI.translate("Trigger Daten")) {
                box = "trigger_daten"
            }
            if (val == SGI.translate("Expert")) {
                box = "expert"
            }
            if (val == SGI.translate("Math.")) {
                box = "math"
            }
            if (val == SGI.translate("Convert")) {
                box = "convert"
            }
//            if(val ==""){box = ""}
//            if(val ==""){box = ""}
//            if(val ==""){box = ""}
            $(".toolbox").hide();
            $("#toolbox_" + box).show();
            storage.set(SGI.str_tollbox, [val, box]);
        });

        // Live Test
        $("#clear_force").button()
            .click(function () {
                $(this).removeClass("ui-state-focus");
                SGI.del_all_force();
            });


        var start_h;
        var log_h = 100;
        $("#sim_log_head")
            .hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            })
            .dblclick(function () {

                if ($("#sim_log").height() > 99) {
                    log_h = $("#sim_log").height();

                    $("#sim_log").css({height: "10px",
                        "min-height": "10px"});
                    $("#main").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
                    $('#toolbox_body').perfectScrollbar('update');
                    $('#prg_body').perfectScrollbar('update');

                } else {
                    $("#sim_log").css({height: log_h + "px"});
                    $("#main").css({height: 'calc(100% - ' + (58 + log_h) + 'px)'});
                    $('#toolbox_body').perfectScrollbar('update');
                    $('#prg_body').perfectScrollbar('update');
                }
            })

            .drag("init", function () {
                start_h = $("#sim_log").height();
            })

            .drag("start", function (ev, dd) {

            })

            .drag(function (ev, dd) {
                if (start_h - dd.deltaY < 100) {
                    $("#sim_log").css({height: "100px"});
                    $("#main").css({height: 'calc(100% - ' + (58 + 100) + 'px)'});
                    $('#toolbox_body').perfectScrollbar('update');
                    $('#prg_body').perfectScrollbar('update');
                } else {
                    $("#sim_log").css({height: start_h - dd.deltaY + "px"});
                    $("#main").css({height: 'calc(100% - ' + (58 + start_h - dd.deltaY) + 'px)'});
                    $('#toolbox_body').perfectScrollbar('update');
                    $('#prg_body').perfectScrollbar('update');
                }

            });

        if(scope.setup.LT_open == false){
            log_h = $("#sim_log").height();

            $("#sim_log").css({height: "10px",
                "min-height": "10px"});
            $("#main").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
            $('#toolbox_body').perfectScrollbar('update');
            $('#prg_body').perfectScrollbar('update')
        }


        //      Make element draggable
        var active_toolbox;
        $(".fbs").draggable({
            helper: "clone",
            zIndex: -1,
            revert: true,
            revertDuration: 0,
            containment: 'body',
            start: function (e) {
                active_toolbox = $(e.currentTarget).parent();
                var add = $(this).clone();
                $(add).attr("id", "helper");
                $(add).addClass("helper");
                $(add).appendTo(".main");
            },
            drag: function (e, ui) {

                var w = $("body").find("#helper").width();
                $("body").find("#helper").css({
                    left: parseInt(ui.offset.left + (75 - (w / 2) )),
                    top: parseInt(ui.offset.top - 54)
                })

            },
            stop: function () {
                $("#helper").remove()
            }
        });

        $(".mbs").draggable({
            helper: "clone",
            zIndex: -1,
            revert: true,
            revertDuration: 0,
            containment: 'body',
            start: function (e) {
                active_toolbox = $(e.currentTarget).parent();
                var add = $(this).clone();
                $(add).attr("id", "helper");
                $(add).addClass("helper");
                $(add).appendTo(".main");
            },
            drag: function (e, ui) {
                var w = $("body").find("#helper").width();
                $("body").find("#helper").css({
                    left: parseInt(ui.offset.left + ( 75 - (w / 2))),
                    top: parseInt(ui.offset.top - 54)
                })
            },
            stop: function () {
                $("#helper").remove()
            }
        });

        //Make element droppable
        $(".prg_panel").droppable({
            accept: ".mbs",
            drop: function (ev, ui) {

                if (ui["draggable"] != ui["helper"] && ev.pageX > 150) {
                    var data = {
                        type: $(ui["draggable"][0]).attr("id")

                    };
                    var top = parseInt((ui["offset"]["top"] - $("#prg_panel").offset().top + 25) / SGI.zoom);
                    var left = parseInt((ui["offset"]["left"] - $("#prg_panel").offset().left + 8 ) / SGI.zoom);
                    SGI.add_mbs_element(data, left, top);
                }
            }
        });

        SGI.menu_iconbar();
        SGI.context_menu();
        SGI.quick_help();
        SGI.select_mbs();
        SGI.select_fbs();
        SGI.global_event();



        $("body").css({visibility: "visible"});

//        console.clear();
        SGI.scope_init = scope;
        console.log("Start finish")


    },

    global_event: function(){
        $('#body').on('click', function (event) {
            if ($(event.target).hasClass("prg_panel")) {
                $(".codebox_active").removeClass("codebox_active");
            }
            if (!$(event.target).hasClass("dot") && $(event.target).parent().prop("tagName") != "svg"){
                $(".dot").remove();
            }
        });

        $(document).keydown(function (event) {
            SGI.key = event.keyCode;
            if (SGI.key == 17 || SGI.key == 91 || SGI.key == 93 || event.ctrlKey == true  ) {
                $("body").css({cursor: "help"});
                SGI.key = 17;
            } else if (SGI.key == 46) {
                SGI.del_selected()
            } else if (SGI.key == 67 && event.ctrlKey == true) {
                SGI.copy_selected();
                $("body").css({cursor: "default"});
            } else if (SGI.key == 86 && event.ctrlKey == true) {
                SGI.paste_selected();
                $("body").css({cursor: "default"});
            } else if (SGI.key == 65 && event.ctrlKey == true && event.altKey == true) {
                $("#develop_menu").show();
            }

        });

        $(document).keyup(function () {
            if (SGI.key == 17) {
                $("body").css({cursor: "default"});
            }
            SGI.key = "";
        });

    },

    mbs_inst: function () {

        SGI.plumb_inst.inst_mbs = jsPlumb.getInstance({
            PaintStyle: { lineWidth: 4, strokeStyle: "blue" },
            HoverPaintStyle: {strokeStyle: "red", lineWidth: 2 },
//            ConnectionOverlays: [
//                [ "Arrow", {
//                    location: 1,
//                    id: "arrow",
//                    length: 12,
//                    foldback: 0.8
//                } ]
//            ],
            Container: "prg_panel",
            Connector: [ "Flowchart", { stub: 30, alwaysRespectStubs: true, midpoint: 0.5}  ],
            Scope: "singel"
        });

        SGI.plumb_inst.inst_mbs.bind("click", function (c) {
            var id = c.id;
            var connector_data;
            var dot1_x;
            var dot1_y;
            var dot2_x;
            var dot2_y;
            var dot3_x;
            var dot3_y;
            var dot1_old_posi;
            var dot3_old_posi;
            var dot2_old_posi;
            var dot2_d;
            var svg_w;
            var svg_h;
            var dot_start;
            var old_midpoint;
            var old_stub;


            function make_dot() {
                connector_data = scope.con.mbs[id].connector;
                var svg_posi = {
                    top: parseInt($(c.connector.svg).css("top")),
                    left: parseInt($(c.connector.svg).css("left"))
                };

                var prg_posi = $(c.connector.svg).parent().offset();
                var path = c.connector.getPath();
                var svg_trans = $(c.connector.svg).children().first()[0].getAttribute("transform").replace("translate(", "").replace(")", "").split(",");
                dot1_x = svg_posi.left - prg_posi.left + path[0].end[0] + parseInt(svg_trans[0]) + 1;
                dot1_y = svg_posi.top - prg_posi.top + path[0].end[1] + parseInt(svg_trans[1]) + 1;

                if (path.length == 5) {
                    dot2_x = svg_posi.left + path[3].start[0] + parseInt(svg_trans[0]) + Math.abs((path[2].start[0] - path[2].end[0]) / 2) + 1;
                    dot2_y = svg_posi.top + path[2].start[1] - parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) + 1;
                    dot2_d = "y";
                    dot3_x = svg_posi.left + path[path.length - 1].start[0] + parseInt(svg_trans[0]) - 8;
                    dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]);

                    $(".dot").remove();
                    $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    $("#prg_panel").append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                    dot1_drag();
                    dot2_drag();
                    dot3_drag();
                }
                if (path.length == 3 && path[2].start[0] < path[2].end[0]) {

                    dot2_x = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                    dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2);

                    $(".dot").remove();
                    $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    dot2_drag()
                }
                if (path.length == 3 && path[2].start[0] > path[2].end[0]) {
                    $(".dot").remove();
                    $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    dot1_drag()
                }
                if (path.length == 4) {
                    dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                    dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                    dot2_d = "y";
                    $(".dot").remove();
                    $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    dot2_drag()

                }


                function dot1_drag() {

                    $("#dot1").draggable({
                        axis: "x",
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {


                            dot_start = ui.position;
                            connector_data = scope.con.mbs[id].connector;
                            old_stub = connector_data.stub.slice();

                            $("#dot2, #dot3").remove()

                        },
                        drag: function (e, ui) {
                            var dif_x = ui.position.left - dot_start.left;


                            var new_stub = parseInt(old_stub[0]) + dif_x;
                            if (new_stub < 30) {
                                new_stub = 30;
                                ui.position = dot1_old_posi;
                            } else {
                                dot1_old_posi = ui.position
                            }
                            connector_data.stub[0] = new_stub;


                            c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                            dot1_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                        },
                        stop: function () {
                            scope.con.mbs[id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }
                    });
                }

                function dot2_drag() {
                    $("#dot2").draggable({
                        axis: dot2_d,
//                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {
                            $("#dot1, #dot3").remove();
                            connector_data = scope.con.mbs[id].connector;
                            svg_w = parseInt(c.connector.bounds.maxX - (connector_data.stub[0] + connector_data.stub[1]));
                            svg_h = parseInt(c.connector.bounds.maxY);
                            dot_start = ui.position;
                            old_midpoint = parseFloat(connector_data.midpoint);

                            if (path.length == 4) {
                                svg_h = parseInt(c.connector.bounds.maxY - (connector_data.stub[0]));
                            }

                            if (path.length == 5) {
                                if (path[2].start[0] == path[2].end[0]) {
                                    dot2_d = "x";
                                    $("#dot2").draggable("option", "axis", "x");
                                } else {
                                    dot2_d = "y";
                                    $("#dot2").draggable("option", "axis", "y");
                                }

                            }
                            if (path.length == 3) {
                                if (path[1].start[0] == path[1].end[0]) {
                                    dot2_d = "x";
                                    $("#dot2").draggable("option", "axis", "x");
                                } else {
                                    dot2_d = "y";
                                    $("#dot2").draggable("option", "axis", "y");
                                }
                            }
                        },
                        drag: function (e, ui) {
                            var dif_x = ui.position.left - dot_start.left;
                            var dif_y = ui.position.top - dot_start.top;
                            path = c.connector.getPath();

                            if (dot2_d == "x") {
                                var new_midpoint = Math.round((1 / svg_w * (svg_w * old_midpoint + dif_x)) * 100) / 100;

                            } else {
                                if (path[1].start[1] < path[1].end[1] || path[0].start[1] < path[0].end[1]) {
                                    var new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint + dif_y)) * 100) / 100;
                                } else {
                                    var new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint - dif_y)) * 100) / 100;
                                }
                            }

                            if (new_midpoint > 0.98 || new_midpoint < 0.02) {

                                if (new_midpoint > 0.98) {
                                    new_midpoint = 0.98;
                                    if (path.length == 5) {
                                        ui.position.left = svg_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                                        ui.position.top = svg_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) - 8;
                                    } else if (path.length == $) {
                                        ui.position.left = dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                                        ui.position.top = dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                                    } else {
                                        ui.position.left = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                                        ui.position.top =  svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2);
                                    }
                                }

                                if (new_midpoint < 0.02) {
                                    new_midpoint = 0.02;
                                    if (path.length == 5) {
                                        ui.position.left = svg_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                                        ui.position.top = svg_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) - 8;
                                    } else if (path.length == 4) {
                                        ui.position.left = dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                                        ui.position.top = dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                                    } else {
                                        ui.position.left =svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                                        ui.position.top = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2);
                                    }
                                }
                            } else {
                                dot2_old_posi = ui.position
                            }

                            connector_data.midpoint = new_midpoint;
                            c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                        },
                        stop: function () {
                            scope.con.mbs[id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }

                    });
                }

                function dot3_drag() {
                    $("#dot3").draggable({
                        axis: "x",
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {

                            dot_start = ui.position;
                            connector_data = scope.con.mbs[id].connector;
                            old_stub = connector_data.stub.slice();

                            $("#dot1, #dot2").remove()
                        },
                        drag: function (e, ui) {
                            if (path[path.length - 1].start[0] < path[path.length - 1].end[0]) {
                                var dif_x = ui.position.left - dot_start.left;
                                var new_stub = parseInt(old_stub[1]) - dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot3_old_posi;
                                } else {
                                    dot3_old_posi = ui.position
                                }
                                connector_data.stub[1] = new_stub;
                                c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                                dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            } else {
                                var dif_x = ui.position.left - dot_start.left;
                                var new_stub = parseInt(old_stub[1]) + dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot3_old_posi;
                                } else {
                                    dot3_old_posi = ui.position
                                }
                                connector_data.stub[1] = new_stub;
                                c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                                dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            }
                        },
                        stop: function () {
                            scope.con.mbs[id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }
                    });
                }
            }

            make_dot();
        });

        SGI.plumb_inst.inst_mbs.bind("dblclick", function (c) {
            if (SGI.klick.target.tagName == "path") {
                $(".dot").remove();
                delete scope.con.mbs[c.id];
                SGI.plumb_inst.inst_mbs.detach(c);
                scope.$apply();
            }
        });

        SGI.plumb_inst.inst_mbs.bind("connection", function (c) {

            var mbs_in = c.targetId.split("_")[0];

            scope.con.mbs[c.connection.id] = {
                pageSourceId: c.connection.sourceId,
                pageTargetId: c.connection.targetId,
                connector: {
                    stub: [30, 30],
                    midpoint: 0.5
                }
            };


            scope.$apply();

            if (mbs_in == "brake" || mbs_in == "intervall" || mbs_in == "loop") {
                c.connection.removeAllOverlays()
            }
        });

        SGI.plumb_inst.inst_mbs.bind("contextmenu", function (c) {
            SGI.con = c;
        });

    },

    select_mbs: function () {

        // Click coordinates
        var x1, x2, y1, y2;

        //Variable indicates wether a mousedown event within your selection happend or not
        var selection_mbs = false;
        var selection_start = false;

        // Selection frame (playground :D)
        $("#prg_body").mousedown(function (e) {

            if ($(e.target).attr("id") == "prg_panel") {

                var x = $("#prg_body").width() + 150;
                var y = $("#prg_body").height() + 50;

                if (e.pageX < x - 20 && e.pageY < y - 20) {
                    selection_mbs = true;
                    // store mouseX and mouseY
                    x1 = e.pageX;
                    y1 = e.pageY;
                }
            }
        });

        // If selection is true (mousedown on selection frame) the mousemove
        // event will draw the selection div
        $('#prg_body,#selection').mousemove(function (e) {
            if (selection_mbs) {
                if (!selection_start) {
                    $(".fbs_element").removeClass("fbs_selected");
                    $(".mbs_element").removeClass("mbs_selected");
                    selection_start = true;
                }
                // Store current mouseposition
                x2 = e.pageX;
                y2 = e.pageY;

                // Prevent the selection div to get outside of your frame
                //(x2+this.offsetleft < 0) ? selection = false : ($(this).width()+this.offsetleft < x2) ? selection = false : (y2 < 0) ? selection = false : ($(this).height() < y2) ? selection = false : selection = true;;
                // If the mouse is inside your frame resize the selection div
                if (selection_mbs) {
                    // Calculate the div selection rectancle for positive and negative values
                    var TOP = (y1 < y2) ? y1 : y2;
                    var LEFT = (x1 < x2) ? x1 : x2;
                    var WIDTH = (x1 < x2) ? x2 - x1 : x1 - x2;
                    var HEIGHT = (y1 < y2) ? y2 - y1 : y1 - y2;

                    // Use CSS to place your selection div
                    $("#selection").css({
                        position: 'absolute',
                        zIndex: 5000,
                        left: LEFT,
                        top: TOP,
                        width: WIDTH,
                        height: HEIGHT
                    });
                    $("#selection").show();

                    // Info output
                    $('#status2').html('( x1 : ' + x1 + ' )  ( x2 : ' + x2 + ' )  ( y1 : ' + y1 + '  )  ( y2 : ' + y2 + ' )  SPOS:' + TOP);
                }
            }
        });
        // UNselection
        // Selection complete, hide the selection div (or fade it out)
        $('#prg_body,#selection').mouseup(function (e) {

            selection_start = false;
            if (selection_mbs) {
                var mbs_element = $("#prg_panel").find(".mbs_selected");

                if (mbs_element.length > 0) {
                    if ($(e.target).attr("id") == "prg_panel" || $(e.target).is(".prg_codebox")) {

                        $.each(mbs_element, function () {
                            $(this).removeClass("mbs_selected");
                        });
                        $(".fbs_element").removeClass("fbs_selected");
                    }

                    $("#selection").hide();
                } else {
                    getIt();

                    $("#selection").hide();
                }
            }
            selection_mbs = false;
        });


        //Function for the select
        function getIt() {
            if (selection_mbs) {
                // Get all elements that can be selected
                $(".mbs_element").each(function () {
                    var p = $(this).offset();
                    // Calculate the center of every element, to save performance while calculating if the element is inside the selection rectangle
                    var xmiddle = p.left + $(this).width() / 2;
                    var ymiddle = (p.top - 50) + $(this).height() / 2;
                    if (matchPos(xmiddle, ymiddle)) {
                        // Colorize border, if element is inside the selection
                        $(this).addClass("mbs_selected");
                    }
                });
            }
        }

        function matchPos(xmiddle, ymiddle) {
            // If selection is done bottom up -> switch value
            var myX1;
            var myX2;
            var myY1;
            var myY2;

            if (x1 > x2) {
                myX1 = x2;
                myX2 = x1;
            } else {
                myX1 = x1;
                myX2 = x2;
            }
            if (y1 > y2) {
                myY1 = y2;
                myY2 = y1;
            } else {
                myY1 = y1;
                myY2 = y2;
            }
            // Matching
            if ((xmiddle > myX1) && (xmiddle < myX2)) {
                if ((ymiddle > myY1) && (ymiddle < myY2)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },

    select_fbs: function () {

        // Click coordinates
        var x, y, x1, x2, y1, y2;

        //Variable indicates wether a mousedown event within your selection happend or not
        var selection_fbs = false;
        var selection_start = false;
        var selection_codebox = "";


        // Selection frame (playground :D)
        $("#prg_panel").on("mousedown", ".prg_codebox", function (e) {
            if ($(e.target).is('.prg_codebox')) {
                $("body").bind("mousemove", function (_e) {

                    if (selection_fbs) {

                        if (!selection_start) {
                            $(".fbs_element").removeClass("fbs_selected");
                            $(".mbs_element").removeClass("mbs_selected");
                            selection_start = true;
                        }
                        // Store current mouseposition
                        x2 = _e.pageX;
                        y2 = _e.pageY;

                        if (x2 > ($(selection_codebox).parent().offset().left + x)) {
                            x2 = $(selection_codebox).parent().offset().left + x + 2;
                        }
                        if (x2 < ($(selection_codebox).parent().offset().left)) {
                            x2 = $(selection_codebox).parent().offset().left - 2;
                        }
                        if (y2 > ($(selection_codebox).parent().offset().top + y )) {
                            y2 = $(selection_codebox).parent().offset().top + y + 2;
                        }
                        if (y2 < ($(selection_codebox).parent().offset().top)) {
                            y2 = $(selection_codebox).parent().offset().top - 2;
                        }

                        // Prevent the selection div to get outside of your frame
                        //(x2+this.offsetleft < 0) ? selection = false : ($(this).width()+this.offsetleft < x2) ? selection = false : (y2 < 0) ? selection = false : ($(this).height() < y2) ? selection = false : selection = true;;
                        // If the mouse is inside your frame resize the selection div

                        // Calculate the div selection rectancle for positive and negative values
                        var TOP = (y1 < y2) ? y1 : y2;
                        var LEFT = (x1 < x2) ? x1 : x2;
                        var WIDTH = (x1 < x2) ? x2 - x1 : x1 - x2;
                        var HEIGHT = (y1 < y2) ? y2 - y1 : y1 - y2;


                        // Use CSS to place your selection div
                        $("#selection").css({
                            position: 'absolute',
                            zIndex: 5000,
                            left: LEFT + 1,
                            top: TOP + 1,
                            width: WIDTH - 5,
                            height: HEIGHT - 5
                        });
                        $("#selection").show();

                        // Info output
                        $('#status2').html('( x1 : ' + x1 + ' )  ( x2 : ' + x2 + ' )  ( y1 : ' + y1 + '  )  ( y2 : ' + y2 + ' )  SPOS:' + TOP);
                    }
                });
                selection_codebox = this;
                x = $(this).width();
                y = $(this).height();

                selection_fbs = true;
                // store mouseX and mouseY
                x1 = e.pageX - 2;
                y1 = e.pageY - 2;
                x2 = e.pageX - 2;
                y2 = e.pageY - 2;
            }
        });

        $(document).mouseup(function (e) {
            if (selection_fbs) {
                var $fbs_element = $("#prg_panel").find(".fbs_selected");

                if (e.shiftKey == true) {
                    var $target = $(e.target);
                    if ($target.hasClass("fbs_element")) {
                        $target.toggleClass("fbs_selected");
                    } else {
                        $.each($target.parents(), function () {
                            if ($(this).hasClass("fbs_element")) {
                                $(this).toggleClass("fbs_selected");
                            }
                        });
                    }
                    getIt();
                    $("#selection").hide();
                }
                else {
                    $.each($fbs_element, function () {
                        $(this).removeClass("fbs_selected");
                    });
                    getIt();
                    $("#selection").hide();
                }
                selection_fbs = false;
                $("body").unbind("mousemove");
            }
        });


        //Function for the select
        function getIt() {
            if (selection_fbs) {
                // Get all elements that can be selected
                $(".fbs_element").each(function () {
                    var p = $(this).offset();
                    // Calculate the center of every element, to save performance while calculating if the element is inside the selection rectangle
                    var xmiddle = p.left + $(this).width() / 2;
                    var ymiddle = (p.top ) + $(this).height() / 2;
                    if (matchPos(xmiddle, ymiddle)) {
                        // Colorize border, if element is inside the selection
                        $(this).addClass("fbs_selected");
                    }
                });
            }
        }

        function matchPos(xmiddle, ymiddle) {
            // If selection is done bottom up -> switch value
            var myX1;
            var myX2;
            var myY1;
            var myY2;

            if (x1 > x2) {
                myX1 = x2;
                myX2 = x1;
            } else {
                myX1 = x1;
                myX2 = x2;
            }
            if (y1 > y2) {
                myY1 = y2;
                myY2 = y1;
            } else {
                myY1 = y1;
                myY2 = y2;
            }
            // Matching
            if ((xmiddle > myX1) && (xmiddle < myX2)) {
                if ((ymiddle > myY1) && (ymiddle < myY2)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }


    },

    load_prg: function (data) {
        console.log(data);
        $.each(data.mbs, function () {
            SGI.add_mbs_element(this);
            if (this.counter > SGI.mbs_n) {
                SGI.mbs_n = this.counter
            }
        });
        $.each(data.fbs, function () {
            SGI.add_fbs_element(this);
            if (this.counter > SGI.fbs_n) {
                SGI.fbs_n = this.counter
            }
        });
        $.each(data.con.mbs, function () {
            console.log(this);
            var source = this.pageSourceId;
            var target = this.pageTargetId;
            if (target.split("_")[0] == "codebox") {
                var c = SGI.plumb_inst.inst_mbs.connect({
                    uuids: [source],
                    target: target

                });
                c.setConnector([ "Flowchart", { stub: this.connector.stub, alwaysRespectStubs: true, midpoint: this.connector.midpoint}  ]);
                scope.con.mbs[c.id] = {
                    pageSourceId: c.sourceId,
                    pageTargetId: c.targetId,
                    connector: {
                        stub: this.connector.stub,
                        midpoint: this.connector.midpoint
                    }
                };

            } else {
                var c = SGI.plumb_inst.inst_mbs.connect({uuids: [source, target]});

                c.setConnector([ "Flowchart", { stub: this.connector.stub, alwaysRespectStubs: true, midpoint: this.connector.midpoint}  ]);
                console.log(c)
                scope.con.mbs[c.id] = {
                    pageSourceId: c.sourceId,
                    pageTargetId: c.targetId,
                    connector: {
                        stub: this.connector.stub,
                        midpoint: this.connector.midpoint
                    }
                }
            }

        });

        $.each(data.con.fbs, function (index) {
            $.each(this, function () {

                try {

                    var source = this.pageSourceId;
                    var target = this.pageTargetId;

                    var c = SGI.plumb_inst["inst_" + index].connect({
                        uuids: [source, target]

                    });

                    c.setConnector([ "Flowchart", { stub: this.connector.stub, alwaysRespectStubs: true, midpoint: this.connector.midpoint}  ]);

                    scope.con.fbs[index][c.id] = {
                        pageSourceId: c.sourceId,
                        pageTargetId: c.targetId,
                        connector: {
                            stub: this.connector.stub,
                            midpoint: this.connector.midpoint
                        }
                    };
                    scope.$apply()

                } catch (err) {
                    console.log(err);
                    console.log(this)
                }
            });
        });
    },

    add_input: function (opt) {

        var id = $($(opt).attr("$trigger")).attr("id");
        var nr = $($(opt).attr("$trigger")).data("nr");
        var data = scope.fbs[nr];
        var nr = $($(opt).attr("$trigger")).data("nr");
        var type = id.split("_")[0];
        var index = $($("#" + id).find("[id^='left']")).children().length + 1;
        var add_id = type + '_' + nr + '_in' + index + '';

        scope.fbs[nr].input_n = parseInt(index);


        $($("#" + id).find("[id^='left']")).append('\
                <div id="' + add_id + '"  class="div_input ' + type + '_' + nr + '_in"><a class="input_font">IN ' + index + '</a></div>\
                ');

        SGI.add_fbs_endpoint(add_id, "input", data);
        SGI.plumb_inst["inst_" + $("#" + data.fbs_id).parent().parent().attr("id")].repaintEverything();
    },

    add_fbs_endpoint: function (_id, _type, data, _position) {

        var scope = data.scope;
        var parent = data.parent;
        var id = _id;
        var position = _position || "";
        var type = _type || "";

        var _stub = 30;

        var codebox = $("#" + parent).parent().attr("id");


        if (scope == "singel") {
            if (type == "input") {
                var endpointStyle = {fillStyle: "green"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true, midpoint: 0.9}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ]
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "green"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true, midpoint: 0.5}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "#00aaff" }
                });
            }
            if (position == "onborder") {
                endpointStyle = {fillStyle: "#006600"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString()}, {
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 10, height: 10} ]
                });
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
        }


        if (scope == "liste_ch") {

            if (type == "input") {
                var endpointStyle = {fillStyle: "#660066"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    scope: "liste_ch"
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "#660066"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "#0000ff" },
                    scope: "liste_ch"
                });
            }
        }
        if (scope == "liste_ch_dp") {

            if (type == "input") {
                var endpointStyle = {fillStyle: "#660066"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    scope: "liste_ch"
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "#bb55bb"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "#0000ff" },
                    scope: "liste_dp"
                });
            }
        }
        if (scope == "liste_val") {

            if (type == "input") {
                var endpointStyle = {fillStyle: "#bb55bb"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: ["Left"],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    scope: "liste_dp"
                });
            }

            if (type == "output") {
                endpointStyle = {fillStyle: "green"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: ["Right"],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "#00aaff" },
                    scope: "singel"
                });
            }
        }
        if (scope == "expert") {
            if (type == "input") {
                var endpointStyle = {fillStyle: "gray"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 11} ],
                    scope: "singel liste_ch liste_dp liste_var expert"
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "gray"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
                    endpoint: [ "Rectangle", { width: 20, height: 11} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "gray" },
                    scope: "singel liste_ch liste_dp liste_var expert"
                });
            }
        }
    },

    add_mbs_endpoint: function (data) {

        if (data.type == "codebox") {

            SGI.plumb_inst.inst_mbs.makeTarget(data.mbs_id, { uuid: data.mbs_id }, {
                isTarget: true,
                paintStyle: endpointStyle,
                dropOptions: { hoverClass: "dragHover" },
                anchor: ["Continuous", {faces: "right"}],
                endpoint: ["Dot", {radius: 2}],
                maxConnections: -1
            });

        } else if ($("#" + data.fbs_id).hasClass("fbs_element_onborder")) {

            var endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.fbs_id, { uuid: data.fbs_id }, {
//            filter:".ep",				// only supported by jquery
                anchor: "Center",
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: [ "Rectangle", { width: 10, height: 10} ],
                connector: [ "Flowchart", { stub: 25, alwaysRespectStubs: true}  ],
                connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                maxConnections: -1
            });


        } else if (data.type == "brake" || data.type == "intervall" || data.type == "loop") {
            var endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id + "_in1", { uuid: data.mbs_id + "_in1" }, {
                dropOptions: { hoverClass: "dragHover" },
                anchor: ["Left"],
                isTarget: true,
                paintStyle: endpointStyle,
                endpoint: [ "Rectangle", { width: 20, height: 10} ]
            });

            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id + "_in2", { uuid: data.mbs_id + "_in2" }, {
                dropOptions: { hoverClass: "dragHover" },
                anchor: ["Left"],
                isTarget: true,
                paintStyle: endpointStyle,
                endpoint: [ "Rectangle", { width: 20, height: 10} ]
            });

            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id + "_out", { uuid: data.mbs_id + "_out" }, {
                anchor: ["Right"],
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: [ "Dot", {radius: 10}],
                connector: [ "Flowchart", { stub: 25, alwaysRespectStubs: true} ],
                connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                maxConnections: -1
            });

        } else if (data.type != "komex" && data.type != "scriptobj" && data.type != "ccuobj" && data.type != "ccuobjpersi") {
            var endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id, { uuid: data.mbs_id }, {
                anchor: ["Bottom", "Left", "Right", "Top"],
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: [ "Dot", {radius: 10}],
                connector: [ "Flowchart", { stub: 25, alwaysRespectStubs: true} ],
                connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                maxConnections: -1
            });

        }

        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    add_codebox_inst: function (id) {

        SGI.plumb_inst["inst_" + id] = jsPlumb.getInstance({
            Endpoint: ["Dot", {radius: 2}],
//            PaintStyle: { lineWidth: 4, strokeStyle: "blue" },
            HoverPaintStyle: {strokeStyle: "red", lineWidth: 4 },
            DropOptions: {tolerance: "touch" },
            Container: id,
            RenderMode: "svg",
            Scope: "singel",
            connector: [ "Flowchart", { stub: 50, alwaysRespectStubs: true, midpoint: 0.5}  ]


        });

        scope.con.fbs[id] = {};
        scope.$apply();

        SGI.plumb_inst["inst_" + id].bind("click", function (c, p) {
            console.clear()
            var connector_data;
            var dot1_x;
            var dot1_y;
            var dot2_x;
            var dot2_y;
            var dot3_x;
            var dot3_y;
            var dot1_old_posi;
            var dot3_old_posi;
            var dot2_old_posi;
            var dot2_d;
            var svg_w;
            var svg_h;
            var dot_start;
            var old_midpoint;
            var old_stub;


            function make_dot() {
                connector_data = scope.con.fbs[id][c.id].connector;
                var svg_posi = $(c.connector.svg).position();
                var codebox_posi = $(c.connector.svg).parent().offset();
                var path = c.connector.getPath();
                var svg_trans = $(c.connector.svg).children().first()[0].getAttribute("transform").replace("translate(", "").replace(")", "").split(",");
                dot1_x = svg_posi.left - codebox_posi.left + path[0].end[0] + parseInt(svg_trans[0]) + 1;
                dot1_y = svg_posi.top - codebox_posi.top + path[0].end[1] + parseInt(svg_trans[1]) + 1;

                console.log(path)
                if (path.length == 5) {
                    dot2_x = svg_posi.left - codebox_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                    dot2_y = svg_posi.top - codebox_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) + 1;

                    dot2_d = "y";

                    dot3_x = svg_posi.left - codebox_posi.left + path[path.length - 1].start[0] + parseInt(svg_trans[0]) + 2;
                    dot3_y = svg_posi.top - codebox_posi.top + path[path.length - 1].end[1] + parseInt(svg_trans[1]) + 2;

                    $(".dot").remove();
                    $("#prg_" + id).append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    $("#prg_" + id).append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    $("#prg_" + id).append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                    dot1_drag();
                    dot2_drag();
                    dot3_drag();
                }
                if (path.length == 3) {

                    dot1_x = svg_posi.left - codebox_posi.left + path[0].end[0] + parseInt(svg_trans[0]) + 1;
                    dot1_y = svg_posi.top - codebox_posi.top + path[0].end[1] + parseInt(svg_trans[1]) + 1;

                    dot2_x = svg_posi.left - codebox_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2) + 1;
                    dot2_y = svg_posi.top - codebox_posi.top + path[1].start[1] + parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2) + 1;

                    dot3_x = svg_posi.left - codebox_posi.left + path[path.length - 1].end[0] + parseInt(svg_trans[0]) - 1;
                    dot3_y = svg_posi.top - codebox_posi.top + path[path.length - 1].end[1] + parseInt(svg_trans[1]) - 1;

                    $(".dot").remove();
                    $("#prg_" + id).append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    $("#prg_" + id).append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    $("#prg_" + id).append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                    dot1_drag();
                    dot2_drag();
                    dot3_drag()

                }

                if (path.length == 4 && path[3].start[0] == path[3].end[0]) {
                    var dot2_x = svg_posi.left - codebox_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - 5 + ((path[3].start[0] - path[2].start[0]) / 2);
                    var dot2_y = svg_posi.top - codebox_posi.top + path[2].start[1] + parseInt(svg_trans[1]) - 1 + ((path[3].start[1] - path[2].start[1]) / 2);

                    dot2_d = "y";
                    $(".dot").remove();
                    $("#prg_" + id).append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    dot2_drag()

                }

                function dot1_drag() {

                    $("#dot1").draggable({
                        axis: "x",
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {


                            dot_start = ui.position;
                            connector_data = scope.con.fbs[id][c.id].connector;
                            old_stub = connector_data.stub.slice();

                            $("#dot2, #dot3").remove()

                        },
                        drag: function (e, ui) {
                            var dif_x = ui.position.left - dot_start.left;


                            var new_stub = parseInt(old_stub[0]) + dif_x;
                            if (new_stub < 30) {
                                new_stub = 30;
                                ui.position = dot1_old_posi;
                            } else {
                                dot1_old_posi = ui.position
                            }
                            connector_data.stub[0] = new_stub;


                            c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                            dot1_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                        },
                        stop: function () {
                            scope.con.fbs[id][c.id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }
                    });
                }

                function dot2_drag() {
                    $("#dot2").draggable({
                        axis: dot2_d,
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {
                            $("#dot1, #dot3").remove();
                            connector_data = scope.con.fbs[id][c.id].connector;
                            svg_w = parseInt(c.connector.bounds.maxX - (connector_data.stub[0] + connector_data.stub[1]));
                            svg_h = parseInt(c.connector.bounds.maxY);
                            dot_start = ui.position;
                            old_midpoint = parseFloat(connector_data.midpoint);

                            if (path.length > 3) {
                                if (path[2].start[0] == path[2].end[0]) {
                                    dot2_d = "x";
                                    $("#dot2").draggable("option", "axis", "x");
                                } else {
                                    dot2_d = "y";
                                    $("#dot2").draggable("option", "axis", "y");
                                }

                            }
                            if (path.length == 3) {
                                if (path[1].start[0] == path[1].end[0]) {
                                    dot2_d = "x";
                                    $("#dot2").draggable("option", "axis", "x");
                                } else {
                                    dot2_d = "y";
                                    $("#dot2").draggable("option", "axis", "y");
                                }
                            }
                        },
                        drag: function (e, ui) {
                            var dif_x = ui.position.left - dot_start.left;
                            var dif_y = ui.position.top - dot_start.top;
                            path = c.connector.getPath();

                            if (dot2_d == "x") {
                                var new_midpoint = Math.round((1 / svg_w * (svg_w * old_midpoint + dif_x)) * 100) / 100
                            } else {
                                var new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint + dif_y)) * 100) / 100
                            }

                            if (new_midpoint > 0.98 || new_midpoint < 0.02) {

                                if (new_midpoint > 0.98) {
                                    new_midpoint = 0.98;
                                    ui.position.left = svg_posi.left - codebox_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                                    ui.position.top = svg_posi.top - codebox_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) + 1;
                                }

                                if (new_midpoint < 0.02) {
                                    new_midpoint = 0.02;
                                    ui.position.left = svg_posi.left - codebox_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                                    ui.position.top = svg_posi.top - codebox_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) + 1;
                                }
                            } else {
                                dot2_old_posi = ui.position
                            }

                            connector_data.midpoint = new_midpoint;
                            c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                        },
                        stop: function () {
                            scope.con.fbs[id][c.id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }

                    });
                }

                function dot3_drag() {
                    $("#dot3").draggable({
                        axis: "x",
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {

                            dot_start = ui.position;
                            connector_data = scope.con.fbs[id][c.id].connector;
                            old_stub = connector_data.stub.slice();

                            $("#dot1, #dot2").remove()
                        },
                        drag: function (e, ui) {
                            if (path[path.length - 1].start[0] < path[path.length - 1].end[0]) {
                                var dif_x = ui.position.left - dot_start.left;
                                var new_stub = parseInt(old_stub[1]) - dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot3_old_posi;
                                } else {
                                    dot3_old_posi = ui.position
                                }
                                connector_data.stub[1] = new_stub;
                                c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                                dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            } else {
                                var dif_x = ui.position.left - dot_start.left;
                                var new_stub = parseInt(old_stub[1]) + dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot3_old_posi;
                                } else {
                                    dot3_old_posi = ui.position
                                }
                                connector_data.stub[1] = new_stub;
                                c.setConnector([ "Flowchart", { stub: connector_data.stub, alwaysRespectStubs: true, midpoint: connector_data.midpoint}  ]);
                                dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            }
                        },
                        stop: function () {
                            scope.con.fbs[id][c.id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }
                    });
                }
            }
            make_dot();
        });

        SGI.plumb_inst["inst_" + id].bind("dblclick", function (c) {
            $(".dot").remove();
            var fbs_in = c.targetId.split("_in")[0];
            var fbs_out = c.sourceId.split("_out")[0];


            delete scope.con.fbs[id][c.id];
            delete scope.fbs[$("#" + fbs_in).data("nr")].input[c.targetId.split("_")[2]];
            delete scope.fbs[$("#" + fbs_out).data("nr")].output[c.sourceId.split("_")[2]];
            SGI.plumb_inst["inst_" + id].detach(c);
            scope.$apply()
        });

        SGI.plumb_inst["inst_" + id].bind("connection", function (c) {

            var fbs_in = c.targetId.split("_in")[0];
            var fbs_out = c.sourceId.split("_out")[0];

            scope.fbs[$("#" + fbs_in).data("nr")].input[c.targetId.split("_")[2]] = c.sourceId;
            scope.fbs[$("#" + fbs_out).data("nr")].output[c.sourceId.split("_")[2]] = c.targetId;


            scope.con.fbs[id][c.connection.id] = {
                pageSourceId: c.connection.sourceId,
                pageTargetId: c.connection.targetId,
                connector: {
                    stub: [30, 30],
                    midpoint: 0.5
                }
            };

            scope.$apply()
        });

        SGI.plumb_inst["inst_" + id].bind("contextmenu", function (c) {
            SGI.con = c;
        });

    },

    add_trigger_hmid: function (_this, type, type2) {
        var $this = _this;
        $.id_select({
            type: type,
            close: function (hmid) {
                if (hmid != null) {
                    var _name = SGI.get_name(hmid);
                    var nr = $($this).data("nr");
                    scope.mbs[nr]["hmid"].push(hmid);
                    if (scope.mbs[nr]["name"][0] == "Rechtsklick") {
                        scope.mbs[nr]["name"][0] = _name;
                    } else {
                        scope.mbs[nr]["name"].push(_name);
                    }
                    if (type2 == "val") {
                        SGI.add_trigger_name_val($this);
                    } else {
                        // singel Trigger
                        SGI.add_trigger_name($this);
                    }
                    scope.$apply();
                    SGI.plumb_inst.inst_mbs.repaintEverything()
                }
            }
        });
    },

    add_trigger_name: function ($this) {
        $($this).find(".div_hmid_font").remove();

        $.each(scope.mbs[$this.data("nr")]["name"], function () {

            var add = '<div data-info="' + $this.attr("id") + '" class="div_hmid_font">' + this + '</div>';

            $($this).find(".div_hmid_trigger").append(add)

        });
    },

    add_filter_device: function (_this) {

        var $this = _this;

        $.id_select({
            type: "device",
            close: function (hmid) {

                if (hmid != null) {

                    scope.fbs[$this.data("nr")]["hmid"].push(hmid);
                    SGI.add_filter_device_name($this)
                }
            }
        });


    },

    add_filter_channel: function (_this) {

        var $this = _this;

        $.id_select({
            type: "channel",
            close: function (hmid) {

                if (hmid != null) {

                    scope.fbs[$this.data("nr")]["hmid"].push(hmid);
                    SGI.add_filter_channel_name($this)
                }
            }
        });


    },

    add_filter_dp: function (_this) {

        var $this = _this;

        $.id_select({
            type: "dp",
            close: function (hmid) {

                if (hmid != null) {

                    scope.fbs[$this.data("nr")]["hmid"].push(hmid);
                    SGI.add_filter_dp_name($this)
                }
            }
        });


    },

    add_filter_device_name: function ($this) {
        var add = "";
        var nr = $($this).data("nr");

        $($this).find(".div_hmid_filter_font_device").remove();
        if (scope.fbs[nr]["hmid"].length > 0) {

            $.each(scope.fbs[nr]["hmid"], function () {
                var name = this;
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_device">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_device">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add);

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_filter_channel_name: function ($this) {
        var add = "";
        var nr = $($this).data("nr");

        $($this).find(".div_hmid_filter_font_channel").remove();
        if (scope.fbs[nr]["hmid"].length > 0) {

            $.each(scope.fbs[nr]["hmid"], function () {
                var name = this;
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_channel">' + name + '</div>';
            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_channel">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add);

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_filter_dp_name: function ($this) {
        var add = "";

        $($this).find(".div_hmid_filter_font_dp").remove();
        if (scope.fbs[$($this).data("nr")]["hmid"].length > 0) {

            $.each(scope.fbs[$($this).data("nr")]["hmid"], function () {
                var name = this;
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_dp">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_dp">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add);

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_trigger_name_val: function ($this) {
        $($this).find(".div_hmid_val_body").remove();
        var nr = $($this).data("nr");
        var add = "";
        $.each(scope.mbs[nr].name, function (index) {

            var wert = scope.mbs[nr]["wert"][index] || 0;

            add += '<div style="min-width: 100%" class="div_hmid_val_body">';
            add += '<div data-info="' + $this.attr("id") + '"  style="display:inline-block;float: left;" class="div_hmid_val">{{mbs[' + nr + '].name[' + index + '].toString()}}</div>';
            add += '<div style="float: right; margin-left:5px; display: inline-block">';
            add += '<select  id="val_' + index + '" ng-model="mbs[' + nr + '].val[' + index + ']" class="inp_val">';
            add += '    <option value="val">Gleich</option>';
            add += '    <option value="valNe">Ungleich</option>';
            add += '    <option value="valGt">Größer</option>';
            add += '    <option value="valGe">Größer =</option>';
            add += '    <option value="valLt">Kleiner</option>';
            add += '    <option value="valLe">Kleiner =</option>';
            add += '</select>';

            add += '<input class="inp_wert"  type=int ng-model="mbs[' + nr + '].wert[' + index + ']" id="var_' + index + '">';
            add += '</div>';
            add += '</div>';
        });

        scope.append($($this).find(".div_hmid_trigger"), add);


//        $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});


    },

    add_trigger_time: function ($this) {
        $($this).find(".div_hmid_font").remove();
        var nr = $($this).data("nr");
        var add = "";

        $.each(scope.mbs[nr]["time"], function (index) {

            add += '<div id="tr_ch_body_' + index + '" class="tr_ch_body">';
            add += '<input class="inp_time" ng-model="mbs[' + nr + '].time[' + index + ']" id="var_' + index + '">';
            add += '<select id="day_' + index + '" ng-model="mbs[' + nr + '].day[' + index + ']" class="inp_day">';
            add += '    <option value="88">*</option>';
            add += '    <option value="1">Mo</option>';
            add += '    <option value="2">Di</option>';
            add += '    <option value="3">Mi</option>';
            add += '    <option value="4">Do</option>';
            add += '    <option value="5">Fr</option>';
            add += '    <option value="6">Sa</option>';
            add += '    <option value="7">So</option>';
            add += '    <option value="8">MO-FR</option>';
            add += '    <option value="9">SA-SO</option>';
            add += '</select>';
            add += '</div>';
        });
        scope.append($($this).find(".div_hmid_trigger"), add);

    },

    add_trigger_astro: function ($this) {
        $($this).find(".tr_ch_body").remove();
        var add = "";
        $.each(scope.mbs[$($this).data("nr")]["astro"], function (index) {
            add += '<div id="tr_ch_body_' + index + '" class="tr_ch_body">';
            add += '<select ng-model="mbs[' + $this.data("nr") + '].astro[' + index + ']" id="astro_' + index + '" class="inp_astro">';
            add += '    <option value="sunrise">Sonnenaufgang Start</option>';
            add += '    <option value="sunriseEnd">Sonnenaufgang Ende</option>';
            add += '    <option value="solarNoon">Höchster Sonnenstand</option>';
            add += '    <option value="sunsetStart">Sonnenuntergang Start</option>';
            add += '    <option value="sunset">Sonnenuntergang Ende</option>';
            add += '    <option value="night">Nacht Start</option>';
            add += '    <option value="nightEnd">Nacht Ende</option>';
            add += '    <option value="nadir">Dunkelster moment</option>';
            add += '</select>';
            add += '<label style="display:flex ;margin-left:10px; color: #676767; font-size: 13px">Shift:</label></label><input class="inp_min" type=int  ng-model="mbs[' + $this.data("nr") + '].minuten[' + index + ']" id="var_' + index + '"><br>';
            add += '</div>';
        });

        scope.append($($this).find(".div_hmid_trigger"), add);

//      $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});

    },

    get_eps_by_elem: function (elem) {
        var eps = [];
        $.each($(elem).find("[id*=in]"), function () {
            eps.push($(this).attr("id"));
        });
        $.each($(elem).find("[id*=out]"), function () {
            eps.push($(this).attr("id"));
        });
        eps.push($(elem).attr("id"));
        return eps
    },

    get_inout_by_element: function (elem) {
        var eps = {
            in: [],
            out: []
        };
        $.each($(elem).find("[id*=in]"), function () {
            eps.in.push($(this).attr("id"));
        });
        $.each($(elem).find("[id*=out]"), function () {
            eps.out.push($(this).attr("id"));
        });

        return eps
    },

    make_fbs_drag: function (data) {

        var $div = $("#" + data.parent);
        var off;
        var ep_mbs = [];
        var ep_fbs = [];

        $("#" + data.fbs_id)
            .drag("init", function () {
                $(".dot").remove();
                if ($(this).is('.fbs_selected'))
                    return $('.fbs_selected');
            })

            .drag("start", function (ev, dd) {
                dd.limit = $div.offset();
                dd.limit.bottom = dd.limit.top + (($div.outerHeight() - $(this).outerHeight()) * SGI.zoom);
                dd.limit.right = dd.limit.left + (($div.outerWidth() - $(this).outerWidth()) * SGI.zoom);

                off = $(dd.drag).parent().offset();
                if ($(this).hasClass("fbs_element_onborder")) {
                    ep_mbs = SGI.plumb_inst.inst_mbs.getEndpoint($(this).attr("id"));
                    ep_fbs = SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].getEndpoint(data.fbs_id);
                } else {
                    ep_fbs = SGI.get_eps_by_elem(this);
                }
            })

            .drag(function (ev, dd) {

                if ($(this).hasClass("fbs_element_onborder")) {

                    var $this_left = dd.offsetX - off.left;
                    var $this_top = dd.offsetY - off.top;
                    var $this_width = parseInt($(this).css("width"));
                    var $this_height = parseInt($(this).css("height"));
                    var $this_p_width = parseInt($($(this).parent()).css("width"));
                    var $this_p_height = parseInt($($(this).parent()).css("height"));

                    if ($this_left > ($this_p_width - $this_width )) {
                        $($(this)).addClass("onborder_r")
                            .removeClass("onborder_b")
                            .removeClass("onborder_l")
                            .removeClass("onborder_t");

                        $(this).css({
                            top: (Math.min(dd.limit.bottom, Math.max(dd.limit.top, dd.offsetY)) / SGI.zoom) - (off.top / SGI.zoom)
                        });

                        ep_mbs.setAnchor([1, 0.5, 1, 0, 5, 2]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([0, 0.5, -1, 0, -5, 0]);
                        }
                    } else if ($this_left < 5) {
                        $($(this)).addClass("onborder_l")
                            .removeClass("onborder_b")
                            .removeClass("onborder_r")
                            .removeClass("onborder_t");
                        $(this).css({
                            top: (Math.min(dd.limit.bottom, Math.max(dd.limit.top, dd.offsetY)) / SGI.zoom) - (off.top / SGI.zoom)
                        });

                        ep_mbs.setAnchor([0, 0.5, -1, 0, -3, 3]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([1, 0.5, 1, 0, 5, 0]);

                        }
                    } else if ($this_top > ($this_p_height - $this_height)) {
                        $($(this)).addClass("onborder_b")
                            .removeClass("onborder_r")
                            .removeClass("onborder_l")
                            .removeClass("onborder_t");
                        $(this).css({
                            left: (Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX)) / SGI.zoom) - (off.left / SGI.zoom)
                        });

                        ep_mbs.setAnchor([0.5, 1, 0, 1, 2, 7]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([0.5, 0, 0, -1, 0, -5]);
                        }
                    } else if ($this_top < 5) {
                        $($(this)).addClass("onborder_t")
                            .removeClass("onborder_b")
                            .removeClass("onborder_l")
                            .removeClass("onborder_r");
                        $(this).css({
                            left: (Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX)) / SGI.zoom) - (off.left / SGI.zoom)
                        });

                        ep_mbs.setAnchor([0.5, 0, 0, -1, 2, -3]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([0.5, 1, 0, 1, 0, 5]);
                        }
                    } else {
                    }
                    SGI.plumb_inst["inst_" + $($div).parent().attr("id")].repaint($(this).attr("id"));
                    SGI.plumb_inst.inst_mbs.repaintEverything();
                } else {

                    if (scope.setup.snap_grid) {
                        $(this).css({

                            top: (Math.min(dd.limit.bottom - (off.top), Math.max(dd.limit.top - (off.top), Math.round((dd.offsetY - (off.top)) / SGI.grid) * SGI.grid))) / SGI.zoom,
                            left: (Math.min(dd.limit.right - (off.left), Math.max(dd.limit.left - (off.left), Math.round((dd.offsetX - (off.left)) / SGI.grid) * SGI.grid)))
                        });

                    } else {
                        $(this).css({
                            top: (Math.min(dd.limit.bottom, Math.max(dd.limit.top, dd.offsetY)) / SGI.zoom) - (off.top / SGI.zoom),
                            left: (Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX)) / SGI.zoom) - (off.left / SGI.zoom)
                        });
                    }
                    SGI.plumb_inst["inst_" + $($div).parent().attr("id")].repaint(ep_fbs);
                }

            })
            .drag("end", function () {
                var nr = $(this).data("nr");
                scope.fbs[nr].style.top = $(this).css("top");
                scope.fbs[nr].style.left = $(this).css("left");

                scope.$apply();
                if ($.isArray(ep_fbs) == true) {
                    SGI.plumb_inst["inst_" + $($div).parent().attr("id")].repaint(ep_fbs);
                } else {
                    SGI.plumb_inst["inst_" + $($div).parent().attr("id")].repaint($(this).attr("id"));
                }

                SGI.plumb_inst.inst_mbs.repaintEverything();
            });


    },

    make_mbs_drag: function (data) {


        if (data.type == "codebox") {
            var start_left = 0;
            var start_top = 0;
            $("#" + data.mbs_id).find(".titel_body")


                .drag("init", function () {

                    if ($(this).is('.mbs_selected'))
                        return $('.mbs_selected');
                })

                .drag("start", function (ev, dd) {
                    $(".dot").remove();
                    off = $(dd.drag).parent().offset();
                    start_left = parseInt($(this).parent().css("left").split("px")[0]);
                    start_top = parseInt($(this).parent().css("top").split("px")[0]);
                })

                .drag(function (ev, dd) {

                    if (scope.setup.snap_grid) {
                        $(this).parent().css({
                            top: Math.round(Math.round((dd.offsetY - (off.top)) / (SGI.grid * SGI.zoom)) * (SGI.grid * SGI.zoom) / SGI.zoom) + start_top,
                            left: Math.round(Math.round((dd.offsetX - (off.left)) / (SGI.grid * SGI.zoom)) * (SGI.grid * SGI.zoom) / SGI.zoom) + start_left
                        });

                    } else {
                        $(this).parent().css({
                            top: Math.round((dd.offsetY - (off.top)) / SGI.zoom) + start_top,
                            left: Math.round((dd.offsetX - (off.left)) / SGI.zoom) + start_left
                        });
                    }

                    SGI.plumb_inst.inst_mbs.repaintEverything()

                })
                .drag("end", function () {
                    var nr = $(this).data("nr");
                    scope.mbs[nr].style.top = $(this).parent().css("top");
                    scope.mbs[nr].style.left = $(this).parent().css("left");
                    SGI.plumb_inst.inst_mbs.repaintEverything();
                    scope.$apply();
                });

        } else {

            var off;

            $("#" + data.mbs_id)
                .drag("init", function () {
                    if ($(this).is('.mbs_selected'))
                        return $('.mbs_selected');
                })

                .drag("start", function (ev, dd) {
                    $(".dot").remove();
                    off = $(dd.drag).parent().offset();
                    start_left = parseInt($(this).parent().css("left").split("px")[0]);
                    start_top = parseInt($(this).parent().css("top").split("px")[0]);
                })

                .drag(function (ev, dd) {

                    if (scope.setup.snap_grid) {
                        $(this).css({
                            top: Math.round(Math.round((dd.offsetY - (off.top)) / (SGI.grid * SGI.zoom)) * (SGI.grid * SGI.zoom) / SGI.zoom),
                            left: Math.round(Math.round((dd.offsetX - (off.left)) / (SGI.grid * SGI.zoom)) * (SGI.grid * SGI.zoom) / SGI.zoom)
                        });

                    } else {
                        $(this).css({
                            top: Math.round((dd.offsetY - (off.top)) / SGI.zoom),
                            left: Math.round((dd.offsetX - (off.left)) / SGI.zoom)
                        });
                    }

                    SGI.plumb_inst.inst_mbs.repaintEverything()


                })
                .drag("end", function () {
                    var nr = $(this).data("nr");
                    scope.mbs[nr].style.top = $(this).css("top");
                    scope.mbs[nr].style.left = $(this).css("left");
                    scope.$apply();

                });
        }
    },

    make_mbs_drop: function () {

        $(".prg_codebox").droppable({
            accept: ".fbs",
            tolerance: "touch",
            drop: function (ev, ui) {

                if (ui["draggable"] != ui["helper"]) {

                    if (scope.setup.snap_grid) {

                        var data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id")

                        };
                        var top = Math.round(((ui["offset"]["top"] - $(ev.target).offset().top + 32) / SGI.zoom) / SGI.grid) * SGI.grid;
                        var left = Math.round(((ui["offset"]["left"] - $(ev.target).offset().left + 32) / SGI.zoom) / SGI.grid) * SGI.grid;
                    } else {
                        var data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id")

                        };
                        var top = parseInt((ui["offset"]["top"] - $(ev.target).offset().top) + 32 / SGI.zoom);
                        var left = parseInt((ui["offset"]["left"] - $(ev.target).offset().left) + 32 / SGI.zoom);
                    }

                    SGI.add_fbs_element(data, left, top);
                }
            }
        });
    },

    make_savedata: function () {
        return   {
            mbs: scope.mbs,
            fbs: scope.fbs,
            con: scope.con
        };
    },

    make_struc: function () {

        PRG.struck.codebox = {};
        PRG.struck.trigger = [];
        PRG.struck.control = [];

        PRG._scope = SGI.make_savedata();


        $("#prg_panel .mbs_element_codebox ").each(function (idx, elem) {
            var $this = $(elem);
            var fbs = $($this).find(".fbs_element");
            var data = {};
            var ebene = 99999;
            var onborder = [];
            Compiler.last_fbs = $(fbs).attr("id");
            $.each(fbs, function (idx, elem) {
                var $this = $(elem);
                var nr = $this.data("nr");
                var fbs_id = $this.attr('id');
                var input = scope.fbs[nr]["input"];
                var output = scope.fbs[nr]["output"];

                data[fbs_id.split("_")[1]] = {
                    ebene: 99999,
                    fbs_id: fbs_id,
                    type: scope.fbs[nr]["type"],
                    hmid: scope.fbs[nr]["hmid"],
                    positionX: parseInt($this.css("left"), 10),
                    positionY: parseInt($this.css("top"), 10),
                    nr: nr,
                    input: input,
                    output: output,
                    force: scope.fbs[nr]["force"]
                }
            });


            for (var i = 0; i < 2; i++) {

                $.each(data, function () {
                    if (ebene == this.ebene) {

                        $.each(this["input"], function () {
                            var fbs_befor = this.split("_")[1];
                            data[fbs_befor].ebene = ebene - 1
                        });

                        i = 0
                    }
                });
                ebene--;
            }

            $.each(data, function () {
                if (jQuery.isEmptyObject(this.input)) {
                    this.ebene = 1;
                }
            });

            $.each(data, function () {
                if ($("#" + this.fbs_id).hasClass("fbs_element_onborder")) {
                    onborder.push({"id": this.fbs_id, left: this.positionX })
                }
            });

            function SortByLeft(a, b) {
                var aName = a.left;
                var bName = b.left;
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            function SortByEbene(a, b) {
                var aName = a.ebene;
                var bName = b.ebene;
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            onborder.sort(SortByLeft);

            ebene = 100001;
            $.each(onborder, function () {
                var id = this.id.split("_")[1];
                data[id].ebene = ebene;
                ebene++
            });

            var sortable = [];
            for (x in data) {
                sortable.push({
                    ebene: data[x].ebene,
                    fbs_id: data[x].fbs_id,
                    type: data[x].type,
                    hmid: data[x].hmid,
                    positionX: data[x].positionX,
                    positionY: data[x].positionY,
                    in: data[x].input,
                    out: data[x].output,
                    force: data[x].force
                });
            }

            sortable.sort(SortByEbene);
            PRG.struck.codebox[$($this).attr("id")] = [sortable];
        });
        console.info("struck1");
        $("#prg_panel .mbs_element_trigger ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.trigger[idx] = {
                mbs_id: $this.attr('id')
            };
        });
        console.info("struck2");
        $("#prg_panel .mbs_element_control ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.control[idx] = {
                mbs_id: $this.attr('id')
            };
        });
        console.info("struck3");
        $.each(PRG.struck.codebox, function (idx) {
            var $codebox = idx;

            $.each(this[0], function () {
                var id = this["fbs_id"];
                var input = [];
                var output = [];
                var target = [];

                if ($("#" + id).hasClass("fbs_element_onborder")) {
                    $.each(PRG._scope.con.mbs, function () {

                        if (this.pageSourceId == id) {
                            target.push([this.pageTargetId]);
                        }

                    });
                    $.each(PRG._scope.con.fbs[$codebox], function () {
                        var _input = this["pageTargetId"].split("_");
                        var input_name = (_input[0] + "_" + _input[1]);

                        if (input_name == id) {
                            var add = {
                                "eingang": this["pageTargetId"],
                                "herkunft": this.pageSourceId
                            };

                            input.push(add);
                        }
                    });
                } else {

                    $.each(PRG._scope.con.fbs[$codebox], function () {

                        var _input = this["pageTargetId"].split("_");
                        var input_name = (_input[0] + "_" + _input[1]);
                        var _output = this["pageSourceId"].split("_");
                        var output_name = (_output[0] + "_" + _output[1]);

                        if (input_name == id) {
                            var add = {
                                "eingang": _input[2],
                                "herkunft": this.pageSourceId
                            };
                            input.push(add);
                        }

                        if (output_name == id) {
                            add = {
                                ausgang: this.pageSourceId
                            };
                            output.push(add)
                        }
                    });
                }
                this["target"] = target;
                this["input"] = input;
                this["output"] = output;
            });
        });
        console.info("struck4");
        $.each(PRG.struck.trigger, function () {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG._scope.con.mbs, function () {
                if (this.pageSourceId == $trigger) {
                    $this.target.push(this.pageTargetId);
                }
            });
        });
        console.info("struck5");
        $.each(PRG.struck.control, function () {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG._scope.con.mbs, function () {

                if (this.pageSourceId == $trigger + "_out") {
                    $this.target.push(this.pageTargetId);
                }
            });
        });
        console.info("struck6");

    },

    copy_selected: function () {

        SGI.copy_data = [];

        $.each($('.fbs_selected'), function () {
            var posi = $(this).position();
            var data = {
                type: $(this).attr("id").split("_")[0],
                top: posi.top,
                left: posi.left
            };
            SGI.copy_data.push(data)
        });
    },

    paste_selected: function (e) {

        var codebox = $(".codebox_active").find(".prg_codebox");
        $(".fbs_selected").removeClass("fbs_selected");

        $.each(SGI.copy_data, function () {
            var data = this;
            data.parent = $(codebox).attr('id');
            SGI.add_fbs_element(this, true)
        });
    },

    edit_exp: function (data, callback) {


        var h = $(window).height() - 200;
        var v = $(window).width() - 400;

        $("body").append('\
                   <div id="dialog_code" style="text-align: left" title="Expert Editor">\
                   <button id="btn_exp_id">ID</button>\
                   <button id="btn_exp_group">Gruppe</button>\
                   <button id="btn_exp_device">Gerät</button>\
                    <textarea id="codemirror" name="codemirror" class="code frame_color ui-corner-all"></textarea>\
                   </div>');
        $("#dialog_code").dialog({
            height: h,
            width: v,
            resizable: true,
            close: function () {
                var data_r = editor.getValue();

                $("#dialog_code").remove();
                return callback(data_r)
            }
        });

        var editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
            mode: {name: "javascript", json: true},
//            value:data.toString(),
            lineNumbers: true,
            readOnly: false,
            theme: "monokai",
            extraKeys: {"Ctrl-Space": "autocomplete"}
        });

        editor.setOption("value", data.toString());


        $("#btn_exp_id").button().click(function () {

            $.id_select({
                type: "singel",
                close: function (hmid) {
                    var range = { from: editor.getCursor(true), to: editor.getCursor(false) };
                    editor.replaceRange(hmid, range.from, range.to)
                }
            });
        });
        $("#btn_exp_group").button().click(function () {

            $.id_select({
                type: "groups",
                close: function (hmid) {
                    var range = { from: editor.getCursor(true), to: editor.getCursor(false) };
                    editor.replaceRange(hmid, range.from, range.to)
                }
            });
        });
        $("#btn_exp_device").button().click(function () {

            $.id_select({
                type: "device",
                close: function (hmid) {
                    var data = '"' + hmid + '"';
                    var range = { from: editor.getCursor(true), to: editor.getCursor(false) };
                    editor.replaceRange(data, range.from, range.to)
                }
            });
        });
    },

    clear: function () {
        console.log("clear")
        SGI.plumb_inst.inst_mbs.cleanupListeners()
        console.log("clear")
//    SGI.plumb_inst.inst_mbs.reset();
        console.log("reset")
//        SGI.plumb_inst.inst_fbs.reset();
        $("#prg_panel").children().remove();
        SGI.mbs_n = 0;
        SGI.fbs_n = 0;
        $("#m_file").text("neu");
        SGI.file_name = "";

        PRG = {
            struck: {
                codebox: {},
                trigger: [],
                control: []
            }
        };
        scope.mbs = {};
        scope.fbs = {};
        scope.con = {
            mbs: {},
            fbs: {}
        };

        scope.$apply()
        SGI.mbs_inst();
    },

    get_name: function (hmid) {
        var _name;
        if (hmid == undefined) {
            return  ["Rechtsklick"];
        } else {
            if (homematic.regaObjects[hmid] == undefined) {
                return  "UNGÜLTIGE ID !!!";
            } else {

                if (homematic.regaObjects[hmid]["TypeName"] == "VARDP" || homematic.regaObjects[hmid]["TypeName"] == "PROGRAM") {
                    _name = homematic.regaObjects[hmid]["Name"].split(".").pop();

                } else if (homematic.regaObjects[hmid]["TypeName"].match(/ENUM/)) {
                    _name = SGI.translate(homematic.regaObjects[hmid]["TypeName"].split("ENUM_")[1]) + " > " + homematic.regaObjects[hmid]["Name"];
                } else if (homematic.regaObjects[hmid]["TypeName"] == "FAVORITE") {
                    _name = SGI.translate("FAVORITE") + " > " + homematic.regaObjects[hmid]["Name"];
                } else {
                    var parent = homematic.regaObjects[hmid]["Parent"];
                    var parent_data = homematic.regaObjects[parent];
                    _name = parent_data.Name + " > " + homematic.regaObjects[hmid]["Name"].split(".").pop();
                }
                return [_name];
            }
        }
    },

    get_lowest_obj_id: function () {

        var last_id = 100000;

        $.each(Object.keys(homematic.regaObjects).sort(), function () {

            var id = parseInt(this)

            if (id > 99999) {
                if (id == last_id) {
                    last_id++;
                } else {
                    return false
                }
            }


        });
        return last_id
    },

    find_border_position: function (data) {
        var box_h = parseInt($("#" + data.parent).css("height").split("px")[0]);
        var box_w = parseInt($("#" + data.parent).css("width").split("px")[0]);
        var top = parseInt($("#" + data.fbs_id).css("top").split("px")[0]);
        var left = parseInt($("#" + data.fbs_id).css("left").split("px")[0]);

        var p = [
            {ist: parseInt(left) || 9999, t: "left"},
            {ist: parseInt(box_w - left) || 9999, t: "right"},
            {ist: parseInt(top) || 9999, t: "top"},
            {ist: parseInt(box_h - top) || 9999, t: "bottom"}
        ];

        function SortByName(a, b) {
            var aName = a.ist;
            var bName = b.ist;
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        p.sort(SortByName);

        return p[0].t

    },

    find_prg_codebox: function (child) {
        var prg_codebox = undefined;


        if ($(child).hasClass('ui-resizable-handle')) {
            prg_codebox = undefined;


        } else if ($(child).hasClass('prg_codebox')) {
            prg_codebox = $(child);


        } else if ($(child).hasClass('mbs_element_codebox')) {
            prg_codebox = $(child).find(".prg_codebox");


        } else {
            var all = $(child).parents();

            $.each(all, function () {
                if ($(this).hasClass('prg_codebox')) {
                    prg_codebox = this;
                }
            });
        }
        return prg_codebox

    }

};

var homematic = {
    uiState: new can.Observe({"_65535": {"Value": null}}),
    setState: new can.Observe({"_65535": {"Value": null}}),
    regaIndex: {},
    regaObjects: {},
    setStateTimers: {}
};


window.timeoutList = [];
window.intervalList = [];

window.oldSetTimeout = window.setTimeout;
window.oldSetInterval = window.setInterval;
window.oldClearTimeout = window.clearTimeout;
window.oldClearInterval = window.clearInterval;

window.setTimeout = function (code, delay) {
    var retval = window.oldSetTimeout(code, delay);
    window.timeoutList.push(retval);
    return retval;
};
window.clearTimeout = function (id) {
    var ind = window.timeoutList.indexOf(id);
    if (ind >= 0) {
        window.timeoutList.splice(ind, 1);
    }
    var retval = window.oldClearTimeout(id);
    return retval;
};
window.setInterval = function (code, delay) {
    var retval = window.oldSetInterval(code, delay);
    window.intervalList.push(retval);
    return retval;
};
window.clearInterval = function (id) {
    var ind = window.intervalList.indexOf(id);
    if (ind >= 0) {
        window.intervalList.splice(ind, 1);
    }
    var retval = window.oldClearInterval(id);
    return retval;
};
window.clearAllTimeouts = function () {
    for (var i in window.timeoutList) {
        window.oldClearTimeout(window.timeoutList[i]);
    }
    window.timeoutList = [];
};
window.clearAllIntervals = function () {
    for (var i in window.intervalList) {
        window.oldClearInterval(window.intervalList[i]);
    }
    window.intervalList = [];
};

(function () {
    $(document).ready(function () {




        // Lade ccu.io Daten XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        try {
            SGI.socket = io.connect($(location).attr('protocol') + '//' + $(location).attr('host') + "?key=" + socketSession);

            SGI.socket.on('event', function (obj) {
                if (homematic.uiState["_" + obj[0]] !== undefined) {
                    var o = {};
                    o["_" + obj[0] + ".Value"] = obj[1];
                    o["_" + obj[0] + ".Timestamp"] = obj[2];
                    o["_" + obj[0] + ".Certain"] = obj[3];
                    homematic.uiState.attr(o);
                }
            });

            SGI.socket.emit("getIndex", function (index) {
                homematic.regaIndex = index;
//                SGI.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/regaIndex.json", JSON.stringify(index));

                SGI.socket.emit("getObjects", function (obj) {

                    homematic.regaObjects = obj;

//                    $.each(obj, function (index) {
//
//                    });
                    //                    SGI.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/Objects.json", JSON.stringify(obj));

                    SGI.socket.emit("getDatapoints", function (data) {
//                        SGI.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/Datapoints.json", JSON.stringify(data));

                        for (var dp in data) {
                            homematic.uiState.attr("_" + dp, { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]});
                        }


                    });
                });
            });
        }
        catch (err) {

            $.getJSON("sim_store/regaIndex.json", function (index) {
                homematic.regaIndex = index;
            });
            $.getJSON("sim_store/Objects.json", function (obj) {
                homematic.regaObjects = obj;
                $.getJSON("sim_store/Datapoints.json", function (data) {
                    for (var dp in data) {
                        homematic.uiState.attr("_" + dp, { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]});
                    }
                });
            });
        }

        scope = angular.element($('body')).scope();
//        scope.setup.tooltip = false;

        scope.$apply();
        $.getJSON("setup.json", function (obj) {
            scope.setup = obj;
            scope.$apply();
            SGI.Setup();
        });











    });
})(jQuery);

