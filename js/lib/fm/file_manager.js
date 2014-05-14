/**
 * Copyright (c) 2014 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

var fm_scriptEls = document.getElementsByTagName( 'script' );
var fm_thisScriptEl = fm_scriptEls[fm_scriptEls.length - 1];
var fm_Folder = fm_thisScriptEl.src.substr(0, fm_thisScriptEl.src.lastIndexOf( '/' )+1 );


(function ($) {
    $.fm = function (options, callback) {



        var o = {
            path: options.path || "/",
            filter: options.filter || [],
            mode: options.mode || "tabel"
        };


        var sel_file = "";

        try {
//            SGI.socket.emit("readdirStat", SGI.prg_store, function (data) {
            var data = [];
            var files = [];

            console.log(data)

            $("body").append('\
                   <div id="dialog_open" class="fm_dialog" style="text-align: center" title="Datei Manager">\
                   <div class="fm_iconbar">\
                        <img alt="" id="fm_bar_back"    src="'+fm_Folder+'/icon/actions/back.png"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Zurück"/>\
                        <img alt="" id="fm_bar_add"     src="'+fm_Folder+'/icon/actions/add.png"    class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Upload" style="margin-left:20px"/>\
                        <img alt="" id="fm_bar_down"    src="'+fm_Folder+'/icon/actions/down.png"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Download"/>\
                        <img alt="" id="fm_bar_del"     src="'+fm_Folder+'/icon/actions/delete.png" class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Löschen"/>\
                        <img alt="" id="fm_bar_list"    src="'+fm_Folder+'/icon/actions/list.png"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Listen Anicht"style="margin-left:20px"/>\
                        <img alt="" id="fm_bar_icons"   src="'+fm_Folder+'/icon/actions/icons.png"  class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Icon Ansicht"/>\
                        <img alt="" id="fm_bar_play"    src="'+fm_Folder+'/icon/actions/play.png"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Play"style="margin-left:20px"/>\
                        <img alt="" id="fm_bar_stop"    src="'+fm_Folder+'/icon/actions/stop.png"   class="fm_bar_icon ui-corner-all ui-state-default" id="fm_icon_back" title="Stop"/>\
                        <button id="fm_bar_folder" class="fm_bar_folder ui-state-highlight ">Ordner</button>\
                        <button id="fm_bar_all" class="fm_bar_all">*</button>\
                   </div>\
                   <div class="fm_files">\
                   <table id="fm_table" width="560px">\
                   <tbody width="560px" class="fm_file_table">\
                    <tr>\
                        <th width="32px" class="ui-state-default fm_th"></td>\
                        <th id="fm_th_name" class="ui-state-default fm_th" >Name</td>\
                        <th id="fm_th_type" class="ui-state-default fm_th" width="70px">Type</td>\
                        <th id="fm_th_datum"class="ui-state-default fm_th" width="220px">Datum</td>\
                    </tr>\
                    </tbody>\
                   </table>\
                   </div>\
                   <div class="fm_buttonbar">\
                       <button id="btn_open_ok" >Öffnen</button>\
                       <button id="btn_open_abbrechen" >Abbrechen</button>\
                    </div>\
                   </div>');

            $("#dialog_open").dialog({
                height: 500,
                width: 600,
                resizable: true,
                modal: true,
                close: function () {
                    $("#dialog_open").remove();
                }
            });

            $("#fm_th_name, #fm_th_type, #fm_th_datum, .fm_bar_icon")
                .mouseenter(function () {
                    $(this).addClass("ui-state-focus")
                })
                .mouseleave(function () {
                    $(this).removeClass("ui-state-focus")
                })
            .click(function(){
                    $(this).effect("hieglight")
                });

            $( "#fm_bar_folder, #fm_bar_all" )
                .button()
                .click()

            if (data != undefined) {
                $.each(data, function () {

                    if (this.stats.nlink > 1) {
                        var date = this.stats.ctime.split("T")[0];
                        var time = this.stats.ctime.split("T")[1].split(".")[0];
                        var type = this.file.split(".")[1] || "";
                        $(".fm_file_table").append('\
                            <tr>\
                                <td width="32px"><div class="fm_td_folder"></div></td>\
                                <td >' + this.file.split(".")[0] + '</td>\
                                <td >' + type + '</td>\
                                <td >' + date + ' ' + time + '</td>\
                            </tr>')
                    } else {

                        var name = this.file.split(".")[0];
                        var date = this.stats.ctime.split("T")[0];
                        var time = this.stats.ctime.split("T")[1].split(".")[0];
                        var type = this.file.split(".")[1] || "";

                        if (name.length > 0) {


                            $(".fm_file_table").append('\
                            <tr>\
                                <td width="32px"><div class="fm_td_file"></div></td>\
                                <td >' + name + '</td>\
                                <td >' + type + '</td>\
                                <td >' + date + ' ' + time + '</td>\
                            </tr>')
                        }

                    }


                });
            }




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

                                // parentNode is the element we want to move
                                return this.parentNode;

                            });

                        inverse = !inverse;

                    });

                });

            $("#fm_th_type").trigger("click");


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

        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
            console.log(err)
        }


    }

})(jQuery);