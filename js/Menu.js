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
        $("#img_iconbar").tooltip();
        $("#menu").menu({position: {at: "left bottom"}});
        $("#m_neu").click(function () {
            SGI.clear();
        });
        $("#m_save").click(function () {
            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
                SGI.save_ccu_io();
            }
        });
        $("#m_save_as").click(function () {
            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
                SGI.save_as_ccu_io();
            }
        });
        $("#m_open").click(function () {
            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
                SGI.open_ccu_io();
            }
        });
        $("#m_example").click(function () {
            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
                SGI.example_ccu_io();
            }
        });
        $("#ul_id_auswahl li a").click(function () {
            $("#id_js").remove();
            $("head").append('<script id="id_js" type="text/javascript" src="js/hmSelect_' + $(this).data('info') + '.js"></script>');

            storage.set("ScriptGUI_idjs", ($(this).data('info')));
        });
        $("#ul_theme li a").click(function () {
            $("#theme_css").remove();
            $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + $(this).data('info') + '/jquery-ui-1.10.4.custom.min.css"/>');

            //resize Event auslössen um Slider zu aktualisieren
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);

            storage.set(SGI.str_theme, ($(this).data('info')));
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

        $("#m_show_script").click(function () {
            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {

                var script = Compiler.make_prg();
                SGI.show_Script(script)
            }
        });
        $("#m_save_script").click(function () {
            SGI.save_Script();
        });
        $("#m_del_script").click(function () {
            SGI.del_script();
        });
        $("#log_prg").click(function () {
        });
        $("#log_sgi").click(function () {
        });
        $("#m_quick-help").click(function () {
            SGI.open_quick_help_dialog()
        });
        $("#m_shortcuts").click(function () {

            if ($("body").find(".shortcuts").length < 1) {

                $("body").append('\
                   <div id="dialog_shortcuts" style="text-align: left ;font-family: Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace" " title="Tastenkominationen">\
                   <div >X &nbsp&nbsp + Mousweel &nbsp&nbsp&nbsp-> Horizontal Scroll</div>\
                   <div >Ctrl + links Klick &nbsp&nbsp -> Schnell Hilfe</div><br>\
                   <div >Entf &nbsp&nbsp -> Alle markierten Bausteine Löschen</div>\
                   </div>');

                $("#dialog_shortcuts").dialog({
                    width: "400px",
                    dialogClass: "shortcuts",
                    close: function () {
                        $("#dialog_shortcuts").remove();
                    }
                });
            }
        });
        $("#m_video").click(function () {
            window.open("http://www.youtube.com/playlist?list=PLsNM5ZcvEidhmzZt_mp8cDlAVPXPychU7", null, "fullscreen=1,status=no,toolbar=no,menubar=no,location=no");

        });

        $("#grid").click(function () {
            var fbs_list = $(".fbs_element");

            $.each(fbs_list, function () {
                var o_left = $(this).position().left / SGI.zoom;
                var o_top = $(this).position().top / SGI.zoom;

                var n_left = parseInt(o_left / SGI.grid + 0.5) * SGI.grid;
                var n_top = parseInt(o_top / SGI.grid + 0.5) * SGI.grid;

                $(this).css({"left": n_left + "px", "top": n_top + "px"})
            })
        });

        // Icon Bar XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        // Local
        $("#img_save_local").click(function () {
            data = SGI.make_savedata();

            storage.set(SGI.str_prog, data);
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_open_local").click(function () {
            var data = storage.get(SGI.str_prog);

            SGI.clear();
            SGI.load_prg(data);

            $(this).effect("highlight")
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
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });

                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            var items = $(".mbs_selected");
            if (items.length > 1) {

                function SortByName(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).effect("highlight")
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
                    var aName = $(a).position().left + $(a).width();
                    var bName = $(b).position().left + $(b).width();
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left + $(items[0]).width();

                $.each(items, function () {
                    $(this).css("left", position - $(this).width());
                });

                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            var items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().left + $(a).width();
                    var bName = $(b).position().left + $(b).width();
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left + $(items[0]).width();

                $.each(items, function () {
                    $(this).css("left", position - $(this).width());
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).effect("highlight")
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
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            var items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).effect("highlight")
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
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            var items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).effect("highlight")
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
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                function SortByLeft(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                var top_list = items.sort(SortByTop);
                var left_list = items.sort(SortByLeft);
                var left = $(left_list[0]).position().left;
                var top = $(top_list[0]).position().top;

                var step = 0;


                $.each(items, function () {
                    $(this).css("left", left + step);
                    $(this).css("top", top + step);

                    top = top + parseInt($(this).css("height").split("px")[0]);


                    step = step + 9;
                });
                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();

            }
            var items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByTop(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                function SortByLeft(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                var top_list = items.sort(SortByTop);
                var left_list = items.sort(SortByLeft);
                var left = $(left_list[0]).position().left;
                var top = $(top_list[0]).position().top;

                var step = 0;


                $.each(items, function () {
                    $(this).css("left", left + step);
                    $(this).css("top", top + step);

                    top = top + parseInt($(this).css("height").split("px")[0]);


                    step = step + 9;
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).effect("highlight")
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

            $.each(SGI.plumb_inst, function (idx) {
                SGI.plumb_inst[idx].setZoom(SGI.zoom);
            });


            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_in").click(function () {
            SGI.zoom = SGI.zoom + 0.1;
            $.each(SGI.plumb_inst, function (idx) {
                SGI.plumb_inst[idx].setZoom(SGI.zoom);
            });
            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });

            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_out").click(function () {
            SGI.zoom = SGI.zoom - 0.1;
            $.each(SGI.plumb_inst, function (idx) {
                SGI.plumb_inst[idx].setZoom(SGI.zoom);
            });

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });

            $(this).effect("highlight");
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_script_engine").click(function () {
            try {
                SGI.socket.emit("reloadScriptEngine");
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO");
            }


            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        // Grid
        $("#img_set_grid_on").click(function () {
                if ($(this).hasClass("ui-state-focus")) {
                    $(this).removeClass("ui-state-focus");

                    SGI.snap_grid = false;
                } else {
                    $(this).addClass("ui-state-focus");

                    SGI.snap_grid = true;
                }
                $(this).effect("highlight")
            }
        );


        $("#img_set_script_play").click(function () {

                    stopsim();
                    simulate();

                    $(this).effect("highlight")

            }
        ).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_script_stop").click(function () {

                stopsim()
                $(this).effect("highlight")
            }
        ).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );


        $("#prg_panel").on("click", ".btn_min_trigger", function () {
            $($(this).parent().parent()).find(".div_hmid_trigger").toggle({
                progress: function () {
                    SGI.plumb_inst.inst_mbs.repaintEverything();
                }
            });

            $(this).effect("highlight");

        });

    },

    context_menu: function () {

        $(document).on('mouseenter', ".context-menu-item", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".context-menu-item", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_font", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_font", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_filter_font", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_filter_font", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_val", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_val", function () {
            $(this).toggleClass("ui-state-focus")

        });

// Body zum debuggen auskommentieren  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.contextMenu({
            selector: 'body',
            items: {
                "body": {
                    name: "body"
                }
            }
        });
        $("body").contextMenu(false);

        // Codebox  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.titel_codebox',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_codebox(opt)
                    }
                }
            }
        });

        // FBS_Element   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_simpel',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_onborder',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs_onborder(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_tr',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        // Trigger   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: ".tr_singel",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_trigger_hmid(opt.$trigger, "singel")
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_val",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_trigger_hmid(opt.$trigger, "val")
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_simpel",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_time",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add Zeit",
                    className: "item_font ",
                    callback: function (key, opt) {
                        var id = $(opt.$trigger).attr("id");
                        PRG.mbs[id]["time"].push("00:00");
                        PRG.mbs[id]["day"].push("*");
                        var $this = $(opt.$trigger).find(".div_hmid_trigger");
                        $($this).children().remove();
                        SGI.add_trigger_time($(opt.$trigger));
                        SGI.plumb_inst.inst_mbs.repaintEverything()

                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_astro",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add Astro",
                    className: "item_font ",
                    callback: function (key, opt) {
                        var id = $(opt.$trigger).attr("id");
                        PRG.mbs[id]["minuten"].push("0");
                        PRG.mbs[id]["astro"].push("sunset");
                        var $this = $(opt.$trigger).find(".div_hmid_trigger");
                        $($this).children().remove();
                        SGI.add_trigger_astro($(opt.$trigger));
                        SGI.plumb_inst.inst_mbs.repaintEverything()

                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_font",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {
//                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.add_trigger_hmid(opt.$trigger.parent().parent())
                    }
                },
                "Del_id": {
                    name: "Entferne ID",
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_trigger_hmid(opt)
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_filter_font",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {

                        SGI.add_filter_device(opt.$trigger.parent().parent());

                    }
                },
                "Del_id": {
                    name: "Entferne ID",
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_device_hmid(opt)
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_val",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent().parent();
                        SGI.add_trigger_hmid(opt.$trigger, "val")
                    }
                },
                "Del_id": {
                    name: "Entferne ID",
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_trigger_val(opt)
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".mbs_element_kommentar",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                },
                "background": {
                    "name": "Hintergrund",
                    className: "item_font ui-corner-all",
                    "items": {
                        "back-red": {
                            className: "item_font",
                            "name": "Rot",
                            callback: function (key, opt) {
                                $(opt.$trigger).css({"background-color": "red"});
                                PRG.mbs[$(opt.$trigger).attr("id")].backcolor = "red";
                            }
                        },
                        "back-green": {
                            className: "item_font",
                            "name": "Grün",
                            callback: function (key, opt) {
                                $(opt.$trigger).css({"background-color": "green"});
                                PRG.mbs[$(opt.$trigger).attr("id")].backcolor = "green";

                            }
                        },
                        "back-yellow": {
                            className: "item_font",
                            "name": "Gelb",
                            callback: function (key, opt) {
                                $(opt.$trigger).css({"background-color": "yellow"});
                                PRG.mbs[$(opt.$trigger).attr("id")].backcolor = "yellow";

                            }
                        },
                        "back-trans": {
                            className: "item_font",
                            "name": "Transparent",
                            callback: function (key, opt) {
                                $(opt.$trigger).css({"background-color": "transparent"});
                                PRG.mbs[$(opt.$trigger).attr("id")].backcolor = "transparent";

                            }
                        }
                    }
                },
                "font": {
                    "name": "Schrift",
                    className: "item_font ui-corner-all",
                    "items": {
                        "font-red": {
                            className: "item_font",
                            "name": "Rot",
                            callback: function (key, opt) {
                                $(opt.$trigger).children().css({"color": "red"});
                                PRG.mbs[$(opt.$trigger).attr("id")].fontcolor = "red";
                            }
                        },
                        "font-green": {
                            className: "item_font",
                            "name": "Grün",
                            callback: function (key, opt) {
                                $(opt.$trigger).children().css({"color": "green"});
                                PRG.mbs[$(opt.$trigger).attr("id")].fontcolor = "green";
                            }
                        },
                        "font-yellow": {
                            className: "item_font",
                            "name": "Gelb",
                            callback: function (key, opt) {
                                $(opt.$trigger).children().css({"color": "yellow"});
                                PRG.mbs[$(opt.$trigger).attr("id")].fontcolor = "yellow";
                            }
                        },
                        "font-white": {
                            className: "item_font",
                            "name": "Weiß",
                            callback: function (key, opt) {
                                $(opt.$trigger).children().css({"color": "white"});
                                PRG.mbs[$(opt.$trigger).attr("id")].fontcolor = "white";
                            }
                        },
                        "font-black": {
                            className: "item_font",
                            "name": "Schwarz",
                            callback: function (key, opt) {
                                $(opt.$trigger).children().css({"color": "black"});
                                PRG.mbs[$(opt.$trigger).attr("id")].fontcolor = "black";
                            }
                        }
                    }
                }
            }
        });

