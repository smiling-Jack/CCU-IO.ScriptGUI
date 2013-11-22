/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */

var SGI = {
    socket: {},
    zoom: 1,
    theme: "",
    counter: 0,
    str_theme: "ScriptGUI_Theme",
    str_settings: "ScriptGUI_Settings",
    str_prog: "ScriptGUI_Programm",


    file_name:"",
    prg_store:"www/ScriptGUI/prg_Store/",

    Setup: function () {
        console.log("Start_Setup");


        // Lade Theme XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        theme = storage.get(SGI.str_theme);
        if (theme == undefined) {
            theme = "dark-hive"
        }
        $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui-1.10.3.custom.min.css"/>');


        // slider XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        SGI.scrollbar_h("init", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_h"), 50);
        SGI.scrollbar_v("init", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_v"), 50);
        SGI.scrollbar_v("init", $("#toolbox_body"), $(".toolbox"), $("#scroll_bar_toolbox"), 100);

        var key = "";
        $(document).keydown(function (event) {
            key = String.fromCharCode(event.keyCode);
        });

        $(document).keyup(function () {
            key = "";
        });

        $('#prg_body').on('mousewheel', function (event, delta, deltaX, deltaY) {

            if (key.toString() == "Y") {
                var ist = $("#scroll_bar_h").slider("option", "value");
                if (ist > 100) {
                    $("#scroll_bar_h").slider("option", "value", 100)
                } else if (ist < 0) {
                    $("#scroll_bar_h").slider("option", "value", 0)
                } else {
                    $("#scroll_bar_h").slider("option", "value", ist + delta * 3)
                }

            } else {
                var ist = $("#scroll_bar_v").slider("option", "value");
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
            minWidth: 140,
            height: 200
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


    },

    scrollbar_h: function (init, scrollPane_h, scroll_content, scroll_bar_h, value) {

        //scrollpane parts
        var scrollPane = scrollPane_h,
            scrollContent = scroll_content;
        //build slider
        if (init != "init") {
            var scrollbar = scroll_bar_h
        } else {
            var scrollbar = scroll_bar_h.slider({
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
            var scrollbar = scroll_bar_v.slider({
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

    Main: function () {
        console.log("Start_Main");

        // Aufzeigen der Default mit XXX gekennzeichnet wurde geändert
        jsPlumb.Defaults = {
            Anchor: "BottomCenter",
            Anchors: [ null, null ],
            ConnectionsDetachable: true,
            ConnectionOverlays: [],
            Connector: "Bezier",
            Container: $("#prg_panel"),                             //xxx
            DoNotThrowErrors: false,
            DragOptions: { },
            DropOptions: {tolerance: "touch" },
            Endpoint: "Dot",
            Endpoints: [ null, null ],
            EndpointOverlays: [ ],
            EndpointStyle: { fillStyle: "#456" },
            EndpointStyles: [ null, null ],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [ null, null ],
            HoverPaintStyle: null,
            LabelStyle: { color: "black" },
            LogEnabled: false,
            Overlays: [ ],
            MaxConnections: 1,
            PaintStyle: { lineWidth: 4, strokeStyle: "blue" },      //xxx
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };

        jsPlumb.bind("click", function (conn) {
            jsPlumb.detach(conn);

        });


//        Make element draggable
        var active_toolbox;
        $(".fbs").draggable({
            helper: "clone",
            zIndex: -1,
            revert: true,
            revertDuration: 0,
            containment: '#main',
            start: function (e, ui) {
                active_toolbox = $(e.currentTarget).parent();
                var add = $(this).clone();
                $(add).attr("id", "helper");
                $(add).addClass("helper");
                $(add).appendTo(".main");
            },
            drag: function (e, ui) {
                $(".main").find("#helper").css({
                    left: ui.position.left,
                    top: (ui.offset.top) - 35
                })
            },
            stop: function (e, ui) {
                $("#helper").remove()
            }

        });

        //Make element droppable
        $(".prg_panel").droppable({
            drop: function (ev, ui) {


                var type = $(ui["draggable"][0]).attr("id");
                var top = (ui["offset"]["top"] - $("#prg_panel").offset().top + 42) / SGI.zoom;
                var left = (ui["offset"]["left"] - $("#prg_panel").offset().left + 7) / SGI.zoom;

                SGI.add_fbs_element(type, top, left);
                SGI.make_fbs_drag();

                SGI.counter++;

            }
        });


        // Select FBS
        $("#prg_panel").on("click", ".fbs_element", function (e) {
            if ($(e.target).is(".btn_add_input") || $(e.target).is(".btn_input_ch")) {
            } else {
                $(this).toggleClass("fbs_selected");
            }
        });

        // None select FBS
        $('#prg_panel').click(function (e) {
            if ($(e.target).is("#prg_panel")) {
                $(".fbs_element").removeClass("fbs_selected");
            }
        });


        console.log("Finish_Main");
    },

    load_prg: function (data) {
        console.log(data);
        $.each(data.blocks, function () {
            var type = this.blockId.split("_")[0];
            SGI.counter = this.blockId.split("_")[1];
            var top = this.positionY;
            var left = this.positionX;
            var input_n = this.input_n;
            var hmid = this.hmid;

            SGI.add_fbs_element(type, top, left, hmid, input_n);
        });
        SGI.make_fbs_drag();

        SGI.counter = $(data.blocks).length;
        console.log(SGI.counter);

        $.each(data.connections, function () {
            var source = this.pageSourceId;
            var target = this.pageTargetId;
            jsPlumb.connect({uuids: [source, target]});
        });
    },

    add_fbs_element: function (type, top, left, hmid, input_n) {
        var input_data = "";
        var name = "";

        if (hmid == undefined) {
            hmid = "hallo";
            name = "Rechtsklick";
        } else {
            var parent = homematic.regaObjects[hmid]["Parent"];
            var parent_data = homematic.regaObjects[parent];
            name = parent_data.Name;
        }

        var n = input_n;
        if (input_n == undefined || input_n == null) {
            n = 2;
        }

        if (type == "und") {
            for (var i = 1; i < n + 1; i++) {
                input_data += '<div id="und_' + SGI.counter + '_in' + i + '"  class="div_input und_' + SGI.counter + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#prg_panel").append('\
                             <div id="und_' + SGI.counter + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.counter + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + type + '</a>\
                                </div>\
                                <div id="left_' + SGI.counter + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.counter + '" class="div_right">\
                                    <div id="und_' + SGI.counter + '_out1" class="div_output1 und_' + SGI.counter + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (type == "oder") {
            for (var i = 1; i < n + 1; i++) {
                input_data += '<div id="oder_' + SGI.counter + '_in' + i + '"  class="div_input und_' + SGI.counter + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#prg_panel").append('\
                             <div id="oder_' + SGI.counter + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.counter + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + type + '</a>\
                                </div>\
                                <div id="left_' + SGI.counter + '" class="div_left">\
                                    <div id="oder_' + SGI.counter + '_in1"  class="div_input oder_' + SGI.counter + '_in"><a class="input_font">IN 1</a></div>\
                                    <div id="oder_' + SGI.counter + '_in2"  class="div_input oder_' + SGI.counter + '_in"><a class="input_font">IN 2</a></div>\
                                </div>\
                                <div id="right_' + SGI.counter + '" class="div_right">\
                                    <div id="oder_' + SGI.counter + '_out1" class="div_output1 oder_' + SGI.counter + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (type == "input") {
            $("#prg_panel").append('\
                        <div  data-hmid="' + hmid + '" id="input_' + SGI.counter + '" class="fbs_element fbs_element_io">\
                            <div id="head_' + SGI.counter + '"  class="div_head" style="background-color: yellow">\
                                    <p class="head_font">Input</p>\
                            </div>\
                            <div id="left_' + SGI.counter + '" class="div_left"></div>\
                            <div id="right_' + SGI.counter + '" class="div_right">\
                                <div id="input_' + SGI.counter + '_out1" class="div_output1 input_' + SGI.counter + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.counter + '" class="div_hmid">' + name + '\
                           </div>\
                        </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (type == "output") {
            $("#prg_panel").append('\
                        <div  data-hmid="' + hmid + '" id="output_' + SGI.counter + '" class="fbs_element fbs_element_io">\
                            <div id="head_' + SGI.counter + '"  class="div_head" style="background-color: red">\
                                    <p class="head_font">Output</p>\
                            </div>\
                            <div id="left_' + SGI.counter + '" class="div_left">\
                               <div id="output_' + SGI.counter + '_in1"  class="div_input output_' + SGI.counter + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.counter + '" class="div_right">\
                            </div>\
                        </div>');


        }
        var parent = $("#" + type + "_" + SGI.counter);
        parent.css({"top": top + "px", "left": left + "px"});

        var _in = $('.' + type + '_' + SGI.counter + '_in');
        $.each(_in, function () {
            var id = $(this).attr("id");
            SGI.add_endpoint(id, "input", parent);
        });

        var _out = $('.' + type + '_' + SGI.counter + '_out');
        $.each(_out, function () {
            var id = $(this).attr("id");
            SGI.add_endpoint(id, "output", parent);
        });
    },

    add_input: function (opt) {

        var id = $($(opt).attr("$trigger")).attr("id");
        var n = id.split("_")[1];
        var type = id.split("_")[0];
        var index = $($("#" + id).find("[id^='left']")).children().length + 1;
        var add_id = type + '_' + n + '_in' + index + '';


        $($("#" + id).find("[id^='left']")).append('\
                <div id="' + add_id + '"  class="div_input ' + type + '_' + n + '_in"><a class="input_font">IN ' + index + '</a></div>\
                ');

        SGI.add_endpoint(add_id, "input");

        jsPlumb.repaintEverything();

    },

    add_endpoint: function (id, type) {

        if (type == "input") {
            var endpointStyle = {fillStyle: "green"};
            jsPlumb.addEndpoint(id, { uuid: id }, {
                anchor: "Left",
                isTarget: true,
                connector: "Flowchart",
                paintStyle: endpointStyle,
                endpoint: [ "Rectangle", { width: 30, height: 10} ]
            });
        }
        if (type == "output") {
            var endpointStyle = {fillStyle: "orange"};
            jsPlumb.addEndpoint(id, { uuid: id }, {
                uuid: $(id).attr("id"),
                anchor: "Right",
                isSource: true,
                maxConnections: -1,
                connector: "Flowchart",
                paintStyle: endpointStyle,
                endpoint: [ "Rectangle", { width: 20, height: 10} ]
            });
        }
    },

    make_fbs_drag: function () {
        //Todo SGI.zoom faktor mit berücksichtigen
        $(".fbs_element").draggable({
            distance: 5,
            alsoDrag: ".fbs_selected",
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

                jsPlumb.repaintEverything() //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
            },
            stop: function () {
                jsPlumb.repaintEverything() //TODO es muss nur ein repaint gemacht werden wenn mehrere selected sind
            }

        });


    },

    make_savedata: function () {
        console.log("Start_Make_Savedata");

        var data = {
            blocks: [],
            connections: []
        };


        $("#prg_panel .fbs_element").each(function (idx, elem) {
            var $elem = $(elem);
            data.blocks.push({
                blockId: $elem.attr('id'),
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                hmid: $elem.data("hmid"),
                input_n: $($elem).find(".div_input").length
            });
        });


        $.each(jsPlumb.getConnections(), function (idx, connection) {
            data.connections.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            });
        });

        console.log(data);
        return data;
    },

    make_struc: function () {
        console.log("Start_Make_Struk");

        var blocks = [];
        $("#prg_panel .fbs_element").each(function (idx, elem) {
            var $elem = $(elem);
            blocks.push({
                blockId: $elem.attr('id'),
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
            });
        });
        console.log(blocks);


        var connections = [];
        $.each(jsPlumb.getConnections(), function (idx, connection) {
            connections.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            });
        });
        console.log(connections);


        function SortByName(a, b) {

            var aName = a.positionX;
            var bName = b.positionX;
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        blocks.sort(SortByName);

        // Erstelle Scrip Stucktur
        var struck = []
        $.each(blocks, function () {
            var id = this["blockId"];
            var data = {
                type: "",
                input: [],
                output: []

            };

            data.type = this["blockId"].split("_")[0];

            $.each(connections, function () {
                var add = [];
                input = this["pageTargetId"].split("_");
                input_name = (input[0] + "_" + input[1]);

                output = this["pageSourceId"].split("_");
                output_name = (output[0] + "_" + output[1]);

                if (input_name == id) {

                    add.push(input[2]);
                    add.push(this.pageSourceId);
                    data.input.push(add)
                }

                if (output_name == id) {
                    var add = [];
                    add.push(output[2]);
                    add.push(this.pageTargetId);
                    data.output.push(add)
                }

            });

            struck.push(data);
        });
        console.log(struck)
        console.log("Finish_Make_Struk");

    },

    clear: function() {
        jsPlumb.reset();
        $("#prg_panel").children().remove();
        SGI.counter = 0;
}

};

var homematic = {
    uiState: new can.Observe({"_65535": {"Value": null}}),
    setState: new can.Observe({"_65535": {"Value": null}}),
    regaIndex: {},
    regaObjects: {},
    setStateTimers: {}

};


//ToDo brauch ich setState ???
homematic.setState.bind("change", function (e, attr, how, newVal, oldVal) {
    //console.log("homematic setState change "+how+" "+attr+" "+newVal);
    if (how == "set" || how == "add") {
        var id = parseInt(attr.slice(1), 10);
        homematic.stateDelayed(id, newVal.Value);
    }
});

// Device selection dialog
//ToDo hmSelect neuaufbauen ? schneller machen ?
var hmSelect = {
    timeoutHnd: null, // timeout for search
    value: null,
    valueObj: null,
    _userArg: null,
    _onsuccess: null,
    images: null,
    mydata: null,
    _homematic: null,
    _selectText: null,
    _cancelText: null,
    _buttonsLoc: null, // Array with rooms buttons for filter
    _buttonsFunc: null, // Array with function buttons for filter
    _filterLoc: "", // rooms filter
    _filterFunc: "", // functions filter
    _filter: null, // current filter
    _devices: null, // devices instance
    _ignoreFilter: false,// If ignore device or point filter

    start: 0,
    _convertName: function (text) {
        var oldText = text;
        do
        {
            oldText = text;
            text = text.replace("%C4", "&Auml;");
            text = text.replace("%E4", "&auml;");
            text = text.replace("%D6", "&Ouml;");
            text = text.replace("%F6", "&ouml;");
            text = text.replace("%DC", "&Uuml;");
            text = text.replace("%FC", "&uuml;");
            text = text.replace("%DF", "&szlig;");
            text = text.replace("%20", " ");
            text = text.replace("%3A", ".");
        } while (text != oldText);

        return text;
    }, // Convert name
    _getImage: function (type) {
        if (this.images == null) {
            this.deviceImgPath = 'img/devices/50/';
            // Devices -> Images
            this.images = {
                'HM-LC-Dim1TPBU-FM': 'PushButton-2ch-wm_thumb.png',
                'HM-LC-Sw1PBU-FM': 'PushButton-2ch-wm_thumb.png',
                'HM-LC-Bl1PBU-FM': 'PushButton-2ch-wm_thumb.png',
                'HM-LC-Sw1-PB-FM': 'PushButton-2ch-wm_thumb.png',
                'HM-PB-2-WM': 'PushButton-2ch-wm_thumb.png',
                'HM-LC-Sw2-PB-FM': 'PushButton-4ch-wm_thumb.png',
                'HM-PB-4-WM': 'PushButton-4ch-wm_thumb.png',
                'HM-LC-Dim1L-Pl': 'OM55_DimmerSwitch_thumb.png',
                'HM-LC-Dim1T-Pl': 'OM55_DimmerSwitch_thumb.png',
                'HM-LC-Sw1-Pl': 'OM55_DimmerSwitch_thumb.png',
                'HM-LC-Dim1L-Pl-2': 'OM55_DimmerSwitch_thumb.png',
                'HM-LC-Sw1-Pl-OM54': 'OM55_DimmerSwitch_thumb.png',
                'HM-Sys-sRP-Pl': 'OM55_DimmerSwitch_thumb.png',
                'HM-LC-Dim1T-Pl-2': 'OM55_DimmerSwitch_thumb.png',
                'HM-LC-Sw1-Pl-2': 'OM55_DimmerSwitch_thumb.png',
                'HM-Sen-WA-OD': '82_hm-sen-wa-od_thumb.png',
                'HM-Dis-TD-T': '81_hm-dis-td-t_thumb.png',
                'HM-Sen-MDIR-O': '80_hm-sen-mdir-o_thumb.png',
                'HM-OU-LED16': '78_hm-ou-led16_thumb.png',
                'HM-LC-Sw1-Ba-PCB': '77_hm-lc-sw1-ba-pcb_thumb.png',
                'HM-LC-Sw4-WM': '76_hm-lc-sw4-wm_thumb.png',
                'HM-PB-2-WM55': '75_hm-pb-2-wm55_thumb.png',
                'atent': '73_hm-atent_thumb.png',
                'HM-RC-BRC-H': '72_hm-rc-brc-h_thumb.png',
                'HMW-IO-12-Sw14-DR': '71_hmw-io-12-sw14-dr_thumb.png',
                'HM-PB-4Dis-WM': '70_hm-pb-4dis-wm_thumb.png',
                'HM-LC-Sw2-DR': '69_hm-lc-sw2-dr_thumb.png',
                'HM-LC-Sw4-DR': '68_hm-lc-sw4-dr_thumb.png',
                'HM-SCI-3-FM': '67_hm-sci-3-fm_thumb.png',
                'HM-LC-Dim1T-CV': '66_hm-lc-dim1t-cv_thumb.png',
                'HM-LC-Dim1T-FM': '65_hm-lc-dim1t-fm_thumb.png',
                'HM-LC-Dim2T-SM': '64_hm-lc-dim2T-sm_thumb.png',
                'HM-LC-Bl1-pb-FM': '61_hm-lc-bl1-pb-fm_thumb.png',
                'HM-LC-Bi1-pb-FM': '61_hm-lc-bi1-pb-fm_thumb.png',
                'HM-OU-CF-Pl': '60_hm-ou-cf-pl_thumb.png',
                'HM-OU-CFM-Pl': '60_hm-ou-cf-pl_thumb.png',
                'HMW-IO-12-FM': '59_hmw-io-12-fm_thumb.png',
                'HMW-Sen-SC-12-FM': '58_hmw-sen-sc-12-fm_thumb.png',
                'HM-CC-SCD': '57_hm-cc-scd_thumb.png',
                'HMW-Sen-SC-12-DR': '56_hmw-sen-sc-12-dr_thumb.png',
                'HM-Sec-SFA-SM': '55_hm-sec-sfa-sm_thumb.png',
                'HM-LC-ddc1': '54a_lc-ddc1_thumb.png',
                'HM-LC-ddc1-PCB': '54_hm-lc-ddc1-pcb_thumb.png',
                'HM-Sen-MDIR-SM': '53_hm-sen-mdir-sm_thumb.png',
                'HM-Sec-SD-Team': '52_hm-sec-sd-team_thumb.png',
                'HM-Sec-SD': '51_hm-sec-sd_thumb.png',
                'HM-Sec-MDIR': '50_hm-sec-mdir_thumb.png',
                'HM-Sec-WDS': '49_hm-sec-wds_thumb.png',
                'HM-Sen-EP': '48_hm-sen-ep_thumb.png',
                'HM-Sec-TiS': '47_hm-sec-tis_thumb.png',
                'HM-LC-Sw4-PCB': '46_hm-lc-sw4-pcb_thumb.png',
                'HM-LC-Dim2L-SM': '45_hm-lc-dim2l-sm_thumb.png',
                'HM-EM-CCM': '44_hm-em-ccm_thumb.png',
                'HM-CC-VD': '43_hm-cc-vd_thumb.png',
                'HM-CC-TC': '42_hm-cc-tc_thumb.png',
                'HM-Swi-3-FM': '39_hm-swi-3-fm_thumb.png',
                'HM-PBI-4-FM': '38_hm-pbi-4-fm_thumb.png',
                'HMW-Sys-PS7-DR': '36_hmw-sys-ps7-dr_thumb.png',
                'HMW-Sys-TM-DR': '35_hmw-sys-tm-dr_thumb.png',
                'HMW-Sys-TM': '34_hmw-sys-tm_thumb.png',
                'HMW-Sec-TR-FM': '33_hmw-sec-tr-fm_thumb.png',
                'HMW-WSTH-SM': '32_hmw-wsth-sm_thumb.png',
                'HMW-WSE-SM': '31_hmw-wse-sm_thumb.png',
                'HMW-IO-12-Sw7-DR': '30_hmw-io-12-sw7-dr_thumb.png',
                'HMW-IO-4-FM': '29_hmw-io-4-fm_thumb.png',
                'HMW-LC-Dim1L-DR': '28_hmw-lc-dim1l-dr_thumb.png',
                'HMW-LC-Bl1-DR': '27_hmw-lc-bl1-dr_thumb.png',
                'HMW-LC-Sw2-DR': '26_hmw-lc-sw2-dr_thumb.png',
                'HM-EM-CMM': '25_hm-em-cmm_thumb.png',
                'HM-CCU-1': '24_hm-cen-3-1_thumb.png',
                'HM-RCV-50': '24_hm-cen-3-1_thumb.png',
                'HMW-RCV-50': '24_hm-cen-3-1_thumb.png',
                'HM-RC-Key3': '23_hm-rc-key3-b_thumb.png',
                'HM-RC-Key3-B': '23_hm-rc-key3-b_thumb.png',
                'HM-RC-Sec3': '22_hm-rc-sec3-b_thumb.png',
                'HM-RC-Sec3-B': '22_hm-rc-sec3-b_thumb.png',
                'HM-RC-P1': '21_hm-rc-p1_thumb.png',
                'HM-RC-19': '20_hm-rc-19_thumb.png',
                'HM-RC-19-B': '20_hm-rc-19_thumb.png',
                'HM-RC-12': '19_hm-rc-12_thumb.png',
                'HM-RC-12-B': '19_hm-rc-12_thumb.png',
                'HM-RC-4': '18_hm-rc-4_thumb.png',
                'HM-RC-4-B': '18_hm-rc-4_thumb.png',
                'HM-Sec-RHS': '17_hm-sec-rhs_thumb.png',
                'HM-Sec-SC': '16_hm-sec-sc_thumb.png',
                'HM-Sec-Win': '15_hm-sec-win_thumb.png',
                'HM-Sec-Key': '14_hm-sec-key_thumb.png',
                'HM-Sec-Key-S': '14_hm-sec-key_thumb.png',
                'HM-WS550STH-I': '13_hm-ws550sth-i_thumb.png',
                'HM-WDS40-TH-I': '13_hm-ws550sth-i_thumb.png',
                'HM-WS550-US': '9_hm-ws550-us_thumb.png',
                'WS550': '9_hm-ws550-us_thumb.png',
                'HM-WDC7000': '9_hm-ws550-us_thumb.png',
                'HM-LC-Sw1-SM': '8_hm-lc-sw1-sm_thumb.png',
                'HM-LC-Bl1-FM': '7_hm-lc-bl1-fm_thumb.png',
                'HM-LC-Bl1-SM': '6_hm-lc-bl1-sm_thumb.png',
                'HM-LC-Sw2-FM': '5_hm-lc-sw2-fm_thumb.png',
                'HM-LC-Sw1-FM': '4_hm-lc-sw1-fm_thumb.png',
                'HM-LC-Sw4-SM': '3_hm-lc-sw4-sm_thumb.png',
                'HM-LC-Dim1L-CV': '2_hm-lc-dim1l-cv_thumb.png',
                'HM-LC-Dim1PWM-CV': '2_hm-lc-dim1l-cv_thumb.png',
                'HM-WS550ST-IO': 'IP65_G201_thumb.png',
                'HM-WDS30-T-O': 'IP65_G201_thumb.png',
                'HM-WDS100-C6-O': 'WeatherCombiSensor_thumb.png',
                'HM-WDS10-TH-O': 'TH_CS_thumb.png',
                'HM-WS550STH-O': 'TH_CS_thumb.png'
            };
        }
        if (this.images[type])
            return this.deviceImgPath + this.images[type];
        else
            return "";
    }, // Get image for type
    _type2Str: function (type, subtype) {
        type = parseInt(type);
        subtype = parseInt(subtype);
        switch (type) {
            case 2:
                if (subtype == 6)
                    return SGI.translate('Alarm');
                else if (subtype == 2)
                    return SGI.translate('Logical');
                else
                    return SGI.translate('Boolean') + "," + subtype;

            case 20:
                if (subtype == 11)
                    return SGI.translate('String');
                else
                    return SGI.translate('String') + "," + subtype;
            case 4:
                if (subtype == 0)
                    return SGI.translate('Number');
                else
                    return SGI.translate('Number') + "," + subtype;

            case 16:
                if (subtype == 29)
                    return SGI.translate('Enum');
                else
                    return SGI.translate('Enum') + "," + subtype;
            default:
                return '' + type + "," + subtype;
        }
    },
    _buildVarsGrid: function (homematic) {
        var variables = homematic.regaIndex["VARDP"]; // IDs of all devices
        var selectedId = null;

        var w = $('#hmSelect').dialog("option", "width");
        $('#hmSelect').dialog("option", "width", w - 50);
        // Build the data tree together
        if (this.myVarsData == null) {
            this.myVarsData = new Array();
            var i = 0;
            // Add all elements
            for (var vari in variables) {
                var variObj = homematic.regaObjects[variables[vari]];
                this.myVarsData[i] = {
                    id: "" + (i + 1),
                    "Type": this._type2Str(variObj["ValueType"], variObj["ValueSubType"]),
                    "Description": this._convertName(variObj["DPInfo"]),
                    "Unit": this._convertName(variObj["ValueUnit"]),
                    "Name": this._convertName(variObj["Name"]),
                    "data": /*vari.substring(1) + "[" + */this._convertName(variObj["Name"])/* + "]"*/,
                    "_ID": variables[vari],
                    isLeaf: true,
                    level: "0",
                    parent: "null",
                    expanded: false,
                    loaded: true
                };
                if (hmSelect.value && this.myVarsData[i]["_ID"] == hmSelect.value) {
                    selectedId = this.myVarsData[i].id;
                }
                i++;
            }
        }
        else if (hmSelect.value != null && hmSelect.value != "") {
            for (var i = 0; i < this.myVarsData.length; i++) {
                if (hmSelect.value && this.myVarsData[i]["_ID"] == hmSelect.value) {
                    selectedId = this.myVarsData[i].id;
                }
            }
        }

        // Create the grid
        $("#hmVarsContent").jqGrid({
            datatype: "jsonstring",
            datastr: this.myVarsData,
            height: $('#tabs-vars').height() - 35,
            autowidth: true,
            shrinkToFit: false,
            colNames: ['Id', SGI.translate('Name'), '', SGI.translate('Type'), SGI.translate('Unit'), SGI.translate('Description'), ''],
            colModel: [
                {name: 'id', index: 'id', width: 1, hidden: true, key: true},
                {name: 'Name', index: 'Name', width: 250, sortable: "text"},
                {name: 'data', index: 'data', width: 1, hidden: true},
                {name: 'Type', index: 'Type', width: 80, sortable: false, align: "right", search: false},
                {name: 'Units', index: 'Unit', width: 80, sorttype: "text", search: false},
                {name: 'Description', index: 'Description', width: 400, sorttype: "text"},
                {name: '_ID', index: '_ID', width: 0, hidden: true},
            ],
            onSelectRow: function (id) {
                value = $("#hmVarsContent").jqGrid('getCell', id, '_ID');
                valueObj = null;
                if (value != null && value != "") {
                    $(":button:contains('" + hmSelect._selectText + "')").prop("disabled", false).removeClass("ui-state-disabled");
                }
            },

            sortname: 'id',
            multiselect: false,
            gridview: true,
            scrollrows: true,
            treeGrid: true,
            treeGridModel: 'adjacency',
            treedatatype: 'local',
            ExpandColumn: 'Name',
            ExpandColClick: true,
            pgbuttons: true,
            viewrecords: true,
            jsonReader: {
                repeatitems: false,
                root: function (obj) {
                    return obj;
                },
                page: function (obj) {
                    return 1;
                },
                total: function (obj) {
                    return 1;
                },
                records: function (obj) {
                    return obj.length;
                }
            }
        });
        // Add the filter column
        $("#hmVarsContent").jqGrid('filterToolbar', {searchOperators: false,
            beforeSearch: function () {
                var searchData = jQuery.parseJSON(this.p.postData.filters);
                hmSelect._varsFilter = searchData;
                hmSelect._filterVarsApply();
            }
        });
        // Select current element
        if (selectedId != null) {
            $("#hmVarsContent").setSelection(selectedId, true);
            $("#" + $("#hmVarsContent").jqGrid('getGridParam', 'selrow')).focus();
        }

        // Disable "Select" button if nothing selected
        if (selectedId == null) {
            $(":button:contains('" + this._selectText + "')").prop("disabled", true).addClass("ui-state-disabled");
        }
        // Increase dialog because of bug in jqGrid
        $('#hmSelect').dialog("option", "width", w);
        this._onResize();
        // Filter items with last filter
        this._filterVarsApply();
    },
    _buildProgsGrid: function (homematic) {
        var programs = homematic.regaIndex["PROGRAM"]; // IDs of all devices
        var selectedId = null;

        var w = $('#hmSelect').dialog("option", "width");
        $('#hmSelect').dialog("option", "width", w - 50);
        // Build the data tree together
        if (this.myProgsData == null) {
            this.myProgsData = new Array();
            var i = 0;
            // Add all elements
            for (var prog in programs) {
                this.myProgsData[i] = {
                    id: "" + (i + 1),
                    "Description": this._convertName(homematic.regaObjects[programs[prog]]["PrgInfo"]),
                    "Name": this._convertName(homematic.regaObjects[programs[prog]]["Name"]),
                    "data": /*prog.substring(1) + "[" + */this._convertName(homematic.regaObjects[programs[prog]]["Name"])/* + "]"*/,
                    "_ID": programs[prog],
                    isLeaf: true,
                    level: "0",
                    parent: "null",
                    expanded: false,
                    loaded: true

                };
                if (hmSelect.value && this.myProgsData[i]["_ID"] == hmSelect.value) {
                    selectedId = this.myProgsData[i].id;
                }
                i++;
            }
        }
        else if (hmSelect.value != null && hmSelect.value != "") {
            for (var i = 0; i < this.myProgsData.length; i++) {
                if (hmSelect.value && this.myProgsData[i]["_ID"] == hmSelect.value) {
                    selectedId = this.myProgsData[i].id;
                }
            }
        }

        // Create the grid
        $("#hmProgsContent").jqGrid({
            datatype: "jsonstring",
            datastr: this.myProgsData,
            height: $('#tabs-progs').height() - 35,
            autowidth: true,
            shrinkToFit: false,
            colNames: ['Id', SGI.translate('Name'), '', SGI.translate('Description'), ''],
            colModel: [
                {name: 'id', index: 'id', width: 1, hidden: true, key: true},
                {name: 'Name', index: 'Name', width: 250, sortable: "text"},
                {name: 'data', index: 'data', width: 1, hidden: true},
                {name: 'Description', index: 'Description', width: 570, sorttype: "text"},
                {name: '_ID', index: '_ID', width: 0, hidden: true},
            ],
            onSelectRow: function (id) {
                value = $("#hmProgsContent").jqGrid('getCell', id, "_ID");
                valueObj = null;
                if (value != null && value != "") {
                    $(":button:contains('" + hmSelect._selectText + "')").prop("disabled", false).removeClass("ui-state-disabled");
                }
            },

            sortname: 'id',
            multiselect: false,
            gridview: true,
            scrollrows: true,
            treeGrid: true,
            treeGridModel: 'adjacency',
            treedatatype: 'local',
            ExpandColumn: 'Name',
            ExpandColClick: true,
            pgbuttons: true,
            viewrecords: true,
            jsonReader: {
                repeatitems: false,
                root: function (obj) {
                    return obj;
                },
                page: function (obj) {
                    return 1;
                },
                total: function (obj) {
                    return 1;
                },
                records: function (obj) {
                    return obj.length;
                }
            }
        });
        // Add the filter column
        $("#hmProgsContent").jqGrid('filterToolbar', {searchOperators: false,
            beforeSearch: function () {
                var searchData = jQuery.parseJSON(this.p.postData.filters);
                hmSelect._progsFilter = searchData;
                hmSelect._filterProgsApply();
            }
        });
        // Select current element
        if (selectedId != null) {
            $("#hmProgsContent").setSelection(selectedId, true);
            $("#" + $("#hmProgsContent").jqGrid('getGridParam', 'selrow')).focus();
        }

        // Disable "Select" button if nothing selected
        if (selectedId == null) {
            $(":button:contains('" + this._selectText + "')").prop("disabled", true).addClass("ui-state-disabled");
        }
        // Increase dialog because of bug in jqGrid
        $('#hmSelect').dialog("option", "width", w);
        this._onResize();

        // Filter items with last filter
        this._filterProgsApply();
    },
    _getRoom: function (homematic, id, isNotRecursive) {
        var result_room = "";
        var _id = id;
        var dev = id;
        var rooms = homematic.regaIndex["ENUM_ROOMS"]; // IDs of all ROOMS

        while (result_room == "" && _id !== undefined) {
            for (var room in rooms) {
                for (var k = 0; k < homematic.regaObjects[rooms[room]]["Channels"].length; k++) {
                    if (homematic.regaObjects[rooms[room]]["Channels"][k] == _id) {
                        if (result_room.indexOf(homematic.regaObjects[rooms[room]]["Name"]) == -1) {
                            result_room = ((result_room == "") ? "" : ", ") + homematic.regaObjects[rooms[room]]["Name"];
                        }
                        break;
                    }
                }
            }
            _id = homematic.regaObjects[_id]["Parent"];
            if (_id !== undefined) dev = _id;
        }
        if (result_room == "" && !isNotRecursive) {
            // Get rooms of all channels of this device
            for (var k = 0; k < homematic.regaObjects[dev]["Channels"].length; k++) {
                var t = hmSelect._getRoom(homematic, homematic.regaObjects[dev]["Channels"][k], true);
                if (t != "") {
                    if (result_room.indexOf(t) == -1) {
                        result_room += ((result_room == "") ? "" : ", ") + t;
                    }
                }
            }
        }

        return result_room;
    },
    _getFunction: function (homematic, id, isNotRecursive) {
        var result_func = "";
        var _id = id;
        var dev = id;
        var functions = homematic.regaIndex["ENUM_FUNCTIONS"]; // IDS of all functions

        while (result_func == "" && _id !== undefined) {
            for (var func in functions) {
                for (var k = 0; k < homematic.regaObjects[functions[func]]["Channels"].length; k++) {
                    if (homematic.regaObjects[functions[func]]["Channels"][k] == _id) {
                        if (homematic.regaObjects[functions[func]]["Name"] != "" &&
                            result_func.indexOf(homematic.regaObjects[functions[func]]["Name"]) == -1) {
                            result_func = ((result_func == "") ? "" : ", ") + homematic.regaObjects[functions[func]]["Name"];
                        }
                        break;
                    }
                }
            }
            _id = homematic.regaObjects[_id]["Parent"];
            if (_id !== undefined) dev = _id;
        }
        if (result_func == "" && !isNotRecursive) {
            // Get functions of all channels of this device
            for (var k = 0; k < homematic.regaObjects[dev]["Channels"].length; k++) {
                var t = hmSelect._getFunction(homematic, homematic.regaObjects[dev]["Channels"][k], true);
                if (t != "") {
                    if (result_func.indexOf(t) == -1) {
                        result_func += ((result_func == "") ? "" : ", ") + t;
                    }
                }
            }
        }

        return result_func;
    },
    _buildDevicesGrid: function (homematic, filter, devFilter) {
        var devicesCCU = homematic.regaIndex["DEVICE"]; // IDs of all devices
        var rooms = homematic.regaIndex["ENUM_ROOMS"]; // IDs of all ROOMS
        var functions = homematic.regaIndex["ENUM_FUNCTIONS"]; // IDS of all functions

        if (this.myFilter != filter || this.myDevFilter != devFilter) {
            this._devices = null;
            this.myFilter = filter;
            this.myDevFilter = devFilter;
        }

        // If filter changed
        if (this._devices == null && filter != "all" && !this._ignoreFilter) {
            // Clear prepared data
            this.mydata = null;

            if (this.myFilter != 'variables' && this.myFilter != 'programs') {

                if (this.myFilter == "all") {
                    this._devices = null;
                }
                //leave only desired elements
                var f = filter.split(',');
                for (var t = 0; t < f.length; t++) {
                    if (f[t][0] != '.') {
                        f[t] = "." + f[t];
                    }
                }
                var newDevices = new Object();
                var iDevs = 0;
                var iPnts = 0;
                var iChns = 0;
                for (var dev in devicesCCU) {
                    var idDev = devicesCCU[dev];
                    var device = homematic.regaObjects[idDev];
                    var newChannels = new Object();
                    iPnts = 0;
                    iChns = 0;

                    for (var chn in device.Channels) {
                        var idChn = device["Channels"][chn];
                        var channel = homematic.regaObjects[idChn];
                        var newPoints = new Object();
                        iPnts = 0;

                        if (channel["HssType"] !== undefined && channel["HssType"] == "MAINTENANCE" &&
                            (device["HssType"] == "HM-Sec-SC" || device["HssType"] == "HM-Sec-RHS" || device["HssType"] == "HM-SCI-3-FM"))
                            continue;

                        for (var dp in channel.DPs) {
                            var idPnt = channel.DPs[dp];
                            var point = homematic.regaObjects[idPnt];
                            var name = this._convertName(point.Name);
                            for (var t = 0; t < f.length; t++) {
                                if (name.indexOf(f[t]) != -1) {
                                    newPoints [idPnt] = point;
                                    newPoints [idPnt]["Type"] = dp;
                                    iPnts++;
                                    break;
                                }
                            }
                        }
                        if (iPnts > 0) {
                            if (iPnts == 1) {
                                for (var idPnt in newPoints) {
                                    newChannels[idPnt] = {
                                        "HssType": channel.HssType,
                                        "Address": newPoints[idPnt]["Name"],
                                        "Name": channel.Name,
                                        DPs: null,
                                        cnt: 0
                                    }
                                    break;
                                }
                                iPnts = 0;
                            }
                            else {
                                newChannels[idChn] = {
                                    "HssType": channel.HssType,
                                    "Address": channel.Address,
                                    "Name": channel.Name,
                                    cnt: iPnts,
                                    DPs: newPoints
                                }
                            }
                            iChns++;
                        }
                    }
                    if (iChns > 0) {
                        if (iChns == 1 && iPnts == 0) {
                            for (var idChn in newChannels) {
                                newDevices[idChn] = {
                                    "Interface": device.Interface,
                                    "HssType": device.HssType,
                                    "Address": newChannels[idChn]["Address"],
                                    "Name": newChannels[idChn]["Name"],
                                    cnt: 0,
                                    Channels: null
                                };
                                break;
                            }
                            iChns = 0;
                        }
                        else {
                            newDevices[idDev] = {
                                "Interface": device.Interface,
                                "HssType": device.HssType,
                                "Address": device.Address,
                                "Name": device.Name,
                                cnt: iChns,
                                Channels: newChannels
                            };
                        }

                        iDevs++;
                    }
                }

                this._devices = newDevices;
            }
        }
        // Filter by hssType of device
        if (this._devices == null) {
            this.mydata = null;

            if (filter == "all" || this._devices == null || this._ignoreFilter) {
                var f = null;
                var isWithDPs = true;
                if (!this._ignoreFilter && this.myDevFilter != '' && this.myDevFilter != null && this.myDevFilter != undefined) {
                    //leave only desired elements
                    f = devFilter.split(',');
                    isWithDPs = (f.length > 0 && f[0].length > 0 && f[0][0] == '.');
                }
                var newDevices = new Object();
                var iChns = 0;
                for (var dev in devicesCCU) {
                    var idDev = devicesCCU[dev];
                    var device = homematic.regaObjects[idDev];
                    var isFound = false;
                    iChns = 0;

                    if (f === null || device.Interface == "CUxD")
                        isFound = true;
                    else {
                        for (var t = 0; t < f.length; t++) {
                            if (device.HssType.indexOf(f[t]) != -1) {
                                isFound = true;
                                break;
                            }
                        }
                    }

                    if (!isFound)
                        continue;
                    // Special process temperature inside
                    if (f !== null && device.HssType == "HM-CC-TC") {
                        newDevices[idDev] = {
                            "Interface": device.Interface,
                            "HssType": device.HssType,
                            "Address": device.Interface + "." + device.Address,
                            "Name": device.Name,
                        };
                    }
                    else {
                        for (var chn in device.Channels) {
                            var idChn = device["Channels"][chn];
                            var channel = homematic.regaObjects[idChn];

                            if (channel["HssType"] !== undefined && channel["HssType"] == "MAINTENANCE")
                                continue;

                            if (isWithDPs) {
                                var iPnts = 0;
                                var newPoints = new Object();

                                for (var dp in channel["DPs"]) {
                                    var idPnt = channel["DPs"][dp];
                                    var point = homematic.regaObjects[idPnt];
                                    var name = this._convertName(point.Name);
                                    if (f == null) {
                                        newPoints [idPnt] = point;
                                        newPoints [idPnt]["Type"] = dp;
                                        iPnts++;
                                    }
                                    else {
                                        for (var t = 0; t < f.length; t++) {
                                            if (name.indexOf(f[t]) != -1) {
                                                newPoints [idPnt] = point;
                                                newPoints [idPnt]["Type"] = dp;
                                                iPnts++;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (iPnts > 0) {
                                    if (iPnts == 1) {
                                        for (var idPnt in newPoints) {
                                            newDevices[idPnt] = {
                                                "Interface": device.Interface,
                                                "HssType": device.HssType,
                                                "Address": newPoints[idPnt]["Name"],
                                                "Name": channel["Name"],
                                                cnt: 0,
                                                Channels: null
                                            };
                                            break;
                                        }
                                        iPnts = 0;
                                    }
                                    else {
                                        newDevices[idChn] = {
                                            "Interface": device.Interface,
                                            "HssType": device.HssType,
                                            "Address": device.Interface + "." + channel.Address,
                                            "Name": channel["Name"],
                                        };
                                        newDevices[idChn].cnt = iPnts;
                                        newDevices[idChn].Channels = [];
                                        for (var idPnt in newPoints) {
                                            newDevices[idChn].Channels[idPnt] = {'Name': newPoints[idPnt]["Type"], 'Address': newPoints[idPnt]["Name"]};
                                        }
                                    }
                                }
                            }
                            else {
                                newDevices[idChn] = {
                                    "Interface": device["Interface"],
                                    "HssType": device["HssType"],
                                    "Address": device["Interface"] + "." + channel["Address"],
                                    "Name": channel["Name"],
                                };
                            }
                        }
                    }
                }

                this._devices = newDevices;
            }
        }
        // Fill the locations and functions toolbar
        if (1) {
            $("#hmSelectFilter").html("");

            // Fill the locations toolbar
            var text = SGI.translate('Rooms') + ":&nbsp;<select id='hmSelectLocations' style='z-index: 1000'>";
            text += "<option value=''>" + SGI.translate('All') + "</option>";
            for (var room in rooms) {
                var selected = "";
                if (hmSelect._filterLoc == homematic.regaObjects[rooms[room]]["Name"]) {
                    selected = " selected ";
                }
                text += "<option  style='z-index: 1000' value='" + homematic.regaObjects[rooms[room]]["Name"] + "' " + selected + ">" + homematic.regaObjects[rooms[room]]["Name"] + "</option>";
            }
            text += "</select>&nbsp;&nbsp;";

            // Fill the functions toolbar
            text += SGI.translate('Functions') + ":&nbsp;<select id='hmSelectFunctions'>";
            text += "<option value=''>" + SGI.translate('All') + "</option>";
            for (var func in functions) {
                var selected = "";
                if (hmSelect._filterFunc == homematic.regaObjects[functions[func]]["Name"]) {
                    selected = " selected ";
                }
                text += "<option value='" + homematic.regaObjects[functions[func]]["Name"] + "' " + selected + ">" + homematic.regaObjects[functions[func]]["Name"] + "</option>";
            }
            text += "</select>\n";
            if (filter != "all" || devFilter != null || devFilter != "") {
                text += SGI.translate("Disable device filter:") + "<input type='checkbox' id='hmSelectIgnoreFilter' " + (this._ignoreFilter ? "checked" : "") + ">";
            }
            $("#hmSelectFilter").append(text);

            // Ignore filter switch
            $("#hmSelectIgnoreFilter").change(function () {
                hmSelect._ignoreFilter = !hmSelect._ignoreFilter;
                hmSelect._devices = null;
                $('#hmSelect').remove();
                hmSelect.show(hmSelect._homematic, hmSelect._userArg, hmSelect._onsuccess, hmSelect.myFilter, hmSelect.myDevFilter);
            });

            $("#hmSelectLocations").multiselect({
                multiple: false,
                header: false,
                noneSelectedText: false,
                selectedList: 1,
                minWidth: 140,
                height: 200
            });

            $("#hmSelectLocations").change(function () {
                // toggle state
                if (hmSelect._filterLoc != $(this).val()) {
                    hmSelect._filterLoc = $(this).val();
                    hmSelect._filterDevsApply();
                }
            });


            $("#hmSelectFunctions").multiselect({
                multiple: false,
                header: false,
                noneSelectedText: false,
                selectedList: 1,
                minWidth: 140,
                height: 200
            });

            $("#hmSelectFunctions").change(function () {
                // toggle state
                if (hmSelect._filterFunc != $(this).val()) {
                    hmSelect._filterFunc = $(this).val();
                    hmSelect._filterDevsApply();
                }
            });
            if (hmSelect._filterLoc != "") {
                hmSelect._filterDevsApply();
            }
            if (hmSelect._filterFunc != "") {
                hmSelect._filterDevsApply();
            }
        }

        var selectedId = null;


        // Build the data tree together
        if (this.mydata == null) {
            this.mydata = new Array();
            var i = 0;

            // Calculate leafs
            for (var dev in this._devices) {
                if (this._devices[dev].cnt != undefined)
                    break;

                var iCnt = 0;
                for (var chn in this._devices[dev].Channels) {
                    iCnt++;
                    var iDps = 0;
                    for (var dp in this._devices[dev].Channels[chn].DPs) {
                        iDps++;
                        break;
                    }
                    this._devices[dev].Channels[chn].cnt = iDps;
                }
                this._devices[dev].cnt = iCnt;
            }

            // Add all elements
            for (var dev in this._devices) {
                // Try to find room
                if (this._devices[dev].room === undefined || this._devices[dev].room === null) {
                    var arr = new Object();
                    this._devices[dev].room = hmSelect._getRoom(homematic, dev, false);
                }

                // Try to find function
                if (this._devices[dev].func === undefined || this._devices[dev].func === null) {
                    var arr = new Object();
                    this._devices[dev].func = hmSelect._getFunction(homematic, dev, false);
                }

                this.mydata[i] = {
                    id: "" + (i + 1),
                    "Image": "<img src='" + this._getImage(this._devices[dev].HssType) + "' width=25 height=25 />",
                    "Location": this._devices[dev].room,
                    "Interface": this._devices[dev].Interface,
                    "Type": this._devices[dev].HssType,
                    "Function": this._devices[dev].func,
                    "Address": this._devices[dev].Address,
                    "Name": this._convertName(this._devices[dev].Name),
                    "_ID": dev,
                    isLeaf: (this._devices[dev].cnt !== undefined && this._devices[dev].cnt > 0) ? false : true,
                    level: "0",
                    parent: "null",
                    expanded: false,
                    loaded: true
                };
                if (hmSelect.value && this.mydata[i]["_ID"] == hmSelect.value) {
                    selectedId = this.mydata[i].id;
                }
                var _parent = this.mydata[i].id;
                i++;
                for (var chn in this._devices[dev].Channels) {
                    var channel = this._devices[dev].Channels[chn];
                    this.mydata[i] = {
                        id: "" + (i + 1),
                        "Image": "",//"<img src='"+this._getImage(channel.HssType)+"' width=25 height=25 />",
                        "Location": channel.room,
                        "Interface": this._devices[dev].Interface,
                        "Type": channel.HssType,
                        "Function": channel.func,
                        "Address": channel.Address,
                        "Name": this._convertName(channel.Name),
                        "_ID": chn,
                        isLeaf: (channel.cnt !== undefined && channel.cnt > 0) ? false : true,
                        level: "1",
                        parent: _parent,
                        expanded: false,
                        loaded: true
                    };
                    if (hmSelect.value && this.mydata[i]["_ID"] == hmSelect.value) {
                        selectedId = this.mydata[i].id;
                    }
                    var parent1 = this.mydata[i].id;
                    i++;
                    for (var dp in channel.DPs) {
                        var point = channel.DPs[dp];
                        this.mydata[i] = {
                            id: "" + (i + 1),
                            "Image": "",
                            "Location": channel.room,
                            "Interface": this._devices[dev].Interface,
                            "Type": point.ValueUnit,
                            "Function": channel.func,
                            "Address": this._convertName(point.Name),
                            "Name": point.Type,
                            "_ID": dp,
                            isLeaf: true,
                            level: "2",
                            parent: parent1,
                            expanded: false,
                            loaded: true
                        };
                        if (hmSelect.value && this.mydata[i]["_ID"] == hmSelect.value) {
                            selectedId = this.mydata[i].id;
                        }
                        i++;
                    }
                }
            }
        }
        else if (hmSelect.value != null && hmSelect.value != "") {
            // Just find the selected element
            for (var i = 0; i < this.mydata.length; i++) {
                if (this.mydata[i]["_ID"] == hmSelect.value) {
                    selectedId = this.mydata[i].id;
                    break;
                }
            }
        }

        // Create the grid
        $("#hmDevsContent").jqGrid({
            datatype: "jsonstring",
            datastr: this.mydata,
            height: $('#tabs-devs').height() - 35 - $('#hmSelectFilter').height(),
            autowidth: true,
            shrinkToFit: false,
            colNames: ['Id', SGI.translate('Name'), '', SGI.translate('Location'), SGI.translate('Interface'), SGI.translate('Type'), SGI.translate('Function'), SGI.translate('Address'), ''],
            colModel: [
                {name: 'id', index: 'id', width: 1, hidden: true, key: true},
                {name: 'Name', index: 'Name', width: 250, sortable: "text"},
                {name: 'Image', index: 'Image', width: 22, sortable: false, align: "right", search: false},
                {name: 'Location', index: 'Location', width: 110, sorttype: "text", search: false},
                {name: 'Interface', index: 'Interface', width: 80, sorttype: "text"},
                {name: 'Type', index: 'Type', width: 120, sorttype: "text"},
                {name: 'Function', index: 'Function', width: 120, hidden: true, search: false, sorttype: "text"},
                {name: 'Address', index: 'Address', width: 220, sorttype: "text"},
                {name: '_ID', index: '_ID', width: 0, hidden: true},
            ],
            onSelectRow: function (id) {
                value = $("#hmDevsContent").jqGrid('getCell', id, '_ID');
                valueObj = (value != "" && value != null) ? hmSelect._devices[value] : null;

                if (value != null && value != "") {
                    $(":button:contains('" + hmSelect._selectText + "')").prop("disabled", false).removeClass("ui-state-disabled");
                }
            },

            sortname: 'id',
            multiselect: false,
            gridview: false,
            scrollrows: true,
            scroll: 1,
//            treeGrid: true, todo make me faster
            treeGridModel: 'adjacency',
            treedatatype: "local",
            ExpandColumn: 'Name',
            ExpandColClick: true,
            pgbuttons: true,
            viewrecords: true,
            jsonReader: {
                repeatitems: false,
                root: function (obj) {
                    return obj;
                },
                page: function (obj) {
                    return 1;
                },
                total: function (obj) {
                    return 1;
                },
                records: function (obj) {
                    return obj.length;
                }
            }
        });
        // Add the filter column
        $("#hmDevsContent").jqGrid('filterToolbar', {searchOperators: false,
            beforeSearch: function () {
                var searchData = jQuery.parseJSON(this.p.postData.filters);
                hmSelect._filter = searchData;
                hmSelect._filterDevsApply();
            }
        });
        // Select current element
        if (selectedId != null) {
            $("#hmDevsContent").setSelection(selectedId, true);
            $("#" + $("#hmDevsContent").jqGrid('getGridParam', 'selrow')).focus();
        }
        // Show dialog
        $('#hmSelect').dialog("open");
        // Increase dialog because of bug in jqGrid
        $('#hmSelect').dialog("option", "width", 900);
        // Disable "Select" button if nothing selected
        if (selectedId == null) {
            $(":button:contains('" + this._selectText + "')").prop("disabled", true).addClass("ui-state-disabled");
        }
        // Filter items with last filter

        this._filterDevsApply();

    },
    _onResize: function () {
        $('#hmSelect_tabs').width($('#hmSelect').width() - 30);
        $('#hmSelect_tabs').height($('#hmSelect').height() - 12);
        $('#hmSelectFilter').width($('#tabs-devs').width() - 6);

        $('#tabs-devs').width($('#hmSelect_tabs').width() - 6);
        $('#tabs-devs').height($('#hmSelect_tabs').height() - 60);
        $('#tabs-vars').width($('#hmSelect_tabs').width() - 6);
        $('#tabs-vars').height($('#hmSelect_tabs').height() - 60);
        $('#tabs-progs').width($('#hmSelect_tabs').width() - 6);
        $('#tabs-progs').height($('#hmSelect_tabs').height() - 60);

        $("#hmDevsContent").setGridWidth($('#tabs-devs').width() - 6);
        $("#hmDevsContent").setGridHeight($('#tabs-devs').height() - 35 - $('#hmSelectFilter').height());
        $("#hmVarsContent").setGridWidth($('#tabs-vars').width() - 6);
        $("#hmVarsContent").setGridHeight($('#tabs-vars').height() - 35);
        $("#hmProgsContent").setGridWidth($('#tabs-progs').width() - 6);
        $("#hmProgsContent").setGridHeight($('#tabs-progs').height() - 35);
    },
    show: function (homematic, userArg, onSuccess, filter, devFilter) { // onsuccess (userArg, value, valueObj)
        this.start = (new Date()).getTime()
        this._onsuccess = onSuccess;
        this._userArg = userArg;
        this._homematic = homematic;
        // points filter, e.g. 'WORKING' or 'STATE,TEMPERATURE,HUMIDITY'
        if (filter == undefined || filter == null || filter == "") {
            filter = 'all';
        }

        _userArg = userArg || null;
        _onsuccess = onSuccess || null;
        if (!document.getElementById("hmSelect")) {
            $("body").append("<div class='dialog' id='hmSelect' title='" + SGI.translate("Select HM parameter") + "'></div>");
            var text = "<div id='hmSelect_tabs'>";
            text += " <ul>";
            var i = 0;
            if (devFilter == undefined || this._ignoreFilter) {
                if (filter == 'all' || this._ignoreFilter || (filter != 'variables' && filter != 'programs')) {
                    text += " <li><a href='#tabs-devs' id='dev_select'>Devices</a></li>";
                }
                if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'variables'))) {
                    text += " <li><a href='#tabs-vars' id='var_select'>Variables</a></li>";
                }
                if (this._ignoreFilter || (devFilter == undefined && ( filter == 'all' || filter == 'programs'))) {
                    text += " <li><a href='#tabs-progs' id='prog_select'>Functions</a></li>";
                }
                text += " </ul>";
            }
            if (this._ignoreFilter || filter == 'all' || (filter != 'variables' && filter != 'programs')) {
                text += " <div id='tabs-devs' style='padding: 3px'></div>";
            }
            if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'variables'))) {
                text += " <div id='tabs-vars' style='padding: 3px'></div>";
            }
            if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'programs'))) {
                text += " <div id='tabs-progs' style='padding: 3px'></div>";
            }
            text += "</div>";
            $("#hmSelect").append(text);
            if (filter == 'all' || this._ignoreFilter || (filter != 'variables' && filter != 'programs')) {
                $("#tabs-devs").append("<table id='hmDevsContent'></table>");
            }
            if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'variables'))) {
                $("#tabs-vars").append("<table id='hmVarsContent'></table>");
            }
            if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'programs'))) {
                $("#tabs-progs").append("<table id='hmProgsContent'></table>");
            }

            if (filter == 'all' || this._ignoreFilter || (filter != 'variables' && filter != 'programs')) {
                $('#tabs-devs').prepend("<div id='hmSelectFilter' class='ui-widget-header '></div>");
                $('#tabs-devs').prepend("<p id='dashui-waitico'>Please wait...</p>");
            }
            else if (filter == 'variables') {
                $('#tabs-vars').prepend("<p id='dashui-waitico'>Please wait...</p>");
            }
            else
                $('#tabs-progs').prepend("<p id='dashui-waitico'>Please wait...</p>");

            if (filter == 'all' || this._ignoreFilter || (filter != 'variables' && filter != 'programs')) {
                $('#dev_select').click(function (e) {
                    var w = $('#hmSelect').dialog("option", "width");
                    $('#hmSelect').dialog("option", "width", w - 50);
                    $('#hmSelect').dialog("option", "width", w);
                    //hmSelect._onResize ();
                });
            }
            if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'variables'))) {
                $('#var_select').click(function (e) {
                    hmSelect._buildVarsGrid(homematic);
                });
            }
            if (this._ignoreFilter || (devFilter == undefined && (filter == 'all' || filter == 'programs'))) {
                $('#prog_select').click(function (e) {
                    hmSelect._buildProgsGrid(homematic);
                });
            }
        }
        $("#hmSelect_tabs").tabs();

        // Define dialog buttons
        this._selectText = SGI.translate("Select");
        this._cancelText = SGI.translate("Cancel");

        var dialog_buttons = {};
        dialog_buttons[this._selectText] = function () {
            $(this).dialog("close");
            if (_onsuccess)
                _onsuccess(_userArg, value, valueObj);
        }
        dialog_buttons[this._cancelText] = function () {
            $(this).dialog("close");
        }

        $('#hmSelect')
            .dialog({
                resizable: true,
                height: $("body").height() - 100,
                modal: true,
                width: 870,
                resize: function (event, ui) {
                    hmSelect._onResize();
                },
                close: function (event, ui) {
                    $('#hmSelect').remove();
                    $('#hmDevsContent').jqGrid('GridUnload');
                },
                buttons: dialog_buttons
            });
        $('#dashui-waitico').show().css({top: ($("#hmSelect").height() + $('#dashui-waitico').height()) / 2});
        $('#dashui-waitico').hide();
        $('#hmSelect_tabs').width($('#hmSelect').width());
        $('#hmSelect_tabs').height($('#hmSelect').height() - 12);

        $('#tabs-devs').width($('#hmSelect_tabs').width() - 6);
        $('#tabs-devs').height($('#hmSelect_tabs').height() - 60);
        $('#tabs-vars').width($('#hmSelect_tabs').width() - 6);
        $('#tabs-vars').height($('#hmSelect_tabs').height() - 60);
        $('#tabs-progs').width($('#hmSelect_tabs').width() - 6);
        $('#tabs-progs').height($('#hmSelect_tabs').height() - 60);

        this._buildDevicesGrid(homematic, filter, devFilter);
        if (this.value != null && homematic.regaObjects[this.value] != null) {
            if (homematic.regaObjects[this.value]["TypeName"] != undefined && homematic.regaObjects[this.value]["TypeName"] == "VARDP") {
                $('#var_select').trigger("click");
            }
            else if (homematic.regaObjects[this.value]["TypeName"] != undefined && homematic.regaObjects[this.value]["TypeName"] == "PROGRAM") {
                $('#prog_select').trigger("click");
            }
        }
    },
    _filterDevsApply: function () {
        // Custom filter
        var rows = $("#hmDevsContent").jqGrid('getGridParam', 'data');
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                var isShow = true;
                if (rows[i].level != "0")
                    continue;
                if (hmSelect._filter != null) {
                    for (var j = 0; j < hmSelect._filter.rules.length; j++) {
                        if (rows[i][hmSelect._filter.rules[j].field].indexOf(hmSelect._filter.rules[j].data) == -1) {
                            isShow = false;
                            break;
                        }
                    }
                }
                if (isShow && hmSelect._filterLoc != "" && rows[i]['Location'].indexOf(hmSelect._filterLoc) == -1) {
                    isShow = false;
                }
                if (isShow && hmSelect._filterFunc != "" && rows[i]['Function'].indexOf(hmSelect._filterFunc) == -1) {
                    isShow = false;
                }
                $("#" + rows[i].id, "#hmDevsContent").css({display: (isShow) ? "" : "none"});
            }
        }
    },
    _filterProgsApply: function () {
        // Custom filter
        var rows = $("#hmProgsContent").jqGrid('getGridParam', 'data');
        for (var i = 0; i < rows.length; i++) {
            var isShow = true;
            if (rows[i].level != "0")
                continue;
            if (hmSelect._progsFilter != null) {
                for (var j = 0; j < hmSelect._progsFilter.rules.length; j++) {
                    if (rows[i][hmSelect._progsFilter.rules[j].field].indexOf(hmSelect._progsFilter.rules[j].data) == -1) {
                        isShow = false;
                        break;
                    }
                }
            }

            $("#" + rows[i].id, "#hmProgsContent").css({display: (isShow) ? "" : "none"});
        }
    },
    _filterVarsApply: function () {
        // Custom filter
        var rows = $("#hmVarsContent").jqGrid('getGridParam', 'data');
        for (var i = 0; i < rows.length; i++) {
            var isShow = true;
            if (rows[i].level != "0")
                continue;
            if (hmSelect._varsFilter != null) {
                for (var j = 0; j < hmSelect._varsFilter.rules.length; j++) {
                    if (rows[i][hmSelect._varsFilter.rules[j].field].indexOf(hmSelect._varsFilter.rules[j].data) == -1) {
                        isShow = false;
                        break;
                    }
                }
            }

            $("#" + rows[i].id, "#hmVarsContent").css({display: (isShow) ? "" : "none"});
        }
    }
};


(function () {
    $(document).ready(function () {


        try {
            SGI.socket = io.connect($(location).attr('protocol') + '//' + $(location).attr('host'));

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
                SGI.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/regaIndex.json", JSON.stringify(index));

                SGI.socket.emit("getObjects", function (obj) {

                    homematic.regaObjects = obj;
                    SGI.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/Objects.json", JSON.stringify(obj));


                    SGI.socket.emit("getDatapoints", function (data) {
                        SGI.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/Datapoints.json", JSON.stringify(data));


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
                console.log(index);
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

//todo Ordentliches disable sichen was man auch wieder einzelnt enabeln kann
//        $("body").disableSelection();


    });
})(jQuery);