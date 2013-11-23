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
        $("#m_neu").click(function () {
            SGI.clear();
        });
        $("#m_save").click(function () {
            if ($("body").find(".ui-dialog").length == 0) {
                SGI.save_ccu_io();
            }
        });
        $("#m_save_as").click(function () {
            if ($("body").find(".ui-dialog").length == 0) {
                SGI.save_as_ccu_io();
            }
        });
        $("#m_open").click(function () {
            if ($("body").find(".ui-dialog").length == 0) {
                SGI.open_ccu_io();
            }
        });

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

            SGI.load_prg(data)


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
            selector: '.fbs_element_trigger',
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

    change_id: function (opt) {
        hmSelect.show(homematic, this.jControl, function (obj, value) {

            var parent = homematic.regaObjects[value]["Parent"];
            var parent_data = homematic.regaObjects[parent];

            $(opt.$trigger).data("hmid", value.toString());
            $(opt.$trigger).find(".div_hmid").text(parent_data.Name.toString());

            $("body").find(".ui-search-input").enableSelection();
        });
    },

    save_as_ccu_io: function () {

        $("body").append('\
            <div id="dialog_save" style="text-align: center" title="Speichern als">\
            <br>\
                <input  id="txt_save" style="width:260px" type="text" /><br><br>\
                <button id="btn_save_ok" style="width:130px">Speichern</button>\
                <button id="btn_save_abbrechen" style="width:130px">Abbrechen</button>\
            </div>');
        $("#dialog_save").dialog({
            height: 180,
            width: 330,
            resizable: false,
            close: function () {
                $("#dialog_save").remove();
            }
        });

        $("#btn_save_ok").button().click(function () {
            var data = SGI.make_savedata();
            if ($("#txt_save").val() == "") {
                alert("Bitte Dateiname eingeben")
            } else {
                try {
                    SGI.socket.emit("writeRawFile", "www/ScriptGUI/prg_Store/" + $("#txt_save").val() + ".prg", JSON.stringify(data));
                    SGI.file_name = $("#txt_save").val();
                } catch (err) {
                    alert("Keine Verbindung zu CCU.io")
                }
                $("#dialog_save").remove();
            }
        });

        $("#btn_save_abbrechen").button().click(function () {
            $("#dialog_save").remove();
        });
    },

    save_ccu_io: function () {
        if (SGI.file_name == "") {
            SGI.save_as_ccu_io()
        } else {
            var data = SGI.make_savedata();
            try {
                SGI.socket.emit("writeRawFile", "www/ScriptGUI/prg_Store/" + SGI.file_name + ".prg", JSON.stringify(data))
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO")
            }
        }

    },

    open_ccu_io: function () {
        var open_file = "";

        try {
            SGI.socket.emit("readdir_stat", SGI.prg_store, function (data) {
                var files = [];


                $("body").append('\
                   <div id="dialog_open" style="text-align: center" title="Öffnen">\
                   <br>\
                       <table id="grid_open"></table>\
                        <br>\
                       <button id="btn_open_ok" style="width:130px">Öffnen</button>\
                       <button id="btn_open_abbrechen" style="width:130px">Abbrechen</button>\
                   </div>');
                $("#dialog_open").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_open").remove();
                    }
                });

                $.each(data, function () {

                    var file = {
                        name: this["file"].split(".")[0],
                        typ: this["file"].split(".")[1],
                        date: this["stats"]["mtime"].split("T")[0],
                        size: this["stats"]["size"]
                    };
                    files.push(file);

                });

                $("#grid_open").jqGrid({
                    datatype: "local",
                    width: 500,
                    height: 330,
                    data: files,
                    forceFit: true,
                    multiselect: false,
                    gridview: false,
                    shrinkToFit: false,
                    scroll: false,
                    colNames: ['Datei', 'Größe', 'Typ', "Datum", "Del"],
                    colModel: [
                        {name: 'name', index: 'name', width: 220, sorttype: "name"},
                        {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                        {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                        {name: 'date', index: 'date', width: 70, sorttype: "name"},
                        {name: 'del', index: 'del', width: 50, align: "left", sortable: false},
                    ],
                    onSelectRow: function (file) {
                        open_file = $("#grid_open").jqGrid('getCell', file, 'name') + "." + $("#grid_open").jqGrid('getCell', file, 'typ');
                    },
                    gridComplete: function () {
                        var ids = jQuery("#grid_open").jqGrid('getDataIDs');
                        for (var i = 0; i < ids.length; i++) {
                            var cl = ids[i];
                            dell = "<input style='height:22px;width:22px;' type='button' value='X' onclick=\"jQuery('#rowed2').editRow('" + cl + "');\" />";
                            $("#grid_open").jqGrid('setRowData', ids[i], {del: dell});
                        }
                    }
                });


                $("#btn_open_abbrechen").button().click(function () {
                    $("#dialog_open").remove();
                });

                $("#btn_open_ok").button().click(function () {
                    SGI.socket.emit("readJsonFile", SGI.prg_store + open_file, function (data) {
                        SGI.clear();
                        SGI.load_prg(data);
                        SGI.file_name = open_file.split(".")[0];
                    });

                    $("#dialog_open").remove();

                });
            });
        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }


    }



});