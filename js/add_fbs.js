/**
 * Created by Schorling on 31.01.14.
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
            delay: _data.delay || 0
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
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 und_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "oder") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="oder_' + SGI.fbs_n + '_in' + i + '"  class="div_input oder_' + SGI.fbs_n + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="oder_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 oder_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "not") {

            $("#" + data.parent).append('\
                             <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_simpel ">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: green">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                  <div id="' + data.type + '_' + SGI.fbs_n + '_in"  class="div_input ' + data.type + '_' + SGI.fbs_n + '_in"><a class="input_font">IN</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 ' + data.type + '_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "verketten") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.type + '_' + SGI.fbs_n + '_in' + i + '"  class="div_input ' + data.type + '_' + SGI.fbs_n + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            $("#" + data.parent).append('\
                             <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: orange">\
                                    <a class="head_font">' + data.type + '</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    ' + input_data + '\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                    <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_output1 ' + data.type + '_' + SGI.fbs_n + '_out"><a class="output_font">OUT</a></div>\
                                </div>\
                            </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "input") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: yellow">\
                                    <p class="head_font_io">GET</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "true") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Wahr</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: green">\
                                    <p class="head_font_io">1</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "false") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_konst">Falsch</div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: green">\
                                    <p class="head_font_io">0</p>\
                            </div>\
                        </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "zahl") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <input class="inp_var" type=int value="' + data.value + '" id="var_' + SGI.fbs_n + '">\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right " style="background-color: darkviolet">\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_string">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_out_string ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
                            </div>\
                            <textarea class="inp_text"  id="var_' + SGI.fbs_n + '">' + data.value + '</textarea>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right_string " style="background-color: orange">\
                                    <div style=" margin-top:50%" class="head_font_io_string">Text</div>\
                            </div>\
                        </div>');
            set_pos();


            $('#var_' + SGI.fbs_n).css({"width": data.width + "px", "height": data.height + "px"});

            $('#var_' + SGI.fbs_n).autosize();

            $('#var_' + SGI.fbs_n).change(function () {


                PRG.fbs["string_" + $(this).attr("id").split("_")[1]]["value"] = $(this).val();

            });
            $('#var_' + SGI.fbs_n).resize(function (ui, w, h) {

                PRG.fbs[data.fbs_id]["width"] = w;
                PRG.fbs[data.fbs_id]["height"] = h;
                SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].repaintEverything();
            });


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "vartime") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_string">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_out_string ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                            </select>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_right_string " style="background-color: orange">\
                                    <div style=" margin-top:50%" class="head_font_io_string">Zeit</div>\
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
        if (data.type == "output") {
            $("#" + data.parent).append('\
                        <div  id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_io">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.type + '_' + SGI.fbs_n + '_in" class="div_io_out output_' + SGI.fbs_n + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">SET</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">' + data.name + '</div>\
                        </div>');
            set_pos();
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "mail") {


            $("#" + data.parent).append('\
                             <div id="mail_' + SGI.fbs_n + '" class="fbs_element fbs_element_varinput">\
                                <div id="head_' + SGI.fbs_n + '"  class="div_head" style="background-color: yellow">\
                                    <a class="head_font">Mail</a>\
                                </div>\
                                <div id="left_' + SGI.fbs_n + '" class="div_left">\
                                    <div id="mail_' + SGI.fbs_n + '_in1" style="height:27px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Empfänger</a></div>\
                                    <div id="mail_' + SGI.fbs_n + '_in2" style="height:27px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Betreff</a></div>\
                                    <div id="mail_' + SGI.fbs_n + '_in3" style="height:27px" class="div_input mail_' + SGI.fbs_n + '_in"><a class="input_font_big">Text</a></div>\
                                </div>\
                                <div id="right_' + SGI.fbs_n + '" class="div_right">\
                                </div>\
                             </div>');
            set_pos()
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "debugout") {
            $("#" + data.parent).append('\
                        <div  id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_output_left">\
                               <div id="' + data.type + '_' + SGI.fbs_n + '_in" class="div_io_out debugout_' + SGI.fbs_n + '_in"></div>\
                            </div>\
                            <div  id="right_' + SGI.fbs_n + '" class="div_right_io"></div>\
                             <div id="head_' + SGI.fbs_n + '"  class="div_head_left " style="background-color: yellow">\
                                    <p class="head_font_io">LOG</p>\
                            </div>\
                            <div id="div_hmid_' + SGI.fbs_n + '" class="div_hmid">CCU.IO LOG</div>\
                        </div>');
            set_pos();
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigvalue") {
            $("#" + data.parent).append('\
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div id="' + data.type + '_' + SGI.fbs_n + '" class="fbs_element fbs_element_tr">\
                            <div id="left_' + SGI.fbs_n + '" class="div_left"></div>\
                            <div id="right_' + SGI.fbs_n + '" class="div_right_io">\
                                <div id="' + data.type + '_' + SGI.fbs_n + '_out" class="div_io_in ' + data.type + '_' + SGI.fbs_n + '_out"></div>\
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
                        <div style="z-index: 5"  id="'+data.fbs_id+'" class="fbs_element fbs_element_onborder fbs_element_next">\
                                <p class="head_next">Weiter</p>\
                        </div>');
            set_pos();

            SGI.add_mbs_endpoint(data);
            var ep = SGI.plumb_inst.inst_mbs.getEndpoint(data.fbs_id);

            var pos = SGI.find_border_position(data);
            if (pos == "left") {
                $("#" + data.fbs_id).addClass("onborder_l");
                ep.setAnchor([0, 0.5, -1, 0,-7,-2]);
            }
            if (pos == "right") {
                $("#" + data.fbs_id).addClass("onborder_r");
                ep.setAnchor([1, 0.5, 1, 0, 3, -3]);
            }
            if (pos == "top") {
                $("#" + data.fbs_id).addClass("onborder_t");
                ep.setAnchor([0.5, 0, 0, -1,-3,-8])
            }
            if (pos == "bottom") {
                $("#" + data.fbs_id).addClass("onborder_b");
                ep.setAnchor([0.5, 1, 0, 1,-2,4])
            }
            SGI.plumb_inst.inst_mbs.repaintEverything();


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "if") {
            $("#" + data.parent).append('\
                        <div style="z-index: 5"  id="'+data.fbs_id+'" class="fbs_element fbs_element_onborder fbs_element_next">\
                                <p class="head_next">Wenn 1</p>\
                        </div>');
            set_pos();

            SGI.add_mbs_endpoint(data);
            SGI.add_fbs_endpoint(data.fbs_id, "", data.parent,"onborder");

            var ep_mbs = SGI.plumb_inst.inst_mbs.getEndpoint(data.fbs_id);
            var ep_fbs = SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].getEndpoint(data.fbs_id);


            var pos = SGI.find_border_position(data);
            if (pos == "left") {
                $("#" + data.fbs_id).addClass("onborder_l");
                ep_mbs.setAnchor([0, 0.5, -1, 0,-7,-3]);
                ep_fbs.setAnchor([1, 0.5, -1, 0, 3,-1]);
            }
            if (pos == "right") {
                $("#" + data.fbs_id).addClass("onborder_r");
                ep_mbs.setAnchor([1, 0.5, 1, 0, 3, -3]);
                ep_fbs.setAnchor([0, 0.5, -1, 0,-7, -2]);
            }
            if (pos == "top") {
                $("#" + data.fbs_id).addClass("onborder_t");
                ep_mbs.setAnchor([0.5, 0, 0, -1,-4,-8]);
                ep_fbs.setAnchor([0.5, 1, 0, 1, -3,3]);

            }
            if (pos == "bottom") {
                $("#" + data.fbs_id).addClass("onborder_b");
                ep_mbs.setAnchor([0.5, 1, 0, 1,-3,4]);
                ep_fbs.setAnchor([0.5, 0, 0, -1, -2,-8]);



            }
            SGI.plumb_inst.inst_mbs.repaintEverything();
            SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].repaintEverything();


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


        function set_pos() {
            fbs = $("#" + data.fbs_id);
            fbs.css({"top": data.top + "px", "left": data.left + "px"});
        }

        var _in = $('.' + data.type + '_' + SGI.fbs_n + '_in');

        $.each(_in, function () {
            var id = $(this).attr("id");
            SGI.add_fbs_endpoint(id, "input", data.parent);
        });

        var _out = $('.' + data.type + '_' + SGI.fbs_n + '_out');
        $.each(_out, function () {
            var id = $(this).attr("id");
            SGI.add_fbs_endpoint(id, "output", data.parent);
        });

        SGI.make_fbs_drag(data);
        SGI.fbs_n++;
    },

});