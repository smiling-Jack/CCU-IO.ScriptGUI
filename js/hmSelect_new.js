(function ($) {
    $.id_select = function (_options) {

        var time = new Date();

        // default
        var o = {
            height: 0,
            width: 0,
            type: "singel",
            filter: [],
            suche: true,
            close: "",
            liste: "",
            gridlist: "",
            head: ""
        };

        var callback;

        if (typeof _options == "object") {
            o = {
                height: _options["height"] || o.height,
                width: _options["width"] || o.width,
                type: _options["type"] || o.type,
                suche: _options["suche"] || o.suche,
                filter: _options["filter"] || o.filter
            };
            callback = _options.close
        } else if (typeof _options == "function") {
            callback = _options
        } else {
            console.error("id_select error kein callback definiert !");
            return
        }

        if (o.type == "singel") {
            o.gridlist = singellist();
            // definiere Dialog head
            o.head = '<td style="font-size: 15px"><b>Name<b></td><td style="font-size: 15px"><b>Type / Gerät<b></td><td></td><td style="font-size: 15px"><b>Raum<b></td><td style="font-size: 15px"><b>Gewerk<b></td><td style="font-size: 15px"><b>Favorit<b></td>'

        } else if (o.type == "groups") {
            o.gridlist = grouplist();
            // definiere Dialog head
            o.head = '<td style="font-size: 15px"><b>Gruppen<b></td></td>'

        } else if (o.type == "device") {
            o.gridlist = devicelist();
            // definiere Dialog head
            o.head = '<td style="font-size: 15px"><b>Gerät<b></td></td>'

        } else if (o.type == "channel") {
            o.gridlist = channellist();
            o.head = '<td style="font-size: 15px"><b>Local<b></td></td>'

        } else if (o.type == "dp") {
            o.gridlist = dplist();
            o.head = '<td style="font-size: 15px"><b>Kanal<b></td></td>'

        }else if (o.type == "local") {
            o.gridlist = locallist();
            o.head = '<td style="font-size: 15px"><b>Local<b></td></td>'

        }

        $("body").append('\
                    <div id="dialog_hmid" class="dialog_hmid_inner" style="text-align: center ;width: 900px" title="ID Auswahl">\
                   <br>\
                    <div id="tb_head" class="frame_color" style="width: 825px">\
                        <table id="grid_hmid_head" border = "1" frame="void" rules="rows" class="frame_color" style="width:825px;height:auto; text-align: left; font-size: 11px; border: solid 1px gray">\
                            <colgroup>\
                                <col width="300">\
                                <col width="200">\
                                <col width="25">\
                                <col width="100">\
                                <col width="100">\
                                <col width="100">\
                            </colgroup>\
                            <tr>\
                            ' + o.head + '\
                            </tr>\
                            <tr id="tr_filter" style="max-height: 24px ; overflow: visible">\
                                <td><div style="width: 300px" id="tb_suche_name"></div></td>\
                                <td><div style="width: 200px" id="tb_suche_type"></div></td>\
                                <td></td>\
                                <td><select style="width: 100px" id="tb_suche_raum"></select></td>\
                                <td><select style="width: 100px" id="tb_suche_gewerk"></select></td>\
                                <td><select style="width: 100px" id="tb_suche_favorite"></select></td>\
                            </tr>\
                         </table>\
                   </div>\
                   <div id="tb_body" style="width: 850px" >\
                        <table id="grid_hmid" border = "1" frame="void" rules="rows" class="frame_color" style="width:825px;height:auto; text-align: left; font-size: 11px; border: solid 1px gray">\
                            <colgroup>\
                                <col width="300">\
                                <col width="200">\
                                <col width="25">\
                                <col width="100">\
                                <col width="100">\
                                <col width="100">\
                                <col width="0">\
                                <col width="0">\
                            </colgroup>\
                        </table>\
                   </div><br>\
                   <label id="iddialog_lab_id">ID:</label><input type="text" id="iddialog_inp_id_direct"><label id="iddialog_lab_name">Name:</label><label id="iddialog_lab_namedireckt"></label><br>\
                   <button id="btn_hmid_ok" >Übernehmen</button>\
                 <!--  <button id="btn_hmid_abbrechen" >Abbrechen</button>-->\
                        <br>\
                   </div>');

        $("#tb_body").perfectScrollbar({
            wheelSpeed: 20,
        });

        $("#grid_hmid").resize(function (e) {
            $("#tb_body").perfectScrollbar("update");
        });

        $("#dialog_hmid").dialog({
            dialogClass: "dialog_hmid",
            resizable: false,
            close: function () {
                $("#dialog_hmid").remove();
                return callback(null)
            }

        });
        $("#btn_hmid_ok")
            .button().click(function () {
                var id = $("#iddialog_inp_id_direct").val();
                $("#dialog_hmid").remove();
                return callback(id)
            })
            .button("disable");

        // Suche Ausglenden
        if (o.type == "groups") {
            $("#tb_suche_name").parent().parent().hide();
        }

        // Filter
        if (o.type == "singel" || undefined) {

            var devices = {};
            var name = {};

            $.each(homematic.regaIndex["DEVICE"], function () {
                var _device = homematic.regaObjects[this]["HssType"];
                var _name = homematic.regaObjects[this]["Name"];

                devices[_device] = _device;
                name[_name] = _name;

            });
            var arr_device = $.map(devices, function (value) {
                return [value];
            });
            var arr_name = $.map(name, function (value) {
                return [value];
            });

            arr_device.sort();
            arr_name.sort();

            $("#tb_suche_name").xs_combo({
                combo: true,
                data: arr_name,
                cssButton: "xs_button_id_select",
                cssMenu: "xs_menu_id_select",
                cssFocus: "xs_focus_id_select ui-state-focus",
                cssText: "xs_text_id_select",
                val: "",
                width: 300
            });

            $("#tb_suche_type").xs_combo({
                combo: true,
                data: arr_device,
                cssButton: "xs_button_id_select",
                cssMenu: "xs_menu_id_select",
                cssFocus: "xs_focus_id_select ui-state-focus",
                cssText: "xs_text_id_select",
                val: ""

            });

            var max_height = parseInt($("#tb_body").css("height"));

            $(".xs_menu_id_select").css({"max-height": max_height});


            $("#tb_suche_raum").append('<option value="">*</option>');
            $.each(o.liste.Homematic.ROOMs, function () {
                $("#tb_suche_raum").append('<option value="' + this.Name + '">' + this.Name + '</option>');
            });

            $("#tb_suche_gewerk").append('<option value="">*</option>');
            $.each(o.liste.Homematic.GEW, function () {
                $("#tb_suche_gewerk").append('<option value="' + this.Name + '">' + this.Name + '</option>');
            });

            $("#tb_suche_favorite ").append('<option value="">*</option>');
            $.each(o.liste.Homematic.FAVO, function () {
                $("#tb_suche_favorite").append('<option value="' + this.Name + '">' + this.Name + '</option>');
            });

            $("#tb_suche_favorite, #tb_suche_gewerk, #tb_suche_raum, #tb_suche_type, #tb_suche_name  ").change(function () {

                $(".tb_parent").show();
                var favo = $("#tb_suche_favorite").val();
                var gewerk = $("#tb_suche_gewerk").val();
                var room = $("#tb_suche_raum").val();
                var type = $("#tb_suche_type").val();
                var name = $("#tb_suche_name").val();

                if (favo != "*") {
                    $.each($(".tree_favorite"), function () {
                        if ($(this).text().toString().toLowerCase().indexOf(favo.toString().toLowerCase()) == -1) {

                            $(this).parent().hide();
                        } else {
                            $(this).parent().attr('data-info', 'hide');
                        }
                    });
                }
                if (gewerk != "*") {
                    $.each($(".tree_gewerk"), function () {
                        if ($(this).text().toString().toLowerCase().indexOf(gewerk.toString().toLowerCase()) == -1) {

                            $(this).parent().hide();
                        } else {
                            $(this).parent().attr('data-info', 'hide');
                        }
                    });
                }
                if (room != "*") {
                    $.each($(".tree_room"), function () {
                        if ($(this).text().toString().toLowerCase().indexOf(room.toString().toLowerCase()) == -1) {

                            $(this).parent().hide();
                        } else {
                            $(this).parent().attr('data-info', 'hide');
                        }
                    });
                }
                if (type != "") {

                    $.each($(".tree_type"), function () {
                        var $this = this;
                        var nothide = false;
                        $.each(type.split(","), function () {

                            if ($($this).text().toString().toLowerCase().indexOf(this.toString().toLowerCase()) == -1) {
                            } else {
                                nothide = true;
                            }
                        });
                        if (nothide) {
                            $(this).parent().attr('data-info', 'hide');
                        } else {
                            $(this).parent().hide();
                        }
                    });

                }
                if (name != "") {
                    $.each($(".tree_name"), function () {
                        if ($(this).text().toString().toLowerCase().indexOf(name.toString().toLowerCase()) == -1) {

                            $(this).parent().hide();
                        } else {
                            $(this).parent().attr('data-info', 'hide');
                        }
                    });
                }
            });
        }

        var data = "";
//        Grid aufbau

        $.each(o.gridlist, function (index) {

            index = index + 1;
            var parent = "";

            if (this["parent"].length > 0) {
                $.each(this["parent"], function () {
                    parent += " " + this;
                });
            }



            if (this.level > 0) {
                var _type = this.Type;
                var _room = this.ROOM || "";
                var _gewerk = this["GEWERK"] || "";
                var _favorite = this["FAVORITE"] || "";
                var _id = this.ID || "";
                var _img = getImage(_type);
                var img = "";

                if (o.type == "device") {
                    _img = getImage(this.Name);
                    img = '<div style="background-image: url(' + _img + ')" class="device_img"></div>';
                } else if (_img != "") {
                    img = '<div style="background-image: url(' + _img + ')" class="device_img"></div>';
                }

                if (this.isLeaf == true) {

                    data += ('<tr id="' + index + '" class="tb_parent isLeaf ' + parent + ' level_' + this.level + '" data-lvl="' + this.level + '" data-info="hide"  style="display: none;">' +
                        '<td class="tree tree_name" style="padding-left:' + this.level * 20 + 'px"><span class="ui-icon ui-icon-radio-on tb-icon"></span>' + this.Name + '</td>' +
                        '<td class="tree tree_type">' + _type + '</td>' +
                        '<td class="tree tree_img"></td>' +
                        '<td class="tree tree_room">' + _room + '</td>' +
                        '<td class="tree tree_gewerk">' + _gewerk + '</td>' +
                        '<td class="tree tree_favorite">' + _favorite + '</td>' +
                        '<td nowrap style="visibility: hidden ; overflow: hidden;  max-width: 0" class="tree tree_id">' + _id + '</td></tr>')

                } else {
                    data += ('<tr id="' + index + '" class="tb_parent ' + parent + ' level_' + this.level + '" data-lvl="' + this.level + '" data-info="hide"  style="display: none;">' +
                        '<td class="tree tree_name" style="padding-left:' + this.level * 20 + 'px"><span class="ui-icon ui-icon-circle-plus tb-icon"></span>' + this.Name + '</td>' +
                        '<td class="tree tree_type">' + _type + '</td>' +
                        '<td class="tree tree_img">' + img + '</td>' +
                        '<td class="tree tree_room">' + _room + '</td>' +
                        '<td class="tree tree_gewerk">' + _gewerk + '</td>' +
                        '<td class="tree tree_favorite">' + _favorite + '</td>' +
                        '<td nowrap style="visibility: hidden ; overflow: hidden; max-width: 0" class="tree tree_id">' + _id + '</td></tr>')
                }
            } else {
                var _type = this.Type || "";
                var _room = this.ROOM || "";
                var _gewerk = this["GEWERK"] || "";
                var _favorite = this["FAVORITE"] || "";
                var _id = this.ID || "";


                data += ('<tr id="' + index + '" class="tb_parent ' + parent + '" data-lvl="' + this.level + '" data-info="hide"  >' +
                    '<td class="tree tree_name" style="padding-left:' + this.level * 15 + 'px"><span class="ui-icon ui-icon-circle-plus tb-icon"></span>' + this.Name + '</td>' +
                    '<td class="tree tree_type">' + _type + '</td>' +
                    '<td class="tree tree_img"></td>' +
                    '<td class="tree tree_room">' + _room + '</td>' +
                    '<td class="tree tree_gewerk">' + _gewerk + '</td>' +
                    '<td class="tree tree_favorite">' + _favorite + '</td>' +
                    '<td nowrap style="visibility: hidden; max-width: 0" class="tree tree_id">' + _id + '</td></tr>')
            }
        });

        $('#grid_hmid').append(data);

        $(".tb_parent").click(function () {
            $("#btn_hmid_ok").button("disable");
            $(".ui-state-highlight").removeClass("ui-state-highlight");

            if ($(this).children()[6].innerHTML !== "" && $(this).hasClass("isLeaf")) {

                var hmid;

                if (o.type == "local" || o.type == "device" || o.type == "dp" || o.type == "channel"  || o.type == "channel" ) {
                    hmid = $(this).children()[6].innerHTML;

                } else if (isNaN(parseInt($($(this)).children()[6].innerHTML)) == true) {
                    hmid = homematic.regaIndex.Name[$(this).children()[6].innerHTML][0];

                } else {
                    hmid = $(this).children()[6].innerHTML;
                }


                if (SGI.get_name(hmid) == "UNGÜLTIGE ID !!!") {
                    var _name = hmid;
                } else {
                    var _name = SGI.get_name(hmid);
                }

                $(this).addClass("ui-state-highlight");
                $("#btn_hmid_ok").button("enable");
                $("#iddialog_inp_id_direct").val(hmid);
                $("#iddialog_lab_namedireckt").text(_name);
            }
        });

        $("#iddialog_inp_id_direct").change(function () {
            var name = SGI.get_name($("#iddialog_inp_id_direct").val());
            $("#iddialog_lab_namedireckt").text(name);

            if (name != "UNGÜLTIGE ID !!!") {
                $("#btn_hmid_ok").button("enable");
            } else {
                $("#btn_hmid_ok").button("disable");
            }

        });

//        tree expand/collapse

        $(".tb_parent:not(.isLeaf)").click(function () {
            var ist = this.getAttribute('data-info');
            var lvl = parseInt(this.getAttribute('data-lvl')) + 1;
            if (ist == "show") {
                $("." + $(this).attr("id")).attr('data-info', 'hide').hide();
                this.setAttribute('data-info', 'hide');

                $("." + $(this).attr("id") + ":not(.isLeaf)").children().children("span").removeClass("ui-icon-circle-minus");
                $("." + $(this).attr("id") + ":not(.isLeaf)").children().children("span").addClass("ui-icon-circle-plus");
                $(this).children().children("span").removeClass("ui-icon-circle-minus");
                $(this).children().children("span").addClass("ui-icon-circle-plus");

            } else {
                $("." + $(this).attr('id') + ".level_" + lvl).show();
                this.setAttribute('data-info', 'show');
                $(this).children().children("span").removeClass("ui-icon-circle-plus");
                $(this).children().children("span").addClass("ui-icon-circle-minus");
            }

        });

        $(".tb_parent").hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );


        if (o.type == "device" || o.type == "local" || o.type == "dp" || o.type == "channel"  || o.type == "channel" ) {
            $("#tr_filter").hide();
            $(".tb_parent").show();
        }
        if (o.type == "groups") {
            $("#tr_filter").hide();
        }
        // listen

        //Große liste


        function singellist() {

            var _gridlist = [];
            var type;
            var liste = {
                Homematic: {
                    RF: {},
                    WIR: {},
                    CUxD: {},
                    VAR: {},
                    PRO: {},
                    FAVO: {},
                    ROOMs: {},
                    GEW: {},
                    Sonstige: {}
                },

                Scriptengine: {},
                Script: {},
                Sonstige: { }
            };


            // Eintragungen für Favoriten Räume und Gewerke ergänzen daher das clonen
            var daten = cloneJSON(homematic.regaObjects);
            $.each(daten, function () {

                if (this["TypeName"] == "FAVORITE") {
                    var name = this["Name"];
                    $.each(this.Channels, function () {
                        if (daten[this] != undefined) {
                            daten[this]["FAVORITE"] = name;
                        }
                    });
                }
                if (this["TypeName"] == "ENUM_FUNCTIONS") {
                    var name = this["Name"];
                    $.each(this.Channels, function () {
                        if (daten[this] != undefined) {
                            daten[this]["GEWERK"] = name;
                        }
                    });
                }
                if (this["TypeName"] == "ENUM_ROOMS") {
                    var name = this["Name"];
                    $.each(this.Channels, function () {

                        if (daten[this] != undefined) {
                            daten[this]["ROOM"] = name;
                        }
                    });
                }
            });

            var last_device = "";
            var last_channel = "";

            // in die Liste schreiben

            $.each(daten, function (index) {

                if (index < 66000) {
                    if (this["Parent"] == undefined || this["Parent"] == "") {

                        if (this["Interface"] == "BidCos-Wired") {

                            var ch = this["Channels"];

                            liste["Homematic"]["WIR"][index] = this;
                            liste["Homematic"]["WIR"][index]["Channels"] = {};
                            $.each(ch, function () {
                                liste["Homematic"]["WIR"][index]["Channels"][this] = daten[this];
                                var $ch = this;
                                $.each(liste["Homematic"]["WIR"][index]["Channels"][$ch]["DPs"], function (dp) {
                                    liste["Homematic"]["WIR"][index]["Channels"][$ch]["DPs"][dp] = daten[this];
                                });
                            });


                        } else if (this["Interface"] == "BidCos-RF") {

                            var ch = this["Channels"];

                            liste["Homematic"]["RF"][index] = this;
                            liste["Homematic"]["RF"][index]["Channels"] = {};
                            $.each(ch, function () {
                                liste["Homematic"]["RF"][index]["Channels"][this] = daten[this];
                                var $ch = this;
                                $.each(liste["Homematic"]["RF"][index]["Channels"][$ch].DPs, function (dp) {
                                    liste["Homematic"]["RF"][index]["Channels"][$ch].DPs[dp] = daten[this];
                                });
                            });

                        } else if (this["Interface"] == "CUxD") {

                            var ch = this["Channels"];

                            liste["Homematic"]["CUxD"][index] = this;
                            liste["Homematic"]["CUxD"][index]["Channels"] = {};
                            $.each(ch, function () {
                                liste["Homematic"]["CUxD"][index]["Channels"][this] = daten[this];
                                var $ch = this;
                                $.each(liste["Homematic"]["CUxD"][index]["Channels"][$ch].DPs, function (dp) {
                                    liste["Homematic"]["CUxD"][index]["Channels"][$ch].DPs[dp] = daten[this];
                                });
                            });

                        } else if (this["TypeName"] == "VARDP") {
                            liste["Homematic"]["VAR"][index] = this;

                        } else if (this["TypeName"] == "PROGRAM") {
                            liste["Homematic"]["PRO"][index] = this;

                        } else if (this["TypeName"] == "FAVORITE") {
                            liste["Homematic"]["FAVO"][index] = this;

                        } else if (this["TypeName"] == "ENUM_ROOMS") {
                            liste["Homematic"]["ROOMs"][index] = this;

                        } else if (this["TypeName"] == "ENUM_FUNCTIONS") {
                            liste["Homematic"]["GEW"][index] = this;

                        } else {
                            liste["Homematic"]["Sonstige"][index] = this;

                        }

                    }
                } else if (index > 99999 && index < 300000) {
                    if (this.Name != "") {
                        liste.Scriptengine[index] = this;
                    }

                } else if (this["TypeName"] == "DEVICE") {
//                this.Name = this.Name.split(".").pop();
                    last_device = this.Name;
                    liste[this.Name] = this;
                    liste[this.Name]["Channels"] = {};
                } else if (this["TypeName"] == "CHANNEL") {
//                this.Name = this.Name.split(".").pop();
                    last_channel = index;
                    liste[last_device]["Channels"][index] = this;
                    liste[last_device]["Channels"][index]["DPs"] = {};
                } else if (this["TypeName"] == "HSSDP") {
//                this.Name = this.Name.split(".").pop();
                    liste[last_device]["Channels"][last_channel]["DPs"][index] = this;
                } else {
                    liste["Sonstige"][index] = this;
                }


            });


            //Leere Objekte entfernen
            $.each(liste, function (index) {
                if (Object.keys(this).length < 1) {
                    delete liste[index];
                }
            });

            console.log(liste)
            o.liste = liste;

            $.each(liste, function (lvl1) {
                if (this.toString() == "[object Object]") {
                    type = this.HssType || "";
                    _gridlist.push({Name: lvl1, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 0, parent: ["null"], expanded: true, loaded: true, isLeaf: false});
                    var group = _gridlist.length;
                    if (lvl1 == "Homematic") {
                        if (Object.keys(this.RF).length > 1) {
                            _gridlist.push({Name: "Funk", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                            var RF = _gridlist.length;
                            $.each(this.RF, function (lvl2) {
                                type = this.HssType || "";
                                _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl2, level: 2, parent: [group, RF], expanded: true, loaded: true, isLeaf: false});
                                var device = _gridlist.length;
                                $.each(this.Channels, function (lvl3) {
                                    type = this.HssType || "";
                                    _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl3, level: 3, parent: [group, RF, device], expanded: true, loaded: true, isLeaf: false});
                                    var channel = _gridlist.length;
                                    $.each(this.DPs, function (lvl4) {
                                        type = valtype2Str(this["ValueType"]);
                                        _gridlist.push({Name: lvl4, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: this.Name, level: 4, parent: [group, RF, device, channel], expanded: true, loaded: true, isLeaf: true});
                                    });
                                });
                            });
                        }
                        if (Object.keys(this.WIR).length > 0) {
                            type = this.HssType || "";
                            _gridlist.push({Name: "Wired", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                            var Wir = _gridlist.length;
                            $.each(this.WIR, function (lvl2) {
                                type = this.HssType || "";
                                _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl2, level: 2, parent: [group, Wir], expanded: true, loaded: true, isLeaf: false});
                                var device = _gridlist.length;
                                $.each(this.Channels, function (lvl3) {
                                    type = this.HssType || "";
                                    _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl3, level: 3, parent: [group, Wir, device], expanded: true, loaded: true, isLeaf: false});
                                    var channel = _gridlist.length;
                                    $.each(this.DPs, function (lvl4) {
                                        type = valtype2Str(this["ValueType"]);
                                        _gridlist.push({Name: lvl4, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: this.Name, level: 4, parent: [group, Wir, device, channel], expanded: true, loaded: true, isLeaf: true});

                                    });
                                });
                            });
                        }
                        if (Object.keys(this.CUxD).length > 0) {
                            type = this.HssType || "";
                            _gridlist.push({Name: "CUxD", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                            var cuxd = _gridlist.length;
                            $.each(this.CUxD, function (lvl2) {
                                type = this.HssType || "";
                                _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl2, level: 2, parent: [group, cuxd], expanded: true, loaded: true, isLeaf: false});
                                var device = _gridlist.length;
                                $.each(this.Channels, function (lvl3) {
                                    type = this.HssType || "";
                                    _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl3, level: 3, parent: [group, cuxd, device], expanded: true, loaded: true, isLeaf: false});
                                    var channel = _gridlist.length;
                                    $.each(this.DPs, function (lvl4) {
                                        type = valtype2Str(this["ValueType"]);
                                        _gridlist.push({Name: lvl4, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: this.Name, level: 4, parent: [group, cuxd, device, channel], expanded: true, loaded: true, isLeaf: true});

                                    });
                                });
                            });
                        }
                        if (Object.keys(this.VAR).length > 0) {
                            type = this.HssType || "";
                            _gridlist.push({Name: "Variablen", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                            var VAR = _gridlist.length;
                            $.each(this.VAR, function (lvl2) {
                                var ValType = type2Str(this["ValueType"]);
                                _gridlist.push({Name: this.Name, Type: ValType.split(",")[0], ID: lvl2, level: 2, parent: [group, VAR], expanded: true, loaded: true, isLeaf: true});
                            });
                        }
                        if (Object.keys(this.PRO).length > 0) {
                            _gridlist.push({Name: "Programme", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                            var PRO = _gridlist.length;
                            $.each(this.PRO, function (lvl2) {
                                var ValType = (this["ValueType"]);
                                _gridlist.push({Name: this.Name, Type: ValType, ID: lvl2, level: 2, parent: [group, PRO], expanded: true, loaded: true, isLeaf: true});
                            });
                        }

                    } else if (lvl1.toString() == "Scriptengine") {

                        var engine = _gridlist.length;
                        $.each(this, function (lvl2) {
                            type = this.HssType || "";
                            _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl2, level: 1, parent: [group, engine], expanded: true, loaded: true, isLeaf: true});
                        });

                    } else if (lvl1.toString() != "Homematic" && lvl1.toString() != "Sonstige") {
                        type = this.HssType || "";
                        var device = _gridlist.length;
                        $.each(this.Channels, function (lvl2) {
                            var name = this.Name.split(".").pop();
                            type = this.HssType || "";
                            _gridlist.push({Name: name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl2, level: 1, parent: [device], expanded: true, loaded: true, isLeaf: false});
                            var channel = _gridlist.length;
                            $.each(this.DPs, function (lvl3) {
                                var name = this.Name.split(".").pop();
                                type = this.HssType || "";
                                _gridlist.push({Name: name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl3, level: 2, parent: [device, channel], expanded: true, loaded: true, isLeaf: true});
                            });
                        });
                    } else {
                        var ZZZ = _gridlist.length;
                        $.each(this, function (lvl2) {
                            type = this.HssType || "";
                            _gridlist.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, ID: lvl2, level: 1, parent: [group, ZZZ], expanded: true, loaded: true, isLeaf: true});
                        });
                    }
                }
            });

            return _gridlist
        }

        function grouplist() {

            var parent = 0;
            var _gridlist = [];

            _gridlist.push({Name: "Räume", Type: null, ROOM: null, GEWERK: null, FAVORITE: null, level: 0, parent: ["null"], expanded: true, loaded: true, isLeaf: false});
            parent = _gridlist.length;
            $.each(homematic.regaIndex["ENUM_ROOMS"], function () {
                _gridlist.push({Name: homematic.regaObjects[this].Name, Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this, level: 1, parent: [parent], expanded: true, loaded: true, isLeaf: true});
            });
            _gridlist.push({Name: "Gewerke", Type: null, ROOM: null, GEWERK: null, FAVORITE: null, level: 0, parent: ["null"], expanded: true, loaded: true, isLeaf: false});
            parent = _gridlist.length;
            $.each(homematic.regaIndex["ENUM_FUNCTIONS"], function () {
                _gridlist.push({Name: homematic.regaObjects[this].Name, Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this, level: 1, parent: [parent], expanded: true, loaded: true, isLeaf: true});
            });
            _gridlist.push({Name: "Favoriten", Type: null, ROOM: null, GEWERK: null, FAVORITE: null, level: 0, parent: ["null"], expanded: true, loaded: true, isLeaf: false});
            parent = _gridlist.length;
            $.each(homematic.regaIndex["FAVORITE"], function () {
                _gridlist.push({Name: homematic.regaObjects[this].Name, Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this, level: 1, parent: [parent], expanded: true, loaded: true, isLeaf: true});
            });

            return _gridlist
        }

        function devicelist() {
            var parent = 0;
            var _gridlist = [];
            var devices = {};

            $.each(homematic.regaIndex["DEVICE"], function () {
                var _device = homematic.regaObjects[this]["HssType"];
                devices[_device] = _device;
            });

            var arr_device = $.map(devices, function (value) {
                return [value];
            });

            arr_device.sort();

            $.each(arr_device, function () {
                _gridlist.push({Name: this.toString(), Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this.toString(), level: 1, parent: [parent], expanded: true, loaded: true, isLeaf: true});

            });

            return _gridlist
        }

        function channellist() {
            var _channel = {};
            var channel_name;
            var _gridlist = [];
            $.each(homematic.regaIndex["CHANNEL"], function () {
                if (this < 66000) {
                   channel_name = homematic.regaObjects[this]["ChnLabel"];
                    _channel[channel_name] = true;
                }
            });
            var sorted_keys = Object.keys(_channel).sort()

            $.each(sorted_keys, function(){
                _gridlist.push({Name: this.toString(), Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this.toString(), level: 1, parent: [0], expanded: true, loaded: true, isLeaf: true});
            });

          return _gridlist
        }

        function dplist() {
            var _dps = {};
            var dp_name;
            var _gridlist = [];
            $.each(homematic.regaIndex["HSSDP"], function () {
                if (this < 66000) {
                    dp_name = homematic.regaObjects[this]["Name"].split(".");
                    _dps[dp_name.pop()] = true;
                }
            });
            var sorted_keys = Object.keys(_dps).sort()

            $.each(sorted_keys, function(){
                _gridlist.push({Name: this.toString(), Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this.toString(), level: 1, parent: [0], expanded: true, loaded: true, isLeaf: true});
            });

            return _gridlist
        }

        function locallist() {
            var first_id = 805371904;
            var _gridlist = [];
            $.each(PRG.mbs, function (id) {
                if (id.split("_")[0] == "scriptobj") {
                    _gridlist.push({Name: this.name, Type: "", ROOM: "", GEWERK: "", FAVORITE: "", ID: this.name, level: 1, parent: [0], expanded: true, loaded: true, isLeaf: true});
                    first_id++;

                }
            });

            return _gridlist
        }


        function valtype2Str(type) {
            if (type == 1) {
                return "hallo 1"
            } else {
                return type
            }

        }

        // Snipsel functionen
        // Get image for type
        function getImage(type) {
            if (this.images == null) {
                this.deviceImgPath = 'img/devices/50/';
                // Devices -> Images
                this.images = {
                    'HM-LC-Dim1TPBU-FM': 'PushButton-2ch-wm_thumb.png',
                    'HM-LC-Sw1PBU-FM': 'PushButton-2ch-wm_thumb.png',
                    'HM-LC-Bl1PBU-FM': 'PushButton-2ch-wm_thumb.png',
                    'HM-LC-Sw1-PB-FM': 'PushButton-2ch-wm_thumb.png',
                    'HM-PB-2-WM': 'PushButton-2ch-wm_thumb.png',
                    'HM-LC-Sw2-PB-FM': 'PushButton-4ch-wm_thumb.png',
                    'HM-PB-4-WM': 'PushButton-4ch-wm_thumb.png',
                    'HM-LC-Dim1L-Pl': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Dim1T-Pl': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Sw1-Pl': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Dim1L-Pl-2': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Sw1-Pl-OM54': 'OM55_DimmerSwitch_thumb.png',
                    'HM-Sys-sRP-Pl': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Dim1T-Pl-2': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Sw1-Pl-2': 'OM55_DimmerSwitch_thumb.png',
                    'HM-LC-Sw1-Ba-PCB': '88_hm-lc-sw4-ba-pcb_thumb.png',
                    'HM-Sen-RD-O': '87_hm-sen-rd-o_thumb.png',
                    'HM-RC-Sec4-2': '86_hm-rc-sec4-2_thumb.png',
                    'HM-PB-6-WM55': '86_hm-pb-6-wm55_thumb.png',
                    'HM-RC-Key4-2': '85_hm-rc-key4-2_thumb.png',
                    'HM-RC-4-2': '84_hm-rc-4-2_thumb.png',
                    'HM-Sen-Wa-Od': '82_hm-sen-wa-od_thumb.png',
                    'HM-Sen-WA-OD': '82_hm-sen-wa-od_thumb.png',
                    'HM-Dis-TD-T': '81_hm-dis-td-t_thumb.png',
                    'HM-Sen-MDIR-O': '80_hm-sen-mdir-o_thumb.png',
                    'HM-OU-LED16': '78_hm-ou-led16_thumb.png',
                    'HM-LC-Sw1-Ba-PCB': '77_hm-lc-sw1-ba-pcb_thumb.png',
                    'HM-LC-Sw4-WM': '76_hm-lc-sw4-wm_thumb.png',
                    'HM-PB-2-WM55': '75_hm-pb-2-wm55_thumb.png',
                    'atent': '73_hm-atent_thumb.png',
                    'HM-RC-BRC-H': '72_hm-rc-brc-h_thumb.png',
                    'HMW-IO-12-Sw14-DR': '71_hmw-io-12-sw14-dr_thumb.png',
                    'HM-PB-4Dis-WM': '70_hm-pb-4dis-wm_thumb.png',
                    'HM-LC-Sw2-DR': '69_hm-lc-sw2-dr_thumb.png',
                    'HM-LC-Sw4-DR': '68_hm-lc-sw4-dr_thumb.png',
                    'HM-SCI-3-FM': '67_hm-sci-3-fm_thumb.png',
                    'HM-LC-Dim1T-CV': '66_hm-lc-dim1t-cv_thumb.png',
                    'HM-LC-Dim1T-FM': '65_hm-lc-dim1t-fm_thumb.png',
                    'HM-LC-Dim2T-SM': '64_hm-lc-dim2T-sm_thumb.png',
                    'HM-LC-Bl1-pb-FM': '61_hm-lc-bl1-pb-fm_thumb.png',
                    'HM-LC-Bi1-pb-FM': '61_hm-lc-bi1-pb-fm_thumb.png',
                    'HM-OU-CF-Pl': '60_hm-ou-cf-pl_thumb.png',
                    'HM-OU-CFM-Pl': '60_hm-ou-cf-pl_thumb.png',
                    'HMW-IO-12-FM': '59_hmw-io-12-fm_thumb.png',
                    'HMW-Sen-SC-12-FM': '58_hmw-sen-sc-12-fm_thumb.png',
                    'HM-CC-SCD': '57_hm-cc-scd_thumb.png',
                    'HMW-Sen-SC-12-DR': '56_hmw-sen-sc-12-dr_thumb.png',
                    'HM-Sec-SFA-SM': '55_hm-sec-sfa-sm_thumb.png',
                    'HM-LC-ddc1': '54a_lc-ddc1_thumb.png',
                    'HM-LC-ddc1-PCB': '54_hm-lc-ddc1-pcb_thumb.png',
                    'HM-Sen-MDIR-SM': '53_hm-sen-mdir-sm_thumb.png',
                    'HM-Sec-SD-Team': '52_hm-sec-sd-team_thumb.png',
                    'HM-Sec-SD': '51_hm-sec-sd_thumb.png',
                    'HM-Sec-MDIR': '50_hm-sec-mdir_thumb.png',
                    'HM-Sec-WDS': '49_hm-sec-wds_thumb.png',
                    'HM-Sen-EP': '48_hm-sen-ep_thumb.png',
                    'HM-Sec-TiS': '47_hm-sec-tis_thumb.png',
                    'HM-LC-Sw4-PCB': '46_hm-lc-sw4-pcb_thumb.png',
                    'HM-LC-Dim2L-SM': '45_hm-lc-dim2l-sm_thumb.png',
                    'HM-EM-CCM': '44_hm-em-ccm_thumb.png',
                    'HM-CC-VD': '43_hm-cc-vd_thumb.png',
                    'HM-CC-TC': '42_hm-cc-tc_thumb.png',
                    'HM-Swi-3-FM': '39_hm-swi-3-fm_thumb.png',
                    'HM-PBI-4-FM': '38_hm-pbi-4-fm_thumb.png',
                    'HMW-Sys-PS7-DR': '36_hmw-sys-ps7-dr_thumb.png',
                    'HMW-Sys-TM-DR': '35_hmw-sys-tm-dr_thumb.png',
                    'HMW-Sys-TM': '34_hmw-sys-tm_thumb.png',
                    'HMW-Sec-TR-FM': '33_hmw-sec-tr-fm_thumb.png',
                    'HMW-WSTH-SM': '32_hmw-wsth-sm_thumb.png',
                    'HMW-WSE-SM': '31_hmw-wse-sm_thumb.png',
                    'HMW-IO-12-Sw7-DR': '30_hmw-io-12-sw7-dr_thumb.png',
                    'HMW-IO-4-FM': '29_hmw-io-4-fm_thumb.png',
                    'HMW-LC-Dim1L-DR': '28_hmw-lc-dim1l-dr_thumb.png',
                    'HMW-LC-Bl1-DR': '27_hmw-lc-bl1-dr_thumb.png',
                    'HMW-LC-Sw2-DR': '26_hmw-lc-sw2-dr_thumb.png',
                    'HM-EM-CMM': '25_hm-em-cmm_thumb.png',
                    'HM-CCU-1': '24_hm-cen-3-1_thumb.png',
                    'HM-RCV-50': '24_hm-cen-3-1_thumb.png',
                    'HMW-RCV-50': '24_hm-cen-3-1_thumb.png',
                    'HM-RC-Key3': '23_hm-rc-key3-b_thumb.png',
                    'HM-RC-Key3-B': '23_hm-rc-key3-b_thumb.png',
                    'HM-RC-Sec3': '22_hm-rc-sec3-b_thumb.png',
                    'HM-RC-Sec3-B': '22_hm-rc-sec3-b_thumb.png',
                    'HM-RC-P1': '21_hm-rc-p1_thumb.png',
                    'HM-RC-19': '20_hm-rc-19_thumb.png',
                    'HM-RC-19-B': '20_hm-rc-19_thumb.png',
                    'HM-RC-19-SW': '20_hm-rc-19_thumb.png',
                    'HM-RC-12': '19_hm-rc-12_thumb.png',
                    'HM-RC-12-B': '19_hm-rc-12_thumb.png',
                    'HM-RC-4': '18_hm-rc-4_thumb.png',
                    'HM-RC-4-B': '18_hm-rc-4_thumb.png',
                    'HM-Sec-RHS': '17_hm-sec-rhs_thumb.png',
                    'HM-Sec-SC': '16_hm-sec-sc_thumb.png',
                    'HM-Sec-Win': '15_hm-sec-win_thumb.png',
                    'HM-Sec-Key': '14_hm-sec-key_thumb.png',
                    'HM-Sec-Key-S': '14_hm-sec-key_thumb.png',
                    'HM-WS550STH-I': '13_hm-ws550sth-i_thumb.png',
                    'HM-WDS40-TH-I': '13_hm-ws550sth-i_thumb.png',
                    'HM-WS550-US': '9_hm-ws550-us_thumb.png',
                    'WS550': '9_hm-ws550-us_thumb.png',
                    'HM-WDC7000': '9_hm-ws550-us_thumb.png',
                    'HM-LC-Sw1-SM': '8_hm-lc-sw1-sm_thumb.png',
                    'HM-LC-Bl1-FM': '7_hm-lc-bl1-fm_thumb.png',
                    'HM-LC-Bl1-SM': '6_hm-lc-bl1-sm_thumb.png',
                    'HM-LC-Sw2-FM': '5_hm-lc-sw2-fm_thumb.png',
                    'HM-LC-Sw1-FM': '4_hm-lc-sw1-fm_thumb.png',
                    'HM-LC-Sw4-SM': '3_hm-lc-sw4-sm_thumb.png',
                    'HM-LC-Dim1L-CV': '2_hm-lc-dim1l-cv_thumb.png',
                    'HM-LC-Dim1PWM-CV': '2_hm-lc-dim1l-cv_thumb.png',
                    'HM-WS550ST-IO': 'IP65_G201_thumb.png',
                    'HM-WDS30-T-O': 'IP65_G201_thumb.png',
                    'HM-WDS100-C6-O': 'WeatherCombiSensor_thumb.png',
                    'HM-WDS10-TH-O': 'TH_CS_thumb.png',
                    'HM-WS550STH-O': 'TH_CS_thumb.png',
                    'HM-WDS30-OT2-SM': 'IP65_G201_thumb.png',
                    'SONOS_ROOT': 'sonos.png',
                    'PING': 'pc.png'
                };
            }
            if (this.images[type]) {
                return this.deviceImgPath + this.images[type];
            } else {
                return "";
            }
        }

        function cloneJSON(obj) {
            // basic type deep copy
            if (obj === null || obj === undefined || typeof obj !== 'object') {
                return obj
            }
            // array deep copy
            if (obj instanceof Array) {
                var cloneA = [];
                for (var i = 0; i < obj.length; ++i) {
                    cloneA[i] = cloneJSON(obj[i]);
                }
                return cloneA;
            }
            // object deep copy
            var cloneO = {};
            for (var i in obj) {
                cloneO[i] = cloneJSON(obj[i]);
            }
            return cloneO;
        }

        function type2Str(type, subtype) {
            type = parseInt(type);
            subtype = parseInt(subtype);
            switch (type) {
                case 2:
                    if (subtype == 6) {
                        return SGI.translate('Alarm');
                    } else if (subtype == 2) {
                        return SGI.translate('Logical');
                    } else {
                        return SGI.translate('Boolean') + "," + subtype;
                    }

                case 20:
                    if (subtype == 11) {
                        return SGI.translate('String');
                    } else {
                        return SGI.translate('String') + "," + subtype;
                    }
                case 4:
                    if (subtype == 0) {
                        return SGI.translate('Number');
                    } else {
                        return SGI.translate('Number') + "," + subtype;
                    }

                case 16:
                    if (subtype == 29) {
                        return SGI.translate('Enum');
                    } else {
                        return SGI.translate('Enum') + "," + subtype;
                    }
                default:
                    return '' + type + "," + subtype;
            }
        }

        console.log((new Date) - time + "ms")
    }

})(jQuery);

