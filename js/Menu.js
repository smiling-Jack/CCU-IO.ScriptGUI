/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */


jQuery.extend(true, SGI, {

    menu_iconbar: function () {
        console.log("Start_Menue-Iconbar");

        $("#menu").menu({position: {at: "left bottom"}});

        $("#ul_theme li a").click(function () {
            $("#theme_css").remove();
            $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + $(this).data('info') + '/jquery-ui-1.10.3.custom.min.css"/>');

            //resize Event auslössen um Slider zu aktualisieren
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);

            storage.set(SGI.str_theme, ($(this).data('info')))
            theme = $(this).data('info');
            SGI.scrollbar_h("", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_h"));
            SGI.scrollbar_v("", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_v"));
            SGI.scrollbar_v("", $("#toolbox_body"), $(".toolbox"), $("#scroll_bar_toolbox"));
        });


        $("#clear_cache").click(function () {
            storage.set(SGI.str_theme, null);
            storage.set(SGI.str_settings, null);
            storage.set(SGI.str_prog, null);
        });

        $("#make_struck").click(function () {
            SGI.make_struc()
        });


        // Icon Bar XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        // Local
        $("#img_save_local").click(function () {
            var data = SGI.make_savedata();
            storage.set(SGI.str_prog, data);
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_open_local").click(function () {
            var data = storage.get(SGI.str_prog);
            console.log(data);
            $.each(data.blocks, function () {
                var type = this.blockId.split("_")[0];
                SGI.counter = this.blockId.split("_")[1];
                var top = this.positionY;
                var left = this.positionX;

                SGI.add_fbs_element(type, top, left);
            });
            SGI.make_fbs_drag();

            SGI.counter = $(data.blocks).length;
            console.log(SGI.counter);

            $.each(data.connections, function () {
                var source = this.pageSourceId;
                var target = this.pageTargetId;
                jsPlumb.connect({uuids: [source, target]});

            });


        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );


        // Ordnen
        $("#img_set_left").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {

                function SortByName(a, b) {
                    var aName = $(a).offset().left;
                    var bName = $(b).offset().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).offset().left - $("#prg_panel").offset().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });

                jsPlumb.repaintEverything();
            }
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_right").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).offset().left;
                    var bName = $(b).offset().left;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).offset().left - $("#prg_panel").offset().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });
                jsPlumb.repaintEverything();
            }
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_top").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).offset().top;
                    var bName = $(b).offset().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).offset().top - $("#prg_panel").offset().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                jsPlumb.repaintEverything();
            }
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_bottom").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).offset().top;
                    var bName = $(b).offset().top;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).offset().top - $("#prg_panel").offset().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                jsPlumb.repaintEverything();
            }
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_steps").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByTop(a, b) {
                    var aName = $(a).offset().top;
                    var bName = $(b).offset().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                function SortByLeft(a, b) {
                    var aName = $(a).offset().left;
                    var bName = $(b).offset().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                var top_list = items.sort(SortByTop);
                var left_list = items.sort(SortByLeft);
                var left = $(left_list[0]).offset().left - $("#prg_panel").offset().left;
                var top = $(top_list[0]).offset().top - $("#prg_panel").offset().top;

                var step = 0;


                $.each(items, function () {
                    $(this).css("left", left + step);
                    $(this).css("top", top + step);

                    top = top + parseInt($(this).css("height").split("px")[0]) + 2;


                    step = step + 30;
                });
                jsPlumb.repaintEverything();
            }

        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        // Scale
        $("#img_set_zoom").click(function () {
            SGI.zoom = 1;
            jsPlumb.setZoom(SGI.zoom);

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_in").click(function () {
            SGI.zoom = SGI.zoom + 0.1;
            jsPlumb.setZoom(SGI.zoom);

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_out").click(function () {
            SGI.zoom = SGI.zoom - 0.1;
            jsPlumb.setZoom(SGI.zoom);

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        console.log("Finish_Menue-Iconbar");
    },

    context_menu: function () {
        console.log("Start_Context_Menu");

        $(document).on('mouseenter', ".context-menu-item", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".context-menu-item", function () {
            $(this).toggleClass("ui-state-focus")

        });


        // .FBS_Element   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.contextMenu({
            selector: '.fbs_element_varinput',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Eingang Hinzufügen",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_input(opt)
                    }
                },
                "Del": {
                    name: "Entfernen",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_element_io',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "ID Auswahl",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_id(opt)
                    }
                },
                "Del": {
                    name: "Entfernen",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del(opt)
                    }
                }
            }
        });

    },

    del: function (opt) {
        var children = $(opt).attr("$trigger").find("div");
        $.each(children, function () {
            var ep = jsPlumb.getEndpoints($(this).attr("id"));

            jsPlumb.detachAllConnections(this);

            if (ep != undefined) {
                jsPlumb.deleteEndpoint($(ep).attr("elementId"));
            }
        });

        $($(opt).attr("$trigger")).remove();

    },

    add_input: function (opt) {

        var id = $($(opt).attr("$trigger")).attr("id");
        var n= id.split("_")[1];
        var type = id.split("_")[0];
        var index = $($("#"+id).find("[id^='left']")).children().length + 1;
        var add_id = type + '_' + n + '_in' + index + '';


        $($("#"+id).find("[id^='left']")).append('\
                <div id="' + add_id + '"  class="div_input ' + type + '_' + n + '_in"><a class="input_font">IN ' + index + '</a></div>\
                ');

        SGI.add_endpoint(add_id, "input");
//        jsPlumb.repaintEverything();

    },

    change_id: function (opt){
        hmSelect.show()
    }
});