// I/O´s   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_element_i_liste',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "ID Auswahl",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_i_liste(opt)
                    }
                },
                "Del": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_element_io_local',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "ID Auswahl",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_local(opt)
                    }
                },
                "Del": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });


        $.contextMenu({
            selector: '._jsPlumb_connector',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            build: function ($trigger, e) {
                if ($trigger.parent().attr("id") == "prg_panel") {
                    return {
                        className: "ui-widget-content ui-corner-all",
                        items: {
                            "Delay": {
                                name: "Add Pause",
                                className: "item_font ",
                                callback: function (key, opt) {

                                    SGI.add_delay(SGI.con);

                                }
                            },
                            "Del": {
                                name: "Del Pause",
                                className: "item_font ",
                                callback: function (key, opt) {

                                    SGI.del_delay(SGI.con);

                                }
                            }
                        }}
                }

                return  {
                    className: "hide_context",
                    items: {
                        "Delay": {

                        }
                    }
                }
            }

        });

//        $('._jsPlumb_connector').contextMenu({show: function(opt){ this.addClass('currently-showing-menu'); alert("Selector: " + opt.selector); }})


    },

    del_fbs: function (opt) {

        var trigger = $(opt).attr("$trigger");
        var children = $(trigger).find("div");
        var id = $(trigger).attr("id");
        var parent = PRG.fbs[id]["parent"].split("_");

        $.each(children, function () {
            var ep = SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].getEndpoints($(this).attr("id"));

            SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].detachAllConnections(this);

            if (ep != undefined) {
                SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].deleteEndpoint($(ep).attr("elementId"));
            }
        });
        $($(opt).attr("$trigger")).remove();
        delete PRG.fbs[$(trigger).attr("id")];
    },

    del_fbs_onborder: function (opt) {

        var trigger = $(opt).attr("$trigger");
        var id = $(trigger).attr("id");
        var parent = PRG.fbs[id]["parent"].split("_");


        SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].detachAllConnections($(opt.$trigger).attr("id"));
        SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].deleteEndpoint($(opt.$trigger).attr("id"));
        SGI.plumb_inst.inst_mbs.deleteEndpoint($(opt.$trigger).attr("id"));
        $($(opt).attr("$trigger")).remove();
        delete PRG.fbs[$(trigger).attr("id")];
    },

    del_mbs: function (opt) {

        SGI.plumb_inst.inst_mbs.deleteEndpoint($(opt.$trigger).attr("id"));


        $($(opt).attr("$trigger")).remove();
        delete PRG.mbs[$(opt.$trigger).attr("id")];
    },

    del_codebox: function (opt) {
        var $this = $(opt).attr("$trigger");

        if (!$($this).hasClass("mbs_element_codebox")) {
            $this = $(opt).attr("$trigger").parent().parent()
        }


        var children = $($this).find("div");
        $.each(children, function () {
            var ep = SGI.plumb_inst.inst_mbs.getEndpoints($(this).attr("id"));

            SGI.plumb_inst.inst_mbs.detachAllConnections(this);

            if (ep != undefined) {
                SGI.plumb_inst.inst_mbs.deleteEndpoint($(ep).attr("elementId"));
            }

            delete PRG.fbs[$(this).attr("id")];
        });
        $($this).remove();
        delete PRG.mbs[$($this).attr("id")];
    },

    del_selected: function () {

        var mbs_sel = $(".mbs_selected");
        var fbs_sel = $(".fbs_selected");
        var opt = {};

        $.each(fbs_sel, function () {

            if ($(this).hasClass("fbs_element_onborder")) {
                opt.$trigger = this;
                SGI.del_fbs_onborder(opt)

            } else {
                opt.$trigger = this;
                SGI.del_fbs(opt)
            }
        });

        $.each(mbs_sel, function () {

            if ($(this).hasClass("mbs_element_codebox")) {
                opt.$trigger = this;
                SGI.del_codebox(opt)

            } else {
                opt.$trigger = this;
                SGI.del_mbs(opt)
            }


        });

    },

    change_id: function (opt) {


        $.id_select({
            type: "singel",
            close: function (hmid) {
                if (hmid != null) {

                    console.log(hmid)
                    var _name = SGI.get_name(hmid);

                    PRG.fbs[$(opt.$trigger).attr("id")]["hmid"] = hmid;

                    $(opt.$trigger).find(".div_hmid").text(_name);
                    PRG.fbs[$(opt.$trigger).attr("id")]["name"] = _name;

                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });

    },

    change_i_liste: function (opt) {

        $.id_select({
            type: "groups",
            close: function (hmid) {
                if (hmid != null) {

                    var _name = SGI.get_name(hmid);
                    PRG.fbs[$(opt.$trigger).attr("id")]["hmid"] = hmid;
                    $(opt.$trigger).find(".div_hmid").text(_name);
                    PRG.fbs[$(opt.$trigger).attr("id")]["name"] = _name;
                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });

    },

    change_o_liste: function (opt) {

        $.id_select({
            type: "obj",
            close: function (hmid) {
                if (hmid != null) {

                    var _name = SGI.get_name(hmid);
                    PRG.fbs[$(opt.$trigger).attr("id")]["hmid"] = hmid;
                    $(opt.$trigger).find(".div_hmid").text(_name);
                    PRG.fbs[$(opt.$trigger).attr("id")]["name"] = _name;
                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });

    },

    change_local: function (opt) {

        $.id_select({
            type: "local",
            close: function (hmid) {
                if (hmid != null) {


                    PRG.fbs[$(opt.$trigger).attr("id")]["hmid"] = hmid;
                    $(opt.$trigger).find(".div_hmid").text(hmid);
                    PRG.fbs[$(opt.$trigger).attr("id")]["name"] = hmid;
                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });

    },

    del_trigger_hmid: function (opt) {
        var parrent = $(opt.$trigger).data("info");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, PRG.mbs[parrent]["name"]);

        PRG.mbs[parrent]["name"].splice(index, 1);
        PRG.mbs[parrent]["hmid"].splice(index, 1);


        $(opt.$trigger).remove();
        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    del_device_hmid: function (opt) {
        var parrent = $(opt.$trigger).data("info");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, PRG.fbs[parrent]["name"]);

//        PRG.fbs[parrent]["name"].splice(index, 1);
        PRG.fbs[parrent]["hmid"].splice(index, 1);


        $(opt.$trigger).remove();
        console.log(parrent)
        SGI.plumb_inst["inst_" + $("#" + parrent).parent().parent().attr("id")].repaintEverything();
    },

    del_trigger_val: function (opt) {
        var parrent = $(opt.$trigger).data("info");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, PRG.mbs[parrent]["name"]);

        PRG.mbs[parrent]["name"].splice(index, 1);
        PRG.mbs[parrent]["hmid"].splice(index, 1);
        PRG.mbs[parrent]["val"].splice(index, 1);
        PRG.mbs[parrent]["wert"].splice(index, 1);


        $(opt.$trigger).parent().remove();
        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    save_as_ccu_io: function () {

        try {
            SGI.socket.emit("readdirStat", SGI.prg_store, function (data) {
                var files = [];
                var sel_file = "";

                $("body").append('\
                   <div id="dialog_save" style="text-align: center" title="Speichern als">\
                   <br>\
                       <table id="grid_save"></table>\
                        <br>\
                       <input  id="txt_save" type="text" /><br><br>\
                       <button id="btn_save_ok" >Speichern</button>\
                       <button id="btn_save_del" >Löschen</button>\
                       <button id="btn_save_abbrechen" >Abbrechen</button>\
                   </div>');

                $("#dialog_save").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_save").remove();
                    }
                });

                if (data != undefined) {
                    $.each(data, function () {

                        var file = {
                            name: this["file"].split(".")[0],
                            typ: this["file"].split(".")[1],
                            date: this["stats"]["mtime"].split("T")[0],
                            size: this["stats"]["size"]
                        };
                        files.push(file);

                    });
                }
                $("#grid_save").jqGrid({
                    datatype: "local",
                    width: 495,
                    height: 280,
                    data: files,
                    forceFit: true,
                    multiselect: false,
                    gridview: false,
                    shrinkToFit: false,
                    scroll: false,
                    colNames: ['Datei', 'Größe', 'Typ', "Datum" ],
                    colModel: [
                        {name: 'name', index: 'name', width: 245, sorttype: "name"},
                        {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                        {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                        {name: 'date', index: 'date', width: 110, sorttype: "name"}
                    ],
                    onSelectRow: function (file) {
                        sel_file = $("#grid_save").jqGrid('getCell', file, 'name') + "." + $("#grid_save").jqGrid('getCell', file, 'typ');
                        $("#txt_save").val($("#grid_save").jqGrid('getCell', file, 'name'));
                    }
                });


                $("#btn_save_ok").button().click(function () {
                    SGI.make_savedata();
                    if ($("#txt_save").val() == "") {
                        alert("Bitte Dateiname eingeben")
                    } else {
                        try {
                            SGI.socket.emit("writeRawFile", "www/ScriptGUI/prg_Store/" + $("#txt_save").val() + ".prg", JSON.stringify(PRG.valueOf()));
                            SGI.file_name = $("#txt_save").val();
                            $("#m_file").text(SGI.file_name);

                        } catch (err) {
                            alert("Keine Verbindung zu CCU.io")
                        }
                        $("#dialog_save").remove();
                    }
                });
                $("#btn_save_del").button().click(function () {
                    row_id = $("#grid_save").jqGrid('getGridParam', 'selrow');
                    SGI.socket.emit("delRawFile", SGI.prg_store + sel_file, function (ok) {
                        if (ok == true) {
                            $("#grid_save").delRowData(row_id);
                            $("#txt_save").val("");
                        } else {
                            alert("Löschen nicht möglich");
                        }
                    })
                });

                $("#btn_save_abbrechen").button().click(function () {
                    $("#dialog_save").remove();
                });
            });

        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }
    },

    save_ccu_io: function () {
        if (SGI.file_name == "") {
            SGI.save_as_ccu_io()
        } else {
            SGI.make_savedata();
            try {
                SGI.socket.emit("writeRawFile", SGI.prg_store + SGI.file_name + ".prg", JSON.stringify(PRG.valueOf()));
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO")
            }
        }
    },

    open_ccu_io: function () {
        var sel_file = "";

        try {
            SGI.socket.emit("readdirStat", SGI.prg_store, function (data) {
                var files = [];


                $("body").append('\
                   <div id="dialog_open" style="text-align: center" title="Öffnen">\
                   <br>\
                       <table id="grid_open"></table>\
                        <br>\
                       <button id="btn_open_ok" >Öffnen</button>\
                       <button id="btn_open_del" >Löschen</button>\
                       <button id="btn_open_abbrechen" >Abbrechen</button>\
                   </div>');
                $("#dialog_open").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_open").remove();
                    }
                });

                if (data != undefined) {
                    $.each(data, function () {

                        var file = {
                            name: this["file"].split(".")[0],
                            typ: this["file"].split(".")[1],
                            date: this["stats"]["mtime"].split("T")[0],
                            size: this["stats"]["size"]
                        };
                        files.push(file);

                    });
                }

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
                    colNames: ['Datei', 'Größe', 'Typ', "Datum"],
                    colModel: [
                        {name: 'name', index: 'name', width: 240, sorttype: "name"},
                        {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                        {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                        {name: 'date', index: 'date', width: 100, sorttype: "name"}
                    ],
                    onSelectRow: function (file) {
                        sel_file = $("#grid_open").jqGrid('getCell', file, 'name') + "." + $("#grid_open").jqGrid('getCell', file, 'typ');
                    }
                });


                $("#btn_open_abbrechen").button().click(function () {
                    $("#dialog_open").remove();
                });

                $("#btn_open_del").button().click(function () {
                    row_id = $("#grid_open").jqGrid('getGridParam', 'selrow');
                    SGI.socket.emit("delRawFile", SGI.prg_store + sel_file, function (ok) {
                        if (ok == true) {
                            $("#grid_open").delRowData(row_id);
                        } else {
                            alert("Löschen nicht möglich");
                        }
                    })
                });

                $("#btn_open_ok").button().click(function () {
                    SGI.socket.emit("readJsonFile", SGI.prg_store + sel_file, function (data) {
                        SGI.clear();
                        SGI.load_prg(data);
                        SGI.file_name = sel_file.split(".")[0];
                        $("#m_file").text(SGI.file_name);
                    });
                    $("#dialog_open").remove();
                });
            });
        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }
    },

    example_ccu_io: function () {
        var sel_file = "";

        try {
            SGI.socket.emit("readdirStat", SGI.example_store, function (data) {
                var files = [];


                $("body").append('\
                   <div id="dialog_open" style="text-align: center" title="Öffnen">\
                   <br>\
                       <table id="grid_open"></table>\
                        <br>\
                       <button id="btn_open_ok" >Öffnen</button>\
                       <button id="btn_open_del" >Löschen</button>\
                       <button id="btn_open_abbrechen" >Abbrechen</button>\
                   </div>');
                $("#dialog_open").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_open").remove();
                    }
                });

                if (data != undefined) {
                    $.each(data, function () {

                        var file = {
                            name: this["file"].split(".")[0],
                            typ: this["file"].split(".")[1],
                            date: this["stats"]["mtime"].split("T")[0],
                            size: this["stats"]["size"]
                        };
                        files.push(file);

                    });
                }

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
                    colNames: ['Datei', 'Größe', 'Typ', "Datum"],
                    colModel: [
                        {name: 'name', index: 'name', width: 240, sorttype: "name"},
                        {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                        {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                        {name: 'date', index: 'date', width: 100, sorttype: "name"}
                    ],
                    onSelectRow: function (file) {
                        sel_file = $("#grid_open").jqGrid('getCell', file, 'name') + "." + $("#grid_open").jqGrid('getCell', file, 'typ');
                    }
                });


                $("#btn_open_abbrechen").button().click(function () {
                    $("#dialog_open").remove();
                });

                $("#btn_open_del").button().click(function () {
                    row_id = $("#grid_open").jqGrid('getGridParam', 'selrow');
                    SGI.socket.emit("delRawFile", SGI.prg_store + sel_file, function (ok) {
                        if (ok == true) {
                            $("#grid_open").delRowData(row_id);
                        } else {
                            alert("Löschen nicht möglich");
                        }
                    })
                });

                $("#btn_open_ok").button().click(function () {
                    SGI.socket.emit("readJsonFile", SGI.example_store + sel_file, function (data) {
                        SGI.clear();
                        SGI.load_prg(data);
                        SGI.file_name = "";
                        $("#m_file").text("neu");
                    });
                    $("#dialog_open").remove();
                });
            });
        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }
    },

    save_Script: function () {
        var script = Compiler.make_prg();
        if (SGI.file_name == undefined || SGI.file_name == "Neu" || SGI.file_name == "") {
            alert("Bitte erst Programm Speichern")
        } else {
            try {
                SGI.socket.emit("writeRawFile", "scripts/" + SGI.file_name + ".js", script);
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO")
            }
        }
    },

    del_script: function () {
        var sel_file = "";

        try {
            SGI.socket.emit("readdirStat", "scripts/", function (data) {

                var files = [];

                $("body").append('\
                   <div id="dialog_del_script" style="text-align: center" title="Script löschen">\
                   <br>\
                       <table id="grid_del_script"></table>\
                        <br>\
                       <button id="btn_del_script" >Löschen</button>\
                   </div>');
                $("#dialog_del_script").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_del_script").remove();
                    }
                });

                if (data != undefined && data.length != 0) {

                    $.each(data, function () {
                        if (this.file != "global.js") {
                            var file = {
                                name: this["file"].split(".")[0],
                                typ: this["file"].split(".")[1],
                                date: this["stats"]["mtime"].split("T")[0],
                                size: this["stats"]["size"]
                            };
                            files.push(file);
                        }
                    });
                }

                $("#grid_del_script").jqGrid({
                    datatype: "local",
                    width: 485,
                    height: 330,
                    data: files,
                    forceFit: true,
                    multiselect: false,
                    gridview: false,
                    shrinkToFit: false,
                    scroll: false,
                    colNames: ['Datei', 'Größe', 'Typ', "Datum"],
                    colModel: [
                        {name: 'name', index: 'name', width: 240, sorttype: "name"},
                        {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                        {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                        {name: 'date', index: 'date', width: 100, sorttype: "name"}
                    ],
                    onSelectRow: function (file) {
                        sel_file = $("#grid_del_script").jqGrid('getCell', file, 'name') + "." + $("#grid_del_script").jqGrid('getCell', file, 'typ');
                    }
                });

                $("#btn_del_script").button().click(function () {
                    row_id = $("#grid_del_script").jqGrid('getGridParam', 'selrow');
                    SGI.socket.emit("delRawFile", "scripts/" + sel_file, function (ok) {
                        if (ok == true) {
                            $("#grid_del_script").delRowData(row_id);
                        } else {
                            alert("Löschen nicht möglich");
                        }
                    })
                });
            });
        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }

    },

    show_Script: function (data) {

        var h = $(window).height() - 200;
        var v = $(window).width() - 400;

        $("body").append('\
                   <div id="dialog_code" style="text-align: center" title="Scriptvorschau">\
                    <textarea id="codemirror" name="codemirror" class="code frame_color ui-corner-all"></textarea>\
                   </div>');
        $("#dialog_code").dialog({
            height: h,
            width: v,
            resizable: true,
            close: function () {
                $("#dialog_code").remove();
            }
        });

        var editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
            mode: {name: "javascript", json: true},
//            value:data.toString(),
            lineNumbers: true,
            readOnly: true,
            theme: "monokai"

        });

        editor.setOption("value", data.toString());
    },

    info_box: function (data) {

        var _data = data.split("\n").join("<br />");

        $("body").append('\
                   <div id="dialog_info" style="text-align: center" title="Info">\
                   <br>\
                   <span>' + _data + '</span>\
                   <br>\
                   <button id="btn_info_close" >Schliesen</button>\
                   </div>');

        $("#dialog_info").dialog({
//            modal: true,
            dialogClass: "info_box",
            maxHeight: "80%",

            close: function () {
                $("#dialog_info").remove();
            }
        });
        $("#btn_info_close").button().click(function () {
            $("#dialog_open").remove();
        });


    },

    open_quick_help_dialog: function () {

        if ($("body").find(".quick-help").length < 1) {

            $("body").append('\
                   <div id="dialog_quick-help" style="text-align: center, " title="Quick Help">\
                   <div id="help-content"></div>\
                   </div>');

            $("#dialog_quick-help").dialog({

                dialogClass: "quick-help",
                close: function () {
                    $("#dialog_quick-help").remove();
                }
            });

            $(".quick-help").css({
                position: "absolute",
                top: "51px",
                left: "auto",
                right: "21px",
                width: "200px"

            })
        }

    },

    quick_help: function () {

        $(document).click(function (elem) {
            SGI.klick = elem;
            var help = {
                und: '<div class="quick-help_content"           id="und">              <H2>Und:</H2>                   <p>Logische Verknüpfung wenn alle Eingänge 1 sind ist der Ausgang auch 1 </p></div>',
                oder: '<div class="quick-help_content"          id="oder">             <H2>Oder:</H2>                  <p>Logische Verknüpfung wenn ein Eingänge 1 sind ist der Ausgang auch 1 </p></div>',
                not: '<div class="quick-help_content"           id="not">              <H2>Not:</H2>                   <p>Logische Negierung wenn der Eingang 1 ist, ist der Ausgang 0 und umgekehrt </p></div>',
                verketten: '<div class="quick-help_content"     id="verketten">        <H2>Verketten:</H2>             <p>Verbindet zB. mehrere Texte miteinander </p></div>',
                input: '<div class="quick-help_content"         id="input">            <H2>Get:</H2>                   <p>Liest den aktuellen Wert der Hinterlegten ID von CCU.IO</p></div>',
                inputliste: '<div class="quick-help_content"    id="inputliste">       <H2>Get Liste:</H2>            <p>Erstellt eine Channel ID Liste entsprechend der auswahl</p></div>',
                inputlocal: '<div class="quick-help_content"    id="inputlocal">       <H2>Get Local:</H2>             <p>Liest den aktuellen Wert der localen Variable ein</p></div>',
                output: '<div class="quick-help_content"        id="output">           <H2>Set:</H2>                   <p>Setzt den Wert der Hinterlegten ID über CCU.IO</p></div>',
                outputlocal: '<div class="quick-help_content"   id="outputlocal">      <H2>Set Local:</H2>             <p>Setzt den Wert der Hinterlegten localen Variable</p></div>',
                mail: '<div class="quick-help_content"          id="mail">             <H2>Mail:</H2>                  <p>Versendet eine E-Mail<br><br><b>Zur nutzung muss der E-Mail Adapter in CCU.IO aktiviert sein </p></div>',
                debugout: '<div class="quick-help_content"      id="debugout">         <H2>CCU.IO LOG:</H2>            <p>Schreibt seinen Wert ins CCU.IO Log <br><br> Logeintrag sieht wie folgt aus:<br>Scriptnamen prg_codebox_n -> WERT  </p></div>',
                "true": '<div class="quick-help_content"        id="true">             <H2>Wahr:</H2>                  <p>Der Ausgang ist 1</p></div>',
                "false": '<div class="quick-help_content"       id="false">            <H2>Falsch:</H2>                <p>Der Ausgang ist 0</p></div>',
                zahl: '<div class="quick-help_content"          id="zahl">             <H2>Zahl:</H2>                  <p>Der Ausgang entspricht der eingegebenen Zahl<br><br>Als eingabe sind nur Nummern möglich, das Dezimaltrennzeichen ist "." zb. 123.45 </p></div>',
                string: '<div class="quick-help_content"        id="string">           <H2>Text:</H2>                  <p>Der Ausgang entspricht dem eingegebenen Text. Durch "Enter" hinzugefügte Zeilenumbrüche werden als Leerzeichen übernommen. Zusätzliche können Zeilenumbrüche durch \\n und Leerzeichen durch \\f hinzugefügt werden</p></div>',
                vartime: '<div class="quick-help_content"       id="vartime">          <H2>Zeit:</H2>                  <p>Der Ausgang entspricht z.B. :<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:JJ = 15.1.2014<br>TT:MM:JJ hh:mm = 15.1.2014 22:45<br>Minute = 54<br>Stunde = 22<br>KW = 3<br>Wochentag = Mittwoch<br>Monat = Januar</p></div>',
                trigvalue: '<div class="quick-help_content"     id="trigvalue">        <H2>Trigger Wert:</H2>          <p>Entspricht dem Wert des auslösenden Triggers, zum Auslösezeitpunkt <br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigtime: '<div class="quick-help_content"      id="trigtime">         <H2>Trigger Zeit:</H2>          <p>Zeitstempel der Auslösung<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigoldvalue: '<div class="quick-help_content"  id="trigoldvalue">     <H2>Trigger alter Wert:</H2>    <p></p></div>',
                trigoldtime: '<div class="quick-help_content"   id="trigoldtime">      <H2>Trigger alte Zeit:</H2>     <p>Zeitstempel letzten auslösing Auslösung<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigid: '<div class="quick-help_content"        id="trigid">           <H2>Trigger ID:</H2>            <p>ID des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigname: '<div class="quick-help_content"      id="trigname">         <H2>Trigger Name:</H2>          <p>Name des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigtype: '<div class="quick-help_content"      id="trigtype">         <H2>Trigger Type:</H2>          <p>Type des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigdevid: '<div class="quick-help_content"     id="trigdevid">        <H2>Trigger Geräte ID:</H2>     <p>Geräte ID des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigdevname: '<div class="quick-help_content"   id="trigdevname">      <H2>Trigger Geräte Name:</H2>   <p>Geräte Name des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                trigdevtype: '<div class="quick-help_content"   id="trigdevtype">      <H2>Trigger Geräte Type:</H2>   <p>Geräte Type des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger</p></div>',
                codebox: '<div class="quick-help_content"       id="codebox">          <H2>Programm Box:</H2>          <p>Programmboxen bilden die Basis von jedem Script und müssen immer mit mindestens einem Trigger verbunden sein.<br><br>In einer Programmbox werden dann die Funktionsbausteine, per Drag und Drop, aus der Toolbox platziert.   </p></div>',
                next: '<div class="quick-help_content"          id="next">             <H2>Weiter:</H2>                <p>Ruft eine weitere Programmboxen auf <br><br>Hinweis:<br>Verbindungen können eine Pause enthalten</p></div>',
                next1: '<div class="quick-help_content"         id="next1">            <H2>Weiter 1:</H2>             <p>Ruft eine weitere Programmboxen auf wenn der Eingang 1 oder true ist <br><br>Hinweis:<br>Verbindungen können eine Pause enthalten</p></div>',
                komex: '<div class="quick-help_content"         id="komex">            <H2>Kommentar:</H2>             <p>Kommentarbox ohne weitere Funktion</p></div>',
                ccuobj: '<div class="quick-help_content"        id="ccuobj">           <H2>CCU.IO Object:</H2>         <p>Legt eine Variable in CCU.IO an.<br><br> Dies kan ein einzelner Wert, Text oder auch eine Liste vieler Werte/Texte sein.<br><br> Hinweis:<br> Beim neustarten der Scriptengine verliert diese Variable ihren Wert ! </p></div>',
                trigger_event: '<div class="quick-help_content" id="trigger_event">    <H2>Trigger --:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird</p></div>',
                trigger_EQ: '<div class="quick-help_content"    id="trigger_EQ">       <H2>Trigger EQ:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert gleich geblieben ist</p></div>',
                trigger_NE: '<div class="quick-help_content"    id="trigger_NE">       <H2>Trigger NE:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert sich geändert hat</p></div>',
                trigger_GT: '<div class="quick-help_content"    id="trigger_GT">       <H2>Trigger GT:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert größer geworden ist</p></div>',
                trigger_GE: '<div class="quick-help_content"    id="trigger_GE">       <H2>Trigger GE:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert größer geworden oder gleich geblieben ist</p></div>',
                trigger_LT: '<div class="quick-help_content"    id="trigger_LT">       <H2>Trigger LT:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert kleiner geworden ist</p></div>',
                trigger_LE: '<div class="quick-help_content"    id="trigger_LE">       <H2>Trigger LE:</H2>            <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert kleiner geworden gleich geblieben ist</p></div>',
                trigger_valNe: '<div class="quick-help_content" id="trigger_valNe">    <H2>Trigger valNE:</H2>         <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und nicht 0 ist</p></div>',
                trigger_val: '<div class="quick-help_content"   id="trigger_val">      <H2>Trigger VAL:</H2>           <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und gemäß Auswahl dem eingegebenen Wert entspricht oder nicht<br><br><b>Mögliche Eingabe Wert:</b><br>z.B. true false 1 -2 345 67.89 "text" </p></div>',
                trigger_time: '<div class="quick-help_content"  id="trigger_time">     <H2>Trigger Zeit:</H2>          <p>Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Mögliche eingaben zb. 20:01, 9:00, 2:3, ... </p></div>',
                trigger_zykm: '<div class="quick-help_content"  id="trigger_zykm">     <H2>Trigger Zyklus M:</H2>      <p>Dieser Trigger fürt die Verbundenen Programmboxen alle X Minuten nach Scriptengine Start aus </p></div>',
                trigger_astro: '<div class="quick-help_content" id="trigger_astro">    <H2>Trigger Astro:</H2>         <p>Dieser Trigger fürt die Verbundenen Programmboxen entsprechent dem Sonnenstand aus. <br><br> Hinweis:<br>Die Längen- und Breitengradeinstellungen in den CCU.IO Einstellungen beachten.<br><br><b>Shift:</b><br>Offset für den Astrozeitpunkt. Es sind auch negative Eingaben möglich <br><br><b>Sonnenaufgang Start:</b><br> Sonne erschein am Horizont<br><b>Sonnenaufgang Ende:</b><br> Sonne ist voll am Horizont zu sehen<br><b>Höchster Sonnenstand:</b><br>Sonne ist am höchsten Punkt<br><b>Sonnenuntergang Start:</b><br>Sonne berührt den Horizont<br><b>Sonnenuntergang Ende:</b><br> Sonne ist Voll untergegangen<br><b>Nacht Start:</b><br> Beginn der astronomischen Nacht<br><b>Nacht Ende:</b><br> Ende der astronomischen Nacht<br><b>Dunkelster moment:</b><br> Sonne ist am tiefsten Punkt</p></div>',
                trigger_start: '<div class="quick-help_content" id="trigger_start">    <H2>Trigger Start:</H2>         <p>Dieser Trigger fürt die Verbundenen Programmboxen einmalig beim Start/Neustart der Scriptengine aus</p></div>',
                delay: '<div class="quick-help_content"         id="delay">            <H2>Pause:</H2>                 <p>Dieser Baustein verzögert den Aufruf der Programbox um die eingegebenen <b>Sekunden</b>.<br><br>Mögliche Eingaben:<br>0.001 bis 99999.999</p></div>',
                wenn: '<div class="quick-help_content"          id="wenn">             <H2>Wenn:</H2>                  <p>Dieser Baustein Vergleicht den Eingang In mit dem Rev und giebt bei erfüllung 1 aus<br><br>Mögliche Vergleichsoperatoren:<br>= &nbsp: In <b>gleich</b> Rev<br>!= : In <b>ungleich</b> Rev<br>< &nbsp: In <b>kleiner</b> Rev<br>> &nbsp: In <b>größer</b> Rev<br><=: In <b>kleiner gleich</b> Rev<br>>=: In <b>größer gleich</b> Rev<br><br>Hinweis:<br> Beim Vergleichen von Zeit ist:<br>10:00 <b>kleiner</b> 9:00<br>und:<br>10:00 <b>größer</b> 09:00</p></div>'

            };

            //   console.log("Keynumber: " + SGI.key);
            if (SGI.key == 17) {
                SGI.open_quick_help_dialog();
                $("#help-content").children().remove();

                if ($(elem.target).hasClass("fbs_element") || $(elem.target).hasClass("mbs_element")) {
                    var type = "";
                    if ($(elem.target).attr("id").split("_")[0] == "trigger") {
                        type = $(elem.target).attr("id").split("_")[0] + "_" + $(elem.target).attr("id").split("_")[1];
                    } else {
                        type = $(elem.target).attr("id").split("_")[0];
                    }

                    $("#help-content").append(help[type]);
                } else {
                    $.each($(elem.target).parents(), function () {
                        if ($(this).hasClass("fbs_element") || $(this).hasClass("mbs_element")) {

                            if ($(this).attr("id").split("_")[0] == "trigger") {
                                type = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                            } else {
                                type = $(this).attr("id").split("_")[0];
                            }
                            $("#help-content").append(help[type]);
                            return false
                        }
                        if ($(this).hasClass("_jsPlumb_overlay")) {
                            type = $(this).attr("id").split("_")[0];
                            $("#help-content").append(help[type]);
                            return false
                        }
                    });
                }

                if ($(elem.target).parent().hasClass("fbs") || $(elem.target).parent().hasClass("mbs")) {
                    var type = $(elem.target).parent().attr("id");
                    $("#help-content").append(help[type]);
                }

            }
        });
    }
});
