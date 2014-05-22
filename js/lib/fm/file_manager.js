/**
 * Copyright (c) 2014 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

var fm_scriptEls = document.getElementsByTagName('script');
var fm_thisScriptEl = fm_scriptEls[fm_scriptEls.length - 1];
var fm_Folder = fm_thisScriptEl.src.substr(0, fm_thisScriptEl.src.lastIndexOf('/') + 1);

//$("head").append('<script type="text/javascript" src="../lib/js/dropzone.js"></script>');
$("head").append('<script type="text/javascript" src="js/lib/dropzone.js"></script>');

(function ($) {
    $.fm = function (options, callback) {
        jQuery.event.props.push('dataTransfer');
        var o = {
            path: options.path || "/",
            file_filter: options.file_filter || [],
            folder_filter: options.folder_filter || false,
            view: options.view || "table",
            mode: options.mode || "show",
            data: "1",
            audio: ["mp3", "wav", "ogg"],
            img: ["png", "bmp", "jpg", "svg"],
            icons: ["zip", "prg", "js", "css", "mp3", "wav"],
            save_data : options.save_data,
            save_mime : options.save_mime

        };

        var uploadArray = [];

        var sel_file = "";
        var sel_type = "";

        function load(path) {
            console.log(path)
            try {
                SGI.socket.emit("readdirStat", path, function (data) {
                    o.data = data;
            $(".fm_path").text("Pfad:" + path)
//            o.data = [
//                {"file": ".gitignore", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 145220, "size": 29, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "README.md", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159085, "size": 25314, "blocks": 56, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "adapter", "stats": {"dev": 45826, "mode": 16895, "nlink": 31, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159091, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:40.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "backup.png", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 150243, "size": 10479, "blocks": 24, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "binrpc.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159081, "size": 21404, "blocks": 48, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "ccu.io-server.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159083, "size": 1206, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "ccu.io.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159082, "size": 78813, "blocks": 160, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "ccu.io.pid", "stats": {"dev": 45826, "mode": 33206, "nlink": 1, "uid": 1000, "gid": 1000, "rdev": 0, "blksize": 4096, "ino": 160407, "size": 5, "blocks": 8, "atime": "2014-05-03T12:52:33.000Z", "mtime": "2014-05-03T12:52:33.000Z", "ctime": "2014-05-03T12:52:33.000Z"}},
//                {"file": "cert", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160402, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:10.000Z", "mtime": "2014-04-30T00:46:10.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "datastore", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160405, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:10.000Z", "mtime": "2014-05-03T12:52:33.000Z", "ctime": "2014-05-03T12:52:33.000Z"}},
//                {"file": "doc", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160441, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:11.000Z", "mtime": "2014-04-30T00:46:11.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "log", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160442, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:11.000Z", "mtime": "2014-05-03T12:52:33.000Z", "ctime": "2014-05-03T12:52:33.000Z"}},
//                {"file": "logger.mp3", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159084, "size": 2458, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "node_modules", "stats": {"dev": 45826, "mode": 16895, "nlink": 63, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 160448, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:46:11.000Z", "mtime": "2014-04-30T00:46:34.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "rega.wav", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159086, "size": 10258, "blocks": 24, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "regascripts", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166343, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:25.000Z", "mtime": "2014-04-30T00:50:25.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "script-engine.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159088, "size": 33267, "blocks": 72, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "scripts", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166356, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:26.000Z", "mtime": "2014-05-03T12:48:07.000Z", "ctime": "2014-05-03T12:48:07.000Z"}},
//                {"file": "settings-dist.json", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159090, "size": 1513, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "settings.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159087, "size": 3342, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "tmp", "stats": {"dev": 45826, "mode": 16895, "nlink": 2, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166362, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:26.000Z", "mtime": "2014-05-04T00:16:46.000Z", "ctime": "2014-05-04T00:16:46.000Z"}},
//                {"file": "tools", "stats": {"dev": 45826, "mode": 16895, "nlink": 3, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166366, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:26.000Z", "mtime": "2014-04-30T00:50:26.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "update-addon.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 159089, "size": 2045, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "update-self.js", "stats": {"dev": 45826, "mode": 33279, "nlink": 1, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 135666, "size": 1744, "blocks": 8, "atime": "2014-04-30T00:45:37.000Z", "mtime": "2014-04-30T00:45:37.000Z", "ctime": "2014-04-30T00:51:28.000Z"}},
//                {"file": "www", "stats": {"dev": 45826, "mode": 16895, "nlink": 7, "uid": 33, "gid": 33, "rdev": 0, "blksize": 4096, "ino": 166371, "size": 4096, "blocks": 8, "atime": "2014-04-30T00:50:27.000Z", "mtime": "2014-04-30T01:19:09.000Z", "ctime": "2014-04-30T01:19:09.000Z"}}
//            ];
            build(o);

                });
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO");
                console.log(err)
            }


        }

        function build(o) {

            $(".fm_files").empty();
            $("#fm_table_head").remove();
            $("#fm_bar_play, #fm_bar_stop, #fm_bar_down, #fm_bar_del").button("disable");


            if (o.data != undefined && o.view == "table") {

                $('\
            <div id="fm_table_head">\
             <button id="fm_table_head_name" >Name</button>\
             <button id="fm_table_head_type" >Type</button>\
             <button id="fm_table_head_size" >Size</button>\
             <button id="fm_table_head_datum" >Datum</button>\
            </div>').insertAfter(".fm_path");

                $("#fm_table_head_name").button({icons: {primary: "ui-icon-carat-2-n-s"}}).click(function () {
                    $("#fm_th_name").trigger("click")
                });
                $("#fm_table_head_type").button({icons: {primary: "ui-icon-carat-2-n-s"}}).click(function () {
                    $("#fm_th_type").trigger("click")
                });
                $("#fm_table_head_size").button({icons: {primary: "ui-icon-carat-2-n-s"}}).click(function () {
                    $("#fm_th_size_roh").trigger("click")
                });
                $("#fm_table_head_datum").button({icons: {primary: "ui-icon-carat-2-n-s"}}).click(function () {
                    $("#fm_th_datum").trigger("click")
                });

                $(".fm_files").append('\
                <table id="fm_table"  width="560px">\
                   <tbody width="560px" class="fm_file_table">\
                    <tr id="fm_tr_head" class="ui-state-default ui-corner-top">\
                        <th id="fm_th_icon"  class="fm_th" width="24px"></td>\
                        <th id="fm_th_name" class="fm_th" >Name</td>\
                        <th id="fm_th_type" class="fm_th" class="fm_td_hide">Type</td>\
                        <th id="fm_th_size_roh" class="fm_th" class="fm_td_hide">Size_roh</td>\
                        <th id="fm_th_size" class="fm_th"  style="text-align:right" width="70px">Size</td>\
                        <th id="fm_th_datum" class="fm_th" style="text-align:right" width="220px">Datum</td>\
                        <th class="fm_th" width="10px"></td>\
                    </tr>\
                    </tbody>\
                   </table>');

                $.each(o.data, function () {

                    function formatBytes(bytes) {
                        if (bytes < 1024) return bytes + " B";
                        else if (bytes < 1048576) return(bytes / 1024).toFixed(0) + " KB";
                        else if (bytes < 1073741824) return(bytes / 1048576).toFixed(0) + " MB";
                        else return(bytes / 1073741824).toFixed(0) + " GB";
                    };


                    if (this.stats.nlink > 1) {
                        var date = this.stats.ctime.split("T")[0];
                        var time = this.stats.ctime.split("T")[1].split(".")[0];
                        var type = this.file.split(".")[1] || "";
                        var filter = "fm_folder_filter";

                        $(".fm_file_table").append('\
                            <tr class="fm_tr_folder ' + filter + ' fm_tr ui-state-default no_background">\
                                <td width="24px"><img src="' + fm_Folder + '/icon/mine/24/folder-brown.png"/></td>\
                                <td>' + this.file + '</td>\
                                <td class="fm_td_hide">' + type + '</td>\
                                <td class="fm_td_hide">' + 0 + '</td>\
                                <td style="text-align:right" width="100px"></td>\
                                <td style="text-align:right ;margin-right: 20px" width="220px">' + date + ' ' + time + '</td>\
                                <th class="fm_th" width="10px"></td>\
                            </tr>')
                    } else {

//                        var _name = this.file.split(".");
//                        _name.pop();
//                        var name = _name.join(".");
                        var date = this.stats.ctime.split("T")[0];
                        var time = this.stats.ctime.split("T")[1].split(".")[0];
                        var type = this.file.split(".").pop() || "";
                        var icons = ["zip", "prg", "js", "png", "svg", "jpg", "gif", "bmp", "css", "mp3", "wav"];
                        var icon = "undef";
                        var filter = "";


                        if (icons.indexOf(type) > -1) {
                            icon = type
                        }
                        if (o.file_filter.indexOf(type) == -1) {
                            filter = "fm_file_filter"
                        }

                        $(".fm_file_table").append('\
                            <tr class="fm_tr_file ' + filter + ' fm_tr ui-state-default no_background">\
                                <td width="24px"><img src="' + fm_Folder + '/icon/mine/24/' + icon + '.png"/></td>\
                                <td>' + this.file + '</td>\
                                <td class="fm_td_hide">' + type + '</td>\
                                <td class="fm_td_hide">' + this.stats.size + '</td>\
                                <td style="text-align:right" width="100px">' + formatBytes(this.stats.size) + '</td>\
                                <td style="text-align:right ;margin-right: 20px" width="220px">' + date + ' ' + time + '</td>\
                                <th class="fm_th" width="10px"></td>\
                            </tr>')

                    }
                });

                $("#fm_th_name, #fm_th_type, #fm_th_size, #fm_th_datum")
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
                $('#fm_th_name, #fm_th_type, #fm_th_size_roh, #fm_th_datum')
                    .wrapInner('<span title="sort this column"/>')
                    .each(function () {
                        var th = $(this),
                            thIndex = th.index(),
                            inverse = false;
                        th.click(function () {
                            table.find('td').filter(function () {
                                return $(this).index() === thIndex;
                            }).sortElements(function (a, b) {


                                    if (parseInt($(a).text())) {
                                        console.log("A")
                                        return parseInt($.text([a])) > parseInt($.text([b])) ?
                                            inverse ? -1 : 1
                                            : inverse ? 1 : -1;
                                    } else {


                                        return $.text([a]).toLowerCase() > $.text([b]).toLowerCase() ?
                                            inverse ? -1 : 1
                                            : inverse ? 1 : -1;

                                    }

                                }, function () {
                                    return this.parentNode;
                                });
                            inverse = !inverse;
                        });
                    });
                $("#fm_th_name").trigger("click");
                $("#fm_th_type").trigger("click");
                // sort Table----------------------------------------------------------

                $(".fm_tr > *").click(function (e) {

                    $(".fm_table_selected").addClass("ui-state-default no_background");
                    $(".fm_table_selected").removeClass("fm_table_selected ui-state-highlight");
                    if ($(e.target).hasClass("fm_tr")) {
                        $(this).addClass("fm_table_selected ui-state-highlightt");
                        $(this).removeClass("ui-state-default no_background");
                    } else {
                        $(this).parent(".fm_tr").addClass("fm_table_selected ui-state-highlight");
                        $(this).parent(".fm_tr").removeClass("ui-state-default no_background");
                    }

                    var type = $($(".fm_table_selected").children().toArray()[2]).text();
                    var name = $($(".fm_table_selected").children().toArray()[1]).text();

                    if (type == "") {
                        sel_type = "folder";
                        sel_file = name;
                        $("#fm_bar_down").button("disable");
                        $("#fm_bar_del").button("enable");

                    } else {
                        sel_type = "file";
                        sel_file = name;
                        $("#fm_bar_down").button("enable");
                        $("#fm_bar_del").button("enable");
                    }

                    if (o.audio.indexOf(type) > -1) {
                        $("#fm_bar_play , #fm_bar_stop").button("enable")
                    } else {
                        $("#fm_bar_play, #fm_bar_stop").button("disable");
                    }
                });

                $(".fm_tr_folder").dblclick(function () {

                    o.path += $((this).children[1]).text() + "/"
                    console.log($((this).children[1]).text())

                    load(o.path)
                });

                if (document.getElementById("script_scrollbar")) {
                    $(".fm_files").css({
                        height: "auto",
                        overflow: "visible"
                    });
                    $('#fm_scroll_pane').css({
                        height: "calc(100% - 187px) ",
                        scrollTop: 0
                    });
                    $('#fm_scroll_pane').scrollTop(0);
                    $('#fm_scroll_pane').perfectScrollbar('update');

                } else {
                    $(".fm_files").css({
                        height: "calc(100% - 188px) "
                    });
                }
            }

            if (o.data != undefined && o.view == "prev") {

                $.each(o.data, function () {

                    if (this.stats.nlink > 1) {
                        var type = "_";
                        $(".fm_files").append('\
                       <div class="fm_prev_container fm_folder_filter" data-sort="' + type + '">\
                       <div class="fm_prev_img_container"><img class="fm_prev_img" src="' + fm_Folder + '/icon/mine/128/folder-brown.png"/></div>\
                       <div class="fm_prev_name">' + this.file + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')

                    } else {
                        var name = this.file.split(".")[0];
                        var type = this.file.split(".")[1] || "";
                        var icon = "undef";
                        var filter = "";
                        if (o.file_filter.indexOf(type) == -1) {
                            filter = "fm_file_filter"
                        }

                        if (name.length > 0) {
                            if (o.img.indexOf(type) > -1) {

                                var path = o.path.split("www")[1];

                                $(".fm_files").append('\
                       <div class="fm_prev_container ' + filter + '" data-sort="' + type + '">\
                       <div class="fm_prev_img_container"><img class="fm_prev_img" src="' + path + this.file + '"/></div>\
                       <div class="fm_prev_name">' + this.file + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')

                            } else {
                                if (o.icons.indexOf(type) > -1) {
                                    icon = type
                                }

                                $(".fm_files").append('\
                       <div class="fm_prev_container ' + filter + '" data-sort="' + type + '">\
                       <div class="fm_prev_img_container"><img class="fm_prev_img" src="' + fm_Folder + '/icon/mine/128/' + icon + '.png"/></div>\
                       <div class="fm_prev_name">' + this.file + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')
                            }
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

                    $(".fm_files").css({
                        height: "auto",
                        overflow: "visible"
                    });
                    $('#fm_scroll_pane').css({
                        height: "calc(100% - 150px) ",
                        scrollTop: 0
                    });
                    $('#fm_scroll_pane').scrollTop(0);
                    $('#fm_scroll_pane').perfectScrollbar('update');

                } else {
                    $(".fm_files").css({
                        height: "calc(100% - 151px)"
                    });
                }

                $(".fm_prev_overlay").click(function () {
                    var type = $(this).parent().data("sort");

                    $(".fm_prev_selected").removeClass("fm_prev_selected");
                    $(this).addClass("fm_prev_selected");

                    if (type == "_") {
                        sel_type = "folder";
                        sel_file = $(this).prev().text();
                        $("#fm_bar_down").button("disable");
                        $("#fm_bar_del").button("enable");

                    } else {
                        sel_type = "file";
                        sel_file = $(this).prev().text();
                        $("#fm_bar_down").button("enable");
                        $("#fm_bar_del").button("enable");

                    }

                    if (o.audio.indexOf(type) > -1) {
                        $("#fm_bar_play , #fm_bar_stop").button("enable")
                    } else {
                        $("#fm_bar_play, #fm_bar_stop").button("disable");
                    }
                });

                $(".fm_prev_overlay").dblclick(function () {
                    var type = $(this).parent().data("sort");

                    if (type == "_") {
                        o.path += $(this).prev().text() + "/";
                        console.log(o.path)
                        load(o.path)
                    }
                });
            }

            if ($("#fm_bar_all").hasClass("ui-state-error")) {
                $(".fm_folder_filter").show();
                $(".fm_file_filter").show();
            } else {
                $(".fm_file_filter").hide();
                $(".fm_folder_filter").hide();
            }

            if (o.view == "prev" && $("#fm_bar_all").hasClass("ui-state-error")) {
                $(".fm_file_filter").css({display: "inline-table"})
            }
        }

        $("body").append('\
                   <div id="dialog_fm" class="fm_dialog" style="text-align: center" title="Datei Manager">\
                   <div class="fm_iconbar ui-state-default ui-corner-all">\
                        <button id="fm_bar_back"    style="background-image: url(' + fm_Folder + 'icon/Circle-left-icon.png)"                                                                              title="Zurück"/>\
                        <img src="' + fm_Folder + '/icon/actions/folder-new-7.png"  id="fm_bar_addfolder"        style="margin-left:40px"   class="fm_bar_icon ui-corner-all ui-state-default" title="Neuer Ordner" />\
                        <img src="' + fm_Folder + '/icon/actions/up.png"           id="fm_bar_add"              style=""                    class="fm_bar_icon ui-corner-all ui-state-default" title="Upload" />\
                        <img src="' + fm_Folder + '/icon/actions/down.png"          id="fm_bar_down"                                        class="fm_bar_icon ui-corner-all ui-state-default" title="Download"/>\
                        <img src="' + fm_Folder + '/icon/actions/edit-rename.png"   id="fm_bar_rename"                                      class="fm_bar_icon ui-corner-all ui-state-default" title="Umbenennen"/>\
                        <img src="' + fm_Folder + '/icon/actions/delete.png"        id="fm_bar_del"                                         class="fm_bar_icon ui-corner-all ui-state-default" title="Löschen"/>\
                        <img src="' + fm_Folder + '/icon/actions/list.png"          id="fm_bar_list"             style=" margin-left:20px"  class="fm_bar_icon ui-corner-all ui-state-default" title="Listen Anicht"/>\
                        <img src="' + fm_Folder + '/icon/actions/icons.png"         id="fm_bar_prev"                                        class="fm_bar_icon ui-corner-all ui-state-default" title="Icon Ansicht"/>\
                        <img src="' + fm_Folder + '/icon/actions/play.png"          id="fm_bar_play"             style=" margin-left:20px"  class="fm_bar_icon ui-corner-all ui-state-default" title="Play"/>\
                        <img src="' + fm_Folder + '/icon/actions/stop.png"          id="fm_bar_stop"                                        class="fm_bar_icon ui-corner-all ui-state-default" title="Stop"/>\
                        <img id="fm_bar_all" class="fm_bar_all" title="Alle Datein anzeigen"></button>\
                   </div>\
                   <div class="fm_path ui-state-default no_background">\
                   </div>\
                   <div class="fm_files ui-state-default no_background">\
                   </div>\
                   <div class="fm_buttonbar">\
                   <div id="fm_save_wrap">\
                   <div>Datei Name:</div>\
                       <input type="text" id="fm_inp_save">\
                       </div>\
                        <div id="fm_btn_wrap">\
                       <button id="fm_btn_save" >Speichern</button>\
                       <button id="fm_btn_open" >Öffnen</button>\
                       <button id="fm_btn_cancel" >Abbrechen</button>\
                       </div>\
                    </div>\
                   </div>');

        $("#dialog_fm").dialog({
            height: $(window).height() - 100,
            width: 828,
            minWidth: 672,
            minHeight: 300,
            resizable: true,
            modal: true,
            close: function () {
                $("#dialog_fm").remove();
            }
        });

        if(o.mode == "show"){
            $(".fm_buttonbar").hide()
        }
        if(o.mode == "save"){
            $("#fm_btn_open").hide()
        }
        if(o.mode == "open"){
            $("#fm_save_wrap").hide()
            $("#fm_btn_save").hide()
        }

        $(".fm_bar_icon").button();
        $("#fm_bar_back")
            .button()
            .click(function () {
                var path_arry = o.path.split("/");
                path_arry.pop();
                path_arry.pop();
                o.path = path_arry.join("/") + "/";
                load(o.path)
            });

//        $("#fm_bar_play, #fm_bar_stop, #fm_bar_down").button("disable");

        if (document.getElementById("script_scrollbar")) {
            $(".fm_files").wrap('<div id="fm_scroll_pane" class="ui-state-default no_background"></div>');

            $(".fm_files").css({
                minHeight: "100%",
                height: "auto",
                width: "calc(100% - 4px)",
                border: "none"
            });

            $("#fm_scroll_pane").perfectScrollbar({
                wheelSpeed: 40,
                suppressScrollX: true
            });
        }
        if (o.folder_filter = false) {
            $("#fm_bar_folder").addClass("ui-state-error")
        }

        load(o.path);

        $("#fm_bar_all")
            .button({
                icons: {
                    primary: "ui-icon-gear"
                }
            })
            .click(function () {

                $(this).toggleClass("ui-state-error");
                if ($(this).hasClass("ui-state-error")) {

                    $(".fm_file_filter").show();
                    $(".fm_folder_filter").show()
                    if (o.view == "prev") {
                        $(".fm_file_filter").css({display: "inline-table"})
                    }
                } else {
                    $(".fm_file_filter").hide();
                    $(".fm_folder_filter").hide();
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

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_add") {

                    $('#dialog_fm').append('\
                        <div id="dialog_fm_add" title="Upload Dropbox">\
                        <div id="fm_add_dropzone" ondragover="return false" class="dropzone ui-corner-all ui-state-highlight">\
                        <p class="fm_dropbox_text">Dropbox<br> Hier Datein reinziehen</p>\
                        </div>\
                        <div class="fm_buttonbar">\
                            <button id="btn_fm_add_ok">Upload</button>\
                            <button id="btn_fm_add_close" >Schliesen</button>\
                        </div>\
                        <input type="file" id="fm_open_file" style="height: 0; width: 0 "/>\
                        </div>');

                    $('#dialog_fm_add').dialog({
                        dialogClass: "dialog_fm_add",
                        resizable: false,
                        draggable: false,
                        close: function () {
                            $('#dialog_fm_add').remove()
                        }
                    });
                    var files = [];

                    $("#fm_dropbox_text").click(function () {
                        $("#fm_open_file").trigger("click");
                    });

                    $('#fm_add_dropzone').bind('drop', function (e) {
                        try {

                            $.each(e.dataTransfer.files, function () {
                                files.push(this)
                            });

                            $('.dialog_fm_add > *').css({cursor: "wait"})

                            function read() {

                                var reader = new FileReader();
                                reader.onload = function () {
                                    uploadArray.push({name: files[0].name, value: reader.result});


                                    var type = files[0].name.split(".").pop();
                                    var icon = "undef";


                                    if (o.img.indexOf(type) > -1) {


                                        $("#fm_add_dropzone").append('\
                       <div class="fm_prev_container ' + files[0].name.split(".")[0] + '" data-file="' + files[0].name + '">\
                       <div class="fm_prev_img_container"><img class="fm_prev_img" src="' + reader.result + '"/></div>\
                       <div class="fm_prev_name">' + files[0].name + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')

                                    } else {
                                        if (o.icons.indexOf(type) > -1) {
                                            icon = type
                                        }

                                        $("#fm_add_dropzone").append('\
                       <div class="fm_prev_container ' + files[0].name.split(".")[0] + '" data-file="' + files[0].name + '">\
                       <div class="fm_prev_img_container"><img class="fm_prev_img" src="' + fm_Folder + '/icon/mine/128/' + icon + '.png"/></div>\
                       <div class="fm_prev_name">' + files[0].name + '</div>\
                       <div class="fm_prev_overlay"></div>\
                       </div>')
                                    }
                                    files.shift();
                                    if (files.length > 0) {
                                        read()
                                    } else {
                                        console.log(uploadArray)
                                        $('.dialog_fm_add > *').css({cursor: "default"})

                                    }
                                };
                                reader.readAsDataURL(files[0]);

                            }

                            read();
                            return false;

                        }
                        catch
                            (err) {
                            return false;
                            alert(err)
                        }
                    });
                    try {

                        $("#btn_fm_add_ok").button().click(function () {
                            function upload() {
                                try {
                                    SGI.socket.emit("writeBase64", o.path + uploadArray[0].name, uploadArray[0].value.split("base64,")[1], function (data) {

                                        $("." + uploadArray[0].name.split(".")[0]).remove();

                                        uploadArray.shift()
                                        if (uploadArray.length > 0) {

                                            upload()
                                        } else {
                                            $('.dialog_fm_add > *').css({cursor: "default"})
                                        }

                                    });

                                } catch
                                    (err) {
                                    console.log(err)
                                    $('.dialog_fm_add > *').css({cursor: "default"})
                                }
                            }

                            $('.dialog_fm_add > *').css({cursor: "wait"});
                            upload()
                        });

                        $("#btn_fm_add_close").button().click(function () {
                            $('#dialog_fm_add').remove()
                        });
                    } catch (err) {
                        alert(err)
                    }
                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_addfolder") {
                    try {

                    } catch (err) {
                        alert(err)
                    }

                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_down") {
                    try {
                        SGI.socket.emit("readBase64", o.path + sel_file, function (data) {
                            $("body").append('<a id="fm_download" href=" data:' + data["mime"] + ';base64,' + data["data"] + '" download="' + sel_file + '"></a>')
                            document.getElementById('fm_download').click();
                            document.getElementById('fm_download').remove();
                        });
                    } catch (err) {
                        alert(err)
                    }
                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_rename") {
                    try {

                    } catch (err) {
                        alert(err)
                    }
                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_del") {
                    if (sel_type == "folder") {
                        try {
                            SGI.socket.emit("delFolder", o.path + sel_file, function (ok) {
                                if(ok != true){
                                    console.log(ok)
                                    alert("Löschen micht möglich");
                                }
                                load(o.path)
                            })
                        } catch (err) {
                            alert("ordner \n" + err)
                        }
                    } else {
                        try {
                            SGI.socket.emit("delRawFile", o.path + sel_file, function (ok) {
                                load(o.path)
                            })
                        } catch (err) {
                            alert("file \n" + err)
                        }
                    }
                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_list") {
                    o.view = "table";
                    build(o)
                }
                if (id == "fm_bar_prev") {
                    o.view = "prev";
                    build(o)
                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (id == "fm_bar_play") {
                    if (document.getElementById('fm_sound_play')) {
                        document.getElementById('fm_sound_play').remove()
                    }
                    $("#dialog_fm").append('<audio id="fm_sound_play" src="' + o.path.split("www")[1] + sel_file + '"></audio>');
                    document.getElementById('fm_sound_play').play();

                }
                if (id == "fm_bar_stop") {
                    document.getElementById('fm_sound_play').remove()
                }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

                $(this).effect("highlight")
            });



        $("#fm_btn_cancel").button().click(function () {
            $("#dialog_fm").remove();
        });

        $("#fm_btn_open").button().click(function () {
            $("#dialog_fm").remove();
            return callback({
                path: o.path,
                file: sel_file
            });
        });
        $("#fm_btn_save").button().click(function () {
            $("#dialog_fm").remove();
        });

    }
})
    (jQuery);

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


