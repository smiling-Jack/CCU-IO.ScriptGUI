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

    str_theme: "ScriptGUI_Theme",
    str_settings: "ScriptGUI_Settings",
    str_prog: "ScriptGUI_Programm",

    file_name: "",
    prg_store: "www/ScriptGUI/prg_Store/",
    example_store: "www/ScriptGUI/example/",
    key: "",
    plumb_inst: {
        inst_mbs: undefined
    },

    Setup: function () {
        console.log("Start_Setup");

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


        $(document).keydown(function (event) {

            SGI.key = event.keyCode;
            if (SGI.key == 17) {
                $("body").css({cursor: "help"});
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

        // Make btn Toolboxauswahl
        $("#toolbox_select").multiselect({
            multiple: false,
            header: false,
            noneSelectedText: false,
            selectedList: 1,
            minWidth: 135
        });

        $("#toolbox_" + $("#toolbox_select").val()).show();

        // Toolboxauswahl
        $("#toolbox_select").change(function () {
            $(".toolbox").hide();
            $("#toolbox_" + $(this).val()).show();
        });

        // Toolboxauswahl Style
        $("#main").find("button.ui-multiselect").addClass("multiselect_toolbox");

        console.log("Finish_Setup");
        SGI.Main();
        SGI.menu_iconbar();
        SGI.context_menu();
        SGI.quick_help();
        SGI.select_mbs();
        SGI.select_fbs();

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
            console.log("Finish_Scrollbar_H init");
        } else {
            console.log("Finish_Scrollbar_H");
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
            console.log("Finish_Scrollbar_V init");
        } else {
            console.log("Finish_Scrollbar_V");
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
                x1 = e.pageX;
                y1 = e.pageY - 50;

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
                    x2 = $(selection_codebox).parent().offset().left + x;
                }
                if (x2 < ($(selection_codebox).parent().offset().left)) {
                    x2 = $(selection_codebox).parent().offset().left;
                }
                if (y2 > ($(selection_codebox).parent().offset().top + y - 50)) {
                    y2 = $(selection_codebox).parent().offset().top + y - 50;
                }
                if (y2 < ($(selection_codebox).parent().offset().top - 50)) {
                    y2 = $(selection_codebox).parent().offset().top - 50;
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

            selection_start = false;
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

    Main: function () {
        console.log("Start_Main");

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
                    left: ui.offset.left + (65 - (w / 2)),
                    top: ui.offset.top - 50
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
                console.log(w)
                $("body").find("#helper").css({
                    left: ui.offset.left + (65 - (w / 2)),
                    top: ui.offset.top - 50
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
                    console.log("add MBS");
                    var data = {
                        type: $(ui["draggable"][0]).attr("id"),
                        top: (ui["offset"]["top"] - $("#prg_panel").offset().top + 42) / SGI.zoom,
                        left: (ui["offset"]["left"] - $("#prg_panel").offset().left + 8 ) / SGI.zoom
                    };

                    SGI.add_mbs_element(data);
                }
            }
        });


        console.log("Finish_Main");
    },

    load_prg: function (data) {
        console.log("Start_load_prg");
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


        $.each(data.connections.mbs, function () {
            var source = this.pageSourceId;
            var target = this.pageTargetId;
            SGI.plumb_inst.inst_mbs.connect({uuids: [source], target: target});
        });

        $.each(data.connections.fbs, function (index) {
            $.each(this, function () {
                var source = this.pageSourceId;
                var target = this.pageTargetId;
                SGI.plumb_inst["inst_" + index].connect({uuids: [source, target]});
            });
        });
    },

    add_mbs_element: function (_data) {
        console.log("Start_add_mbs");

        var data = {
            mbs_id: _data.mbs_id || _data.type + "_" + SGI.mbs_n,
            type: _data.type,
            hmid: _data.hmid || [],
            name: _data.name || ["Rechtsklick"],
            top: _data.top,
            left: _data.left,
            time: _data.time || ["00:00"],
            minuten: _data.minuten || [0],
            astro: _data.astro || ["sunrise"],
            day: _data.day || ["88"],
            val: _data.val || [],
            wert: _data.wert || [],
            width: _data.width,
            height: _data.height,
            counter: _data.counter || SGI.mbs_n,
            kommentar: _data.kommentar || "Kommentar",
            backcolor: _data.backcolor || "yellow",
            fontcolor: _data.fontcolor || "black",
            titel: _data.titel || "Programm"
        };

        SGI.mbs_n = data.counter;
        PRG.mbs[data.mbs_id] = data;

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "codebox") {

            $("#prg_panel").append('\
                             <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_codebox">\
                             <div mbs_id="' + data.mbs_id + '" class="titel_body">\
                             <input value="' + data.titel + '" type="text" id="titel_' + data.type + '_' + SGI.mbs_n + '" class="titel_codebox item_font">\
                             </div>\
                             <div mbs_id="' + data.mbs_id + '" class="titel_body titel_body_2"></div>\
                             <div id="prg_' + data.type + '_' + SGI.mbs_n + '" class="prg_codebox"></div>\
                            </div>');


            set_pos();
            set_size();
            SGI.add_codebox_inst(data.mbs_id);
            $('#titel_' + data.type + '_' + SGI.mbs_n).change(function () {
                PRG.mbs[data.mbs_id]["titel"] = $(this).val();
            });
            $('#prg_' + data.type + '_' + SGI.mbs_n).resizable({
                resize: function (event, ui) {

                    PRG.mbs[data.mbs_id]["width"] = ui.size.width;
                    PRG.mbs[data.mbs_id]["height"] = ui.size.height;

                    SGI.plumb_inst.inst_mbs.repaintEverything()
                }
            });
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "komex") {

            $("#prg_panel").append('\
                             <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_kommentar">\
                             <textarea class="komex">' + data.kommentar + '</textarea>\
                            </div>');
            set_pos();
            set_size_child();

            $('.komex').resize(function (ui, w, h) {
                PRG.mbs[$(this).parent().attr("id")]["width"] = w;
                PRG.mbs[$(this).parent().attr("id")]["height"] = h;
                SGI.plumb_inst.inst_mbs.repaintEverything()
            });
            $('.komex').change(function () {
                PRG.mbs[$(this).parent().attr("id")]["kommentar"] = $(this).val();
            });
            $('#' + data.type + '_' + SGI.mbs_n).css({"background-color": data.backcolor});
            $('#' + data.type + '_' + SGI.mbs_n).children().css({"color": data.fontcolor});

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_event") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger -- &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_EQ") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_NE") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_GT") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_GE") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_LT") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_LE") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_start") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_simpel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger Start</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" style="color: black; font-size: 12px; text-align: center" >Scriptengine Start\
                            </div>\
                        </div>');
            set_pos();

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_time") {
            $("#prg_panel").append('<div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_time">\
                <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Zeit</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            set_pos();
            SGI.add_trigger_time($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_astro") {
            $("#prg_panel").append('<div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_astro">\
                <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Astro</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger">\
                </div>\
            </div>');

            set_pos();
            SGI.add_trigger_astro($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_zykm") {
            if (data.time[0] == "00:00") {
                data.time = "0"
            }
            $("#prg_panel").append('<div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Zyklus M  &nbsp&nbsp&nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                 <input class="inp_peri" type=int value="' + data.time + '" id="var_' + SGI.mbs_n + '">\
                <a style="font-size: 13px;color: #000000">Minuten</a> \
                </div>\
            </div>');

            set_pos();
            $('#var_' + SGI.mbs_n).numberMask({type: 'float', beforePoint: 3, afterPoint: 2, decimalMark: '.'});
            $('#var_' + SGI.mbs_n).change(function () {
                PRG.mbs["trigger_zykm_" + $(this).attr("id").split("_")[1]]["time"] = parseFloat($(this).val());
            });
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_valNe") {

            $("#prg_panel").append('\
                        <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_singel">\
                            <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger ' + data.type.split("_")[1] + '</p>\
                                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                            </div>\
                            <div class="div_hmid_trigger" >\
                            </div>\
                        </div>');
            set_pos();
            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_val") {
            $("#prg_panel").append('<div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_val">\
                <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Wert</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            set_pos();
            SGI.add_trigger_name_val($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "ccuobj") {

            var id;
            console.log(PRG.mbs[data.mbs_id]["hmid"])

            if (PRG.mbs[data.mbs_id]["hmid"].length == 0) {
                id = SGI.get_lowest_obj_id();
                PRG.mbs[data.mbs_id]["hmid"] = id;
                data.hmid = id;
                homematic.regaObjects[id] = {"Name": "", "TypeName": "VARDP"}
            } else {
                id = PRG.mbs[data.mbs_id]["hmid"];
                homematic.regaObjects[id] = {"Name": data.name, "TypeName": "VARDP"}
            }

            if (PRG.mbs[data.mbs_id]["name"] == "Rechtsklick") {
                PRG.mbs[data.mbs_id]["name"] = "";
                data.name = "";
            }

            $("#prg_panel").append('<div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + SGI.mbs_n + '"  class="div_head" style="background-color: yellow">\
                    <p class="head_font">CCU.IO Objekt</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                <label  style="display:inline-block; font-size: 13px;color: #000000;width: 45px ">Name: </label><input class="inp_obj_name"  type=int value="' + data.name + '" id="name_' + data.hmid + '">\
                </div>\
            </div>');

            set_pos();

            $('.inp_obj_name').change(function () {
                PRG.mbs[data.mbs_id]["name"] = $(this).val();
                homematic.regaObjects[id].Name = $(this).val()
            });

        }

        function set_pos() {
            mbs = $("#" + data.mbs_id);
            mbs.css({"top": _data.top + "px", "left": _data.left + "px"});
        }

        function set_size() {
            mbs = $('#prg_' + data.type + '_' + SGI.mbs_n);
            mbs.css({"width": data.width + "px", "height": data.height + "px"});
        }

        function set_size_child() {
            console.log($("#" + data.mbs_id).children());
            mbs = $("#" + data.mbs_id).children();
            mbs.css({"width": data.width + "px", "height": data.height + "px"});
        }

        SGI.add_mbs_endpoint(data);
        SGI.make_mbs_drag(data);
        SGI.make_mbs_drop();
        SGI.mbs_n++;
    },

    add_fbs_element: function (_data) {
        var data = {
            parent: _data.parent,
            fbs_id: _data.fbs_id || _data.type + "_" + SGI.fbs_n,
            type: _data.type,
            hmid: _data.hmid || [],
            name: SGI.get_name(_data.hmid),
            value: _data.value || 0,
            input_n: _data.input_n || 2,
            counter: _data.counter || SGI.fbs_n,
            top: _data.top,
            left: _data.left,
            width: _data.width,
            height: _data.height
        };


        SGI.fbs_n = data.counter;
        PRG.fbs[data.fbs_id] = data;

        var input_data = "";
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "und") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="und_' + SGI.fbs_n + '_in' + i + '"  class="div_input und_' + SGI.fbs_n + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="und_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 und_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "oder") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="oder_' + SGI.fbs_n + '_in' + i + '"  class="div_input oder_' + SGI.fbs_n + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="oder_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 oder_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "not") {

            $("#" + data.parent).append('\
                             <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                  <div id="' + data.type + '_' + SGI.fbs_n + '_in"  class="div_input ' + data.type + '_' + SGI.fbs_n + '_in"><a class="input_font">IN</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 ' + data.type + '_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "verketten") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.type + '_' + SGI.fbs_n + '_in' + i + '"  class="div_input ' + data.type + '_' + SGI.fbs_n + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: orange">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 ' + data.type + '_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "input") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: yellow">\
                                    <p class="head_font_io">GET</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "true") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Wahr</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: green">\
                                    <p class="head_font_io">1</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "false") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Falsch</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: green">\
                                    <p class="head_font_io">0</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "zahl") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <input class="inp_var" type=int value="' + data.value + '" id="var_' + SGI.fbs_n + '">\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: darkviolet">\
                                    <p class="head_font_io">Zahl</p>\
                            </div>\
                        </div>');
            set_pos();
            $('#var_' + SGI.fbs_n).numberMask({type: 'float', beforePoint: 10, afterPoint: 2, decimalMark: '.'});
            $('#var_' + SGI.fbs_n).change(function () {
                PRG.fbs["zahl_" + $(this).attr("id").split("_")[1]]["value"] = parseFloat($(this).val());
            });

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "string") {

            if (data.value == 0 ){
                data.value = "";
            }

            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_string">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_out_string ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <textarea class="inp_text"  id="var_' + SGI.fbs_n + '">' + data.value + '</textarea>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right_string " style="background-color: orange">\
                                    <div style=" margin-top:50%" class="head_font_io_string">Text</div>\
                            </div>\
                        </div>');
            set_pos();


            $('#var_' + SGI.fbs_n).css({"width": data.width + "px", "height": data.height + "px"});


            $('#var_' + SGI.fbs_n).change(function () {


                PRG.fbs["string_" + $(this).attr("id").split("_")[1]]["value"] = $(this).val();

            });
            $('#var_' + SGI.fbs_n).resize(function (ui, w, h) {

                PRG.fbs[data.fbs_id]["width"] = w;
                PRG.fbs[data.fbs_id]["height"] = h;
                SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].repaintEverything();
            });


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "vartime") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_string">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_out_string ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <select id="time_' + data.fbs_id + '" class="inp_vartime">\
                                <option value="zeit_k">hh:mm</option>\
                                <option value="zeit_l">hh:mm:ss</option>\
                                <option value="date_k">TT:MM:JJ</option>\
                                <option value="date_l">TT:MM:JJ hh:mm</option>\
                                <option value="mm">Minute</option>\
                                <option value="hh">Stunde</option>\
                                <!--<option value="DD">Tag</option>--> \
                                <option value="KW">KW</option>\
                                <option value="WD">Wochentag (Text)</option>\
                                <option value="MM">Monat (Text)</option>\
                            </select>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right_string " style="background-color: orange">\
                                    <div style=" margin-top:50%" class="head_font_io_string">Zeit</div>\
                            </div>\
                        </div>');
            set_pos();

            if (data.value == 0) {
                data.value = "zeit"
            }

            $("#time_" + data.fbs_id).val(data.value);

            $('#time_' + data.fbs_id).change(function () {
                PRG.fbs[data.fbs_id]["value"] = $(this).val();
            });


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "output") {
            $("#" + data.parent).append('\
                        <div  id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.type + '_' + SGI.fbs_n + '_in" class="div_io_out output_' + SGI.fbs_n + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">SET</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                        </div>');
            set_pos();
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "mail") {


            $("#" + data.parent).append('\
                             <div id="mail_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: yellow">\
                                    <a class="head_font">Mail</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    <div id="mail_' + SGI.fbs_n + '_in1" style="height:27px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Empfänger</a></div>\
                                    <div id="mail_' + SGI.fbs_n + '_in2" style="height:27px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Betreff</a></div>\
                                    <div id="mail_' + SGI.fbs_n + '_in3" style="height:27px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Text</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "debugout") {
            $("#" + data.parent).append('\
                        <div  id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.type + '_' + SGI.fbs_n + '_in" class="div_io_out debugout_' + SGI.fbs_n + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">LOG</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">CCU.IO LOG</div>\
                        </div>');
            set_pos();
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigvalue") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Wert</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigtime") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Zeit</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigoldvalue") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">alter Wert</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigoldtime") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">alte Zeit</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigid") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst"> ID </div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigname") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Name</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchid") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal ID</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchname") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Name</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchtype") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Type</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchfuncIds") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Gewerk IDs</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchroomIds") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Raum IDs</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchfuncNames") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Gewerk Namen</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchroomNames") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Raum Namen</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "asd") {
            $("#" + data.parent).append('\
                        <div  id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_onborder fbs_element_next">\
                        </div>');
            set_pos();


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX







        function set_pos() {
            fbs = $("#" + data.fbs_id);
            fbs.css({"top": data.top + "px", "left": data.left + "px"});
        }

        var _in = $('.' + data.type + '_' + SGI.fbs_n + '_in');

        $.each(_in, function () {
            var id = $(this).attr("id");
            SGI.add_fbs_endpoint(id, "input", data.parent);
        });

        var _out = $('.' + data.type + '_' + SGI.fbs_n + '_out');
        $.each(_out, function () {
            var id = $(this).attr("id");
            SGI.add_fbs_endpoint(id, "output", data.parent);
        });

        SGI.make_fbs_drag(data);
        SGI.fbs_n++;
    },

    add_input: function (opt) {

        var id = $($(opt).attr("$trigger")).attr("id");

        var parent = PRG.fbs[id]["parent"];


        var n = id.split("_")[1];
        var type = id.split("_")[0];
        var index = $($("#" + id).find("[id^='left']")).children().length + 1;
        var add_id = type + '_' + n + '_in' + index + '';

        PRG.fbs[id].input_n = parseInt(index);


        $($("#" + id).find("[id^='left']")).append('\
                <div id="' + add_id + '"  class="div_input ' + type + '_' + n + '_in"><a class="input_font">IN ' + index + '</a></div>\
                ');

        SGI.add_fbs_endpoint(add_id, "input", parent);
        SGI.plumb_inst["inst_" + $("#" + parent).parent().attr("id")].repaintEverything();
    },

    add_fbs_endpoint: function (id, type, parent) {
        var codebox = $("#" + parent).parent().attr("id");


        if (type == "input") {
            var endpointStyle = {fillStyle: "green"};
            SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                anchor: "Left",
                isTarget: true,
                paintStyle: endpointStyle,
                endpoint: [ "Rectangle", { width: 30, height: 10} ]
            });
        }
        if (type == "output") {
            endpointStyle = {fillStyle: "orange"};
            SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), { uuid: id.toString() }, {
                anchor: "Right",
                isSource: true,
                maxConnections: -1,
                paintStyle: endpointStyle,
                stub: [10, 50],
                endpoint: [ "Rectangle", { width: 20, height: 10} ]
            });
        }

        SGI.plumb_inst["inst_" + codebox].bind("click", function (c) {
            SGI.plumb_inst["inst_" + codebox].detach(c);
        });
    },

    add_mbs_endpoint: function (data) {

        if (data.type == "codebox") {
            SGI.plumb_inst.inst_mbs.makeTarget(data.mbs_id, { uuid: data.mbs_id }, {
                dropOptions: { hoverClass: "dragHover" },
                anchor: ["Continuous",{faces:"right"}],
                endpoint: ["Dot", {radius: 2}]
            });

        } else if (data.type != "komex" && data.type != "ccuobj") {
            var endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id, { uuid: data.mbs_id }, {
//            filter:".ep",				// only supported by jquery
                anchor: [
                    [0.5, 1, 0, 0, 0, -3],
                    [1, 0.5, 0, 0, -3, -3],
                    [0.5, 0, 0, 0, 0, -3],
                    [0, 0.5, 0, 0, -3, -3]
                ],
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: [ "Dot", {radius: 10}],
                connector: [ "Flowchart", /*{ stub:30,alwaysRespectStubs:true}*/ ],
                connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
                maxConnections: -1
            });

        }

        SGI.plumb_inst.inst_mbs.bind("click", function (c) {
            console.log("mbs");
            SGI.plumb_inst.inst_mbs.detach(c);
        });

        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    add_codebox_inst: function (id) {



        SGI.plumb_inst["inst_" + id] = jsPlumb.getInstance({
            Endpoint: ["Dot", {radius: 2}],
            PaintStyle: { lineWidth: 4, strokeStyle: "blue" },
            HoverPaintStyle: {strokeStyle: "red", lineWidth: 4 },
           Connector: "Flowchart",
            DropOptions: {tolerance: "touch" },
            Container: id
        });

    },

    add_trigger_hmid: function (_this, type) {
        var $type = type;
        var $this = _this;

        if ($("#id_js").attr("src") == "js/hmSelect_new.js") {

            hmSelect.show(homematic, this.jControl, function (hmid, name) {
                var _name = SGI.get_name(hmid);


                PRG.mbs[$this.attr("id")]["hmid"].push(hmid);
                if (PRG.mbs[$this.attr("id")]["name"][0] == "Rechtsklick") {
                    PRG.mbs[$this.attr("id")]["name"][0] = _name;
                } else {
                    PRG.mbs[$this.attr("id")]["name"].push(_name);
                }

                if ($type == "val") {
                    console.log("test________________________")
                    SGI.add_trigger_name_val($this);
                } else {
                    // singel Trigger
                    console.log("test2___________________________")
                    SGI.add_trigger_name($this);
                }
                SGI.plumb_inst.inst_mbs.repaintEverything()

            });
        } else {

            hmSelect.show(homematic, this.jControl, function (obj, hmid) {
                var _name;
                if (homematic.regaObjects[hmid]["TypeName"] == "VARDP") {
                    _name = homematic.regaObjects[value]["Type"];
                } else {

                    var parent = homematic.regaObjects[hmid]["Parent"];
                    var parent_data = homematic.regaObjects[parent];

                    _name = parent_data.Name + "_" + homematic.regaObjects[value]["Type"];
                }

                PRG.mbs[$this.attr("id")]["hmid"].push(hmid);
                if (PRG.mbs[$this.attr("id")]["name"][0] == "Rechtsklick") {
                    PRG.mbs[$this.attr("id")]["name"][0] = _name;
                } else {
                    PRG.mbs[$this.attr("id")]["name"].push(_name);
                }
                if ($type == "val") {
                    console.log("test________________________")
                    SGI.add_trigger_name_val($this);
                } else {
                    // singel Trigger
                    console.log("test2___________________________")
                    SGI.add_trigger_name($this);
                }
                SGI.plumb_inst.inst_mbs.repaintEverything()

            });

        }


    },

    add_trigger_name: function ($this) {
        $($this).find(".div_hmid_font").remove();

        $.each(PRG.mbs[$this.attr("id")]["name"], function () {

            var add = '<div data-info="' + $this.attr("id") + '" class="div_hmid_font">' + this + '</div>';

            $($this).find(".div_hmid_trigger").append(add)

        });
    },

    add_trigger_name_val: function ($this) {
        console.log($($this).find(".div_hmid_val_body"));
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
            add += '</select><br>';
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
        console.log($this)

        var add = "";
        $.each(PRG.mbs[$this.attr("id")]["astro"], function (index) {

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
            add += '<label style="margin-left:10px; color: #000000; font-size: 13px">Shift:</label></label><input class="inp_min" type=int value="' + PRG.mbs[$this.attr("id")]["minuten"][index] + '" id="var_' + index + '"><br>';
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

    make_fbs_drag: function (data) {
        var old_left;
        var old_top;
        //Todo SGI.zoom faktor mit berücksichtigen

        $("#" + data.fbs_id).draggable({
//            grid:[20,20],
            distance: 5,
            alsoDrag: ".fbs_selected",
            containment: "#" + data.parent,
            snap: true,
            snapTolerance: 5,
            snapMode: "outer",
            start: function (event, ui) {
//                ui.position.left = 0;
//                ui.position.top = 0;

            },

            drag: function (event, ui) {

                var newLeft = ui.position.left  / SGI.zoom; // adjust new left by our zoomScale


                var newTop = ui.position.top / SGI.zoom; // adjust new top by our zoomScale

                if (ui.helper.hasClass("fbs_element_onborder")){

if (ui.position.left >  $(ui.helper.parent()).width()-ui.helper.width()|| ui.position.left == 0  ){

                    if (ui.position.left > $(ui.helper.parent()).width()-ui.helper.width()){
                        ui.position.left = ui.helper.parent().width() - ui.helper.width()-2 ;
                        ui.position.top = newTop-2;
                        old_left= ui.position.left;
                        old_top= ui.position.top;
                    }else  if (ui.position.left == 0){
                        ui.position.left = 0;
                        ui.position.top = newTop-2;
                        old_left= ui.position.left;
                        old_top= ui.position.top;
                    }else{
                        ui.position.left = old_left;
                        ui.position.top = old_top;
                    }
}

                    if (ui.position.top > $(ui.helper.parent()).height()-ui.helper.height()){
                        console.log("ajsdghaökng")
                        ui.position.top = ui.helper.parent().height() - ui.helper.height()-2 ;
                        ui.position.left = newLeft-2;
                        old_left= ui.position.left;
                        old_top= ui.position.top;
                    }else  if (ui.position.top == 0){
                        ui.position.top = 0;
                        ui.position.left = newLeft-2;
                        old_left= ui.position.left;
                        old_top= ui.position.top;
                    }else{
                        ui.position.left = old_left;
                        ui.position.top = old_top;
                    }

//}
                }else{

                ui.position.left = newLeft ;
                ui.position.top = newTop;
                }
                SGI.plumb_inst["inst_" + $(ui.helper).parent().parent().attr("id")].repaintEverything(); //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
            },
            stop: function (event, ui) {

                PRG.fbs[data.fbs_id]["left"] = ui.position.left;
                PRG.fbs[data.fbs_id]["top"] = ui.position.top;

                SGI.plumb_inst["inst_" + $(ui.helper).parent().parent().attr("id")].repaintEverything(); //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
            }
        });
    },

    make_mbs_drag: function (data) {
        //Todo SGI.zoom faktor mit berücksichtigen

        if (data.type == "codebox") {
            var start_left = 0;
            var start_self_left = 0;
            var start_top = 0;
            var start_self_top = 0;
            $(".titel_body").draggable({
//            grid:[20,20],
                distance: 5,
                alsoDrag: ".mbs_selected",

//            snap: true,
                start: function (event, ui) {
//
                    start_left = parseInt($(this).parent().css("left").split("px")[0]);
                    start_top = parseInt($(this).parent().css("top").split("px")[0]);
                    start_self_left = parseInt($(this).css("left").split("px")[0]);
                    start_self_top = parseInt($(this).css("top").split("px")[0]);

                },

                drag: function (event, ui) {
                    var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
                    var newLeft = (ui.originalPosition.left + changeLeft) / SGI.zoom; // adjust new left by our zoomScale
                    var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
                    var newTop = (ui.originalPosition.top + changeTop) / SGI.zoom; // adjust new top by our zoomScale

//                                      ui.position.left = newLeft;
//                    ui.position.top = newTop;


                    $(this).parent().css({
                        "left": (ui.position.left / SGI.zoom + start_left),
                        "top": (ui.position.top / SGI.zoom + start_top)
                    });
                    ui.position.left = 0;
                    ui.position.top = 0;


                    SGI.plumb_inst.inst_mbs.repaintEverything() //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
                },
                stop: function (event, ui) {
                    console.log($(ui.helper).parent().css("left"))
                    PRG.mbs[$(ui.helper).attr("mbs_id")]["left"] = ($(ui.helper).parent().css("left").split("px")[0]);
                    PRG.mbs[$(ui.helper).attr("mbs_id")]["top"] = ($(ui.helper).parent().css("top").split("px")[0]);

                    SGI.plumb_inst.inst_mbs.repaintEverything() //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
                }
            });
        } else {

            $("#" + data.mbs_id).draggable({
//            grid:[20,20],
                distance: 5,
                alsoDrag: ".mbs_selected",

//            snap: true,
                start: function (event, ui) {
//                ui.position.left = 0;
//                ui.position.top = 0;

                },

                drag: function (event, ui) {

                    var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
                    var newLeft = (ui.originalPosition.left + changeLeft) / SGI.zoom; // adjust new left by our zoomScale
                    var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
                    var newTop = (ui.originalPosition.top + changeTop) / SGI.zoom; // adjust new top by our zoomScale

                    ui.position.left = newLeft;
                    ui.position.top = newTop;

                    SGI.plumb_inst.inst_mbs.repaintEverything() //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
                },
                stop: function (event, ui) {
                    PRG.mbs[$(ui.helper).attr("id")]["left"] = ui.position.left;
                    PRG.mbs[$(ui.helper).attr("id")]["top"] = ui.position.top;

                    SGI.plumb_inst.inst_mbs.repaintEverything() //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
                }
            });
        }
    },

    make_mbs_drop: function () {

        $(".prg_codebox").droppable({
            accept: ".fbs",
            drop: function (ev, ui) {
                console.log("add FBS");

                if (ui["draggable"] != ui["helper"] && ev.pageX > 150) {

                    console.log("drop");
                    var data = {
                        parent: $(ev.target).attr("id"),
                        type: $(ui["draggable"][0]).attr("id"),
                        top: (ui["offset"]["top"] - $(ev.target).offset().top) + 35 / SGI.zoom,
                        left: (ui["offset"]["left"] - $(ev.target).offset().left) + 35 / SGI.zoom
                    };
                    SGI.add_fbs_element(data);
                }
            }
        });
    },

    make_savedata: function () {
        console.log("Start_Make_Savedata");
        PRG.connections.mbs = [];

        $.each($(".fbs_element"), function () {
            var id = $(this).attr("id");
            PRG.fbs[id].top = $(this).position().top;
            PRG.fbs[id].left = $(this).position().left;
        });

        $.each(SGI.plumb_inst.inst_mbs.getConnections(), function (idx, connection) {
            PRG.connections.mbs.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            });
        });

        PRG.connections.fbs = {};
        $(".mbs_element_codebox").each(function () {

            var codebox = $(this).attr("id");
            PRG.connections.fbs[codebox] = {};
            $.each(SGI.plumb_inst["inst_" + codebox].getConnections(), function (idx, connection) {
                PRG.connections.fbs[codebox][idx] = {
                    connectionId: connection.id,
                    pageSourceId: connection.sourceId,
                    pageTargetId: connection.targetId
                };
            });
        });

        console.log("Finish_Make_Savedata");
        return PRG;

    },

    make_struc: function () {
        console.log("Start_Make_Struk");

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

            console.log(PRG);
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
                    $this.target.push(this.pageTargetId);
                }

            });

        });

        $.each(PRG.struck.codebox, function (idx) {
            var $codebox = idx;

            $.each(this[0], function () {
                var id = this["fbs_id"];
                var input = [];
                var output = [];


                $.each(PRG.connections.fbs[$codebox], function () {

                    _input = this["pageTargetId"].split("_");
                    input_name = (_input[0] + "_" + _input[1]);

                    _output = this["pageSourceId"].split("_");
                    output_name = (_output[0] + "_" + _output[1]);

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

                this["input"] = input;
                this["output"] = output;
            });
        });

        console.log("Finish_Make_Struk");

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
        Compiler.start = "// Scripengine Start\n";
        Compiler.script = "";

        SGI.make_struc();

        $.each(PRG.struck.trigger, function () {
            var $trigger = this.mbs_id;
            if (PRG.mbs[$trigger].type == "trigger_valNe") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger = 'subscribe({id: ' + this + ' , valNe:false}, function (data){\n' + targets + ' }); \n' + Compiler.script;
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_event") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + '}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_EQ") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"eq"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_NE") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ne"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_GT") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"gt"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_GE") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ge"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_LT") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"lt"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_LE") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"le"}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_val") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].hmid, function (index) {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , ' + PRG.mbs[$trigger]["val"][index] + ':' + PRG.mbs[$trigger]["wert"][index] + '}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_time") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
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
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                $.each(PRG.mbs[$trigger].astro, function (index) {


                    Compiler.trigger += 'schedule({astro:"' + this + '", shift:' + PRG.mbs[$trigger].minuten[index] + '}, function (data){\n' + targets + ' }); \n'
                });
            }
            if (PRG.mbs[$trigger].type == "trigger_zykm") {
                var targets = "";
                $.each(this.target, function () {
                    targets += " " + this + "(data);\n"
                });
                Compiler.trigger += 'schedule(" */' + PRG.mbs[$trigger].time + ' * * * * ", function (data){\n' + targets + ' }); \n'

            }
            if (PRG.mbs[$trigger].type == "ccuobj") {

                Compiler.obj += 'setObject(' + PRG.mbs[$trigger].hmid + ', { Name: "' + PRG.mbs[$trigger]["name"] + '", TypeName: "VARDP"}); \n' + Compiler.script;

            }
            if (PRG.mbs[$trigger].type == "trigger_start") {

                $.each(this.target, function () {
                    Compiler.start += this + "();\n"
                });

            }

        });
        Compiler.script += Compiler.obj;
        Compiler.script += Compiler.trigger;
        Compiler.script += Compiler.start;

        Compiler.script += '\n';

        $.each(PRG.struck.codebox, function (idx) {

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
                        Compiler.script += 'email({to: '+this["input"][0].herkunft+',subject: '+this["input"][1].herkunft+',text: '+this["input"][2].herkunft+'});\n';
                    }
                    if (this["type"] == "true") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= true;\n';
                    }
                    if (this["type"] == "false") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= false;\n';
                    }
                    if (this["type"] == "zahl") {
                        Compiler.script += 'var ' + this.output[0].ausgang + '= ' + PRG.fbs[$fbs]["value"] + ' ;\n';
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
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'd.getHours().toString() + ":" + d.getMinutes().toString();'
                        } else if (PRG.fbs[$fbs]["value"] == "zeit_l") {
                            daten += 'var ' + this.output[0].ausgang + ' = ';
                            daten += 'd.getHours().toString() + ":" + d.getMinutes().toString() +":"+ d.getSeconds().toString();'

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
                        Compiler.script += '\nif(';
                        $.each(this["input"], function (index, obj) {
                            Compiler.script += obj.herkunft + ' == true';
                            if (index + 1 < n) {
                                Compiler.script += ' || ';
                            }
                        });
                        Compiler.script += '){\nvar ' + this.output[0].ausgang + ' = true;\n}else{\nvar ' + this.output[0].ausgang + ' = false;}\n\n'
                    }
                    if (this["type"] == "und") {
                        var n = this["input"].length;
                        Compiler.script += '\nif(';
                        $.each(this["input"], function (index, obj) {
                            Compiler.script += obj.herkunft + ' == true';
                            if (index + 1 < n) {
                                Compiler.script += ' && ';
                            }
                        });
                        Compiler.script += '){\nvar ' + this.output[0].ausgang + ' = true;\n}else{\nvar ' + this.output[0].ausgang + ' = false;}\n\n'
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
                        Compiler.script += 'var ' + this.output[0].ausgang + ' = !' + this["input"][0]["herkunft"] + '\n\n';
                    }
                    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

                }
            )
            ;
            Compiler.script += '\n};\n\n';
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
        idjs = storage.get("ScriptGUI_idjs");
        if (idjs == undefined) {
            idjs = "new"
        }

        $("head").append('<script id="id_js" type="text/javascript" src="js/hmSelect_' + idjs + '.js"></script>');


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
            console.log("rega Local");
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

//todo Ordentliches disable was man auch wieder einzelnt enabeln kann
//        $("body").disableSelection();
    });
})(jQuery);
