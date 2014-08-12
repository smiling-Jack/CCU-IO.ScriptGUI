/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */


SGI = $.extend(true, SGI, {

    add_fbs_element: function (_data, left, top, copy) {
        var nr = SGI.fbs_n;
        SGI.fbs_n++;
        var data = {
            parent: _data.parent,
            fbs_id:  _data.type + "_" + nr,
            type: _data.type,
            hmid: _data.hmid || [],
            name: SGI.get_name(_data.hmid),
            value: _data.value || 0,
            input_n: _data.input_n || 2,
            width: _data.width,
            height: _data.height,
            delay: _data.delay || 0,
            scope: _data.scope || "singel",
            opt: _data.opt || "",
            opt2: _data.opt2 || "",
            opt3: _data.opt3 || "",
            exp_in: _data.exp_in || 1,
            exp_out: _data.exp_out || 1,
            input: {},
            output: {},

            style: _data.style || {
                "left": left + "px",
                "top": top + "px"
            }
        };

        if (copy) {
            data.left = data.left + 18;
            data.top = data.top + 18;
        }

        scope.fbs[ nr] = data;


//        PRG.fbs[data.fbs_id] = data; //todo Remove after ng

        var input_data = "";
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "und") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="und_' + nr + '_in' + i + '"  class="div_input und_' + nr + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_varinput">\
                <div id="head_' + nr + '"  class="div_head" style="background-color: green">\
                    <a class="head_font">and</a>\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                    ' + input_data + '\
                </div>\
                <div id="right_' + nr + '" class="div_right">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "oder") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_varinput">\
                <div id="head_' + nr + '"  class="div_head" style="background-color: green">\
                    <a class="head_font">or</a>\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                    ' + input_data + '\
                </div>\
                <div id="right_' + nr + '" class="div_right">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "not") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
                <div id="head_' + nr + '"  class="div_head" style="background-color: green">\
                    <a class="head_font">not</a>\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                  <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
                </div>\
                <div id="right_' + nr + '" class="div_right">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "wenn") {

            if (scope.fbs[nr].value == 0) {
                scope.fbs[nr].value = "==";
            }

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel">\
                <div id="head_' + nr + '"  class="div_head" style="background-color: green">\
                    <a class="head_font">IF</a>\
                </div>\
                <select id="val_' + data.fbs_id + '"  ng-model="fbs[' + nr + '].value"  class="inp_if" title="' + SGI.translate("Vergleichsoperator") + '">\
                    <option value="==">=</option>\
                    <option value="!=">!=</option>\
                    <option value="<"><</option>\
                    <option value=">">></option>\
                    <option value="<="><=</option>\
                    <option value=">=">>=</option>\
                </select>\
                <div id="left_' + nr + '" class="div_left">\
                <div id="' + data.fbs_id + '_in0"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
                <div id="' + data.fbs_id + '_in1"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">REV</a></div>\
                </div>\
                <div id="right_' + nr + '" class="div_right_if">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "timespan") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel">\
                <div id="head_' + nr + '"  class="div_head" style="background-color: green">\
                    <a style="font-size: 12px" class="head_font">Timespan</a>\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                <div id="' + data.fbs_id + '_in0"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">' + SGI.translate("Start") + '</a></div>\
                <div id="' + data.fbs_id + '_in1"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">' + SGI.translate("Stop") + '</a></div>\
                </div>\
                <div id="right_' + nr + '" class="div_right">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');

        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "verketten") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_varinput">\
                <div id="head_' + nr + '"  class="div_head" style="background-color: orange">\
                    <a class="head_font">Concate</a>\
                </div>\
                <div id="left_' + nr + '" class="div_left">\
                    ' + input_data + '\
                </div>\
                <div id="right_' + nr + '" class="div_right">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "input") {
            scope.append($("#" + data.parent), '\
             <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid" ng-bind="fbs[' + nr + '].name"></div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: yellow">\
                    <p class="head_font_io">Get</p>\
                </div>\
             </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "linput") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_i_liste">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid" ng-bind="fbs[' + nr + '].name"></div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: yellow">\
                    <p style="color: #660066!important;" class="head_font_io">List</p>\
                </div>\
            </div>');

            scope.fbs[nr].scope = "liste_ch";
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "inputlocal") {
//            scope.fbs[nr].name = _data.name;
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io_local">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid" ng-bind="fbs[' + nr + '].name"></div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: yellow">\
                    <p style="color: red!important;" class="head_font_io">Local</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "output") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io fbs_out">\
                <div id="left_' + nr + '" class="div_output_left">\
                   <div id="' + data.fbs_id + '_in" class="div_io_out ' + data.fbs_id + '_in"></div>\
                </div>\
                <div  id="right_' + nr + '" class="div_right_io"></div>\
                <div id="head_' + nr + '"  class="div_head_left " style="background-color: yellow">\
                    <p class="head_font_io">Set</p>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid" ng-bind="fbs[' + nr + '].name"></div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "outputlocal") {
//            scope.fbs[nr].name = _data.name;
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io_local fbs_out">\
                <div id="left_' + nr + '" class="div_output_left">\
                    <div id="' + data.fbs_id + '_in" class="div_io_out ' + data.fbs_id + '_in"></div>\
                </div>\
                <div  id="right_' + nr + '" class="div_right_io"></div>\
                <div id="head_' + nr + '"  class="div_head_left " style="background-color: yellow">\
                    <p style="color: red!important;" class="head_font_io">Local</p>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid" ng-bind="fbs[' + nr + '].name"></div>\
            </div>');


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "true") {
            scope.append($("#" + data.parent), '\
                       <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io_fix">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">true</div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: orange">\
                        <p class="head_font_io">1</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "false") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io_fix">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">false</div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: orange">\
                        <p class="head_font_io">0</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "zahl") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_io_fix">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <input class="inp_var" type=int ng-model="fbs[' + nr + '].value" id="var_' + nr + '">\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: orange" title="' + SGI.translate("no") + '">\
                        <p class="head_font_io" >No.</p>\
                </div>\
            </div>');

            $('#var_' + nr).numberMask({pattern: /^[-+]?\d*\.?\d*$/});


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "string") {

            if (scope.fbs[nr].value == 0) {
                scope.fbs[nr].value = "";
            }

            if (data.style.width == undefined) {
                scope.fbs[nr].style = {
                    "width": "100px",
                    "height": "auto",
                    "left": scope.fbs[nr].style.left,
                    "top": scope.fbs[nr].style.top
                }
            }
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                <div id="right_' + nr + '" class="div_right_string">\
                    <div id="' + data.fbs_id + '_out" class="div_io_out_string ' + data.fbs_id + '_out"></div>\
                </div>\
                <textarea class="inp_text"  id="var_' + nr + '" ng-model="fbs[' + nr + '].value"></textarea>\
                <div id="head_' + nr + '"  class="div_head_right_string " style="background-color: orange">\
                    <div class="head_font_io_string">Text</div>\
                </div>\
            </div>');


            $('#var_' + nr).autosize();

            var bind = false;
            $('#var_' + nr).resize(function (ui, w, h) {

                if (bind == false) {
                    $('#var_' + nr).bind("mouseup", function () {
                        scope.fbs[nr].style.width = w;
                        scope.$apply();
                        $('#var_' + nr).unbind("mouseup");
                        bind = false;
                    });
                    bind = true;
                }
                SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].repaintEverything(); //todo nur den einen endpoint repainten
            });


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "vartime") {

            if (scope.fbs[nr].value == 0) {
                scope.fbs[nr].value = "zeit_k";
            }

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_string fbs_element_simpel">\
                <div id="right_' + nr + '" class="div_right_string">\
                    <div id="' + data.fbs_id + '_out" class="div_io_out_string ' + data.fbs_id + '_out"></div>\
                </div>\
                <select id="time_' + data.fbs_id + '" ng-model="fbs[' + nr + '].value" class="inp_vartime">\
                    <option value="zeit_k">hh:mm</option>\
                    <option value="zeit_l">hh:mm:ss</option>\
                    <option value="date_k">TT:MM:JJ</option>\
                    <option value="date_l">TT:MM:JJ hh:mm</option>\
                    <option value="mm">' + SGI.translate("Minute") + '</option>\
                    <option value="hh">' + SGI.translate("Stunde") + '</option>\
                    <!--<option value="DD">Tag</option>--> \
                    <option value="KW">' + SGI.translate("KW") + '</option>\
                    <option value="WD">' + SGI.translate("Wochentag_text") + '</option>\
                    <option value="MM">' + SGI.translate("Monat_text") + '</option>\
                    <option value="roh">' + SGI.translate("roh") + '</option>\
                </select>\
                <div id="head_' + nr + '"  class="div_head_right_string " style="background-color: orange">\
                    <div  class="head_font_io_string">Time</div>\
                </div>\
            </div>');
        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "mail") {
            scope.append($("#" + data.parent), '\
            <div id="mail_' + nr + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_varinput fbs_out">\
               <div id="head_' + nr + '"  class="div_head" style="background-color: yellow">\
                   <a class="head_font">Mail</a>\
               </div>\
               <div id="left_' + nr + '" class="div_left">\
                   <div id="mail_' + nr + '_in1" style="height:18px" class="div_input mail_' + nr + '_in"><a class="input_font_big">' + SGI.translate("Empfänger") + '</a></div>\
                   <div id="mail_' + nr + '_in2" style="height:18px" class="div_input mail_' + nr + '_in"><a class="input_font_big">' + SGI.translate("Betreff") + '</a></div>\
                   <div id="mail_' + nr + '_in3" style="height:18px" class="div_input mail_' + nr + '_in"><a class="input_font_big">' + SGI.translate("Text") + '</a></div>\
               </div>\
               <div id="right_' + nr + '" class="div_right">\
               </div>\
            </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "debugout") {
            scope.fbs[nr].style.scope = "expert";
            scope.append($("#" + data.parent), '\
            <div  id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr fbs_out">\
                <div id="left_' + nr + '" class="div_output_left">\
                   <div id="' + data.fbs_id + '_in" class="div_io_out debugout_' + nr + '_in"></div>\
                </div>\
                <div  id="right_' + nr + '" class="div_right_io"></div>\
                 <div id="head_' + nr + '"  class="div_head_left " style="background-color: yellow">\
                        <p class="head_font_io">LOG</p>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid">CCU.IO LOG</div>\
            </div>');


        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "pushover") {
            scope.append($("#" + data.parent), '\
            <div  id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr fbs_out">\
                <div id="left_' + nr + '" class="div_output_left">\
                   <div id="' + data.fbs_id + '_in" class="div_io_out pushover_' + nr + '_in"></div>\
                </div>\
                <div  id="right_' + nr + '" class="div_right_io"></div>\
                 <div id="head_' + nr + '"  class="div_head_left " style="background-color: yellow">\
                        <p class="head_font_io">Send</p>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_hmid">Pushover</div>\
            </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "inc") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
               <div id="head_' + nr + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">+1</a>\
               </div>\
               <div id="left_' + nr + '" class="div_left">\
                 <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
               </div>\
               <div id="right_' + nr + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
               </div>\
            </div>');
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "dec") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
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
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "summe") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_varinput">\
               <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">Sum</a>\
               </div>\
               <div id="left_' + data.fbs_id + '" class="div_left">\
                   ' + input_data + '\
               </div>\
               <div id="right_' + data.fbs_id + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
               </div>\
            /div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "differenz") {
            for (var i = 1; i < parseInt(data.input_n) + 1; i++) {
                input_data += '<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN ' + i + '</a></div>';
            }
            scope.append($("#" + data.parent), '\
             <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_varinput">\
                <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                    <a class="head_font">Difference</a>\
                </div>\
                <div id="left_' + data.fbs_id + '" class="div_left">\
                    ' + input_data + '\
                </div>\
                <div id="right_' + data.fbs_id + '" class="div_right">\
                    <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "round") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
               <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">Round</a>\
               </div>\
               <input value="' + data.value + '" class="inp_round" type="text" id="inp_' + data.fbs_id + '" title="' + SGI.translate("Anzahl Nachkommastellen") + '"/> \
               <div id="left_' + data.fbs_id + '" class="div_left">\
                 <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font"></a></div>\
               </div>\
               <div id="right_' + data.fbs_id + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font"></a></div>\
               </div>\
            </div>');

            $('#inp_' + data.fbs_id).numberMask({type: 'int', beforePoint: 1})
        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "toint") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
               <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">INT</a>\
               </div>\
               <div id="left_' + data.fbs_id + '" class="div_left">\
                 <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
               </div>\
               <div id="right_' + data.fbs_id + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
               </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "tofloat") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
               <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">Float</a>\
               </div>\
               <div id="left_' + data.fbs_id + '" class="div_left">\
                 <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
               </div>\
               <div id="right_' + data.fbs_id + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
               </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "tostring") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
               <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">String</a>\
               </div>\
               <div id="left_' + data.fbs_id + '" class="div_left">\
                 <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
               </div>\
               <div id="right_' + data.fbs_id + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
               </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "toh") {

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel ">\
               <div id="head_' + data.fbs_id + '"  class="div_head" style="background-color: green">\
                   <a class="head_font">ms to h</a>\
               </div>\
               <div id="left_' + data.fbs_id + '" class="div_left">\
                 <div id="' + data.fbs_id + '_in"  class="div_input ' + data.fbs_id + '_in"><a class="input_font">IN</a></div>\
               </div>\
               <div id="right_' + data.fbs_id + '" class="div_right">\
                   <div id="' + data.fbs_id + '_out" class="div_output1 ' + data.fbs_id + '_out"><a class="output_font">OUT</a></div>\
               </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigvalue") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Value</div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigtime") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Time</div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                    <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigoldvalue") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">old Value</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigoldtime") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">old Time</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigid") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst"> ID </div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigname") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Name</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchid") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel ID</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchname") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel Name</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchtype") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel Type</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchfuncIds") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel Gewerk IDs</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchroomIds") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel room IDs</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchfuncNames") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel Gewerk names</div>\
                 <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                        <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "trigchroomNames") {
            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_tr">\
                <div id="right_' + nr + '" class="div_right_io">\
                    <div id="' + data.fbs_id + '_out" class="div_io_in ' + data.fbs_id + '_out"></div>\
                </div>\
                <div id="div_hmid_' + nr + '" class="div_konst">Channel room names</div>\
                <div id="head_' + nr + '"  class="div_head_right " style="background-color: red">\
                    <p class="head_font_io">Tr.</p>\
                </div>\
            </div>');

        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "next") {
            scope.append($("#" + data.parent), '\
                        <div style="z-index: 5"  id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_onborder fbs_element_next">\
                                <p class="head_next">Next</p>\
                        </div>');

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
            scope.append($("#" + data.parent), '\
            <div style="z-index: 5"  id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_onborder fbs_element_next">\
                <p class="head_next">Next 1</p>\
            </div>');


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
            scope.fbs[nr].scope = "liste_val";

            if (data.opt == "") {
                scope.fbs[nr].opt = "="
            }

            if (data.opt2 == "") {
                scope.fbs[nr].opt2 = 0;
            }

            if (data.opt3 == "<br>" || data.opt3 == "") {

                var opt3 = "< br >";
                scope.fbs[nr]["opt3"] = "<br>";
            } else {
                var opt3 = scope.fbs[nr].opt3
            }

            scope.append($("#" + data.parent), '\
            <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_simpel fbs_element_fstate ">\
               <div id="head_' + nr + '"  class="div_head" style="background-color: #990099">\
                   <a class="head_font">Value</a>\
               </div>\
               <div id="left_' + nr + '" class="div_left_filter">\
                <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
               </div>\
               <div id="right_' + nr + '" class="div_right_filter">\
                   <div id="' + data.fbs_id + '_out1" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                   <div id="' + data.fbs_id + '_out2" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                   <div id="' + data.fbs_id + '_out3" class="div_output_filter ' + data.fbs_id + '_out"></div>\
               </div>\
               <div>\
                   <div style="" id="opt_' + data.fbs_id + '" >\
                   </div>\
                   <input id="var_' + data.fbs_id + '" ng-model="fbs[' + nr + '].value"  class="inp_filter_val" >\
                   <div id="opt3_' + data.fbs_id + '">\
                   </div>\
               </div>\
            </div>');


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
                    ">="
                ]
            });


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
                    "< br >"
                ]
            });

            $('#var_' + data.fbs_id)
                .numberMask({type: 'float', beforePoint: 5, afterPoint: 0, decimalMark: '.'})
                .val(scope.fbs[nr]["opt2"]);


            $('#opt_' + data.fbs_id).change(function () {
                scope.fbs[nr]["opt"] = $('#opt_' + data.fbs_id).xs_combo();
                scope.$apply()
            });
            $('#opt3_' + data.fbs_id).change(function () {
                var val = $('#opt3_' + data.fbs_id).xs_combo();
                if (val == "< br >") {
                    val = "<br>";
                }
                scope.fbs[nr]["opt3"] = val;
                scope.$apply()
            });
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "lfdevice") {
            scope.fbs[nr].name = _data["name"] || ["rechtsklick"];
            scope.fbs[nr].scope = "liste_ch";

            scope.append($("#" + data.parent), '\
                             <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fdevice fbs_element fbs_element_simpel ">\
                                <div id="head_' + nr + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Device</a>\
                                </div>\
                                <div id="left_' + nr + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + nr + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div class="div_hmid_filter" >\
                                </div>\
                             </div>');


            SGI.add_filter_device_name($("#" + data.fbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "lfchannel") {

            scope.append($("#" + data.parent), '\
                             <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fdevice fbs_element fbs_element_simpel ">\
                                <div id="head_' + nr + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Channel</a>\
                                </div>\
                                <div id="left_' + nr + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + nr + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div class="div_hmid_filter" >\
                                </div>\
                             </div>');

            data.name = _data["name"] || ["rechtsklick"]

            data.scope = "liste_ch";
            SGI.add_filter_channel_name($("#" + data.fbs_id));
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (data.type == "lfdp") {
            scope.fbs[nr].scope = _data["name"] || ["rechtsklick"];
            scope.fbs[nr].scope = "liste_ch_dp";

            scope.append($("#" + data.parent), '\
                             <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fdevice fbs_element fbs_element_simpel ">\
                                <div id="head_' + nr + '"  class="div_head" style="background-color: #990099">\
                                    <a class="head_font">Data point</a>\
                                </div>\
                                <div id="left_' + nr + '" class="div_left_filter">\
                                 <div id="' + data.fbs_id + '_in"  class="div_input_filter ' + data.fbs_id + '_in"></div>\
                                </div>\
                                <div id="right_' + nr + '" class="div_right_filter">\
                                    <div id="' + data.fbs_id + '_out" class="div_output_filter ' + data.fbs_id + '_out"></div>\
                                </div>\
                                <div class="div_hmid_filter" >\
                                </div>\
                             </div>');

            SGI.add_filter_dp_name($("#" + data.fbs_id));
        }

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (data.type == "expert") {
            scope.fbs[nr].scope = "expert";
            if (scope.fbs[nr]["value"] == 0) {
                scope.fbs[nr]["value"] = "";
            }

            scope.append($("#" + data.parent), '\
                             <div id="' + data.fbs_id + '" ng-style="fbs[' + nr + '].style" data-nr="' + nr + '" class="fbs_element fbs_element_exp ">\
                                <div id="head_' + nr + '"  class="div_head" style="background-color: gray">\
                                    <a class="head_font">Expert</a>\
                                </div>\
                                <div id="left_' + data.fbs_id + '" class="div_left_exp">\
                                </div>\
                                <div id="right_' + data.fbs_id + '" class="div_right_exp">\
                                </div>\
                                <label class="lab_exp_in">Inputs</label>\
                                <label class="lab_exp_out">Outputs</label>\
                                <input ng-model="fbs[' + nr + '].exp_in"   id="var_in_' + data.fbs_id + '" class="inp_exp_val_in" type="text">\
                                <input ng-model="fbs[' + nr + '].exp_out"  id="var_out_' + data.fbs_id + '" class="inp_exp_val_out" type="text">\
                                <button type="button" id="btn_' + data.fbs_id + '" class="btn_exp">Edit</button> \
                             </div>');

            $('#var_in_' + data.fbs_id).numberMask({type: 'int', beforePoint: 1});
            $('#var_out_' + data.fbs_id).numberMask({type: 'int', beforePoint: 1});

            for (var i = 1; i <= parseInt(data.exp_in); i++) {
                $("#left_" + data.fbs_id).append('<div id="' + data.fbs_id + '_in' + i + '"  class="div_input ' + data.fbs_id + '_in"></div>')
            }
            for (var i = 1; i <= parseInt(data.exp_out); i++) {
                $("#right_" + data.fbs_id).append('<div id="' + data.fbs_id + '_out' + i + '" class="div_output1 ' + data.fbs_id + '_out"></div>');
            }



            var in_new = 1;
            $('#var_in_' + data.fbs_id)
                .keyup(function () {
                    var n_old = in_new;
                    in_new = $(this).val();

                    if (in_new < n_old) {
                        for (var i = n_old; i > in_new; i--) {
                            SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].deleteEndpoint(data.fbs_id + '_in_' + i);
                            $("#" + data.fbs_id + '_in_' + i).remove();
                        }
                    }
                    if (in_new > n_old) {
                        n_old++;
                        for (var i = n_old; i <= in_new; i++) {
                            $("#left_" + data.fbs_id).append('<div id="' + data.fbs_id + '_in_' + i + '"  class="div_input ' + data.fbs_id + '_in"></div>');
                            SGI.add_fbs_endpoint(data.fbs_id + '_in_' + i, "input", data);
                        }
                    }

                });

            var out_new = 1;
            $('#var_out_' + data.fbs_id)
                .keyup(function () {
                    var n_old = out_new;
                    out_new = $(this).val();

                    if (out_new < n_old) {
                        for (var i = n_old; i > out_new; i--) {
                            SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].deleteEndpoint(data.fbs_id + '_out_' + i);
                            $("#" + data.fbs_id + '_out_' + i).remove();
                        }
                    }
                    if (out_new > n_old) {
                        n_old++;
                        for (var i = n_old; i <= out_new; i++) {
                            $("#right_" + data.fbs_id).append('<div id="' + data.fbs_id + '_out_' + i + '" class="div_output1 ' + data.fbs_id + '_out"></div>');
                            SGI.add_fbs_endpoint(data.fbs_id + '_out_' + i, "output", data);
                        }
                    }
                });



            $("#btn_" + data.fbs_id).click(function () {
                SGI.edit_exp(scope.fbs[nr]["value"], function (value) {
                    scope.fbs[nr]["value"] = value;
                    scope.$apply();
                });

            });



        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//        scope.$apply();

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
        if (copy) {
            $("#" + data.fbs_id).addClass("fbs_selected");
        }

    }

});