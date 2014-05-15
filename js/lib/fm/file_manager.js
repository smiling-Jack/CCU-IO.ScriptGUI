/**
 * Copyright (c) 2014 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

var fm_scriptEls = document.getElementsByTagName('script');
var fm_thisScriptEl = fm_scriptEls[fm_scriptEls.length - 1];
var fm_Folder = fm_thisScriptEl.src.substr(0, fm_thisScriptEl.src.lastIndexOf('/') + 1);


(function ($) {
    $.fm = function (options, callback) {

        var o = {
            path: options.path || "/",
            filter: options.filter || [],
            mode: options.mode || "table",
            data: undefined,
            audio: ["mp3","wav"]

        };


        var sel_file = "";

        function load(path) {
//            try {
//                SGI.socket.emit("readdirStat", path, function (data) {
//                    o.data = data;
            o.data = [
                {"file": ".gitignore", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 145220, "size": 29, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "README.md", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159085, "size": 25314, "blocks": 56, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "adapter", "stats": {"dev": 45826, "mode": 16895, "nlink": 31, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159091, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:40.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "backup.png", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 150243, "size": 10479, "blocks": 24, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "binrpc.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159081, "size": 21404, "blocks": 48, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "ccu.io-server.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159083, "size": 1206, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "ccu.io.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159082, "size": 78813, "blocks": 160, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "ccu.io.pid", "stats": {"dev": 45826, "mode": 33206, "nlink": 1, "uid": 1000, "gid": 1000, "rdev": 0, "blksize": 4096, "ino": 160407, "size": 5, "blocks": 8, "atime": "2014-05-03T12:52:33.000Z", "mtime": "2014-05-03T12:52:33.000Z", "ctime": "2014-05-03T12:52:33.000Z"}},
                {"file": "cert", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160402, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:10.000Z", "mtime": "2014-04-30T00:46:10.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "datastore", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160405, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:10.000Z", "mtime": "2014-05-03T12:52:33.000Z", "ctime": "2014-05-03T12:52:33.000Z"}},
                {"file": "doc", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160441, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:11.000Z", "mtime": "2014-04-30T00:46:11.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "log", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160442, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:11.000Z", "mtime": "2014-05-03T12:52:33.000Z", "ctime": "2014-05-03T12:52:33.000Z"}},
                {"file": "logger.mp3", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159084, "size": 2458, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "node_modules", "stats": {"dev": 45826, "mode": 16895, "nlink": 63, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160448, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:11.000Z", "mtime": "2014-04-30T00:46:34.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "rega.wav", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159086, "size": 10258, "blocks": 24, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "regascripts", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166343, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:25.000Z", "mtime": "2014-04-30T00:50:25.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "script-engine.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159088, "size": 33267, "blocks": 72, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "scripts", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166356, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:26.000Z", "mtime": "2014-05-03T12:48:07.000Z", "ctime": "2014-05-03T12:48:07.000Z"}},
                {"file": "settings-dist.json", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159090, "size": 1513, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "settings.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159087, "size": 3342, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "tmp", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166362, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:26.000Z", "mtime": "2014-05-04T00:16:46.000Z", "ctime": "2014-05-04T00:16:46.000Z"}},
                {"file": "tools", "stats": {"dev": 45826, "mode": 16895, "nlink": 3, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166366, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:26.000Z", "mtime": "2014-04-30T00:50:26.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "update-addon.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159089, "size": 2045, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "update-self.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 135666, "size": 1744, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
                {"file": "www", "stats": {"dev": 45826, "mode": 16895, "nlink": 7, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166371, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:27.000Z", "mtime": "2014-04-30T01:19:09.000Z", "ctime": "2014-04-30T01:19:09.000Z"}}
            ];
            build(o);

//                });
//            } catch (err) {
//                alert("Keine Verbindung zu CCU.IO");
//                console.log(err)
//            }
        }

        function build(o) {

            $(".fm_files").empty();
            $("#fm_table_head").remove();


            if (o.data != undefined && o.mode == "table") {

                $('\
            <div id="fm_table_head">\
             <button id="fm_table_head_name" >Name</button>\
             <button id="fm_table_head_type" >Type</button>\
             <button id="fm_table_head_datum" >Datum</button>\
            </div>').insertAfter(".fm_iconbar");

                $("#fm_table_head_name").button().click(function () {
                    $("#fm_th_name").trigger("click")
                });
                $("#fm_table_head_type").button().click(function () {
                    $("#fm_th_type").trigger("click")
                });
                $("#fm_table_head_datum").button().click(function () {
                    $("#fm_th_datum").trigger("click")
                });


                $(".fm_files").append('\
                <table id="fm_table"  width="560px">\
                   <tbody width="560px" class="fm_file_table">\
                    <tr id="fm_tr_head" class="ui-state-default ui-corner-top">\
                        <th id="fm_th_icon"  class="fm_th" width="24px"></td>\
                        <th id="fm_th_name" class="fm_th" >Name</td>\
                        <th id="fm_th_type" class="fm_th" width="70px">Type</td>\
                        <th id="fm_th_datum"class="fm_th" width="220px">Datum</td>\
                    </tr>\
                    </tbody>\
                   </table>');

                $.each(o.data, function () {

                    if (this.stats.nlink > 1) {
                        var date = this.stats.ctime.split("T")[0];
                        var time = this.stats.ctime.split("T")[1].split(".")[0];
                        var type = this.file.split(".")[1] || "";
                        $(".fm_file_table").append('\
                            <tr class="fm_tr_folder ui-state-default no_background">\
                                <td width="24px"><img src="' + fm_Folder + '/icon/mine/24/folder-brown.png"/></td>\
                                <td>' + this.file.split(".")[0] + '</td>\
                                <td width="70px">' + type + '</td>\
                                <td width="220px">' + date + ' ' + time + '</td>\
                            </tr>')
                    } else {

                        var _name = this.file.split(".");
                        _name.pop();
                        var name = _name.join(".");
                        var date = this.stats.ctime.split("T")[0];
                        var time = this.stats.ctime.split("T")[1].split(".")[0];
                        var type = this.file.split(".").pop() || "";
                        var icons = ["zip", "prg", "js", "png", "svg", "jpg", "gif", "bmp", "css", "mp3", "wav"];
                        var icon = "undef";

                        if (name.length > 0) {

                            if (icons.indexOf(type) > -1) {
                                icon = type
                            }

                            $(".fm_file_table").append('\
                            <tr class="fm_tr_file ui-state-default no_background">\
                                <td width="24px"><img src="' + fm_Folder + '/icon/mine/24/' + icon + '.png"/></td>\
                                <td>' + name + '</td>\
                                <td width="70px">' + type + '</td>\
                                <td width="220px">' + date + ' ' + time + '</td>\
                            </tr>')
                        }
                    }
                });

                $("#fm_th_name, #fm_th_type, #fm_th_datum")
                    .mouseenter(function () {
                        $(this).addClass("ui-state-focus")
                    })
                    .mouseleave(function () {
                        $(this).removeClass("ui-state-focus")
                    })
                    .click(function () {
                        $(this).effect("highlight")
                    });

                // sort Table _____________________________________________________
                var table = $('#fm_table');
                $('#fm_th_name, #fm_th_type, #fm_th_datum')
                    .wrapInner('<span title="sort this column"/>')
                    .each(function () {
                        var th = $(this),
                            thIndex = th.index(),
                            inverse = false;
                        th.click(function () {
                            table.find('td').filter(function () {
                                return $(this).index() === thIndex;
                            }).sortElements(function (a, b) {
                                    return $.text([a]) > $.text([b]) ?
                                        inverse ? -1 : 1
                                        : inverse ? 1 : -1;
                                }, function () {
                                    return this.parentNode;
                                });
                            inverse = !inverse;
                        });
                    });
                // sort Table----------------------------------------------------------

                if (document.getElementById("script_scrollbar")) {
                    $('#fm_scroll_pane')
                        .perfectScrollbar('update')
                        .css({
                            height: "calc(100% - 134px) "
                        });

                    $(".fm_files").css({
                        height: "auto",
                        overflow: "visible"
                    });
                } else {
                    $(".fm_files").css({
                        height: "calc(100% - 138px) "
                    });

                }
                $("#fm_th_type").trigger("click");
            }

            if (o.data != undefined && o.mode == "prev") {

                $.each(o.data, function () {

                    if (this.stats.nlink > 1) {
                        var type = "_";
                        $(".fm_files").append('\
                       <div class="fm_prev_container" data-sort="' + type + '">\
                       <img class="fm_prev_img" src="' + fm_Folder + '/icon/mine/128/folder-brown.png"/>\
                       <div class="fm_prev_name">' + this.file + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')

                    } else {
                        var name = this.file.split(".")[0];
                        var type = this.file.split(".")[1] || "";
                        var icons = ["zip", "prg", "js", "png", "svg", "jpg", "gif", "bmp", "css", "mp3", "wav"];
                        var icon = "undef";
                        if (name.length > 0) {

                            if (icons.indexOf(type) > -1) {
                                icon = type
                            }

                            $(".fm_files").append('\
                       <div class="fm_prev_container" data-sort="' + type + '">\
                       <div class="fm_prev_img_container"><img class="fm_prev_img" src="' + fm_Folder + '/icon/mine/128/' + icon + '.png"/></div>\
                       <div class="fm_prev_name">' + this.file + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')


                        }
                    }
                });


                var div = $('.fm_files');
                var listitems = div.children('.fm_prev_container').get();
                listitems.sort(function (a, b) {

                    return ($(a).attr('data-sort') < $(b).attr('data-sort')) ?
                        -1 : ($(a).attr('data-sort') > $(b).attr('data-sort')) ?
                        1 : 0;
                });

                $.each(listitems, function (idx, itm) {
                    div.append(itm);
                });

                if (document.getElementById("script_scrollbar")) {
                    $('#fm_scroll_pane')
                        .perfectScrollbar('update')
                        .css({
                            height: "calc(100% - 98px) "
                        });

                    $(".fm_files").css({
                        height: "auto",
                        overflow: "visible"
                    });
                } else {
                    $(".fm_files").css({
                        height: "calc(100% - 101px) "
                    });
                }


                $(".fm_prev_overlay").click(function(){
                    var type = $(this).parent().data("sort");

                    $(".fm_prev_selected").removeClass("fm_prev_selected");
                    $(this).addClass("fm_prev_selected");

                    if(o.audio.indexOf(type) > -1){
                        $( "#fm_bar_play , #fm_bar_stop" ).button("enable")
                    }else{
                        $( "#fm_bar_play, #fm_bar_stop" ).button("disable");
                    }


                })
            }
        }


        $("body").append('\
                   <div id="dialog_fm" class="fm_dialog" style="text-align: center" title="Datei Manager">\
                   <div class="fm_iconbar ui-state-default ui-corner-all">\
                        <button id="fm_bar_back"    style="background-image: url(' + fm_Folder + '/icon/actions/back.png)"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Zurück"/>\
                        <button id="fm_bar_add"     style="background-image: url(' + fm_Folder + '/icon/actions/add.png); margin-left:20px"    class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Upload" />\
                        <button id="fm_bar_down"    style="background-image: url(' + fm_Folder + '/icon/actions/down.png)"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Download"/>\
                        <button id="fm_bar_del"     style="background-image: url(' + fm_Folder + '/icon/actions/delete.png") class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Löschen"/>\
                        <button id="fm_bar_list"    style="background-image: url(' + fm_Folder + '/icon/actions/list.png); margin-left:20px"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Listen Anicht"/>\
                        <button id="fm_bar_prev"    style="background-image: url(' + fm_Folder + '/icon/actions/icons.png)"  class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Icon Ansicht"/>\
                        <button id="fm_bar_play"    style="background-image: url(' + fm_Folder + '/icon/actions/play.png); margin-left:20px"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Play"/>\
                        <button id="fm_bar_stop"    style="background-image: url(' + fm_Folder + '/icon/actions/stop.png)"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Stop"/>\
                        <button id="fm_bar_folder" class="fm_bar_folder "></button>\
                        <button id="fm_bar_all" class="fm_bar_all"></button>\
                   </div>\
                   <div class="fm_files ui-state-default no_background">\
                   </div>\
                   <div class="fm_buttonbar">\
                       <button id="btn_open_ok" >Öffnen</button>\
                       <button id="btn_open_abbrechen" >Abbrechen</button>\
                    </div>\
                   </div>');

        $("#dialog_fm").dialog({
            height: $(window).height() - 150,
            width: 805,
            minWidth: 600,
            minHeight: 300,
            resizable: true,
            modal: true,
            close: function () {
                $("#dialog_fm").remove();

            }

        });

        $( ".fm_bar_icon").button();
        $( "#fm_bar_play, #fm_bar_stop" ).button("disable");

        if (document.getElementById("script_scrollbar")) {
            $(".fm_files").wrap('<div id="fm_scroll_pane"></div>');

            $(".fm_files").css({
                minHeight: "100%",
                height: "auto",
                width: "calc(100% - 4px)"
            });

            $("#fm_scroll_pane").perfectScrollbar({
                wheelSpeed: 40
            });

        }

        load(o.path);

        $("#fm_bar_folder")
            .button({
                icons: {
                    primary: "ui-icon-folder-open"
                }
            })
            .click(function () {
                $(this).toggleClass("ui-state-error");
                $(this).removeClass("ui-state-focus")
            });
        $("#fm_bar_all")
            .button({
                icons: {
                    primary: "ui-icon-gear"
                }
            })
            .click(function () {

                $(this).toggleClass("ui-state-error");
                if ($(this).hasClass("ui-state-error")) {
                    $('#fm_prev_container[data-sort="_"]').hide()
                } else {
                    $('#fm_prev_container[data-sort="_"]').hide()
                }
                $(this).removeClass("ui-state-focus")
            });

        $(".fm_bar_icon")
            .mouseenter(function () {
                $(this).addClass("ui-state-focus")
            })
            .mouseleave(function () {
                $(this).removeClass("ui-state-focus")
            })
            .click(function () {
                var id = $(this).attr("id");
                if (id == "fm_bar_list") {
                    o.mode = "table";
                    build(o)
                }
                if (id == "fm_bar_prev") {
                    o.mode = "prev";
                    build(o)
                }

            });

        $("#btn_open_abbrechen").button().click(function () {
            $("#dialog_open").remove();
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




    }
})(jQuery);

jQuery.fn.sortElements = (function () {
    var sort = [].sort;
    return function (comparator, getSortable) {
        getSortable = getSortable || function () {
            return this;
        };
        var placements = this.map(function () {
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
            // Since the element itself will change position, we have
            // to have some way of storing it's original position in
            // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            return function () {
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
//                Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
            };
        });
        return sort.call(this, comparator).each(function (i) {
            placements[i].call(getSortable.call(this));
        });
    };
})();

