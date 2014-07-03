/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

var wid_id = "W00001";


var wid = {
    name: "hallo",
    width: "x",
    height: 0,
    ids: [65000],
    ids_name: ["Master"],
    elements: ko.observable({}),
    wid_list: ko.observableArray([])
};


var WF = {
    socket: {},
    elem_settings: {},

    theme: "",


    str_theme: "WidgetFactory_Theme",
    str_elem_settings: "WidgetFactory_elem_settings",
    str_tollbox: "WidgetFactory_Toolbox",

    elem_nr: 0,
    key: "",

    hoverEleme: undefined,

    Setup: function ($scope) {







        // slider XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $("#sim_output").prepend("<tr><td style='width: 100px'>Script Log</td><td></td></tr>");

        $("#prg_body").perfectScrollbar({
            wheelSpeed: 60,
            top: "50%",
            left: "50%"
        });

        $("#wgs_body").perfectScrollbar({
            suppressScrollX: true,
            wheelSpeed: 60
        });


        // WGS XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $("#wgs_general_head")
            .button()
            .click(function () {

                $("#wgs_general_content").toggle();
                $(this).removeClass('ui-state-focus')
            });

        $("#wgs_add_head")
            .button()
            .click(function () {

                $("#wgs_add_content").toggle();
                $(this).removeClass('ui-state-focus')
            });


        $("#wgs_add_select").selectBoxIt({
            theme: "jqueryui",
            populate: [
                {value: "add_knob", text: "Knob" },
                {value: "add_knob_bar", text: "Knob Bar" }
            ]
        });

        $("#wgs_add_select_container").selectBoxIt({
            theme: "jqueryui"
        });

        var wg_select_data = [];

        $("#wg_select").selectBoxIt({
            theme: "jqueryui",
            populate: wg_select_data
        });

        $("#wg_select").bind("option-click", function (event) {

            var _nr = $("#wg_select option:selected").val();

            WF.element_select($("#"+wid_id+"_"+_nr))

        });

        wid.wid_list.subscribe(function () {
            wg_select_data = wid.wid_list();

            $("#wg_select").data('selectBox-selectBoxIt').remove();
            $("#wg_select").data('selectBox-selectBoxIt').add(wg_select_data);

        });

        $("body").on("click", ".element", function (event) {
            WF.element_select(event.currentTarget);
        });


        $("#wgs_add_btn")
            .button()
            .click(function () {
                wid.wid_list.push({
                    text: WF.elem_nr + " " + $("#wgs_add_select option:selected").text(),
                    value: WF.elem_nr
                });

                WF[$("#wgs_add_select option:selected").val()]($("#new_widget"), WF.elem_nr);
                WF.elem_nr++;
            });

        // Toolbox XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


        $(document).keydown(function (event) {
//            console.log(event.keyCode)
            WF.key = event.keyCode;

        });

        $(document).keyup(function () {
            if (WF.key == 17) {
                $("body").css({cursor: "default"});
            }
            WF.key = "";
        });

        $("body").css({visibility: "visible"});

        WF.menu_iconbar();
        WF.context_menu();
        WF.add_new_widget();

        $("#test").click(function () {
            wid_builder.build();
        });

        $("#backcolor_var")
            .change(function () {
                $("#prg_panel").css({"background-color": $(this).css("background-color")})
            });

        $("#backcolor_black,#backcolor_white, #backcolor_var ").click(function () {
            $("#prg_panel").css({"background-color": $(this).css("background-color")})
        })
    },

    add_knob: function (container, _nr) {

        wid.elements[_nr] = {
            std: {
                id: ["Master"],
                parrent: "new_widget_x",
                h: 100,
                w: 100,
                left: "0",
                top: "0",
                nr: _nr.toString(),
                opa: 1,
                zindex: 1,
                type: "knob"
            },

            start_winkel: -135,
            stop_winkel: 135,
            max: 100,
            min: "0",
            val: 100,

            glow: {
                mode: "Stroke",
                width: "0",
                intent: "0",
                color: "00FFFF"
            },
            fill: {
                mode: "Color",
                color: "FFFFFF",
                url: " ",
                size: 100,
                opa: 1
            },
            str: {
                width: " ",
                mode: "color",
                color: "FF0000",
                url: 100,
                opa: 1
            },
            grad: {
                pos: [],
                color: [],
                opa: []
            }
        };

        $("#wgs_content").append('<div id="set' + _nr + '" class="set"></div>');

        WF.add_es_std(_nr);
        WF.add_es_knob(_nr);
        WF.add_es_fill(_nr);
        WF.add_es_str(_nr);
        WF.add_es_glow(_nr);
        WF.add_es_grad(_nr);


        function paint() {
            var es = wid.elements[_nr];

            var _defs = "";
            var _fill = "";
            var _g = "";

            if (wid.elements[_nr].fill.mode() == "Color") {
                _fill = "fill=#" + es.fill.color();
            }
            if (wid.elements[_nr].fill.mode() == "Image") {
                _fill = 'fill="url(#' + _nr + 'img_fill)"';
                _defs += '<pattern id="' + _nr + 'img_fill" patternUnits="userSpaceOnUse" width="1000" height="1000">' +
                    '<image xlink:href="' + es.fill.url() + '" x="0" y="0" width="1000" height="1000" />' +
                    '</pattern>';
            }


            $(container).append('<div class="element" style="z-index:' + es.std.zindex() + '; position:absolute; top:' + es.std.top() + 'px; left:' + es.std.left() + 'px; border: 1px solid transparent;width:' + es.std.w() + 'px; height:' + es.std.h() + 'px" id="' + wid_id + '_' + es.std.nr() + '">\
            <svg \
                viewBox="0 0 1000 1000"\
                width="100%" \
                height="100%"\
            >\
            <defs>\
            <circle id="svg_knob' + es.std.nr() + '" cx="500" cy="500" r="' + (500 - (es.str.width())) + '"  />\
            ' + _defs + '\
            </defs>\
            <g id="blurred">\
                 ' + _g + '\
                <use xlink:href="#svg_knob' + es.std.nr() + '" ' + _fill + ' style="fill-opacity:' + es.fill.opa() + '; stroke:#' + es.str.color() + '; stroke-width:' + es.str.width() + '; stroke-opacity:' + es.str.opa() + ';  " />\
            </g>\
            </svg>\
            </div>');


            WF.element_select($("#" + wid_id + '_' + es.std.nr()));
        }


        new jscolor.init();

        ko.applyBindings(wid, document.getElementById("set" + _nr));
        ko.watch(wid.elements[_nr], {wrap: true, depth: -1}, function () {
            $('#' + wid_id + '_' + _nr).remove();
            paint(_nr)
        });
        paint(_nr);
    },
    add_knob_bar: function (container, _nr) {

        wid.elements[_nr] = {
            std: {
                id: ["Master"],
                parrent: "new_widget_x",
                h: 100,
                w: 100,
                left: "0",
                top: "0",
                nr: _nr.toString(),
                opa: 1,
                zindex: 1,
                type: "knob_bar"
            },

            start_winkel: -135,
            stop_winkel: 135,
            max: ko.observable(100),
            min: ko.observable(0),
            val: ko.observable(100),
            cap: "butt",


            glow: {
                mode: "Stroke",
                width: "0",
                intent: "0",
                color: "00FFFF"
            },
            str: {
                width: 100,
                mode: "color",
                color: "FF0000",
                url: " ",
                opa: 1
            },
            grad: {
                pos: [],
                color: [],
                opa: []
            }
        };

        $("#wgs_content").append('<div id="set' + _nr + '" class="set"></div>');

        WF.add_es_std(_nr);
        WF.add_es_knobbar(_nr);
        WF.add_es_str(_nr);
        WF.add_es_glow(_nr);
        WF.add_es_grad(_nr);


        function paint(_nr) {


            var es = wid.elements[_nr];

            var _turn_winkel = es.start_winkel() * Math.PI / 180;
            var r = 500 - (parseInt(es.str.width()) / 2) - (es.glow.width() * 2);
            var x1 = 500 + r * Math.sin(_turn_winkel);
            var y1 = 500 - r * Math.cos(_turn_winkel);
            var winkel_max = (es.start_winkel() - es.stop_winkel()) * -1;
            var winkel = (winkel_max / (es.max() - es.min()) * (es.val() - es.min()));
            var x2 = 500 + r * Math.sin((winkel + parseInt(es.start_winkel())) * Math.PI / 180);
            var y2 = 500 - r * Math.cos((winkel + parseInt(es.start_winkel())) * Math.PI / 180);

            var _defs = "";
            var _g = "";
            var _fill = "";
            if (parseInt(es.glow.width()) > 0 && parseInt(es.glow.intent()) > 0) {
                _defs += '<filter id="theBlur' + es.std.nr() + '"' +
                    'filterUnits="userSpaceOnUse"' +
                    'x="0" y="0" width="1000" height="1000">' +
                    '<feGaussianBlur in="SourceGraphic" stdDeviation="' + es.glow.width() + '" />' +
                    '</filter>'

                for (var i = 0; i < parseInt(es.glow.intent()); i++) {
                    if (!parseInt(es.glow.color()) == "000000") {
                        _g += '<use xlink:href="#svg_knob_bar' + es.std.nr() + '"  style=" ' + es.cap() + '; stroke:#' + es.glow.color() + '" filter="url(#theBlur' + es.std.nr() + ')"/> '
                    } else {
                        _g += '<use xlink:href="#svg_knob_bar' + es.std.nr() + '"  style=" ' + es.cap() + '; stroke:url(#' + _nr + 'img_fill)" filter="url(#theBlur' + es.std.nr() + ')"/> '
                    }

                }
            }
            if (wid.elements[_nr].str.mode() == "Image") {
                _fill = 'url(#' + _nr + 'img_fill)';
                _defs += '<pattern id="' + _nr + 'img_fill" patternUnits="userSpaceOnUse" width="1000" height="1000">' +
                    '<image xlink:href="' + es.str.url() + '" x="0" y="0" width="1000" height="1000" />' +
                    '</pattern>';
            } else {
                _fill = '#' + es.str.color();
            }

            $(container).append('<div class="element" style=" left:' + es.std.left() + 'px;top:' + es.std.top() + 'px;z-index:' + es.std.zindex() + ';  position:absolute; border: 1px solid transparent;width:' + es.std.w() + 'px; height:' + es.std.h() + 'px" id="' + wid_id + '_' + es.std.nr() + '">\
            <svg \
                viewBox="0 0 1000 1000"\
                width="100%" \
                height="100%"\
            >\
            <defs>\
            <path id="svg_knob_bar' + es.std.nr() + '" stroke-width=' + es.str.width() + ' fill="none"/>\
             ' + _defs + '\
            </defs>\
            <g id="blurred">\
                 ' + _g + '\
                <use xlink:href="#svg_knob_bar' + es.std.nr() + '" style="stroke:' + _fill + ';' + es.cap() + ' ; stroke-opacity: ' + es.str.opa() + '"/>\
            </g>\
            </svg>\
            </div>');
//            ko.applyBindings(wid, document.getElementById(wid_id + '_' + es.std.nr()'));

            if (winkel < 180) {

                $('[id="svg_knob_bar' + es.std.nr() + '"]').attr("d", "M" + x1 + "," + y1 + " A" + r + "," + r + " 0 0,1 " + x2 + "," + y2 + "  ");
            } else {
                $('[id="svg_knob_bar' + es.std.nr() + '"]').attr("d", "M" + x1 + "," + y1 + " A" + r + "," + r + " 0 1,1 " + x2 + "," + y2 + "  ");
            }

            WF.element_select($("#" + wid_id + '_' + es.std.nr()));
        }

        new jscolor.init();
        ko.applyBindings(wid, document.getElementById("set" + _nr));
        ko.watch(wid.elements[_nr], {wrap: true, depth: -1}, function () {
            $('#' + wid_id + '_' + _nr).remove();
            paint(_nr)
        });
        paint(_nr);
    },
    add_new_widget: function () {

        $("#prg_panel").append('<div id="new_widget_body" style="position:relative; border: 1px solid yellow"><div id="new_widget" style="width:500px; height:500px;   border: 1px dashed red"> </div></div>');
        $('#new_widget').resizable({

        })
    },

    add_es_knobbar: function (nr) {
        var es = 'elements[' + nr + '].';
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_spec-btn">Spezifisch:</button><br>' +
            '<table style="display: none">' +
            '<tr>' +
            '<td width="100px">Start Winkel</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'start_winkel" class="es_spec es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Stop Winkel</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'stop_winkel" class="es_spec es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Max</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'max" class="es_spec es_number""></td>' +
            '</tr>' +
            '<tr>' +
            '<td>MIN</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'min" class="es-spec es_number"></td>' +
            '</tr>' +
            '</tr>' +
            '<tr>' +
            '<td>Test Wert</td>' +
            '<td><div id="' + nr + '_spec-sliderval"  class="es-spec es_number"></div></td>' +
            '</tr>' +
            '<tr>' +
            '<tr>' +
            '<td width="100px">Ende</td>' +
            '<td><select data-bind="value: ' + es + 'cap" class="id_type" id="' + nr + '_spec-cap">' +
            '</select></td>' +
            '</tr>' +
            '</table>' +
            '<hr>' +
            '</div>';

        $("#set" + nr).append(data);

        $('#' + nr + '_spec-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });

        $("#" + nr + "_spec-cap").selectBoxIt({
            theme: "jqueryui",
            populate: [
                {value: "stroke-linecap:butt", text: "butt" },
                {value: "stroke-linecap:round", text: "Rund" },
                {value: "stroke-linecap:square", text: "square" }
            ]
        });


        $("#" + nr + "_spec-sliderval").slider({
            value: wid.elements[nr].val(),
            max: wid.elements[nr].max(),
            min: wid.elements[nr].min(),
            slide: function (event, ui) {
                wid.elements[nr].val(ui.value);
            }
        });

        wid.elements[nr].max.subscribe(function (newval) {
            wid.elements[nr].val(newval)
            $("#" + nr + "_spec-sliderval").slider("option", {"max": parseInt(newval), value: wid.elements[nr].val()});

        });
        wid.elements[nr].min.subscribe(function (newval) {
            $("#" + nr + "_spec-sliderval").slider("option", {"min": parseInt(newval), value: wid.elements[nr].val() });

        });

    },
    add_es_knob: function (nr) {
        var es = 'elements[' + nr + '].';
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_spec-btn">Spezifisch:</button><br>' +
            '<table style="display: none">' +
            '<tr>' +
            '<td width="100px">Start Winkel</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'start_winkel" class="es_spec es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Stop Winkel</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'stop_winkel" class="es_spec es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Max</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'max" class="es_spec es_number""></td>' +
            '</tr>' +
            '<tr>' +
            '<td>MIN</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'min" class="es-spec es_number"></td>' +
            '</tr>' +

            '</table>' +
            '<hr>' +
            '</div>';

        $("#set" + nr).append(data);

        $('#' + nr + '_spec-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });
    },

    add_es_std: function (nr) {

        var es = 'elements[' + nr + '].std.';
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_std-btn">Standart:</button><br>' +
            '<table style="display: none">' +
            '<tr>' +
            '<td width="100px">id</td>' +
            '<td><select data-bind="value: ' + es + 'id" class="id_type" id="' + nr + '_std-id">' +
            '</select></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Höhe</td>' +
            '<td><input type="number"  data-bind="value: ' + es + 'h"   class="es_std es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Breite</td>' +
            '<td><input type="number"  data-bind="value: ' + es + 'w"  class="es_std es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Oben</td>' +
            '<td><input type="number"  data-bind="value: ' + es + 'top" class="es_std es_number""></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Links</td>' +
            '<td><input type="number"  data-bind="value: ' + es + 'left" class="es_std es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Transparens</td>' +
            '<td><input type="number" min="0.0" max="1.0" step="0.1" data-bind="value: ' + es + 'opa"  class="es_std es_number"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Ebende</td>' +
            '<td><input type="number" data-bind="value: ' + es + 'zindex"  class="es_std es_number"></td>' +
            '</tr>' +
            '</table>' +
            '<hr>' +
            '</div>';


        $("#set" + nr).append(data);

        $("#" + nr + "_std-id").selectBoxIt({
            theme: "jqueryui",
            populate: wid.elements[nr].std.id
        });

        $('#' + nr + '_std-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });
    },
    add_es_str: function (nr) {

        var es = 'elements[' + nr + '].str.';
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_str-btn">Stroke:</button><br>' +
            '<table style="display: none">' +
            '<tr>' +
            '<td width="100px">Breite</td>' +
            '<td><input type="number"  data-bind="value: ' + es + 'width" class="es_str' + nr + ' es_number"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Transparens</td>' +
            '<td><input type="number"  data-bind="value: ' + es + 'opa" class="es_str' + nr + ' es_number"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td width="100px">Mode</td>' +
            '<td><select data-bind="value: ' + es + 'mode" class="id_type es_str' + nr + '" id="' + nr + '_str-mode" >' +
            '</select></td>' +
            '</tr>' +
            '<tr class="' + nr + '_str-color">' +
            '<td>Color</td>' +
            '<td><input data-bind="value: ' + es + 'color" class="color es_str' + nr + ' es_number"/></td>' +
            '</tr>' +
            '<tr class="' + nr + '_str-img">' +
            '<td>Image</td>' +
            '<td><input data-bind="value: ' + es + 'url" class="es_str' + nr + ' es_number"/></td>' +
            '</tr>' +
            '</table>' +
            '<hr>' +
            '</div>';

        $("#set" + nr).append(data);

        $("#" + nr + "_str-mode").selectBoxIt({
            theme: "jqueryui",
            populate: ["Color", "Image", "Farbverlauf"]
        });

        $('#' + nr + '_str-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });

        $("#" + nr + "_str-mode").change(function () {
            if ($(this).val() == "Color") {
                $("." + nr + "_str-img").hide();
                $("." + nr + "_str-color").show()
            }
            if ($(this).val() == "Image") {
                $("." + nr + "_str-color").hide();
                $("." + nr + "_str-img").show();
            }
        });
        if (wid.elements[nr].str.mode == "Color") {
            $("." + nr + "_str-img").hide()
        }
        if (wid.elements[nr].str.mode == "Image") {
            $("." + nr + "_str-color").hide()
        }

    },
    add_es_fill: function (nr) {

        var es = 'elements[' + nr + '].fill.';
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_fill-btn">Füllung:</button><br>' +
            '<table style="display: none">' +
            '<td width="100px">Mode</td>' +
            '<td><select data-bind="value: ' + es + 'mode" class="id_type es_fill' + nr + '" id="' + nr + '_fill-mode" >' +
            '</select></td>' +
            '</tr>' +
            '<tr class="' + nr + '_fill-color">' +
            '<td>Color</td>' +
            '<td><input data-bind="value: ' + es + 'color" class="color es_fill' + nr + ' es_number"/></td>' +
            '</tr>' +
            '<tr class="' + nr + '_fill-img">' +
            '<td>Image</td>' +
            '<td><input data-bind="value: ' + es + 'url" class="es_fill' + nr + ' es_number"/></td>' +
            '</tr>' +
            '<tr class="' + nr + '_fill-img">' +
            '<td>Image size</td>' +
            '<td><input data-bind="value: ' + es + 'size" class="es_fill' + nr + ' es_number"/></td>' +
            '</tr>' +
            '</tr>' +
            '<td>Transparenz</td>' +
            '<td><input type="number" min="0" max="1" step="0.1" data-bind="value: ' + es + 'opa" class="es_fill' + nr + ' es_number"/></td>' +
            '</tr>' +
            '</table>' +
            '<hr>' +
            '</div>';

        $("#set" + nr).append(data);

        $("#" + nr + "_fill-mode").selectBoxIt({
            theme: "jqueryui",
            populate: ["Color", "Image", "Farbverlauf"]
        });

        $('#' + nr + '_fill-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });

        $("#" + nr + "_fill-mode").change(function () {
            if ($(this).val() == "Color") {
                $("." + nr + "_fill-img").hide();
                $("." + nr + "_fill-color").show()
            }
            if ($(this).val() == "Image") {
                $("." + nr + "_fill-color").hide();
                $("." + nr + "_fill-img").show();
            }
        });


        if (wid.elements[nr].fill.mode == "Color") {
            $("." + nr + "_fill-img").hide()
        }
        if (wid.elements[nr].fill.mode == "Image") {
            $("." + nr + "_fill-color").hide()
        }

    },
    add_es_glow: function (nr) {

        var es = 'elements[' + nr + '].glow.';
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_glow-btn">Glow:</button><br>' +
            '<table style="display: none">' +
            '<td width="100px">Mode</td>' +
            '<td><select data-bind="value: ' + es + 'mode" class="id_type" id="' + nr + '_glow-mode">' +
            '</select></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Weite:</td>' +
            '<td><input data-bind="value: ' + es + 'width" type="number" class="es_number es_glow" id="' + nr + '_glow-width"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Stärke</td>' +
            '<td><input data-bind="value: ' + es + 'intent"  type="number" min="1" max="10" class="es_number es_glow" id="' + nr + '_glow-intent"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>Farbe</td>' +
            '<td><input data-bind="value: ' + es + 'color" class="color es_glow" id="' + nr + '_glow-Color"></td>' +
            '</tr>' +
            '</table>' +
            '<hr>' +
            '</div>';

        $("#set" + nr).append(data);

        $('#' + nr + '_glow-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });

        $("#" + nr + "_glow-mode").selectBoxIt({
            theme: "jqueryui",
            populate: ["Grafik", "Stroke"]
        });

    },
    add_es_grad: function (nr) {

        var es = wid.elements[nr];
        var data = '<div>' +
            '<button class="set_btn" id="' + nr + '_grad-btn">Farbverlauf:</button><br>' +
            '<table style="display: none">' +
            '</table>' +
            '<hr>' +
            '</div>';

        $("#set" + nr).append(data);

        $('#' + nr + '_grad-btn')
            .button()
            .click(function () {
                $(this).next().next().toggle();
                $(this).removeClass("ui-state-focus")
            });

        $(".es_grad").change(function () {
            var nr = $(this).attr("id").split("_")[0];

            elements[nr].grad[attr] = $(this).val()
        })

    },

    element_select: function ($this) {
        var _nr = $($this).attr("id").split(wid_id + "_")[1];

        var container = $("#" + wid.elements[_nr].std.parrent());
        if (!$($this).hasClass("element_selected")) {
            $(".element_selected")
                .draggable("destroy")
                .resizable("destroy")
                .removeClass("element_selected");
            $(".set").hide();
        }
        $($this)
            .addClass("element_selected")
            .draggable({
                containment: container,
                stop: function (event, ui) {
                    wid.elements[_nr].std.left(ui.position.left);
                    wid.elements[_nr].std.top(ui.position.top);
                }
            })
            .resizable({
                aspectRatio: true,
                handles: "se",
                stop: function (event, ui) {
                    wid.elements[_nr].std.w(ui.size.width);
                    wid.elements[_nr].std.h(ui.size.height);

                }
            });

        $("#set"+_nr).show();
        $("#wg_select").data("selectBox-selectBoxIt").selectOption(_nr)
    }


};


//var homematic = {
//    uiState: new can.Observe({"_65535": {"Value": null}}),
//    setState: new can.Observe({"_65535": {"Value": null}}),
//    regaIndex: {},
//    regaObjects: {},
//    setStateTimers: {}
//};webstorm


var wid_builder = {
    _script: "",
    build: function () {

        var _html = "";

        $.each(elements, function () {

            if (this.std.type == "knob_bar") {

            }
            if (this.std.type == "knob") {

            }


        });


    }
};

(function () {
    $(document).ready(function () {
        // Lade Theme XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        WF.theme = storage.get("ScriptGUI_Theme");
        if (WF.theme == undefined) {
            WF.theme = "dark-hive"
        }
        $("#theme_css").remove();
        $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + WF.theme + '/jquery-ui.min.css"/>');


        // Lade ccu.io Daten XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//        try {
//            WF.socket = io.connect($(location).attr('protocol') + '//' + $(location).attr('host') + "?key=" + socketSession);
//
//            WF.socket.on('event', function (obj) {
//                if (homematic.uiState["_" + obj[0]] !== undefined) {
//                    var o = {};
//                    o["_" + obj[0] + ".Value"] = obj[1];
//                    o["_" + obj[0] + ".Timestamp"] = obj[2];
//                    o["_" + obj[0] + ".Certain"] = obj[3];
//                    homematic.uiState.attr(o);
//                }
//            });
//
//            WF.socket.emit("getIndex", function (index) {
//                homematic.regaIndex = index;
////                WF.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/regaIndex.json", JSON.stringify(index));
//
//                WF.socket.emit("getObjects", function (obj) {
//
//                    homematic.regaObjects = obj;
//
////                    $.each(obj, function (index) {
////
////                    });
//                    //                    WF.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/Objects.json", JSON.stringify(obj));
//
//                    WF.socket.emit("getDatapoints", function (data) {
////                        WF.socket.emit("writeRawFile", "www/ScriptGUI/sim_Store/Datapoints.json", JSON.stringify(data));
//
//                        for (var dp in data) {
//                            homematic.uiState.attr("_" + dp, { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]});
//                        }
//
//
//                    });
//                });
//            });
//        }
//        catch (err) {
//
//            $.getJSON("sim_store/regaIndex.json", function (index) {
//                homematic.regaIndex = index;
//            });
//            $.getJSON("sim_store/Objects.json", function (obj) {
//                homematic.regaObjects = obj;
//                $.getJSON("sim_store/Datapoints.json", function (data) {
//                    for (var dp in data) {
//                        homematic.uiState.attr("_" + dp, { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]});
//                    }
//                });
//            });
//        }

        WF.Setup();

    });
})(jQuery);

