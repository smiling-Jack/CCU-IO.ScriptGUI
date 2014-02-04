/**
 * Created by Schorling on 31.01.14.
 */

SGI = $.extend(true, SGI, {

    add_mbs_element: function (_data) {

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
                             <input style="position: relative; margin-top: -12px" value="' + data.titel + '" type="text" id="titel_' + data.type + '_' + SGI.mbs_n + '" class="titel_codebox item_font">\
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
                    SGI.plumb_inst["inst_"+data.mbs_id].repaintEverything();
                    SGI.plumb_inst.inst_mbs.repaintEverything();
                }
            });
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "komex") {

            $("#prg_panel").append('\
                             <div id="' + data.type + '_' + SGI.mbs_n + '" class="mbs_element mbs_element_kommentar">\
                             <textarea id="text_' + SGI.mbs_n + '"class="komex">' + data.kommentar + '</textarea>\
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

            $("#text_" + SGI.mbs_n).autosize()

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
            mbs = $("#" + data.mbs_id).children();
            mbs.css({"width": data.width + "px", "height": data.height + "px"});
        }

        SGI.add_mbs_endpoint(data);
        SGI.make_mbs_drag(data);
        SGI.make_mbs_drop();
        SGI.mbs_n++;
    },

});
