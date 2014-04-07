/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */


SGI = $.extend(true, SGI, {

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
            height: _data.height,
            delay: _data.delay || 0,
            scope: _data.scope || "singel",
            opt: _data.opt || "",
            opt2: _data.opt2 || "",
            opt3: _data.opt3 || "",
            exp_in: _data.exp_in || 1,
            exp_out: _data.exp_out || 1,
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
                                    <div id="' + data.fbs_id + '_out" class="div_output1 und_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "oder") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "not") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                  <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "wenn") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_simpel">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">Wenn </a>\
                                </div>\
                                <select id="val_' + data.fbs_id + '" class="inp_if">\
                                    <option value="==">=</option>\
                                    <option value="!=">!=</option>\
                                    <option value="<"><</option>\
                                    <option value=">">></option>\
                                    <option value="<="><=</option>\
                                    <option value=">=">>=</option>\
                                </select>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                <div id="' + data.fbs_id + '_in0"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
                                <div id="' + data.fbs_id + '_in1"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">REV</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right_if">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }

        $("#val_" + data.fbs_id).val(data.value);

        $('#val_' + data.fbs_id).change(function () {
            PRG.fbs[data.fbs_id]["value"] = $(this).val();
        });

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "verketten") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: orange">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "input") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_io">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: yellow">\
                                    <p class="head_font_io">Get</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "linput") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_i_liste">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: yellow">\
                                    <p style="color: #660066!important;" class="head_font_io">Liste</p>\
                            </div>\
                        </div>');
            set_pos()
            data.scope = "liste_ch";
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "inputlocal") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_io_local">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: yellow">\
                                    <p style="color: red!important;" class="head_font_io">Local</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "output") {
            $("#" + data.parent).append('\
                        <div  id="' + data.fbs_id + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.fbs_id + '_in" class="div_io_out ' + data.fbs_id + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">Set</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                        </div>');
            set_pos();
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "outputlocal") {
            $("#" + data.parent).append('\
                        <div  id="' + data.fbs_id + '" class="fbs_element fbs_element_io_local">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.fbs_id + '_in" class="div_io_out ' + data.fbs_id + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p style="color: red!important;" class="head_font_io">Local</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                        </div>');
            set_pos();

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "true") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_io_fix">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Wahr</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: orange">\
                                    <p class="head_font_io">1</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "false") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_io_fix">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Falsch</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: orange">\
                                    <p class="head_font_io">0</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "zahl") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_io_fix">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <input class="inp_var" type=int value="' + data.value + '" id="var_' + SGI.fbs_n + '">\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: orange">\
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

            if (data.value == 0) {
                data.value = "";
            }

            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_string">\
                                <div id="' + data.fbs_id + '_out" class="div_io_out_string ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <textarea class="inp_text"  id="var_' + SGI.fbs_n + '">' + data.value + '</textarea>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right_string " style="background-color: orange">\
                                    <div class="head_font_io_string">Text</div>\
                            </div>\
                        </div>');
            set_pos();

            $('#var_' + SGI.fbs_n).css({"width": data.width + "px"});

            $('#var_' + SGI.fbs_n).autosize();

            $('#var_' + SGI.fbs_n).change(function () {


                PRG.fbs["string_" + $(this).attr("id").split("_")[1]]["value"] = $(this).val();

            });
            $('#var_' + SGI.fbs_n).resize(function (ui, w, h) {

                PRG.fbs[data.fbs_id]["width"] = w;
                PRG.fbs[data.fbs_id]["height"] = h;
                SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].repaintEverything(); //todo nur den einen endpoint repainten
            });


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "vartime") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_string">\
                                <div id="' + data.fbs_id + '_out" class="div_io_out_string ' + data.fbs_id + '_out"></div>\
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
                                <option value="roh">roh</option>\
                            </select>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right_string " style="background-color: orange">\
                                    <div  class="head_font_io_string">Zeit</div>\
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
        if (data.type == "mail") {


            $("#" + data.parent).append('\
                             <div id="mail_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: yellow">\
                                    <a class="head_font">Mail</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    <div id="mail_' + SGI.fbs_n + '_in1" style="height:18px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Empfänger</a></div>\
                                    <div id="mail_' + SGI.fbs_n + '_in2" style="height:18px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Betreff</a></div>\
                                    <div id="mail_' + SGI.fbs_n + '_in3" style="height:18px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Text</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "debugout") {
            $("#" + data.parent).append('\
                        <div  id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.fbs_id + '_in" class="div_io_out debugout_' + SGI.fbs_n + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">LOG</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">CCU.IO LOG</div>\
                        </div>');
            set_pos();
            data.scope = "expert";
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "pushover") {
            $("#" + data.parent).append('\
                        <div  id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.fbs_id + '_in" class="div_io_out pushover_' + SGI.fbs_n + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">Send</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">Pushover</div>\
                        </div>');
            set_pos();


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "inc") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">+1</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                  <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "dec") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_simpel ">\
                                <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">-1</a>\
                                </div>\
                                <div id="left_' + data.fbs_id + '" class="div_left">\
                                  <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
                                </div>\
                                <div id="right_' + data.fbs_id + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "summe") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">Summe</a>\
                                </div>\
                                <div id="left_' + data.fbs_id + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + data.fbs_id + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "differenz") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">Differenz</a>\
                                </div>\
                                <div id="left_' + data.fbs_id + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + data.fbs_id + '" class="div_right">\
                                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigvalue") {
            $("#" + data.parent).append('\
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
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
                        <div id="' + data.fbs_id + '" class="fbs_element fbs_element_tr">\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Kanal Raum Namen</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: red">\
                                    <p class="head_font_io">Tr.</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "next") {
            $("#" + data.parent).append('\
                        <div style="z-index: 5"  id="' + data.fbs_id + '" class="fbs_element fbs_element_onborder fbs_element_next">\
                                <p class="head_next">Weiter</p>\
                        </div>');
            set_pos();

            SGI.add_mbs_endpoint(data);
            var ep = SGI.plumb_inst.inst_mbs.getEndpoint(data.fbs_id);

            var pos = SGI.find_border_position(data);
            if (pos == "left") {
                $("#" + data.fbs_id).addClass("onborder_l");
                ep.setAnchor([0, 0.5, -1, 0, -3, 3]);
            }
            if (pos == "right") {
                $("#" + data.fbs_id).addClass("onborder_r");
                ep.setAnchor([1, 0.5, 1, 0, 5, 2]);
            }
            if (pos == "top") {
                $("#" + data.fbs_id).addClass("onborder_t");
                ep.setAnchor([0.5, 0, 0, -1, 3, -3]);
            }
            if (pos == "bottom") {
                $("#" + data.fbs_id).addClass("onborder_b");
                ep.setAnchor([0.5, 1, 0, 1, 2, 7]);
            }
            SGI.plumb_inst.inst_mbs.repaintEverything();


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "next1") {
            $("#" + data.parent).append('\
                        <div style="z-index: 5"  id="' + data.fbs_id + '" class="fbs_element fbs_element_onborder fbs_element_next">\
                                <p class="head_next">Weiter 1</p>\
                        </div>');
            set_pos();

            SGI.add_mbs_endpoint(data);
            SGI.add_fbs_endpoint(data.fbs_id, "", data, "onborder");

            var ep_mbs = SGI.plumb_inst.inst_mbs.getEndpoint(data.fbs_id);
            var ep_fbs = SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].getEndpoint(data.fbs_id);


            var pos = SGI.find_border_position(data);
            if (pos == "left") {
                $("#" + data.fbs_id).addClass("onborder_l");
                ep_mbs.setAnchor([0, 0.5, -1, 0, -3, 3]);
                ep_fbs.setAnchor([1, 0.5, 1, 0, 5, 0]);
            }
            if (pos == "right") {
                $("#" + data.fbs_id).addClass("onborder_r");
                ep_mbs.setAnchor([1, 0.5, 1, 0, 5, 2]);
                ep_fbs.setAnchor([0, 0.5, -1, 0, -5, 0]);
            }
            if (pos == "top") {
                $("#" + data.fbs_id).addClass("onborder_t");
                ep_mbs.setAnchor([0.5, 0, 0, -1, 3, -3]);
                ep_fbs.setAnchor([0.5, 1, 0, 1, 0, 5]);

            }
            if (pos == "bottom") {
                $("#" + data.fbs_id).addClass("onborder_b");
                ep_mbs.setAnchor([0.5, 1, 0, 1, 2, 7]);
                ep_fbs.setAnchor([0.5, 0, 0, -1, 0, -5]);


            }
            SGI.plumb_inst.inst_mbs.repaintEverything();
            SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].repaintEverything();


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "lfwert") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_simpel fbs_element_fstate ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Wert</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out1" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                    <div id="' + data.fbs_id + '_out2" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                    <div id="' + data.fbs_id + '_out3" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div>\
                                    <div id="opt_' + data.fbs_id + '">\
                                    </div>\
                                    <input id="var_' + data.fbs_id + '" class="inp_filter_val" >\
                                    <div id="opt3_' + data.fbs_id + '">\
                                    </div>\
                                </div>\
                             </div>');
            set_pos()
            data.scope = "liste_val";

            if (data.opt == ""){
                data.opt = "="
            }
            if (data.opt2 == ""){
                data.opt2= 0;
            }

            $('#opt_' + data.fbs_id).xs_combo({
                cssButton: "xs_button_fbs",
                cssMenu: "xs_menu_fbs",
                addcssFocus: "xs_focus_fbs",
                cssText: "xs_text_fbs",
                time: 750,
                val: data.opt,
                combo: false,
                data: [
                    "=",
                    "!=",
                    "<",
                    ">",
                    "<=",
                    ">=",
                ]
            });

            if (data.opt3 == "<br>" || data.opt3 == ""){

                var opt3 = "< br >";
                PRG.fbs[data.fbs_id]["opt3"] = "<br>";
            }else{
                var opt3 = data.opt3
            }

            $('#opt3_' + data.fbs_id).xs_combo({
                cssButton: "xs_button_fbs_bottom",
                cssMenu: "xs_menu_fbs",
                addcssFocus: "xs_focus_fbs",
                cssText: "xs_text_fbs",
                time: 750,
                val: opt3,
                combo: true,
                data: [
                    "\"leer\"",
                    ",",
                    ";",
                    "< br >",
                ]
            });

            $('#var_' + data.fbs_id)
                .numberMask({type: 'float', beforePoint: 5, afterPoint: 0, decimalMark: '.'})
                .change(function () {
                    PRG.fbs[data.fbs_id]["opt2"] = $(this).val();
                })
                .val(data.value);


            $('#opt_' + data.fbs_id).change(function () {
                PRG.fbs[data.fbs_id]["opt"] = $('#opt_' + data.fbs_id).xs_combo();
            });
            $('#opt3_' + data.fbs_id).change(function () {
                var val = $('#opt3_' + data.fbs_id).xs_combo()
                if (val == "< br >"){
                    val = "<br>";
                }
                PRG.fbs[data.fbs_id]["opt3"] = val;
            });


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "lfdevice") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fdevice fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Gerät</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div class="div_hmid_filter" >\
                                </div>\
                             </div>');
            set_pos()
            data.name = _data["name"] || ["rechtsklick"]

            data.scope = "liste_ch";
            SGI.add_filter_device_name($("#" + data.fbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "lfchannel") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fdevice fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Kanal</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div class="div_hmid_filter" >\
                                </div>\
                             </div>');
            set_pos()
            data.name = _data["name"] || ["rechtsklick"]

            data.scope = "liste_ch";
            SGI.add_filter_channel_name($("#" + data.fbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "lfdp") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fdevice fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Datenpunkt</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div class="div_hmid_filter" >\
                                </div>\
                             </div>');
            set_pos()
            data.name = _data["name"] || ["rechtsklick"];

            data.scope = "liste_ch_dp";
            SGI.add_filter_dp_name($("#" + data.fbs_id));
        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "expert") {

            $("#" + data.parent).append('\
                             <div id="' + data.fbs_id + '" class="fbs_element fbs_element_exp ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: gray">\
                                    <a class="head_font">Expert</a>\
                                </div>\
                                <div id="left_' + data.fbs_id + '" class="div_left_exp">\
                                </div>\
                                <div id="right_' + data.fbs_id + '" class="div_right_exp">\
                                </div>\
                                <label class="lab_exp_in">Inputs</label>\
                                <label class="lab_exp_out">Outputs</label>\
                                <input  value="' + data.exp_in + '" id="var_in_' + data.fbs_id + '" class="inp_exp_val_in" type="text">\
                                <input  value="' + data.exp_out + '" id="var_out_' + data.fbs_id + '" class="inp_exp_val_out" type="text">\
                                <button type="button" id="btn_' + data.fbs_id + '" class="btn_exp">Edit</button> \
                             </div>');
            set_pos()
            data.scope = "expert";
            $('#var_in_' + data.fbs_id)

                .change(function () {
                    if ($(this).val() <= 9 ){
                        var n_new = $(this).val();
                    }else{
                        var n_new = 9;
                    }

                    var n_old = PRG.fbs[data.fbs_id]["exp_in"];

                    if (n_new < n_old) {
                        for (var i = n_old; i > n_new; i--) {
                            SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].deleteEndpoint(data.fbs_id + '_in_' + i);
                            $("#" + data.fbs_id + '_in_' + i).remove();
                        }
                    }
                    if (n_new > n_old) {
                        n_old++;
                        for (var i = n_old; i <= n_new; i++) {
                            $("#left_" + data.fbs_id).append('<div id="' + data.fbs_id + '_in_' + i + '"  class="div_input ' + data.fbs_id + '_in"></div>');
                            SGI.add_fbs_endpoint(data.fbs_id + '_in_' + i, "input", data);
                        }
                    }
                    PRG.fbs[data.fbs_id]["exp_in"] = $(this).val();
                });

            $('#var_out_' + data.fbs_id)
                .change(function () {
                    if ($(this).val() <= 9 ){
                        var n_new = $(this).val();
                    }else{
                        var n_new = 9;
                    }
                    var n_old = PRG.fbs[data.fbs_id]["exp_out"];

                    if (n_new < n_old) {
                        for (var i = n_old; i > n_new; i--) {
                            SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].deleteEndpoint(data.fbs_id + '_out_' + i);
                            $("#" + data.fbs_id + '_out_' + i).remove();
                        }
                    }
                    if (n_new > n_old) {
                        n_old++;
                        for (var i = n_old; i <= n_new; i++) {
                            $("#right_" + data.fbs_id).append('<div id="' + data.fbs_id + '_out_' + i + '" class="div_output1 ' + data.fbs_id + '_out"></div>');
                            SGI.add_fbs_endpoint(data.fbs_id + '_out_' + i, "output", data);
                        }
                    }
                    PRG.fbs[data.fbs_id]["exp_out"] = $(this).val();
                });
            for (var i = 1; i <= parseInt(data.exp_in); i++) {
                $("#left_" + data.fbs_id).append('<div id="' + data.fbs_id + '_in_' + i + '"  class="div_input ' + data.fbs_id + '_in"></div>')
            }
            for (var i = 1; i <= parseInt(data.exp_out); i++) {
                $("#right_" + data.fbs_id).append('<div id="' + data.fbs_id + '_out_' + i + '" class="div_output1 ' + data.fbs_id + '_out"></div>');
            }
            $("#btn_" + data.fbs_id).click(function () {
                if (PRG.fbs[data.fbs_id]["value"] == 0) {
                    PRG.fbs[data.fbs_id]["value"] = "";
                }
                SGI.edit_exp(data.value, function (value) {
                    PRG.fbs[data.fbs_id]["value"] = value;
                });

            })
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        function set_pos() {
            fbs = $("#" + data.fbs_id);
            fbs.css({"top": data.top + "px", "left": data.left + "px"});
        }

        var _in = $('.' + data.fbs_id + '_in');

        $.each(_in, function () {
            var id = $(this).attr("id");
            SGI.add_fbs_endpoint(id, "input", data);
        });

        var _out = $('.' + data.fbs_id + '_out');
        $.each(_out, function () {
            var id = $(this).attr("id");
            SGI.add_fbs_endpoint(id, "output", data);
        });

        SGI.make_fbs_drag(data);
        SGI.fbs_n++;
    },

});