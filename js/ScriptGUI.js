/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */
var scope;

var PRG = {
    mbs: {},
    fbs: {},
    connections: {
        mbs: [],
        fbs: {}
    },
    struck: {
        trigger: [],
        codebox: {}
    }
};

var SGI = {
    socket: {},
    settings: {},
    zoom: 1,
    theme: "",
    fbs_n: 0,
    mbs_n: 0,

    grid: 9,
    snap_grid: true,

    str_theme: "ScriptGUI_Theme",
    str_settings: "ScriptGUI_Settings",
    str_prog: "ScriptGUI_Programm",
    str_tollbox: "ScriptGUI_Toolbox",

    sim_run: false,

    tooltip: true,
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

        scope = angular.element($('body')).scope();

        try {
            SGI.socket.emit("readJsonFile", "www/ScriptGUI/settings.json", function (data) {
                SGI.settings = data;

                SGI.socket.emit("getSettings", function (data) {
                    SGI.settings.ccu = data;
                    SGI.settings.latitude = data.latitude;
                    SGI.settings.longitude = data.longitude;
                })
            });
        }
        catch (err) {
            console.info("Lande default Settings");
            SGI.settings.ccu = {
                "latitude": "undefined",
                "longitude": "undefined",
                "sunset": -6,
                "sunrise": -6,
                "morgen": "07:00-09:00",
                "vormittag": "09:01-12:00",
                "mittag": "12:01-14:00",
                "nachmittag": "14:01-18:00",
                "abend": "18:01-22:00",
                "nacht": "rest"
            };
            SGI.settings.latitude = "undefined";
            SGI.settings.longitude = "undefined";

        }

        jsPlumb.ready(function () {
            SGI.plumb_inst.inst_mbs = jsPlumb.getInstance({
                PaintStyle: { lineWidth: 4, strokeStyle: "blue" },
                HoverPaintStyle: {strokeStyle: "red", lineWidth: 2 },
                ConnectionOverlays: [
                    [ "Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 12,
                        foldback: 0.8
                    } ]
                ],
                Container: "prg_panel",
                Connector: "State Machine",
                Scope: "singel"
            });


//                Anchor: "BottomCenter",
//                Anchors: [ null, null ],
//                ConnectionsDetachable: true,
//                ConnectionOverlays: [],
//                Connector: "Bezier",
//                Container: "prg_panel",                             //xxx
//                DoNotThrowErrors: false,
//                DragOptions: { },
//                DropOptions: {tolerance: "touch" },
//                Endpoint: "Dot",
//                Endpoints: [ null, null ],
//                EndpointOverlays: [ ],
//                EndpointStyle: { fillStyle: "#456" },
//                EndpointStyles: [ null, null ],
//                EndpointHoverStyle: null,
//                EndpointHoverStyles: [ null, null ],
//                HoverPaintStyle: null,
//                LabelStyle: { color: "black" },
//                LogEnabled: false,
//                Overlays: [ ],
//                MaxConnections: 1,
//                PaintStyle: { lineWidth: 4, strokeStyle: "blue" },      //xxx
//                ReattachConnections: false,
//                RenderMode: "svg",
//                Scope: "jsPlumb_DefaultScope"
        });
        // translate XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.each($(".translate"), function () {
            var $this = this;
            $($this).text(SGI.translate($($this).text()))

        });
        $.each($(".title_translate"), function () {
            var $this = this;
            $($this).attr("title",(SGI.translate($($this).attr("title"))))

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
                "Allgemein",
                "Programme",
                "Logic",
                "Listen Filter",
                "Get Set Var",
                "Convert",
                "Math.",
                "Singel Trigger",
                "Zeit Trigger",
                "Trigger Daten",
                "Expert"
            ]

        });


        $("#toolbox_" + box_init[1]).show();

        // Toolboxauswahl
        $("#toolbox_select").change(function () {
            var val = $("#toolbox_select").xs_combo();
            var box = "";

            if (val == "Allgemein") {
                box = "alg"
            }
            if (val == "Programme") {
                box = "prog"
            }
            if (val == "Logic") {
                box = "logic"
            }
            if (val == "Listen Filter") {
                box = "filter"
            }
            if (val == "Get Set Var") {
                box = "io"
            }
            if (val == "Singel Trigger") {
                box = "s_trigger"
            }
            if (val == "Zeit Trigger") {
                box = "t_trigger"
            }
            if (val == "Trigger Daten") {
                box = "trigger_daten"
            }
            if (val == "Expert") {
                box = "expert"
            }
            if (val == "Math.") {
                box = "math"
            }
            if (val == "Convert") {
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
                $(this).removeClass("ui-state-focus")
                SGI.del_all_force();
            });


        var start_h;
        var log_h = 100;
        $("#sim_log_head").hover(
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
                    $("#sim_log").css({height: "100px"})
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
                        type: $(ui["draggable"][0]).attr("id"),

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


        $('.prg_panel').on('click', function (event) {
            if (event.target == event.currentTarget) {
                $(".codebox_active").removeClass("codebox_active");
            }
        });

        $(document).keydown(function (event) {
            SGI.key = event.keyCode;
            if (SGI.key == 17) {
                $("body").css({cursor: "help"});
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
            } else if (event.ctrlKey) {
                $("body").css({cursor: "help"});
                SGI.key = 17;
            }


        });

        $(document).keyup(function () {
            if (SGI.key == 17) {
                $("body").css({cursor: "default"});
            }
            SGI.key = "";
        });

        $("body").css({visibility: "visible"});


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
            $("body").bind("mousemove",function(_e){

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

        });

        $(document).mouseup(function (e) {

            if(selection_fbs ) {
                console.log(selection_fbs );
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
        $.each(data.connections.mbs, function () {
            var source = this.pageSourceId;
            var target = this.pageTargetId;
            var delay = this.delay;                     //TODO REMOVE
            if (target.split("_")[0] == "codebox") {
                SGI.plumb_inst.inst_mbs.connect({
                    uuids: [source],
                    target: target
                });

            } else {
                SGI.plumb_inst.inst_mbs.connect({uuids: [source, target]});
            }


            if (delay != 0 && delay != undefined) {                     //TODO REMOVE
                var con = SGI.plumb_inst.inst_mbs.getConnections();
                SGI.add_delay(con.pop(), delay)
            }


        });

        $.each(data.connections.fbs, function (index) {
            $.each(this, function () {

                try {

                    var source = this.pageSourceId;
                    var target = this.pageTargetId;

                    SGI.plumb_inst["inst_" + index].connect({uuids: [source, target]});
                } catch (err) {
                    console.log(err);
                    console.log(this)
                }
            });
        });
    },

    add_input: function (opt) {

        var id = $($(opt).attr("$trigger")).attr("id");

        var data = PRG.fbs[id];


        var n = id.split("_")[1];
        var type = id.split("_")[0];
        var index = $($("#" + id).find("[id^='left']")).children().length + 1;
        var add_id = type + '_' + n + '_in' + index + '';

        PRG.fbs[id].input_n = parseInt(index);


        $($("#" + id).find("[id^='left']")).append('\
                <div id="' + add_id + '"  class="div_input ' + type + '_' + n + '_in"><a class="input_font">IN ' + index + '</a></div>\
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
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
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
                    connector: [ "Flowchart", { stub: _stub, alwaysRespectStubs: true}  ],
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
                dropOptions: { hoverClass: "dragHover" },
                anchor: ["Continuous", {faces: "right"}],
                endpoint: ["Dot", {radius: 2}]
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

        SGI.plumb_inst.inst_mbs.unbind("click");

        SGI.plumb_inst.inst_mbs.bind("mousedown", function (e) {
            console.log(SGI.plumb_inst.inst_mbs.getConnection(this))
            var o = {
                path_x: c.connector.x,
                path_y: c.connector.y,
                ref_x: $("#prg_panel").offset().left,
                ref_y: $("#prg_panel").offset().top
            };

            var segment = c.connector.findSegmentForPoint(p.clientX - (o.path_x + o.ref_x), p.clientY - (o.path_y + o.ref_y)).index;

            var old_path = c.connector.getPath();


            if(old_path[segment-1]["start"][0] == old_path[segment-1]["end"][0]){
                console.log("move x")
            }else{
                console.log("move y")
            }
            console.log(segment);
            console.log(old_path)
        });

        SGI.plumb_inst.inst_mbs.unbind("dblclick");
        SGI.plumb_inst.inst_mbs.bind("dblclick", function (c) {
            if (SGI.klick.target.tagName == "path") {
                SGI.plumb_inst.inst_mbs.detach(c);
            }
        });

//        ToDo das löschen wenn neue Pausen ok
        SGI.plumb_inst.inst_mbs.unbind("contextmenu");
        SGI.plumb_inst.inst_mbs.bind("contextmenu", function (c) {
            SGI.con = c;
        });

        SGI.plumb_inst.inst_mbs.unbind("connection");
        SGI.plumb_inst.inst_mbs.bind("connection", function (c) {

            var mbs_in = c.targetId.split("_")[0];

            if (mbs_in == "brake" || mbs_in == "intervall" || mbs_in == "loop") {
                c.connection.removeAllOverlays()
            }

        });

        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

//TODO REMOVE
    add_delay: function (con, delay) {
        var _delay = delay || 0;
        if (con) {
            if (con.getOverlay("delay") == null) {


                con.addOverlay(
                    ["Custom", {
                        create: function () {
                            return $('<div id="delay_' + $(con).attr("id") + '" class="delay">\
                                         <p class="delay_head">Pause</p>\
                                            <input value="' + _delay + '"class="delay_var" id="' + $(con).attr("id") + '_delay" type="text">\
                                            </div>\
                                            ');
                        },
                        location: -25,
                        id: "delay"
                    }]);
            }
        }
        $('#' + $(con).attr("id") + '_delay').numberMask({type: 'float', beforePoint: 5, afterPoint: 3, decimalMark: '.'});
        $('#' + $(con).attr("id") + '_delay').parent().addClass("delay")
    },

//TODO REMOVE
    del_delay: function (con, delay) {
        var _delay = delay || 0;
        if (con) {
            if (con.getOverlay("delay") != null) {
                con.removeOverlay("delay");
            }
        }
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
            connector: [ "Flowchart", { stub: 18, alwaysRespectStubs: true}  ]


        });


        SGI.plumb_inst["inst_" + id].bind("dblclick", function (c) {
            var fbs_in = c.targetId.split("_in")[0];
            var fbs_out = c.sourceId.split("_out")[0];

            delete PRG.fbs[fbs_in].input[c.targetId.split("_")[2]];
            delete PRG.fbs[fbs_out].output[c.sourceId.split("_")[2]];
            SGI.plumb_inst["inst_" + id].detach(c);
        });
        SGI.plumb_inst["inst_" + id].bind("connection", function (c) {

//            var scope_t = c.targetEndpoint.scope;
//            var scope_s = c.sourceEndpoint.scope;
            var fbs_in = c.targetId.split("_in")[0];
            var fbs_out = c.sourceId.split("_out")[0];

            PRG.fbs[fbs_in].input[c.targetId.split("_")[2]] = c.sourceId;
            PRG.fbs[fbs_out].output[c.sourceId.split("_")[2]] = c.targetId;

//            if (scope_t.split(" ").length == 1) {
//                console.log("scope is " + scope_t.toString());
//                c.connection.scope = scope_t.toString();
//            }
//            if (scope_t.split(" ").length > 1 && scope_s.split(" ").length > 1) {
//                console.log("scope is expert");
//                c.connection.scope = "expert";
//            }
        });

        SGI.plumb_inst["inst_" + id].bind("contextmenu", function (c) {
            SGI.con = c;
        });

    },

    add_trigger_hmid: function (_this, type, type2) {
        var $type = type;
        var $this = _this;


        $.id_select({
            type: type,
            close: function (hmid) {
                if (hmid != null) {
                    var _name = SGI.get_name(hmid);

                    PRG.mbs[$this.attr("id")]["hmid"].push(hmid);

                    if (PRG.mbs[$this.attr("id")]["name"][0] == "Rechtsklick") {
                        PRG.mbs[$this.attr("id")]["name"][0] = _name;
                    } else {
                        PRG.mbs[$this.attr("id")]["name"].push(_name);
                    }

                    if (type2 == "val") {
                        SGI.add_trigger_name_val($this);
                    } else {
                        // singel Trigger
                        SGI.add_trigger_name($this);
                    }
                    SGI.plumb_inst.inst_mbs.repaintEverything()
                }

            }
        });

    },

    add_trigger_name: function ($this) {
        $($this).find(".div_hmid_font").remove();

        $.each(PRG.mbs[$this.attr("id")]["name"], function () {

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

                    PRG.fbs[$this.attr("id")]["hmid"].push(hmid);
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

                    PRG.fbs[$this.attr("id")]["hmid"].push(hmid);
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

                    PRG.fbs[$this.attr("id")]["hmid"].push(hmid);
                    SGI.add_filter_dp_name($this)
                }
            }
        });


    },

    add_filter_device_name: function ($this) {
        var add = ""

        $($this).find(".div_hmid_filter_font_device").remove();
        if (PRG.fbs[$($this).attr("id")]["hmid"].length > 0) {

            $.each(PRG.fbs[$($this).attr("id")]["hmid"], function () {
                var name = this
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_device">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_device">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add)

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_filter_channel_name: function ($this) {
        var add = ""

        $($this).find(".div_hmid_filter_font_channel").remove();
        if (PRG.fbs[$($this).attr("id")]["hmid"].length > 0) {

            $.each(PRG.fbs[$($this).attr("id")]["hmid"], function () {
                var name = this
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_channel">' + name + '</div>';
            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_channel">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add)

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_filter_dp_name: function ($this) {
        var add = ""

        $($this).find(".div_hmid_filter_font_dp").remove();
        if (PRG.fbs[$($this).attr("id")]["hmid"].length > 0) {

            $.each(PRG.fbs[$($this).attr("id")]["hmid"], function () {
                var name = this
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_dp">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font_dp">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add)

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_trigger_name_val: function ($this) {
        $($this).find(".div_hmid_val_body").remove();
        var nr = $($this).data("nr");
        var add = "";
        $.each(scope.mbs[nr].name, function (index) {

            var wert = scope.mbs[nr]["wert"][index] || 0;

            add += '<div style="min-width: 100%" class="div_hmid_val_body">';
            add += '<div data-info="' + $this.attr("id") + '"  style="display:inline-block;float: left;" class="div_hmid_val">{{mbs['+nr+'].name['+index+'].toString()}}</div>';
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
        $.each(PRG.mbs[$this.attr("id")]["astro"], function (index) {
            add += '<div id="tr_ch_body_' + index + '" class="tr_ch_body">';
            add += '<select id="astro_' + index + '" class="inp_astro">';
            add += '    <option value="sunrise">Sonnenaufgang Start</option>';
            add += '    <option value="sunriseEnd">Sonnenaufgang Ende</option>';
            add += '    <option value="solarNoon">Höchster Sonnenstand</option>';
            add += '    <option value="sunsetStart">Sonnenuntergang Start</option>';
            add += '    <option value="sunset">Sonnenuntergang Ende</option>';
            add += '    <option value="night">Nacht Start</option>';
            add += '    <option value="nightEnd">Nacht Ende</option>';
            add += '    <option value="nadir">Dunkelster moment</option>';
            add += '</select>';
            add += '<label style="display:flex ;margin-left:10px; color: #676767; font-size: 13px">Shift:</label></label><input class="inp_min" type=int value="' + PRG.mbs[$this.attr("id")]["minuten"][index] + '" id="var_' + index + '"><br>';
            add += '</div>';
        });
        $($this).find(".div_hmid_trigger").append(add);

        $.each(PRG.mbs[$this.attr("id")]["astro"], function (index) {

            $($this).find("#astro_" + index).val(this.toString())

        });

//        $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});

        $('.inp_min').change(function () {
            var index = $(this).attr("id").split("_")[1];

            PRG.mbs[$(this).parent().parent().parent().attr("id")]["minuten"][index] = $(this).val();
        });

        $('.inp_astro').change(function () {
            var index = $(this).attr("id").split("_")[1];
            PRG.mbs[$(this).parent().parent().parent().attr("id")]["astro"][index] = $(this).val();
        });

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

                    if (SGI.snap_grid) {
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
                    off = $(dd.drag).parent().offset();
                    start_left = parseInt($(this).parent().css("left").split("px")[0]);
                    start_top = parseInt($(this).parent().css("top").split("px")[0]);
                })

                .drag(function (ev, dd) {

                    if (SGI.snap_grid) {
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
                .drag("end", function (ev, dd) {
                    var nr = $(this).data("nr");
                    var top = parseInt($(this).parent().css("top"));
                    var left = parseInt($(this).parent().css("left"));

                    scope.mbs[nr].style.top = top;
                    scope.mbs[nr].style.left = left;
                    SGI.plumb_inst.inst_mbs.repaintEverything()
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
                    off = $(dd.drag).parent().offset();
                    start_left = parseInt($(this).parent().css("left").split("px")[0]);
                    start_top = parseInt($(this).parent().css("top").split("px")[0]);
                })

                .drag(function (ev, dd) {

                    if (SGI.snap_grid) {
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
                .drag("end", function (ev, dd) {
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

                    if (SGI.snap_grid) {

                        var data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id"),
                            top: Math.round(((ui["offset"]["top"] - $(ev.target).offset().top + 32) / SGI.zoom) / SGI.grid) * SGI.grid,
                            left: Math.round(((ui["offset"]["left"] - $(ev.target).offset().left + 32) / SGI.zoom) / SGI.grid) * SGI.grid
                        };
                    } else {
                        var data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id"),
                            top: parseInt((ui["offset"]["top"] - $(ev.target).offset().top) + 32 / SGI.zoom),
                            left: parseInt((ui["offset"]["left"] - $(ev.target).offset().left) + 32 / SGI.zoom)
                        };
                    }

                    SGI.add_fbs_element(data);
                }
            }
        });
    },

    make_savedata: function () {

        PRG.connections.mbs = [];

        $.each($(".fbs_element"), function () {
            var id = $(this).attr("id");
            PRG.fbs[id].top = $(this).position().top;
            PRG.fbs[id].left = $(this).position().left;
        });

        $.each(SGI.plumb_inst.inst_mbs.getConnections(), function (idx, connection) {
            var _delay = connection.getOverlay("delay");  //TODO REMOVE
            var delay = 0;  //TODO REMOVE
            if (_delay) {//TODO REMOVE
                delay = $("#" + connection.id + "_delay").val();//TODO REMOVE
            }
            PRG.connections.mbs.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId,
                delay: delay //TODO REMOVE
            });
        });

        PRG.connections.fbs = {};
        $(".mbs_element_codebox").each(function () {

            var codebox = $(this).attr("id");
            PRG.connections.fbs[codebox] = {};


            var all_cons = SGI.plumb_inst["inst_" + codebox].getConnections("*");

            $.each(all_cons, function (idx, connection) {
                PRG.connections.fbs[codebox][idx] = {
                    connectionId: connection.id,
                    pageSourceId: connection.sourceId,
                    pageTargetId: connection.targetId
                };
            });

        });

        return PRG;

    },

    make_struc_old: function () {

        PRG.struck.codebox = {};
        PRG.struck.trigger = [];

        $("#prg_panel .mbs_element_trigger ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.trigger[idx] = {
                mbs_id: $this.attr('id')
            };
        });

        $("#prg_panel .mbs_element_codebox ").each(function (idx, elem) {
            var $this = $(elem);

            var fbs_elements = $($this).find(".fbs_element");

            var data = [];
            $.each(fbs_elements, function (idx, elem) {
                var $this = $(elem);
                data.push({
                    fbs_id: $this.attr('id'),
                    type: PRG.fbs[$this.attr('id')]["type"],
                    positionX: parseInt($this.css("left"), 10),
                    positionY: parseInt($this.css("top"), 10),
                    hmid: PRG.fbs[$this.attr('id')]["hmid"],
                    force: PRG.fbs[$this.attr('id')]["force"]
                });
            });

            function SortByName(a, b) {
                var aName = a.positionX;
                var bName = b.positionX;
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            data.sort(SortByName);
            PRG.struck.codebox[$($this).attr("id")] = [data];
        });

        SGI.make_savedata();

        // Erstelle Scrip Stucktur

        $.each(PRG.struck.trigger, function (idx) {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG.connections.mbs, function () {

                if (this.pageSourceId == $trigger) {
                    $this.target.push([this.pageTargetId, this.delay]); //TODO REMOVE DELAY

                }

            });

        });

        $.each(PRG.struck.codebox, function (idx) {
            var $codebox = idx;

            $.each(this[0], function () {
                var id = this["fbs_id"];
                var input = [];
                var output = [];
                var target = [];

                if ($("#" + id).hasClass("fbs_element_onborder")) {
                    $.each(PRG.connections.mbs, function () {


                        if (this.pageSourceId == id) {
                            target.push([this.pageTargetId, this.delay]); //TODO REMOVE DELAY

                        }

                    });
                    $.each(PRG.connections.fbs[$codebox], function () {
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

                    $.each(PRG.connections.fbs[$codebox], function () {

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

    },

    make_struc: function () {

        PRG.struck.codebox = {};
        PRG.struck.trigger = [];
        PRG.struck.control = [];

        SGI.make_savedata();

        $("#prg_panel .mbs_element_codebox ").each(function (idx, elem) {
            var $this = $(elem);
            var fbs = $($this).find(".fbs_element");
            var data = {};
            var ebene = 99999;
            var onborder = [];
            Compiler.last_fbs = $(fbs).attr("id");
            $.each(fbs, function (idx, elem) {
                var $this = $(elem);
                var fbs_id = $this.attr('id');
                var input = PRG.fbs[$this.attr('id')]["input"];
                var output = PRG.fbs[$this.attr('id')]["output"];

                data[fbs_id.split("_")[1]] = {
                    ebene: 99999,
                    fbs_id: fbs_id,
                    type: PRG.fbs[$this.attr('id')]["type"],
                    hmid: PRG.fbs[$this.attr('id')]["hmid"],
                    positionX: parseInt($this.css("left"), 10),
                    positionY: parseInt($this.css("top"), 10),
                    input: input,
                    output: output,
                    force: PRG.fbs[$this.attr('id')]["force"]
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

            sortable.sort(SortByEbene)
            PRG.struck.codebox[$($this).attr("id")] = [sortable];
        });

        $("#prg_panel .mbs_element_trigger ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.trigger[idx] = {
                mbs_id: $this.attr('id')
            };
        });

        $("#prg_panel .mbs_element_control ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.control[idx] = {
                mbs_id: $this.attr('id')
            };
        });

        $.each(PRG.struck.codebox, function (idx) {
            var $codebox = idx;

            $.each(this[0], function () {
                var id = this["fbs_id"];
                var input = [];
                var output = [];
                var target = [];

                if ($("#" + id).hasClass("fbs_element_onborder")) {
                    $.each(PRG.connections.mbs, function () {

                        if (this.pageSourceId == id) {
                            target.push([this.pageTargetId, this.delay]); //TODO REMOVE DELAY
                        }

                    });
                    $.each(PRG.connections.fbs[$codebox], function () {
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

                    $.each(PRG.connections.fbs[$codebox], function () {

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

        $.each(PRG.struck.trigger, function (idx) {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG.connections.mbs, function () {

                if (this.pageSourceId == $trigger) {
                    $this.target.push(this.pageTargetId);
//                    $this.target.push([this.pageTargetId, this.delay]); //TODO REMOVE DELAY
                }
            });
        });

        $.each(PRG.struck.control, function (idx) {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG.connections.mbs, function () {

                if (this.pageSourceId == $trigger + "_out") {
                    $this.target.push(this.pageTargetId);
                }
            });
        });


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

        editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
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
        SGI.plumb_inst.inst_mbs.reset();
//        SGI.plumb_inst.inst_fbs.reset();
        $("#prg_panel").children().remove();
        SGI.mbs_n = 0;
        SGI.fbs_n = 0;
        $("#m_file").text("neu");
        SGI.file_name = "";
        PRG = {
            mbs: {},
            fbs: {},
            connections: {
                mbs: [],
                fbs: {}
            },
            struck: {
                trigger: {},
                codebox: {}
            }
        };
    },

    get_name: function (hmid) {

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

        $.each(Object.keys(homematic.regaObjects).sort(), function (id) {

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

var Compiler = {
    last_fbs: "",
    script: "",
    make_prg: function (sim) {

        Compiler.trigger = "// Trigger\n";
        Compiler.obj = "\n// CCU.IO Objekte\n";
        Compiler.timeout = "\n// Timeout Variablen\n";
        Compiler.force = "\n// Force Variablen\n";

        Compiler.script = "";

        SGI.make_struc();

        function SortByEingang(a, b) {

            var aName = parseInt(a.eingang.replace("in", ""));
            var bName = parseInt(b.eingang.replace("in", ""));
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        $.each(PRG.struck.trigger, function () {
            var $trigger = this.mbs_id;

            var targets = "";
            $.each(this.target, function () {
//                if (this[1] == 0) {
                targets += this + "(data);"
//                } else
//                    targets += " setTimeout(function(){ " + this[0] + "(data)}," + this[1] * 1000 + ");"
            });

            if (PRG.mbs[$trigger].type == "trigger_valNe") {
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger = 'subscribe({id: ' + this + ' , valNe:false}, function (data){' + targets + ' }); ' + Compiler.script;
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_event") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + '}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_EQ") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"eq"}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_NE") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ne"}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_GT") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"gt"}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_GE") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ge"}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_LT") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"lt"}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_LE") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"le"}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_val") {

                $.each(PRG.mbs[$trigger].hmid, function (index) {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , ' + PRG.mbs[$trigger]["val"][index] + ':' + PRG.mbs[$trigger]["wert"][index] + '}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_time") {

                $.each(PRG.mbs[$trigger].time, function (index) {
                    var _time = this;

                    var m = this.split(":")[1];
                    var h = this.split(":")[0];

                    var day = "";
                    var _day = PRG.mbs[$trigger].day[index];

                    switch (_day) {
                        case "88":
                            day = "*";
                            break;
                        case "1":
                            day = "1";
                            break;
                        case "2":
                            day = "2";
                            break;
                        case "3":
                            day = "3";
                            break;
                        case "4":
                            day = "4";
                            break;
                        case "5":
                            day = "5";
                            break;
                        case "6":
                            day = "6";
                            break;
                        case "7":
                            day = "0";
                            break;
                        case "8":
                            day = "1-5";
                            break;
                        case "9":
                            day = "6,0";
                            break;

                    }
                    Compiler.trigger += 'schedule("' + m + ' ' + h + ' * * ' + day + '", function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_astro") {

                $.each(PRG.mbs[$trigger].astro, function (index) {

                    Compiler.trigger += 'schedule({astro:"' + this + '", shift:' + PRG.mbs[$trigger].minuten[index] + '}, function (data){' + targets + ' }); '
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_zykm") {

                Compiler.trigger += 'schedule(" */' + PRG.mbs[$trigger].time + ' * * * * ", function (data){' + targets + ' }); '

            }
            if (PRG.mbs[$trigger].type == "trigger_vartime") {
                var n = PRG.mbs[$trigger].hmid.length;
                Compiler.trigger += 'schedule(" * * * * * ", function (data){';
                Compiler.trigger += 'var d = new Date();';
                Compiler.trigger += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();';
                Compiler.trigger += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();';
                Compiler.trigger += 'var now = h.toString() + ":" + m.toString() +":00";';
                Compiler.trigger += 'if('
                $.each(PRG.mbs[$trigger].hmid, function (index, obj) {

                    Compiler.trigger += 'homematic.uiState["_"+' + this + '] == now';
                    if (index + 1 < n) {
                        Compiler.trigger += ' || ';
                    }
                });
                Compiler.trigger += '){' + targets + '});'

            }
            if (PRG.mbs[$trigger].type == "trigger_yearly") {

                Compiler.trigger += 'schedule("@yearly", function (data){' + targets + ' }); '

            }
            if (PRG.mbs[$trigger].type == "trigger_monthly") {

                Compiler.trigger += 'schedule("@monthly", function (data){' + targets + ' }); '

            }
            if (PRG.mbs[$trigger].type == "scriptobj") {

                Compiler.obj += 'var ' + PRG.mbs[$trigger].name + '; ';

            }
            if (PRG.mbs[$trigger].type == "ccuobj") {

                Compiler.obj += 'setObject(' + PRG.mbs[$trigger].hmid + ', { Name: "' + PRG.mbs[$trigger]["name"] + '", TypeName: "VARDP"}); '

            }
            if (PRG.mbs[$trigger].type == "ccuobjpersi") {

                Compiler.obj += 'setObject(' + PRG.mbs[$trigger].hmid + ', { Name: "' + PRG.mbs[$trigger]["name"] + '", TypeName: "VARDP" , _persistent:true}); '

            }
            if (PRG.mbs[$trigger].type == "trigger_start") {

                $.each(this.target, function () {
//                    if (this[1] == 0) {
                    Compiler.trigger += 'var start_data =' + JSON.stringify(SGI.start_data) + ';';
                    Compiler.trigger += " " + this + "(start_data);";
//                    } else
//                        Compiler.trigger += " setTimeout(function(start_data){ " + this[0] + "()}," + this[1] * 1000 + ");"
                });
            }
        });

        $.each(PRG.struck.control, function () {
            var control = this.mbs_id;

            var targets = "";
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG.mbs[control].type == "brake") {

                $.each(this.target, function () {
                    targets += this + "(data);";
                });

                Compiler.timeout += "var " + this.mbs_id + " = [] ;";
                if (PRG.mbs[control].wert == true) {
                    Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                    Compiler.timeout += "clearTimeout(" + this.mbs_id + ".pop());";
                    Compiler.timeout += this.mbs_id + ".push(setTimeout(function(){" + targets + "}," + parseFloat(PRG.mbs[control].val) * 1000 + "))";
                    Compiler.timeout += "}";
                } else {
                    Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                    Compiler.timeout += this.mbs_id + ".push(setTimeout(function(){" + targets + "}," + parseFloat(PRG.mbs[control].val) * 1000 + "))";
                    Compiler.timeout += "}";
                }
                Compiler.timeout += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.timeout += "while (" + this.mbs_id + ".length > 0 ) clearTimeout(" + this.mbs_id + ".pop());";
                Compiler.timeout += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG.mbs[control].type == "intervall") {

                $.each(this.target, function () {
                    targets += this + "(data);";
                });

                Compiler.timeout += "var " + this.mbs_id + " ;";
                Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.timeout += "clearInterval(" + this.mbs_id + " );";
                Compiler.timeout += this.mbs_id + " = setInterval(function(){" + targets + "}," + parseFloat(PRG.mbs[control].val) * 1000 + ")";
                Compiler.timeout += "}";

                Compiler.timeout += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.timeout += "clearInterval(" + this.mbs_id + " );";
                Compiler.timeout += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG.mbs[control].type == "loop") {

                $.each(this.target, function () {
                    targets += this + "(data);";
                });

                Compiler.timeout += "var " + this.mbs_id + " = 0;";
                Compiler.timeout += "var " + this.mbs_id + "_delay;";
                Compiler.timeout += "function  " + this.mbs_id + "_loop (data){";
                Compiler.timeout += "if (" + this.mbs_id + " < " + PRG.mbs[control].wert + ") {";
                Compiler.timeout += this.mbs_id + " ++;";
                Compiler.timeout += targets;
                Compiler.timeout += this.mbs_id + "_delay = setTimeout(function(){" + this.mbs_id + "_loop(data)}," + parseFloat(PRG.mbs[control].val) * 1000 + ");";
                Compiler.timeout += "}";
                Compiler.timeout += "}";

                Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.timeout += this.mbs_id + "= 0;";
                Compiler.timeout += "clearTimeout(" + this.mbs_id + "_delay);";
                Compiler.timeout += this.mbs_id + "_loop(data)";
                Compiler.timeout += "}";

                Compiler.timeout += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.timeout += "clearInterval(" + this.mbs_id + "_delay );";
                Compiler.timeout += this.mbs_id + "= " + parseInt(PRG.mbs[control].wert) + ";";
                Compiler.timeout += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        });
        Compiler.script += Compiler.timeout;
        Compiler.script += Compiler.obj;
        Compiler.script += Compiler.trigger;

        Compiler.script += '';

        $.each(PRG.struck.codebox, function (idx) {
            Compiler.script += '//' + PRG.mbs[idx].titel + '\n';
            Compiler.script += 'function ' + idx + '(data){ ';
            $.each(this[0], function () {
                var fbs = this.fbs_id;
                Compiler.last_fbs = this.fbs_id;
                if (sim) {
                    Compiler.script += '\n\n// xxxxxxxxxxxxxxxxxxxx ' + fbs + ' xxxxxxxxxxxxxxxxxxxx \n';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "input") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= getState(' + PRG.fbs[fbs].hmid + ');';
                }
                if (this["type"] == "inputlocal") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= ' + this.hmid + ';';
                }
                if (this["type"] == "output") {
                    Compiler.script += 'setState(' + this.hmid + ',' + this["input"][0]["herkunft"] + ');';
                }
                if (this["type"] == "outputlocal") {
                    Compiler.script += this.hmid + ' = ' + this["input"][0]["herkunft"] + ' ;';
                }
                if (this["type"] == "debugout") {
                    Compiler.script += 'log("' + SGI.file_name + ' -> ' + PRG.mbs[PRG.fbs[fbs]["parent"].split("prg_")[1]].titel + ' -> " + ' + this["input"][0]["herkunft"] + ');';
                }
                if (this["type"] == "pushover") {
                    Compiler.script += 'pushover({message:' + this["input"][0]["herkunft"] + '});';
                }
                if (this["type"] == "mail") {
                    var n = this["input"].length;

                    this["input"].sort(SortByEingang);
                    Compiler.script += 'email({to: ' + this["input"][0].herkunft + ',subject: ' + this["input"][1].herkunft + ',text: ' + this["input"][2].herkunft + '});';
                }
                if (this["type"] == "true") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = true;';
                }
                if (this["type"] == "false") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = false;';
                }
                if (this["type"] == "zahl") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ' + PRG.fbs[fbs]["value"] + ' ;';
                }
                if (this["type"] == "string") {
                    var lines = PRG.fbs[fbs]["value"].split("") || PRG.fbs[fbs]["value"];
                    var daten = "";
                    $.each(lines, function () {
                        daten = daten + this.toString() + " ";
                    });
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = "' + PRG.fbs[fbs]["value"] + '";';
                }

                if (this["type"] == "vartime") {
                    var d = new Date();
                    daten = "var d = new Date();";

                    if (PRG.fbs[fbs]["value"] == "zeit_k") {
                        daten += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();';
                        daten += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();';

                        daten += 'var ' + this.output[0].ausgang + ' = h + ":" + m;';
                    } else if (PRG.fbs[fbs]["value"] == "zeit_l") {
                        daten += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();';
                        daten += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();';
                        daten += 'var s = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();';

                        daten += 'var ' + this.output[0].ausgang + ' = h + ":" + m + ":" + s;';

                    } else if (PRG.fbs[fbs]["value"] == "date_k") {
                        daten += 'var ' + this.output[0].ausgang + ' = ';
                        daten += 'd.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();'

                    } else if (PRG.fbs[fbs]["value"] == "date_l") {
                        daten += 'var ' + this.output[0].ausgang + ' = ';
                        daten += 'd.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear() + " " + d.getHours().toString() + ":" + d.getMinutes().toString();'
                    } else if (PRG.fbs[fbs]["value"] == "mm") {
                        daten += 'var ' + this.output[0].ausgang + ' = ';
                        daten += 'd.getMinutes().toString();'

                    } else if (PRG.fbs[fbs]["value"] == "hh") {
                        daten += 'var ' + this.output[0].ausgang + ' = ';
                        daten += 'd.getHours().toString();'

                    } else if (PRG.fbs[fbs]["value"] == "WD") {
                        daten += ' var weekday=new Array();';
                        daten += ' weekday[0]="Sonntag";';
                        daten += ' weekday[1]="Montag";';
                        daten += ' weekday[2]="Dienstag";';
                        daten += ' weekday[3]="Mittwoch";';
                        daten += ' weekday[4]="Donnerstag";';
                        daten += ' weekday[5]="Freitag";';
                        daten += ' weekday[6]="Samstag";';
                        daten += 'var ' + this.output[0].ausgang + ' = ';

                        daten += 'weekday[d.getDay()];'

                    } else if (PRG.fbs[fbs]["value"] == "KW") {

                        daten += 'var KWDatum = new Date();';
                        daten += 'var DonnerstagDat = new Date(KWDatum.getTime() + (3-((KWDatum.getDay()+6) % 7)) * 86400000);';
                        daten += 'var KWJahr = DonnerstagDat.getFullYear();';
                        daten += 'var DonnerstagKW = new Date(new Date(KWJahr,0,4).getTime() +(3-((new Date(KWJahr,0,4).getDay()+6) % 7)) * 86400000);';
                        daten += 'var KW = Math.floor(1.5 + (DonnerstagDat.getTime() - DonnerstagKW.getTime()) / 86400000/7);';
                        daten += 'var ' + this.output[0].ausgang + ' = KW;';

                    } else if (PRG.fbs[fbs]["value"] == "MM") {
                        daten += ' var month=new Array();';
                        daten += ' month[0]="Jannuar";';
                        daten += ' month[1]="Februar";';
                        daten += ' month[2]="März";';
                        daten += ' month[3]="April";';
                        daten += ' month[4]="Mai";';
                        daten += ' month[5]="Juni";';
                        daten += ' month[6]="Juli";';
                        daten += ' month[7]="August";';
                        daten += ' month[8]="September";';
                        daten += ' month[9]="Oktober";';
                        daten += ' month[10]="November";';
                        daten += ' month[11]="Dezember";';
                        daten += 'var ' + this.output[0].ausgang + ' = ';
                        daten += 'month[d.getMonth()];'
                    } else if (PRG.fbs[fbs]["value"] == "roh") {
                        daten += 'var ' + this.output[0].ausgang + ' = ';
                        daten += 'Date.now();'
                    }

                    daten += "";
                    Compiler.script += daten;
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "trigvalue") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.newState.value;';
                }
                if (this["type"] == "trigtime") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.newState.timestamp;';
                }
                if (this["type"] == "trigoldvalue") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.oldState.value;';
                }
                if (this["type"] == "trigoldtime") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.oldState.timestamp;';
                }
                if (this["type"] == "trigid") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.id;';
                }
                if (this["type"] == "trigname") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.name;';
                }
                if (this["type"] == "trigchid") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.id;';
                }
                if (this["type"] == "trigchname") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.name;';
                }
                if (this["type"] == "trigchtype") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.type;';
                }
                if (this["type"] == "trigchfuncIds") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.funcIds;';
                }
                if (this["type"] == "trigchroomIds") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.roomIds;';
                }
                if (this["type"] == "trigchfuncNames") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.funcNames;';
                }
                if (this["type"] == "trigchroomNames") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.roomNames;';
                }
                if (this["type"] == "trigdevid") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.device.id;';
                }
                if (this["type"] == "trigdevname") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.device.name;';
                }
                if (this["type"] == "trigdevtype") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= data.device.type;';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "oder") {
                    var n = this["input"].length;
                    Compiler.script += 'if(';
                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft + ' == true';
                        if (index + 1 < n) {
                            Compiler.script += ' || ';
                        }
                    });
                    Compiler.script += '){var ' + this.output[0].ausgang + ' = true;}else{var ' + this.output[0].ausgang + ' = false;}'
                }
                if (this["type"] == "und") {
                    var n = this["input"].length;
                    Compiler.script += 'if(';
                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft + ' == true';
                        if (index + 1 < n) {
                            Compiler.script += ' && ';
                        }
                    });
                    Compiler.script += '){var ' + this.output[0].ausgang + ' = true;}else{var ' + this.output[0].ausgang + ' = false;}'
                }
                if (this["type"] == "verketten") {
                    var n = this["input"].length;

                    this["input"].sort(SortByEingang);
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ';
                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft;
                        if (index + 1 < n) {
                            Compiler.script += ' + ';
                        }
                    });
                    Compiler.script += ';';
                }
                if (this["type"] == "timespan") {
                    Compiler.script += 'var now = new Date(); \
                    var time1 = new Date();\
                    var time2 = new Date();\
                    var in1 = ' + this["input"][0]["herkunft"] + ';\
                    var in2 = ' + this["input"][1]["herkunft"] + ';\
                    var double1 = in1.split(" ");\
                    var double2 = in2.split(" ");\
\
                    var time;\
                    var date1;\
                    var date2;\
\
                    if (double1[1]) {\
                        time = double1[1].split(":");\
                        date1 = double1[0].split(".");\
                        date2 = double1[0].split("-");\
                    } else {\
                        time = in1.split(":");\
                        date1 = in1.split(".");\
                        date2 = in1.split("-");\
                    }\
\
                    if (time.length == 2) {\
                        time1.setHours(time[0]);\
                        time1.setMinutes(time[1]);\
                    }\
\
                    if (time.length == 3) {\
                        time1.setHours(time[0]);\
                        time1.setMinutes(time[1]);\
                        time1.setSeconds(time[2]);\
                    }\
\
                    if (date2.length == 3) {\
                        if (date2[0].length == 4) {\
                            time1.setFullYear(date2[0]);\
                        } else {\
                            time1.setFullYear("20" + date2[0]);\
                        }\
                        time1.setMonth(date2[1] - 1);\
                        time1.setDate(date2[2]);\
                    }\
\
                    if (date1.length == 3) {\
                        if (date1[0].length == 4) {\
                            time1.setFullYear(date1[2]);\
                        } else {\
                            time1.setFullYear("20" + date1[2]);\
                        }\
                        time1.setMonth(date1[1] - 1);\
                        time1.setDate(date1[0]);\
                    }\
\
                    if (double2[1]) {\
                        time = double2[1].split(":");\
                        date1 = double2[0].split(".");\
                        date2 = double2[0].split("-");\
                    } else {\
                        time = in2.split(":");\
                        date1 = in2.split(".");\
                        date2 = in2.split("-");\
                    }\
\
                    if (time.length == 2) {\
                        time2.setHours(time[0]);\
                        time2.setMinutes(time[1]);\
                    }\
\
                    if (time.length == 3) {\
                        time2.setHours(time[0]);\
                        time2.setMinutes(time[1]);\
                        time2.setSeconds(time[2]);\
                    }\
\
                    if (date2.length == 3) {\
                        if (date2[0].length == 4) {\
                            time1.setFullYear(date2[0]);\
                        } else {\
                            time1.setFullYear("20" + date2[0]);\
                        }\
                        time2.setMonth(date2[1] - 1);\
                        time2.setDate(date2[2]);\
                    }\
\
                    if (date1.length == 3) {\
                        if (date1[0].length == 4) {\
                            time2.setFullYear(date1[2]);\
                        } else {\
                            time2.setFullYear("20" + date1[2]);\
                        }\
                        time2.setMonth(date1[1] - 1);\
                        time2.setDate(date1[0]);\
                    }\
\
                    if (time1.valueOf() < now.valueOf() && time2.valueOf() > now.valueOf()) {\
                        var ' + this.output[0].ausgang + ' = true;\
                    }else{\
                        var ' + this.output[0].ausgang + ' = false;\
                  }';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "not") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = !' + this["input"][0]["herkunft"] + ';';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "inc") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ' + this["input"][0]["herkunft"] + '+1;';
                }
                if (this["type"] == "dec") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ' + this["input"][0]["herkunft"] + '-1;';
                }
                if (this["type"] == "summe") {
                    var n = this["input"].length;
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ';

                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft;
                        if (index + 1 < n) {
                            Compiler.script += ' + ';
                        }
                    });
                    Compiler.script += ';';
                }
                if (this["type"] == "differenz") {
                    var n = this["input"].length;
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ';

                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft;
                        if (index + 1 < n) {
                            Compiler.script += ' - ';
                        }
                    });
                    Compiler.script += ';';
                }
                if (this["type"] == "round") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = Math.round( ' + this["input"][0]["herkunft"] + ' * Math.pow(10, ' + PRG.fbs[this.fbs_id]["value"] + ')) / Math.pow(10, ' + PRG.fbs[this.fbs_id]["value"] + ');';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "toint") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = parseInt(' + this["input"][0]["herkunft"] + ');';
                }
                if (this["type"] == "tofloat") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = parseFloat(' + this["input"][0]["herkunft"] + '.toString().replace("," , "."));';
                }
                if (this["type"] == "tostring") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = ' + this["input"][0]["herkunft"] + '.toString();';
                }
                if (this["type"] == "toh") {
                    Compiler.script += 'var ' + this.output[0].ausgang + ' = parseFloat(' + this["input"][0]["herkunft"] + '/10/60/60);';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "next") {
                    var targets = "";
                    $.each(this.target, function () {
                        //TODO REMOVE DELAY
//                        if (this[1] == 0) {
                        targets += this[0] + "(data);"
//                        } else if (sim) {
//                            targets += 'setTimeout(function(){simout("' + $fbs + '","run"); ' + this[0] + '(data)},' + this[1] * 1000 + ');';
//                        } else {
//                            targets += 'setTimeout(function(){ ' + this[0] + '(data)},' + this[1] * 1000 + ');';
//                        }

                    });
                    Compiler.script += targets;
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "next1") {
                    var targets = "";
                    var $this = this;

                    $.each(this.target, function () {
                        //TODO REMOVE DELAY
//                        if (this[1] == 0) {
                        targets += "if(" + $this["input"][0].herkunft + " == true){" + this[0] + " (data);}";
//                        } else
//                            targets += "if(" + $this["input"][0].herkunft + " == true){setTimeout(function(data){ " + this[0] + "()}," + this[1] * 1000 + ");}"
                    });
                    Compiler.script += targets;
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "wenn") {
                    this["input"].sort(SortByEingang);
                    Compiler.script += 'if(' + this["input"][0].herkunft + ' ' + PRG.fbs[this.fbs_id]["value"] + ' ' + this["input"][1].herkunft + '){var ' + this.output[0].ausgang + ' = true;}else{var ' + this.output[0].ausgang + ' = false;}';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "expert") {

                    this["input"].sort(SortByEingang);

                    $.each(this["input"], function (id) {
                        Compiler.script += 'var in' + (id + 1) + ' = ' + this.herkunft + ' ;';
                    });
                    $.each(this["output"], function (id) {
                        Compiler.script += 'var out' + (id + 1) + ' = 0 ;';
                    });

                    if (PRG.fbs[this.fbs_id]["value"] != 0) {
                        Compiler.script += PRG.fbs[this.fbs_id]["value"] + "";
                    }

                    this["output"].sort(function (a, b) {
                        return a.ausgang > b.ausgang;
                    });

                    var last = "";
                    var index = 0;
                    $.each(this["output"], function () {
                        if (this.ausgang != last) {
                            last = this.ausgang;
                            index++;
                            Compiler.script += 'var ' + this.ausgang + ' = out' + (index) + ' ;';
                        }
                    });
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "linput") {
                    Compiler.script += 'var ' + this.output[0].ausgang + '= regaObjects[' + this.hmid + ']["Channels"];';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfdevice") {

                    var data = "";
                    for (var i = 0; i < this.hmid.length; i++) {
                        data += 'regaObjects[regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"]]["HssType"] == "' + this.hmid[i] + '" ';

                        if (i + 1 < this.hmid.length) {
                            data += '|| '
                        }
                    }

                    Compiler.script += 'var ' + this.output[0].ausgang + '= [];';
                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += '  if(regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"] != undefined){;';
                    Compiler.script += '    if (' + data + '){';
                    Compiler.script += ' ' + this.output[0].ausgang + '.push(' + this["input"][0].herkunft + '[i]);';
                    Compiler.script += '    }';
                    Compiler.script += '    }';
                    Compiler.script += '}';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfchannel") {

                    var data = "";
                    for (var i = 0; i < this.hmid.length; i++) {
                        data += 'regaObjects[' + this["input"][0].herkunft + '[i]]["ChnLabel"] == "' + this.hmid[i] + '" ';
                        if (i + 1 < this.hmid.length) {
                            data += '|| '
                        }
                    }

                    Compiler.script += 'var ' + this.output[0].ausgang + '= [];';
                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += '    if (' + data + '){';
                    Compiler.script += ' ' + this.output[0].ausgang + '.push(' + this["input"][0].herkunft + '[i]);';
                    Compiler.script += '    }';
                    Compiler.script += '};';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfdp") {

                    var data = "";
                    for (var i = 0; i < this.hmid.length; i++) {
                        data += 'property == "' + this.hmid[i] + '" ';
                        if (i + 1 < this.hmid.length) {
                            data += '|| '
                        }
                    }

                    Compiler.script += 'var ' + this.output[0].ausgang + '= [];';
                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += 'var _dp = regaObjects[' + this["input"][0].herkunft + '[i]]["DPs"]';
                    Compiler.script += '    for(var property in _dp){';
                    Compiler.script += '        if(' + data + '){';
                    Compiler.script += '        ' + this.output[0].ausgang + '.push(_dp[property])';
                    Compiler.script += '        }';
                    Compiler.script += '    }';
                    Compiler.script += '};';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfwert") {
                    Compiler.script += 'var _out1 = [];';
                    Compiler.script += 'var _out2 = [];';
                    Compiler.script += 'var _out3 = [];';

                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += 'if (regaObjects[' + this["input"][0].herkunft + '[i]]["ValueType"] == 4){';
                    Compiler.script += ' var val = getState(' + this["input"][0].herkunft + '[i]).toFixed(1) ';
                    Compiler.script += '}else{';
                    Compiler.script += ' var val = getState(' + this["input"][0].herkunft + '[i]) ';
                    Compiler.script += '}';
                    Compiler.script += '    if(val ' + PRG.fbs[this.fbs_id]["opt"] + ' ' + PRG.fbs[this.fbs_id]["opt2"].toString() + '  || ' + PRG.fbs[this.fbs_id]["opt2"].toString() + ' == ""){';
                    Compiler.script += '    _out1.push(val.toString());';
                    Compiler.script += '    _out2.push(regaObjects[regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"]].Name);';
                    Compiler.script += '    _out3.push(regaObjects[regaObjects[regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"]]["Parent"]].Name);';
                    Compiler.script += '    }';

                    this["output"].sort(function (a, b) {
                        return a.ausgang > b.ausgang;
                    });

                    var last = "";
                    var index = 0;
                    var id = this.fbs_id;
                    $.each(this["output"], function () {
                        if (this.ausgang != last) {
                            last = this.ausgang;
                            index++;
                            Compiler.script += '    ' + this.ausgang + ' = _out' + index + '.join("' + PRG.fbs[id]["opt3"] + '");';
                        }
                    });
                    Compiler.script += '}';
                }

                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

                if (sim && this.output.length > 0) {
                    $.each(this.output, function () {
                        Compiler.script += 'simout("' + this.ausgang + '",' + this.ausgang + ');';
                    });
                }
                if (sim && this.output.length > 0 && this.force != undefined) {
                    var force = this.force;
                    $.each(this.output, function () {

                        if (force != undefined && this.force != NaN) {
                            if (force == "true") {
                                Compiler.force += 'var ' + this.ausgang + '_force = 1;';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            } else if (force == "false") {
                                Compiler.force += 'var ' + this.ausgang + '_force = 0;';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            } else if (isNaN(force)) {
                                Compiler.force += 'var ' + this.ausgang + '_force ="' + force + '";';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            } else {
                                Compiler.force += 'var ' + this.ausgang + '_force =' + parseInt(force) + ';';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            }
                        }
                    });
                }
                if (sim && this.output.length > 0 && ( this.force == undefined || this.force == NaN  )) {
                    $.each(this.output, function () {
                        Compiler.force += 'var ' + this.ausgang + '_force = undefined ;';
                        Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force || ' + this.ausgang + ';';

                    });
                }
            });
            Compiler.script += '};\n';
        });

        Compiler.force += Compiler.script;
        Compiler.script = Compiler.force;
        return (Compiler.script);
    }
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
        // Lade Theme XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        theme = storage.get("ScriptGUI_Theme");
        if (theme == undefined) {
            theme = "dark-hive"
        }
        $("#theme_css").remove();
        $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui.min.css"/>');

        // Lade ID Select XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//        idjs = storage.get("ScriptGUI_idjs");
//        if (idjs == undefined) {
//            idjs = "new"
//        }
//
//        $("head").append('<script id="id_js" type="text/javascript" src="js/hmSelect_' + idjs + '.js"></script>');
//

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
        $(document).tooltip();


        SGI.Setup();

    });
})(jQuery);

