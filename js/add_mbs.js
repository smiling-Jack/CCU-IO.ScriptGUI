/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

SGI = $.extend(true, SGI, {

    add_mbs_element: function (_data, left, top) {
        var nr = SGI.mbs_n;
        SGI.mbs_n++;

        var data = {
            mbs_id: _data.mbs_id || _data.type + "_" + nr,
            type: _data.type,
            hmid: _data.hmid || [],
            name: _data.name || ["Rechtsklick"],
            time: _data.time || ["00:00"],
            minuten: _data.minuten || [0],
            astro: _data.astro || ["sunrise"],
            day: _data.day || ["88"],
            val: _data.val || [],
            wert: _data.wert || [],
            width: _data.width,
            height: _data.height,
            kommentar: _data.kommentar || "Kommentar",
            titel: _data.titel || "Programm_" + nr,

            style: _data.style || {
                "left": left + "px",
                "top": top + "px"
            }
        };


        PRG.mbs[data.mbs_id] = data; //todo Remove after ng
        scope.mbs[ nr] = data;


        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "codebox") {

            if (data.style.width == undefined) {
                scope.mbs[nr].style = {
                    "width": "300px",
                    "height": "200px",
                    "left": scope.mbs[nr].style.left,
                    "top": scope.mbs[nr].style.top
                }
            }

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_codebox">\
                <div mbs_id="' + data.mbs_id + '" data-nr="' + nr + '" class="titel_body">\
                    <input style="position: relative; margin-top: -12px" ng-model="mbs[' + nr + '].titel" type="text" id="titel_' + data.mbs_id + '" class="titel_codebox item_font">\
                </div>\
                <div id="' + data.mbs_id + '" data-nr="' + nr + '" class="titel_body titel_body_2"></div>\
                <div id="prg_' + data.mbs_id + '" class="prg_codebox"></div>\
            </div>');



            SGI.add_codebox_inst(data.mbs_id);

            var min_h;
            var min_w;
            $('#prg_' + data.type + '_' + nr).resizable({
//                ghost: true,
                start: function () {
                    min_h = [];
                    min_w = [];

                    $(this).css({border: "2px dotted #00ffff"});
                    $(this).parent().css({border: "2px dotted transparent"});

                    $.each($(this).children(".fbs_element:not(.fbs_element_onborder)"), function () {

                        var pos = $(this).position();
                        min_w.push(pos.left + $(this).width());
                        min_h.push(pos.top + $(this).height());
                    });
                    min_w = min_w.sort(function (a, b) {
                        return b - a
                    });
                    min_h = min_h.sort(function (a, b) {
                        return b - a
                    });
                },
                resize: function (event, ui) {
                    var new_h = ui.size.height;
                    var new_w = ui.size.width;

                    if (new_h < min_h[0]) {
                        $(this).css({height: min_h[0]});
                    }
                    if (new_w < min_w[0]) {
                        $(this).css({width: min_w[0]});
                    }
                    SGI.plumb_inst["inst_" + data.mbs_id].repaintEverything();
                    SGI.plumb_inst.inst_mbs.repaintEverything();
                },
                stop: function (event, ui) {
                    $(this).css({border: "none"})
                    $(this).parent().css({border: "2px dotted #00ffff"});
                    scope.mbs[nr].style["width"] = $(this).css("width");
                    scope.mbs[nr].style["height"] = $(this).css("height");
                    scope.$apply()
                }
            });

            $('#' + data.mbs_id).click(function (event) {
                if ($(event.target).hasClass("prg_codebox")) {
                    $(".codebox_active").removeClass("codebox_active");
                    $(this).addClass("codebox_active")
                }
            });
        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "komex") {

            if (data.style.color == undefined) {
                scope.mbs[nr].style = {
                    "background-color": "yellow",
                    "color": "black",
                    "left": scope.mbs[nr].style.left,
                    "top": scope.mbs[nr].style.top
                }
            }

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_kommentar">\
                <textarea id="text_' + nr + '" class="komex" ng-model="mbs[' + nr + '].kommentar"></textarea>\
            </div>');

            $("#text_" + nr).autosize();
            console.log($("#" + data.mbs_id).data("nr"));

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_event") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger -- &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_EQ") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_NE") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_GT") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_GE") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_LT") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_LE") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger ' + data.type.split("_")[1] + ' &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_start") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Start</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" style="color: black; font-size: 12px; text-align: center" >Scriptengine start\
                </div>\
            </div>');


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_yearly") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" style="color: black; font-size: 12px; text-align: center" >Yearly\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_monthly") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" style="color: black; font-size: 12px; text-align: center" >Monthly\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_time") {
            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_time">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                  <p class="head_font">Trigger Time</p>\
                  <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_time($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_vartime") {

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_vartime">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                                    <p class="head_font">Trigger var Time &nbsp  &nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');

            SGI.add_trigger_name($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_astro") {
            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_astro">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                  <p class="head_font">Trigger Astro</p>\
                  <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger">\
                </div>\
            </div>');

            SGI.add_trigger_astro($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigger_zykm") {
            if (data.time[0] == "00:00") {
                scope.mbs[nr].time = "0"
            }
            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Zyklus M &nbsp&nbsp&nbsp</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                    <div id="tr_ch_body_' + nr + '" class="tr_ch_body">\
                        <input class="inp_peri" ng-model="mbs[' + nr + '].time" id="var_' + nr + '">\
                        <a style="margin-left: 4px; font-size: 13px;color: #676767">Minutes</a> \
                    </div>\
                </div>\
            </div>');

            $('#var_' + nr).numberMask({type: 'float', beforePoint: 3, afterPoint: 2, decimalMark: '.'});

        }
//    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//    if (data.type == "trigger_valNe") {
//
//      scope.append($("#prg_panel"), '\
//            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_singel">\
//              <div id="head_' + nr + '" class="div_head" style="background-color: red">\
//                  <p class="head_font">Trigger ' + data.type.split("_")[1] + '</p>\
//                  <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
//              </div>\
//              <div class="div_hmid_trigger" >\
//              </div>\
//            </div>');
//
//      SGI.add_trigger_name($("#" + data.mbs_id));
//    }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "trigger_val") {
            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_trigger tr_val">\
                <div id="head_' + nr + '" class="div_head" style="background-color: red">\
                    <p class="head_font">Trigger Value</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_trigger"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                </div>\
            </div>');


            SGI.add_trigger_name_val($("#" + data.mbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "brake") {

            if (data.val.length == 0) {
                data.val = 0;
            }

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_simpel mbs_element_control ">\
                <div id="head_' + data.mbs_id + '" class="div_head" style="background-color: #0060FF">\
                    <a class="head_font">Delay</a>\
                </div>\
                <div style="border-bottom: 1px solid cyan; display: flex;">\
                    <input type="text" class="brake_delay " ng-model="mbs[' + nr + '].val" id="' + data.mbs_id + '_delay" title="' + SGI.translate("Pause in Sekunden") + '" />\
                    <input type="checkbox" class="brake_delay_check" ng-model="mbs[' + nr + '].wert" id="' + data.mbs_id + '_delay_opt" title="' + SGI.translate("delay_check") + '"/>\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                                  <div id="' + data.mbs_id + '_in1"  class="div_input ' + data.mbs_id + '_in"><a class="input_font">'+SGI.translate("Start")+'</a></div>\
                                  <div id="' + data.mbs_id + '_in2"  class="div_input ' + data.mbs_id + '_in"><a class="input_font">'+SGI.translate("Abbruch")+'</a></div>\
                </div>\
                <div id="right_' + nr + '" class="div_right_brake">\
                    <div id="' + data.mbs_id + '_out" class="div_output1 ' + data.mbs_id + '_out"><a class="output_font"></a></div>\
                </div>\
            </div>');

            $("#" + data.mbs_id + "_delay").numberMask({type: 'float', beforePoint: 5, afterPoint: 1, decimalMark: '.'})

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "intervall") {

            if (data.val.length == 0) {
                data.val = 1;
            }

            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_simpel mbs_element_control ">\
                <div id="head_' + data.mbs_id + '" class="div_head" style="background-color: #0060FF">\
                    <a class="head_font">Intervall</a>\
                 </div>\
                <div style="border-bottom: 1px solid cyan">\
                    <input type="text" class="brake_delay" ng-model="mbs[' + nr + '].val" id="' + data.mbs_id + '_delay" title="' + SGI.translate("Pause in Sekunden") + '" />\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                                  <div id="' + data.mbs_id + '_in1"  class="div_input ' + data.mbs_id + '_in"><a class="input_font">'+SGI.translate("Start")+'</a></div>\
                                  <div id="' + data.mbs_id + '_in2"  class="div_input ' + data.mbs_id + '_in"><a class="input_font">'+SGI.translate("Abbruch")+'</a></div>\
                </div>\
                <div id="right_' + nr + '" class="div_right_brake">\
                    <div id="' + data.mbs_id + '_out" class="div_output1 ' + data.mbs_id + '_out"><a class="output_font"></a></div>\
                </div>\
            </div>');

            $("#" + data.mbs_id + "_delay").numberMask({type: 'float', beforePoint: 5, afterPoint: 1, decimalMark: '.'})

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "loop") {

            if (data.val.length == 0) {
                data.val = 1;
            }

            if (typeof data.wert === "object") {
                data.wert = 1;
            }
            scope.append($("#prg_panel"), '\
            <div id="' + data.mbs_id + '" ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" class="mbs_element mbs_element_simpel mbs_element_control ">\
                <div id="head_' + data.mbs_id + '" class="div_head" style="background-color: #0060FF">\
                    <a class="head_font">Loop</a>\
                </div>\
                <div style="border-bottom: 1px solid cyan">\
                    <div style="color: #000000; display: inline; font-size: 9px;">Loop:</div><input ng-model="mbs[' + nr + '].wert" type="text" class="brake_delay" id="' + data.mbs_id + '_n" title="' + SGI.translate("loop_n") + '" />\
                    <div style="color: #000000; display: inline; font-size: 9px;">Time:</div><input ng-model="mbs[' + nr + '].val" type="text" class="brake_delay" id="' + data.mbs_id + '_delay" title="' + SGI.translate("loop_delay") + '" />\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                    <div id="' + data.mbs_id + '_in1" class="div_input ' + data.mbs_id + '_in"><a class="input_font">Start</a></div>\
                    <div id="' + data.mbs_id + '_in2" class="div_input ' + data.mbs_id + '_in"><a class="input_font">Cancel</a></div>\
                </div>\
                <div id="right_' + nr + '" class="div_right_loop">\
                    <div id="' + data.mbs_id + '_out" class="div_output1 ' + data.mbs_id + '_out"><a class="output_font"></a></div>\
                </div>\
            </div>');

            $("#" + data.mbs_id + "_delay").numberMask({type: 'float', beforePoint: 5, afterPoint: 1, decimalMark: '.'});

            $("#" + data.mbs_id + "_n").numberMask({type: 'int', beforePoint: 5})

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "scriptobj") {

            if (scope.mbs[nr]["name"] == "Rechtsklick") {
                scope.mbs[nr]["name"] = "";
            }

            scope.append($("#prg_panel"), '\
            <div style="min-width:195px " ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" id="' + data.mbs_id + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: yellow">\
                    <p style="color: red!important;" class="head_font">Script Objekt</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_obj"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                    <label style="display:inline-block; font-size: 13px;color: #000000;width: 45px ">Name: </label><input class="inp_obj_name" ng-model="mbs[' + nr + '].name" id="name_' + data.mbs_id + '">\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "ccuobj") {
            var id;
            if (scope.mbs[data.mbs_id]["hmid"].length == 0) {
                id = SGI.get_lowest_obj_id();
                scope.mbs[data.mbs_id]["hmid"] = id;
                homematic.regaObjects[id] = {"Name": "", "TypeName": "VARDP"}
            } else {
                id = scope.mbs[data.mbs_id]["hmid"];
                homematic.regaObjects[id] = {"Name": data.name, "TypeName": "VARDP"}
            }

            if (scope.mbs[data.mbs_id]["name"] == "Rechtsklick") {
                scope.mbs[data.mbs_id]["name"] = "";
            }

            scope.append($("#prg_panel"), '\
            <div style="min-width:195px"  ng-style="mbs[' + nr + '].style" data-nr="' + nr + '"  id="' + data.mbs_id + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: yellow">\
                    <p class="head_font">CCU.IO Objekt</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_obj"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                    <label style="display:inline-block; font-size: 13px;color: #000000;width: 45px ">Name: </label><input class="inp_obj_name" ng-model="mbs[' + nr + '].name" id="name_' + data.mbs_id + '">\
                </div>\
            </div>');

            $("#name_" + data.mbs_id).change(function () {
                homematic.regaObjects[id].Name = $(this).val()
            });

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "ccuobjpersi") {
            var id;
            if (scope.mbs[data.mbs_id]["hmid"].length == 0) {
                id = SGI.get_lowest_obj_id();
                scope.mbs[data.mbs_id]["hmid"] = id;
                homematic.regaObjects[id] = {"Name": "", "TypeName": "VARDP"}
            } else {
                id = scope.mbs[data.mbs_id]["hmid"];
                homematic.regaObjects[id] = {"Name": data.name, "TypeName": "VARDP"}
            }

            if (scope.mbs[data.mbs_id]["name"] == "Rechtsklick") {
                scope.mbs[data.mbs_id]["name"] = "";
            }

            scope.append($("#prg_panel"), '\
            <div style="min-width:195px " ng-style="mbs[' + nr + '].style" data-nr="' + nr + '" id="' + data.mbs_id + '" class="mbs_element mbs_element_trigger tr_simpel">\
                <div id="head_' + nr + '" class="div_head" style="background-color: yellow">\
                    <p style="color: #008000!important;"class="head_font">CCU.IO Objekt persistent</p>\
                    <img src="img/icon/bullet_toggle_minus.png" class="btn_min_obj"/>\
                </div>\
                <div class="div_hmid_trigger" >\
                    <label style="display:inline-block; font-size: 13px;color: #000000;width: 45px ">Name: </label><input class="inp_obj_name" ng-model="mbs[' + nr + '].name" id="name_' + data.mbs_id + '">\
                </div>\
            </div>');

            $("#name_" + data.mbs_id).change(function () {
                homematic.regaObjects[id].Name = $(this).val()
            });

        }

        scope.$apply();

        SGI.add_mbs_endpoint(data);
        SGI.make_mbs_drag(data);
        SGI.make_mbs_drop();


        $("#" + data.mbs_id).tooltip();
        if (SGI.tooltip) {
            $("#" + data.mbs_id).tooltip("enable");
        } else {
            $("#" + data.mbs_id).tooltip("disable");
        }
    },

});
