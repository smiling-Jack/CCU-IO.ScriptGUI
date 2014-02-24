/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */

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

    file_name: "",
    prg_store: "www/ScriptGUI/prg_Store/",
    example_store: "www/ScriptGUI/example/",
    key: "",
    plumb_inst: {
        inst_mbs: undefined
    },

    Setup: function () {
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
                Connector: "State Machine"
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


        // slider XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        SGI.scrollbar_h("init", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_h"), 50);
        SGI.scrollbar_v("init", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_v"), 50);
        SGI.scrollbar_v("init", $("#toolbox_body"), $(".toolbox"), $("#scroll_bar_toolbox"), 100);


        $('#prg_body').on('mousewheel', function (event, delta) {

            if (SGI.key.toString() == 88) {
                var ist = $("#scroll_bar_h").slider("option", "value");
                if (ist > 100) {
                    $("#scroll_bar_h").slider("option", "value", 100)
                } else if (ist < 0) {
                    $("#scroll_bar_h").slider("option", "value", 0)
                } else {
                    $("#scroll_bar_h").slider("option", "value", ist + delta * 3)
                }

            } else {
                ist = $("#scroll_bar_v").slider("option", "value");
                if (ist > 100) {
                    $("#scroll_bar_v").slider("option", "value", 100)
                } else if (ist < 0) {
                    $("#scroll_bar_v").slider("option", "value", 0)
                } else {
                    $("#scroll_bar_v").slider("option", "value", ist + delta * 3)
                }
            }
        });

        // Toolbox XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $(".toolbox").hide();


        var box_init = storage.get(SGI.str_tollbox) || ["Allgemain", "alg"];
        // Make btn Toolboxauswahl
        $("#toolbox_select").xs_combo({
            addcssButton: "xs_button_toolbox",
            addcssMenu: "xs_menu_toolbox",
            addcssFocus: "xs_focus_toolbox",
            cssText: "xs_text_toolbox",
            time: 750,
            val: box_init[0],
            data: [
                "Allgemein",
                "Programme",
                "Logic",
                "Listen Filter",
                "Get Set Var",
                "Singel Trigger",
                "Zeit Trigger",
                "Trigger Daten"
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
//            if(val ==""){box = ""}
//            if(val ==""){box = ""}
//            if(val ==""){box = ""}
//            if(val ==""){box = ""}
            $(".toolbox").hide();
            $("#toolbox_" + box).show();
            storage.set(SGI.str_tollbox, [val, box]);
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
                    left: parseInt(ui.offset.left + (65 - (w / 2))),
                    top: parseInt(ui.offset.top - 50)
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
                    left: parseInt(ui.offset.left + (65 - (w / 2))),
                    top: parseInt(ui.offset.top - 50)
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
                        top: parseInt((ui["offset"]["top"] - $("#prg_panel").offset().top + 42) / SGI.zoom),
                        left: parseInt((ui["offset"]["left"] - $("#prg_panel").offset().left + 8 ) / SGI.zoom)
                    };

                    SGI.add_mbs_element(data);
                }
            }
        });

        SGI.menu_iconbar();
        SGI.context_menu();
        SGI.quick_help();
        SGI.select_mbs();
        SGI.select_fbs();

        $(document).keydown(function (event) {

            console.log(event.keyCode);
            SGI.key = event.keyCode;
            if (SGI.key == 17) {
                $("body").css({cursor: "help"});
            } else if (event.ctrlKey) {
                $("body").css({cursor: "help"});
                SGI.key = 17;
            } else if (SGI.key == 46) {
                SGI.del_selected()
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

    scrollbar_h: function (init, scrollPane_h, scroll_content, scroll_bar_h, value) {

        //scrollpane parts
        var scrollPane = scrollPane_h,
            scrollContent = scroll_content;
        //build slider
        if (init != "init") {
            var scrollbar = scroll_bar_h
        } else {
            scrollbar = scroll_bar_h.slider({
                slide: function (event, ui) {
                    if (scrollContent.width() > scrollPane.width()) {
                        scrollContent.css("margin-left", Math.round(
                            ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
                        ) + "px");
                    } else {
                        scrollContent.css("margin-left", 0);
                    }
                },
                change: function (event, ui) {
                    if (scrollContent.width() > scrollPane.width()) {
                        scrollContent.css("margin-left", Math.round(
                            ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
                        ) + "px");
                    } else {
                        scrollContent.css("margin-left", 0);
                    }
                }
            });

            //append icon to handle
            var handleHelper = scrollbar.find(".ui-slider-handle")
                .mousedown(function () {
                    scrollbar.width(handleHelper.width());
                })
                .mouseup(function () {
//                    scrollbar.width("100%");
                })
                .append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>")
                .wrap("<div class='ui-handle-helper-parent'></div>").parent();
            //change overflow to hidden now that slider handles the scrolling
            scrollPane.css("overflow", "hidden");
        }

        //size scrollbar and handle proportionally to scroll distance
        function sizeScrollbar_h() {
            var remainder = scrollContent.width() - scrollPane.width();
            var proportion = remainder / scrollContent.width();
            var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
            scrollbar.find(".ui-slider-handle").css({
                width: handleSize,
                height: "10px",
                "margin-left": (-handleSize / 2) + 2,
                "margin-top": 0
            });

            $(scroll_bar_h).width(parseInt($(scrollbar.parent()).width() - handleSize - 4));
            $(scroll_bar_h).css({left: parseInt(handleSize / 2) + "px"});
        }

        //reset slider value based on scroll content position
        function resetValue_h() {
            var remainder = scrollPane.width() - scrollContent.width();
            var leftVal = scrollContent.css("margin-left") === "auto" ? 0 :
                parseInt(scrollContent.css("margin-left"));
            var percentage = Math.round(leftVal / remainder * 100);
            scrollbar.slider("value", percentage);
        }

        //if the slider is 100% and window gets larger, reveal content
        function reflowContent_h() {
            var showing = scrollContent.width() + parseInt(scrollContent.css("margin-left"), 10);
            var gap = scrollPane.width() - showing;
            if (gap > 0) {
                scrollContent.css("margin-left", parseInt(scrollContent.css("margin-left"), 10) + gap);
            }
        }

        //change handle position on window resize
        $(window).resize(function () {

            setTimeout(function () {             // TODO Timout wegen der Maximate dauer
                resetValue_h();
                sizeScrollbar_h();
                reflowContent_h();

            }, 300);
        });


        //init scrollbar size
        setTimeout(sizeScrollbar_h, 100);//safari wants a timeout

        if (init == "init") {
            $(scroll_bar_h).slider("value", value);
        }
    },

    scrollbar_v: function (init, scrollPane_v, scroll_content, scroll_bar_v, value) {

        //scrollpane parts
        var scrollPane = scrollPane_v,
            scrollContent = scroll_content;
        //build slider
        if (init != "init") {
            var scrollbar = scroll_bar_v
        } else {
            scrollbar = scroll_bar_v.slider({
                orientation: "vertical",
                slide: function (event, ui) {
                    if (scrollContent.height() > scrollPane.height()) {
                        scrollContent.css("margin-top", Math.round(
                            (100 - ui.value) / 100 * ( scrollPane.height() - scrollContent.height() )
                        ) + "px");

                    } else {
                        scrollContent.css("margin-top", 0);

                    }
                },
                change: function (event, ui) {
                    if (scrollContent.height() > scrollPane.height()) {
                        scrollContent.css("margin-top", Math.round(
                            (100 - ui.value) / 100 * ( scrollPane.height() - scrollContent.height() )
                        ) + "px");

                    } else {
                        scrollContent.css("margin-top", 0);

                    }
                }
            });

            //append icon to handle
            var handleHelper = scrollbar.find(".ui-slider-handle")
                .mousedown(function () {
                    scrollbar.height(handleHelper.height());
                })
                .mouseup(function () {
                    scrollbar.height(handleHelper.height());
                })
                .append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>")
                .wrap("<div class='ui-handle-helper-parent'></div>").parent();
            //change overflow to hidden now that slider handles the scrolling
            scrollPane.css("overflow", "hidden");
        }
        //size scrollbar and handle proportionally to scroll distance
        function sizeScrollbar_v() {

            var remainder = scrollContent.height() - scrollPane.height();
            var proportion = remainder / scrollContent.height();
            var handleSize = scrollPane.height() - ( proportion * scrollPane.height() );

            scrollbar.find(".ui-slider-handle").css({

                height: handleSize,
                width: "10px",
                "margin-bottom": (-handleSize / 2) - 4,
                "margin-left": "-6.5px"
            });

            $(scroll_bar_v).height(parseInt($(scrollbar.parent()).height() - handleSize - 4));
            $(scroll_bar_v).css({top: parseInt(handleSize / 2) + "px"});
            $(scroll_bar_v).find(".ui-icon").css({top: parseInt(handleSize / 2) - 8 + "px"});

        }

        //reset slider value based on scroll content position
        function resetValue_v() {

            var remainder = scrollPane.height() - scrollContent.height();
            var topVal = scrollContent.css("margin-top") === "auto" ? 0 :
                parseInt(scrollContent.css("margin-top"));

            var percentage = Math.round(topVal / remainder * 100);
            scrollbar.slider("value", 100 - percentage);
        }

        //if the slider is 100% and window gets larger, reveal content
        function reflowContent_v() {
            var showing = scrollContent.height() + parseInt(scrollContent.css("margin-top"), 10);
            var gap = scrollPane.height() - showing;
            if (gap > 0) {
                scrollContent.css("margin-top", parseInt(scrollContent.css("margin-top"), 10) + gap);
            }
        }

        //change handle position on window resize
        $(window).resize(function () {
            $(scroll_bar_v).find("a").css({"background-image": "url(css/" + theme + "/images/scrollbar_r.png",
                backgroundRepeat: "repeat"});

            setTimeout(function () {             // TODO Timout wegen der Maximate dauer
                resetValue_v();
                sizeScrollbar_v();
                reflowContent_v();

            }, 300);
        });


        //init scrollbar size
        setTimeout(sizeScrollbar_v, 100);//safari wants a timeout


        $(scroll_bar_v).find(".ui-icon").css({
            "transform": "rotate(90deg)",
            "-ms-transform": "rotate(90deg)",
            "-webkit-transform": "rotate(90deg)",
            left: "-2px"
        });


        $(scroll_bar_v).find("a").css({"background-image": "url(css/" + theme + "/images/scrollbar_r.png)",
            backgroundRepeat: "repeat"});

        if (init == "init") {
            $(scroll_bar_v).slider("value", value);
        }
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
                    y1 = e.pageY - 50;
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
                y2 = e.pageY - 50;

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


            if ($(e.target).is(".prg_codebox")) {
                // not stuff in here

                selection_codebox = this;
                x = $(this).width();
                y = $(this).height();

                selection_fbs = true;
                // store mouseX and mouseY
                x1 = e.pageX-2;
                y1 = e.pageY - 50-2;
                x2 = e.pageX-2;
                y2 = e.pageY - 50-2;

            }
        });

        // If selection is true (mousedown on selection frame) the mousemove
        // event will draw the selection div
        $("body").mousemove(function (e) {

            if (selection_fbs) {
                if (!selection_start) {
                    $(".fbs_element").removeClass("fbs_selected");
                    $(".mbs_element").removeClass("mbs_selected");
                    selection_start = true;
                }
                // Store current mouseposition
                x2 = e.pageX;
                y2 = e.pageY - 50;

                if (x2 > ($(selection_codebox).parent().offset().left + x)) {
                    x2 = $(selection_codebox).parent().offset().left + x+2;
                }
                if (x2 < ($(selection_codebox).parent().offset().left)) {
                    x2 = $(selection_codebox).parent().offset().left -2;
                }
                if (y2 > ($(selection_codebox).parent().offset().top + y - 50)) {
                    y2 = $(selection_codebox).parent().offset().top + y - 50+2;
                }
                if (y2 < ($(selection_codebox).parent().offset().top - 50)) {
                    y2 = $(selection_codebox).parent().offset().top - 50-2;
                }

                // Prevent the selection div to get outside of your frame
                //(x2+this.offsetleft < 0) ? selection = false : ($(this).width()+this.offsetleft < x2) ? selection = false : (y2 < 0) ? selection = false : ($(this).height() < y2) ? selection = false : selection = true;;
                // If the mouse is inside your frame resize the selection div
                if (selection_fbs) {
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
//       $('#prg_body,#selection').mouseup(function (e) {

        $('#prg_body,#selection').mouseup(function (e) {




            if (selection_fbs) {
                var fbs_element = $("#prg_panel").find(".fbs_selected");

                if (fbs_element.length > 0) {
                    if ($(e.target).attr("id") == "prg_panel" || $(e.target).is(".prg_codebox")) {

                        $.each(fbs_element, function () {
                            $(this).removeClass("fbs_selected");
                        });
                        $(".mbs_element").removeClass("mbs_selected");
                    }

                    $("#selection").hide();
                } else {
                    getIt();

                    $("#selection").hide();
                }
            }
            selection_fbs = false;
        });


        //Function for the select
        function getIt() {
            if (selection_fbs) {
                // Get all elements that can be selected
                $(".fbs_element").each(function () {
                    var p = $(this).offset();
                    // Calculate the center of every element, to save performance while calculating if the element is inside the selection rectangle
                    var xmiddle = p.left + $(this).width() / 2;
                    var ymiddle = (p.top - 50) + $(this).height() / 2;
                    if (matchPos(xmiddle, ymiddle)) {
                        // Colorize border, if element is inside the selection
                        $(this).addClass("fbs_selected");
                    }
                });
            }
        }

        function matchPos(xmiddle, ymiddle) {
            // If selection is done bottom up -> switch value
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
            var delay = this.delay;

            SGI.plumb_inst.inst_mbs.connect({
                uuids: [source],
                target: target
            });


            if (delay != 0 && delay != undefined) {
                var con = SGI.plumb_inst.inst_mbs.getConnections();
                SGI.add_delay(con.pop(), delay)
            }


        });

        $.each(data.connections.fbs, function (index) {
            $.each(this, function () {
                var source = this.pageSourceId;
                var target = this.pageTargetId;
                SGI.plumb_inst["inst_" + index].connect({uuids: [source, target]});
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

        var liste = data.liste;
        var parent = data.parent;
        var id = _id;
        var position = _position || "";
        var type = _type || "";


        var codebox = $("#" + parent).parent().attr("id");


        if (liste) {

            if (type == "input") {
                var endpointStyle = {fillStyle: "#bb55bb"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [0, 0.5, -1, 0, 0, -2],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    endpoint: [ "Rectangle", { width: 30, height: 10} ],
                    scope: "liste"
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "#660066"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [1, 0.5, 1, 0, 0, -2],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "#0000ff" },
                    scope: "liste"
                });
            }

        } else {

            if (type == "input") {
                var endpointStyle = {fillStyle: "#006600"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [0, 0.5, -1, 0, 0, -2],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    endpoint: [ "Rectangle", { width: 30, height: 10} ]
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "#FF9900"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                    anchor: [1, 0.5, 1, 0, 0, -2],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    endpoint: [ "Rectangle", { width: 20, height: 10} ],
                    connectorStyle: { lineWidth: 4, strokeStyle: "#00aaff" }
                });
            }

            if (position == "onborder") {

                endpointStyle = {fillStyle: "#006600"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString()}, {
                    anchor: "Right",
                    isTarget: true,
                    paintStyle: endpointStyle,
                    endpoint: [ "Rectangle", { width: 14, height: 14} ]
                });

                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
        }
        SGI.plumb_inst["inst_" + codebox].unbind("click")
        SGI.plumb_inst["inst_" + codebox].bind("click", function (c) {
            SGI.plumb_inst["inst_" + codebox].detach(c);
        });
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
                endpoint: [ "Rectangle", { width: 14, height: 14} ],
                connector: [ "Flowchart", { stub: 50, alwaysRespectStubs: true}  ],
                connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                maxConnections: -1
            });


        } else if (data.type != "komex" && data.type != "scriptobj" && data.type != "ccuobj" && data.type != "ccuobjpersi") {
            var endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id, { uuid: data.mbs_id }, {
//            filter:".ep",				// only supported by jquery
                anchor: [
                    [0.5, 1, 0, 1, 0, -3],
                    [1, 0.5, 1, 0, -3, -3],
                    [0.5, 0, 0, -1, 0, -3],
                    [0, 0.5, -1, 0, -3, -3]
                ],
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: [ "Dot", {radius: 10}],
                connector: [ "Flowchart", { stub: 50, alwaysRespectStubs: true} ],
                connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                maxConnections: -1
            });

        }

        SGI.plumb_inst.inst_mbs.unbind("click"),
            SGI.plumb_inst.inst_mbs.bind("click", function (c) {
                if (SGI.klick.target.tagName == "path") {
                    SGI.plumb_inst.inst_mbs.detach(c);
                }
            });

        SGI.plumb_inst.inst_mbs.unbind("contextmenu");
        SGI.plumb_inst.inst_mbs.bind("contextmenu", function (c) {
            SGI.con = c;
        });

        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

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
            Connector: "Flowchart",
            DropOptions: {tolerance: "touch" },
            Container: id,
            alwaysRespectStubs: true,
            stub: [50, 50]
        });

    },

    add_trigger_hmid: function (_this, type) {
        var $type = type;
        var $this = _this;


        $.id_select({
            type: "singel",
            close: function (hmid) {
                if (hmid != null) {
                    var _name = SGI.get_name(hmid);

                    PRG.mbs[$this.attr("id")]["hmid"].push(hmid);

                    if (PRG.mbs[$this.attr("id")]["name"][0] == "Rechtsklick") {
                        PRG.mbs[$this.attr("id")]["name"][0] = _name;
                    } else {
                        PRG.mbs[$this.attr("id")]["name"].push(_name);
                    }

                    if ($type == "val") {
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

                console.log(hmid)
                if (hmid != null) {

                    PRG.fbs[$this.attr("id")]["hmid"].push(hmid);
                    SGI.add_filter_device_name($this)
                }
            }
        });


    },

    add_filter_device_name: function ($this) {
        var add = ""

        $($this).find(".div_hmid_filter_font").remove();
        if (PRG.fbs[$($this).attr("id")]["hmid"].length > 0) {

            $.each(PRG.fbs[$($this).attr("id")]["hmid"], function () {
                var name = this
                add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_hmid_filter_font">Rechtsklick</div>';
        }

        $($this).find(".div_hmid_filter").append(add)

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_trigger_name_val: function ($this) {
        $($this).find(".div_hmid_val_body").remove();
        var add = "";
        $.each(PRG.mbs[$this.attr("id")]["name"], function (index) {

            var wert = PRG.mbs[$this.attr("id")]["wert"][index] || 0;

            add += '<div style="min-width: 100%" class="div_hmid_val_body">';
            add += '<div data-info="' + $this.attr("id") + '"  style="display:inline-block;float: left;" class="div_hmid_val">' + this + '</div>';
            add += '<div style="float: right; margin-left:5px; display: inline-block">';
            add += '<select  id="val_' + index + '" class="inp_val">';
            add += '    <option value="val">Gleich</option>';
            add += '    <option value="valNe">Ungleich</option>';
            add += '    <option value="valGt">Größer</option>';
            add += '    <option value="valGe">Größer =</option>';
            add += '    <option value="valLt">Kleiner</option>';
            add += '    <option value="valLe">Kleiner =</option>';
            add += '</select>';

            add += '<input class="inp_wert"  type=int value="' + wert + '" id="var_' + index + '">';
            add += '</div>';
            add += '</div>';
        });

        $($this).find(".div_hmid_trigger").append(add);

        $.each(PRG.mbs[$this.attr("id")]["name"], function (index) {

            var val = PRG.mbs[$this.attr("id")]["val"][index] || "val";
            $($this).find("#val_" + index).val(val)

        });

//        $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});

        $('.inp_val').change(function () {
            var index = $(this).attr("id").split("_")[1];

            PRG.mbs[$(this).parent().parent().parent().parent().attr("id")]["val"][index] = $(this).val();
        });

        $('.inp_wert').change(function () {
            var index = $(this).attr("id").split("_")[1];

            PRG.mbs[$(this).parent().parent().parent().parent().attr("id")]["wert"][index] = $(this).val();
        });

    },

    add_trigger_time: function ($this) {
        $($this).find(".div_hmid_font").remove();

        var add = "";
        $.each(PRG.mbs[$this.attr("id")]["time"], function (index) {
            add += '<div id="tr_ch_body_' + index + '" class="tr_ch_body">';
            add += '<input class="inp_time" type=int value="' + this + '" id="var_' + index + '">';
            add += '<select id="day_' + index + '" class="inp_day">';
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
        $($this).find(".div_hmid_trigger").append(add);


        $.each(PRG.mbs[$this.attr("id")]["day"], function (index) {

            $($this).find("#day_" + index).val(parseInt(this))

        });


//        $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});


        $('.inp_time').change(function () {
            var index = $(this).attr("id").split("_")[1];

            PRG.mbs[$(this).parent().parent().attr("id")]["time"][index] = $(this).val();
        });

        $('.inp_day').change(function () {
            var index = $(this).attr("id").split("_")[1];
            PRG.mbs[$(this).parent().parent().attr("id")]["day"][index] = $(this).val();
        });


    },

    add_trigger_astro: function ($this) {
        $($this).find(".div_hmid_font").remove();
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

            PRG.mbs[$(this).parent().parent().attr("id")]["minuten"][index] = $(this).val();
        });

        $('.inp_astro').change(function () {
            var index = $(this).attr("id").split("_")[1];
            PRG.mbs[$(this).parent().parent().attr("id")]["astro"][index] = $(this).val();
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

    get_eps_by_id: function (id) {
        var eps = [];
        $.each($("#" + id).find("[id*=in]"), function () {
            eps.push($(this).attr("id"));
        });
        $.each($("#" + id).find("[id*=out]"), function () {
            eps.push($(this).attr("id"));
        });
        eps.push(id);
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

                        ep_mbs.setAnchor([1, 0.5, 1, 0, 3, -3]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([0, 0.5, -1, 0, -7, -2]);
                        }
                    } else if ($this_left < 5) {
                        $($(this)).addClass("onborder_l")
                            .removeClass("onborder_b")
                            .removeClass("onborder_r")
                            .removeClass("onborder_t");
                        $(this).css({
                            top: (Math.min(dd.limit.bottom, Math.max(dd.limit.top, dd.offsetY)) / SGI.zoom) - (off.top / SGI.zoom)
                        });

                        ep_mbs.setAnchor([0, 0.5, -1, 0, -7, -2]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([1, 0.5, 1, 0, 3, -1]);
                        }
                    } else if ($this_top > ($this_p_height - $this_height)) {
                        $($(this)).addClass("onborder_b")
                            .removeClass("onborder_r")
                            .removeClass("onborder_l")
                            .removeClass("onborder_t");
                        $(this).css({
                            left: (Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX)) / SGI.zoom) - (off.left / SGI.zoom)
                        });

                        ep_mbs.setAnchor([0.5, 1, 0, 1, -2, 4])
                        if (ep_fbs) {
                            ep_fbs.setAnchor([0.5, 0, 0, -1, -2, -8]);
                        }
                    } else if ($this_top < 5) {
                        $($(this)).addClass("onborder_t")
                            .removeClass("onborder_b")
                            .removeClass("onborder_l")
                            .removeClass("onborder_r");
                        $(this).css({
                            left: (Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX)) / SGI.zoom) - (off.left / SGI.zoom)
                        });

                        ep_mbs.setAnchor([0.5, 0, 0, -1, -3, -8]);
                        if (ep_fbs) {
                            ep_fbs.setAnchor([0.5, 1, 0, 1, -3, 3]);
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
                    var id = $(this).parent().attr("id")
                    var top = parseInt($(this).parent().css("top"));
                    var left = parseInt($(this).parent().css("left"));

                    PRG.mbs[id].top = top;
                    PRG.mbs[id].left = left;
                    SGI.plumb_inst.inst_mbs.repaintEverything()

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
                    var id = $(this).attr("id")
                    var top = parseInt($(this).css("top"));
                    var left = parseInt($(this).css("left"));

                    PRG.mbs[id].top = top;
                    PRG.mbs[id].left = left;


                });
        }
    },

    make_mbs_drop: function () {

        $(".prg_codebox").droppable({
            accept: ".fbs",
            tolerance: "touch",
            drop: function (ev, ui) {

                if (ui["draggable"] != ui["helper"]) {

                    var data = {
                        parent: $(ev.target).attr("id"),
                        type: $(ui["draggable"][0]).attr("id"),
                        top: parseInt((ui["offset"]["top"] - $(ev.target).offset().top) + 30 / SGI.zoom),
                        left: parseInt((ui["offset"]["left"] - $(ev.target).offset().left) + 35 / SGI.zoom)
                    };
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
            var _delay = connection.getOverlay("delay");
            var delay = 0;
            if (_delay) {
                delay = $("#" + connection.id + "_delay").val();
            }
            PRG.connections.mbs.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId,
                delay: delay
            });
        });

        PRG.connections.fbs = {};
        $(".mbs_element_codebox").each(function () {

            var codebox = $(this).attr("id");
            PRG.connections.fbs[codebox] = {};

            var idx_alt = 0;
            $.each(SGI.plumb_inst["inst_" + codebox].getConnections(), function (idx, connection) {
                PRG.connections.fbs[codebox][idx] = {
                    connectionId: connection.id,
                    pageSourceId: connection.sourceId,
                    pageTargetId: connection.targetId
                };
                idx_alt = idx + 1
            });
            $.each(SGI.plumb_inst["inst_" + codebox].getConnections("liste"), function (idx, connection) {
                PRG.connections.fbs[codebox][idx + idx_alt] = {
                    connectionId: connection.id,
                    pageSourceId: connection.sourceId,
                    pageTargetId: connection.targetId
                };
            });
        });

        return PRG;

    },

    make_struc: function () {

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
                    hmid: PRG.fbs[$this.attr('id')]["hmid"]
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
                    $this.target.push([this.pageTargetId, this.delay]);

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
                            target.push([this.pageTargetId, this.delay]);

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
                this["target"] = target,
                    this["input"] = input;
                this["output"] = output;
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

        last_id = 100000;

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
        var p = [
            {ist: parseInt($("#" + data.fbs_id).css("left").split("px")[0]), t: "left"},
            {ist: parseInt($("#" + data.fbs_id).css("right").split("px")[0]), t: "right"},
            {ist: parseInt($("#" + data.fbs_id).css("top").split("px")[0]), t: "top"},
            {ist: parseInt($("#" + data.fbs_id).css("bottom").split("px")[0]), t: "bottom"}
        ];

        function SortByName(a, b) {
            var aName = a.ist;
            var bName = b.ist;
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        p.sort(SortByName);

        return p[0].t

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

    script: "",

    make_prg: function () {

        Compiler.trigger = "// Trigger\n";
        Compiler.obj = "// CCU.IO Objekte\n";
        Compiler.script = "";

        SGI.make_struc();

        $.each(PRG.struck.trigger, function () {
            var $trigger = this.mbs_id;

            var targets = "";
            $.each(this.target, function () {
                if (this[1] == 0) {
                    targets += " " + this[0] + "(data);\n"
                } else
                    targets += " setTimeout(function(){ " + this[0] + "(data)}," + this[1] * 1000 + ");\n"
            });


            if (PRG.mbs[$trigger].type == "trigger_valNe") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger = 'subscribe({id: ' + this + ' , valNe:false}, function (data){\n' + targets + ' }); \n' + Compiler.script;
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_event") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + '}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_EQ") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"eq"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_NE") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ne"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_GT") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"gt"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_GE") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ge"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_LT") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"lt"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_LE") {

                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"le"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_val") {

                $.each(PRG.mbs[$trigger].hmid, function (index) {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , ' + PRG.mbs[$trigger]["val"][index] + ':' + PRG.mbs[$trigger]["wert"][index] + '}, function (data){\n' + targets + ' }); \n'
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
                            day = "7";
                            break;
                        case "8":
                            day = "1-5";
                            break;
                        case "9":
                            day = "6-7";
                            break;

                    }
                    Compiler.trigger += 'schedule("' + m + ' ' + h + ' * * ' + day + '", function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_astro") {

                $.each(PRG.mbs[$trigger].astro, function (index) {

                    Compiler.trigger += 'schedule({astro:"' + this + '", shift:' + PRG.mbs[$trigger].minuten[index] + '}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_zykm") {

                Compiler.trigger += 'schedule(" */' + PRG.mbs[$trigger].time + ' * * * * ", function (data){\n' + targets + ' }); \n'

            }
            if (PRG.mbs[$trigger].type == "scriptobj") {

                Compiler.obj += 'var ' + PRG.mbs[$trigger].name + '; \n';

            }
            if (PRG.mbs[$trigger].type == "ccuobj") {

                Compiler.obj += 'setObject(' + PRG.mbs[$trigger].hmid + ', { Name: "' + PRG.mbs[$trigger]["name"] + '", TypeName: "VARDP"}); \n'

            }
            if (PRG.mbs[$trigger].type == "ccuobjpersi") {

                Compiler.obj += 'setObject(' + PRG.mbs[$trigger].hmid + ', { Name: "' + PRG.mbs[$trigger]["name"] + '", TypeName: "VARDP" , _persident:true}); \n'

            }
            if (PRG.mbs[$trigger].type == "trigger_start") {

                $.each(this.target, function () {
                    if (this[1] == 0) {
                        Compiler.trigger += " " + this[0] + "();\n"
                    } else
                        Compiler.trigger += " setTimeout(function(){ " + this[0] + "()}," + this[1] * 1000 + ");\n"
                });
            }
        });
        Compiler.script += Compiler.obj;
        Compiler.script += Compiler.trigger;
        Compiler.script += Compiler.start;

        Compiler.script += '\n';

        $.each(PRG.struck.codebox, function (idx) {
            Compiler.script += '//' + PRG.mbs[idx].titel + '\n';
            Compiler.script += 'function ' + idx + '(data){ \n';
            $.each(this[0], function () {
                    var $fbs = this.fbs_id;

                    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    if (this["type"] == "input") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= datapoints[' + PRG.fbs[$fbs].hmid + '][0];\n';
                    }
                    if (this["type"] == "output") {
                        Compiler.script += 'setState(' + this.hmid + ',' + this["input"][0]["herkunft"] + ');\n';
                    }
                    if (this["type"] == "debugout") {
                        Compiler.script += 'log("' + SGI.file_name + ' ' + PRG.fbs[$fbs]["parent"] + ' -> " + ' + this["input"][0]["herkunft"] + ');\n';
                    }
                    if (this["type"] == "mail") {
                        var n = this["input"].length;

                        function SortByName(a, b) {
                            var aName = a.eingang;
                            var bName = b.eingang;
                            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                        }

                        this["input"].sort(SortByName);
                        Compiler.script += 'email({to: ' + this["input"][0].herkunft + ',subject: ' + this["input"][1].herkunft + ',text: ' + this["input"][2].herkunft + '});\n';
                    }
                    if (this["type"] == "true") {
                        Compiler.script += 'var ' + this.output[0].ausgang + ' = true;\n';
                    }
                    if (this["type"] == "false") {
                        Compiler.script += 'var ' + this.output[0].ausgang + ' = false;\n';
                    }
                    if (this["type"] == "zahl") {
                        Compiler.script += 'var ' + this.output[0].ausgang + ' = ' + PRG.fbs[$fbs]["value"] + ' ;\n';
                    }
                    if (this["type"] == "string") {
                        var lines = PRG.fbs[$fbs]["value"].split("\n") || PRG.fbs[$fbs]["value"];
                        var daten = "";
                        $.each(lines, function () {
                            daten = daten + this.toString() + " ";
                        });
                        Compiler.script += 'var ' + this.output[0].ausgang + '= "' + daten.slice(0, -1) + '" ;\n';
                    }

                    if (this["type"] == "vartime") {
                        var d = new Date();
                        daten = "var d = new Date();\n";

                        if (PRG.fbs[$fbs]["value"] == "zeit_k") {
                            daten += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours()\n';
                            daten += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes()\n';

                            daten += 'var ' + this.output[0].ausgang + ' = h + ":" + m;\n';
                        } else if (PRG.fbs[$fbs]["value"] == "zeit_l") {
                            daten += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours()\n';
                            daten += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes()\n';
                            daten += 'var s = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds()\n';

                            daten += 'var ' + this.output[0].ausgang + ' = h + ":" + m + ":" + s;\n';

                        } else if (PRG.fbs[$fbs]["value"] == "date_k") {
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'd.getUTCDate() + "." + (d.getUTCMonth()+1) + "." + d.getFullYear();'

                        } else if (PRG.fbs[$fbs]["value"] == "date_l") {
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'd.getUTCDate() + "." + (d.getUTCMonth()+1) + "." + d.getFullYear() + " " + d.getHours().toString() + ":" + d.getMinutes().toString();'
                        } else if (PRG.fbs[$fbs]["value"] == "mm") {
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'd.getMinutes().toString();'

                        } else if (PRG.fbs[$fbs]["value"] == "hh") {
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'd.getHours().toString();'

                        } else if (PRG.fbs[$fbs]["value"] == "WD") {
                            daten += ' var weekday=new Array();\n';
                            daten += ' weekday[0]="Sontag";\n';
                            daten += ' weekday[1]="Montag";\n';
                            daten += ' weekday[2]="Dienstag";\n';
                            daten += ' weekday[3]="Mittwoch";\n';
                            daten += ' weekday[4]="Donnerstag";\n';
                            daten += ' weekday[5]="Freitag";\n';
                            daten += ' weekday[6]="Samstag";\n';
                            daten += 'var ' + this.output[0].ausgang + ' = ';

                            daten += 'weekday[d.getUTCDay()];'

                        } else if (PRG.fbs[$fbs]["value"] == "KW") {

                            daten += 'var KWDatum = new Date();\n';
                            daten += 'var DonnerstagDat = new Date(KWDatum.getTime() + (3-((KWDatum.getDay()+6) % 7)) * 86400000);\n';
                            daten += 'var KWJahr = DonnerstagDat.getFullYear();\n';
                            daten += 'var DonnerstagKW = new Date(new Date(KWJahr,0,4).getTime() +(3-((new Date(KWJahr,0,4).getDay()+6) % 7)) * 86400000);\n';
                            daten += 'var KW = Math.floor(1.5 + (DonnerstagDat.getTime() - DonnerstagKW.getTime()) / 86400000/7);\n';
                            daten += 'var ' + this.output[0].ausgang + ' = KW;\n';

                        } else if (PRG.fbs[$fbs]["value"] == "MM") {
                            daten += ' var month=new Array();\n';
                            daten += ' month[0]="Jannuar";\n';
                            daten += ' month[1]="Februar";\n';
                            daten += ' month[2]="März";\n';
                            daten += ' month[3]="April";\n';
                            daten += ' month[4]="Mai";\n';
                            daten += ' month[5]="Juni";\n';
                            daten += ' month[6]="Juli";\n';
                            daten += ' month[7]="August";\n';
                            daten += ' month[8]="September";\n';
                            daten += ' month[9]="Oktober";\n';
                            daten += ' month[10]="November";\n';
                            daten += ' month[11]="Dezember";\n';
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'month[d.getUTCMonth()];'

                        }
                        daten += "\n";

                        Compiler.script += daten;
                    }
                    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    if (this["type"] == "trigvalue") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.newState.value;\n';
                    }
                    if (this["type"] == "trigtime") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.newState.timestamp;\n';
                    }
                    if (this["type"] == "trigoldvalue") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.oldState.value;\n';
                    }
                    if (this["type"] == "trigoldtime") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.oldState.timestamp;\n';
                    }
                    if (this["type"] == "trigid") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.id;\n';
                    }
                    if (this["type"] == "trigname") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.name;\n';
                    }
                    if (this["type"] == "trigchid") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.id;\n';
                    }
                    if (this["type"] == "trigchname") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.name;\n';
                    }
                    if (this["type"] == "trigchtype") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.type;\n';
                    }
                    if (this["type"] == "trigchfuncIds") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.funcIds;\n';
                    }
                    if (this["type"] == "trigchroomIds") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.roomIds;\n';
                    }
                    if (this["type"] == "trigchfuncNames") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.funcNamese;\n';
                    }
                    if (this["type"] == "trigchroomNames") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.channel.roomNames;\n';
                    }
                    if (this["type"] == "trigdevid") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.device.id;\n';
                    }
                    if (this["type"] == "trigdevname") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.device.name;\n';
                    }
                    if (this["type"] == "trigdevtype") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= data.device.type;\n';
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
                        Compiler.script += '){\nvar ' + this.output[0].ausgang + ' = true;\n}else{\nvar ' + this.output[0].ausgang + ' = false;}\n'
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
                        Compiler.script += '){\nvar ' + this.output[0].ausgang + ' = true;\n}else{\nvar ' + this.output[0].ausgang + ' = false;}\n'
                    }
                    if (this["type"] == "verketten") {
                        var n = this["input"].length;

                        function SortByName(a, b) {
                            var aName = a.eingang;
                            var bName = b.eingang;
                            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                        }

                        this["input"].sort(SortByName);
                        Compiler.script += 'var ' + this.output[0].ausgang + ' = ';
                        $.each(this["input"], function (index, obj) {
                            Compiler.script += obj.herkunft;
                            if (index + 1 < n) {
                                Compiler.script += ' + ';
                            }
                        });
                        Compiler.script += ';\n';
                    }

                    if (this["type"] == "not") {
                        Compiler.script += 'var ' + this.output[0].ausgang + ' = !' + this["input"][0]["herkunft"] + '\n';
                    }
                    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    if (this["type"] == "next") {
                        var targets = "";
                        $.each(this.target, function () {
                            if (this[1] == 0) {
                                targets += this[0] + "();\n"
                            } else
                                targets += "setTimeout(function(){ " + this[0] + "()}," + this[1] * 1000 + ");\n"
                        });
                        Compiler.script += targets;
                    }
                    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    if (this["type"] == "next1") {
                        var targets = "";
                        var $this = this;

                        $.each(this.target, function () {
                            if (this[1] == 0) {
                                targets += "if(" + $this["input"][0].herkunft + " == true){" + this[0] + " ();}\n"
                            } else
                                targets += "if(" + $this["input"][0].herkunft + " == true){setTimeout(function(){ " + this[0] + "()}," + this[1] * 1000 + ");}\n"
                        });
                        Compiler.script += targets;
                    }
                    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    if (this["type"] == "wenn") {
                        Compiler.script += 'if(' + this["input"][0].herkunft + ' ' + PRG.fbs[this.fbs_id]["value"] + ' ' + this["input"][1].herkunft + '){\nvar ' + this.output[0].ausgang + ' = true;\n}else{\nvar ' + this.output[0].ausgang + ' = false;}\n';

                    }


                }
            )
            ;
            Compiler.script += '};\n\n';
        });
        return (Compiler.script);
    }
};

(function () {
    $(document).ready(function () {
        // Lade Theme XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        theme = storage.get("ScriptGUI_Theme");
        if (theme == undefined) {
            theme = "dark-hive"
        }
        $("#theme_css").remove();
        $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui-1.10.3.custom.min.css"/>');

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

                    $.each(obj, function (index) {

                    });
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
        SGI.Setup();

    });
})(jQuery);
