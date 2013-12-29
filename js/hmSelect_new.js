// Device selection dialog
var hmSelect = {
    show: function () {
//        console.log(homematic.regaObjects);
        var start_time = new Date().getTime();

        var liste = {};
        liste = {
            Homematic: {

                RF: {

                },
                WIR: {

                },
                VAR: {

                },
                PRO: {

                },
                FAVO: {

                },
                ROOMs: {

                },
                GEW: {

                },
                ZZZ: {

                }
            },
            yr: {

            },
            muell_stuttgart: {

            },
            dwd: {

            },

            Geofency: {

            },

            ping: {

            },
            rego: {

            },
            sonos: {

            },
            rpi: {

            },

            sayIt: {

            },
            itrans: {

            },
            iCal: {

            },
            hue: {

            },
            script: {

            },
            ZZZ: {

            }


        };

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

        var daten = cloneJSON(homematic.regaObjects);

        // Eintragungen für Favoriten Räume und Gewerke ergänzen
        $.each(daten, function () {
            if (this["TypeName"] == "FAVORITE") {
                var name = this["Name"];
                $.each(this.Channels, function () {
                    daten[this]["FAVORITE"] = name;
                });
            }
            if (this["TypeName"] == "ENUM_FUNCTIONS") {
                var name = this["Name"];
                $.each(this.Channels, function () {
                    daten[this]["GEWERK"] = name;
                });
            }
            if (this["TypeName"] == "ENUM_ROOMS") {
                var name = this["Name"];
                $.each(this.Channels, function () {
                    daten[this]["ROOM"] = name;
                });
            }
        });

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
                            $.each(liste["Homematic"]["WIR"][index]["Channels"][$ch].DPs, function (dp) {
                                liste["Homematic"]["WIR"][index]["Channels"][$ch].DPs[dp] = daten[this];
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
                        liste["Homematic"]["ZZZ"][index] = this;

                    }

                }
            } else if (index < 70045) {
                liste["yr"][index] = this;

            } else if (index < 70050) {
                liste["muell_stuttgart"][index] = this;

            } else if (index < 70060) {
                liste["dwd"][index] = this;

            } else if (index < 70100) {
                liste["Geofency"][index] = this;

            } else if (index < 71000) {
                liste["ping"][index] = this;

            } else if (index < 72000) {
                liste["rego"][index] = this;

            } else if (index < 72500) {
                liste["sonos"][index] = this;

            } else if (index < 72900) {

                liste["rpi"][index] = this;

            } else if (index < 80000) {
                liste["sayIt"][index] = this;

            } else if (index < 80100) {
                liste["itrans"][index] = this;

            } else if (index < 81000) {
                liste["iCal"][index] = this;

            } else if (index < 90550) {
                liste["hue"][index] = this;

            } else if (index < 300000) {
                liste["script"][index] = this;

            } else {
                liste["zzz"][index] = this;
            }


        });


//        Leere Objekte entfernen
        $.each(liste, function (index) {
            if (Object.keys(this).length < 1) {
                delete liste[index];
            }
        });
        console.log(liste);


        var x = [];
        var type;
        $.each(liste, function (lvl1) {
            if (this.toString() == "[object Object]") {
                type = this.HssType || "";
                x.push({Name: lvl1, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 0, parent: ["null"], expanded: true, loaded: true, isLeaf: false});
                var group = x.length;
                if (lvl1 == "Homematic") {
                    x.push({Name: "RF", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                    var RF = x.length;
                    $.each(this.RF, function (lvl2) {
                        type = this.HssType || "";
                        x.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 2, parent: [group, RF], expanded: true, loaded: true, isLeaf: false});
                        var device = x.length;
                        $.each(this.Channels, function (lvl3) {
                            type = this.HssType || "";
                            x.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 3, parent: [group, RF, device], expanded: true, loaded: true, isLeaf: false});
                            var channel = x.length;
                            $.each(this.DPs, function (lvl4) {
                                type = this.HssType || "";
                                x.push({Name: lvl4, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 4, parent: [group, RF, device, channel], expanded: true, loaded: true, isLeaf: true});
                            });
                        });
                    });

                    x.push({Name: "WIR", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                    var Wir = x.length;
                    $.each(this.WIR, function (lvl2) {
                        type = this.HssType || "";
                        x.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 2, parent: [group, Wir], expanded: true, loaded: true, isLeaf: false});
                        var device = x.length;
                        $.each(this.Channels, function (lvl3) {
                            type = this.HssType || "";
                            x.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 3, parent: [group, Wir, device], expanded: true, loaded: true, isLeaf: false});
                            var channel = x.length;
                            $.each(this.DPs, function (lvl4) {
                                type = this.HssType || "";
                                x.push({Name: lvl4, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 4, parent: [group, Wir, device, channel], expanded: true, loaded: true, isLeaf: true});

                            });
                        });
                    });
                    x.push({Name: "VAR", Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: false});
                    var VAR = x.length;
                    $.each(this.VAR, function (lvl2) {
                        var ValType = hmSelect._type2Str(this["ValueType"]);
                        x.push({Name: this.Name, Type: ValType.split(",")[0], level: 2, parent: [group, VAR], expanded: true, loaded: true, isLeaf: true});
                    });

                }
                if (lvl1 == "rpi") {
                    $.each(this, function (id) {
                        x.push({Name: this.Name, Type: type, ROOM: this.ROOM, GEWERK: this.GEWERK, FAVORITE: this.FAVORITE, level: 1, parent: [group], expanded: true, loaded: true, isLeaf: true});
                    });

                }

            }

        });


        console.log("datenauf bau");
        console.log(new Date().getTime() - start_time);
//        console.log(x);
        start_time = new Date().getTime();


        $("body").append('\
                    <div id="dialog_hmid" style="text-align: center" title="ID Auswahl">\
                   <br>\
                    <div id="tb_head" style="max-height:500px; overflow:hidden ">\
                        <table id="grid_hmid_head" border = "1" frame="void" rules="rows" class="frame_color" style="width:850px;height:auto; text-align: left; font-size: 11px; border: solid 1px gray">\
                            <colgroup>\
                                <col width="300">\
                                <col width="200">\
                                <col width="100">\
                                <col width="100">\
                                <col width="100">\
                            </colgroup>\
                            <tr>\
                            <td style="font-size: 15px"><b>Name<b></td><td style="font-size: 15px"><b>Type<b></td><td style="font-size: 15px"><b>Raum<b></td><td style="font-size: 15px"><b>Gewerk<b></td><td style="font-size: 15px"><b>Favorit<b></td>\
                            </tr>\
                            <tr>\
                            <td><input style="width: 300px" type="text" id="tb_suche_name"></td><td><input style="width: 200px" type="text" id="tb_suche_type"></td><td><input style="width: 100px" type="text" id="tb_suche_raum"></td><td><input style="width: 100px" type="text" id="tb_suche_gewerk"></td><td><input style="width: 100px" type="text" id="tb_suche_favorite"></td>\
                            </tr>\
                         </table>\
                   </div>\
                   <div id="tb_body" style="max-height:500px; overflow-y: scroll; overflow-x:hidden ">\
                        <table id="grid_hmid" border = "1" frame="void" rules="rows" class="frame_color" style="width:860px;height:auto; text-align: left; font-size: 11px; border: solid 1px gray">\
                            <colgroup>\
                                <col width="300">\
                                <col width="200">\
                                <col width="100">\
                                <col width="100">\
                                <col width="100">\
                            </colgroup>\
                        </table>\
                   </div>\
                        <br>\
                   </div>');


        $("#dialog_hmid").dialog({
            height: 800,
            width: 900,
            resizable: false,
            close: function () {
                $("#dialog_hmid").remove();
            }
        });



        $("#tb_suche_name").change(function () {
            $("#tb_suche_type").val("");
            $("#tb_suche_raum").val("");
            $("#tb_suche_gewerk").val("");
            $("#tb_suche_favorite").val("");
            var filter = this.value;
            $(".tb_parent").show();
            $.each($(".tree_name"), function () {
                if ($(this).text().toString().toLowerCase().indexOf(filter.toString().toLowerCase()) == -1) {

                    $(this).parent().hide();
                } else {
                    $(this).parent().attr('data-info', 'hide');
                }
            });
        });

        $("#tb_suche_type").change(function (val) {
            $("#tb_suche_name").val("");
            $("#tb_suche_raum").val("");
            $("#tb_suche_gewerk").val("");
            $("#tb_suche_favorite").val("");
            var filter = this.value;
            $(".tb_parent").show();
            $.each($(".tree_type"), function () {
                if ($(this).text().toString().toLowerCase().indexOf(filter.toString().toLowerCase()) == -1) {

                    $(this).parent().hide();
                } else {
                    $(this).parent().attr('data-info', 'hide');
                }
            });
        });

        $("#tb_suche_raum").change(function () {
            $("#tb_suche_name").val("");
            $("#tb_suche_type").val("");
            $("#tb_suche_gewerk").val("");
            $("#tb_suche_favorite").val("");
            var filter = this.value;
            $(".tb_parent").show();
            $.each($(".tree_room"), function () {
                if ($(this).text().toString().toLowerCase().indexOf(filter.toString().toLowerCase()) == -1) {

                    $(this).parent().hide();
                } else {
                    $(this).parent().attr('data-info', 'hide');
                }
            });
        });

        $("#tb_suche_gewerk").change(function () {
            $("#tb_suche_name").val("");
            $("#tb_suche_type").val("");
            $("#tb_suche_raum").val("");
            $("#tb_suche_favorite").val("");
            var filter = this.value;
            $(".tb_parent").show();
            $.each($(".tree_gewerk"), function () {
                if ($(this).text().toString().toLowerCase().indexOf(filter.toString().toLowerCase()) == -1) {

                    $(this).parent().hide();
                } else {
                    $(this).parent().attr('data-info', 'hide');
                }
            });
        });

        $("#tb_suche_favorite").change(function () {
            $("#tb_suche_name").val("");
            $("#tb_suche_type").val("");
            $("#tb_suche_raum").val("");
            $("#tb_suche_gewerk").val("");
            var filter = this.value;
            $(".tb_parent").show();
            $.each($(".tree_favorite"), function () {
                if ($(this).text().toString().toLowerCase().indexOf(filter.toString().toLowerCase()) == -1) {

                    $(this).parent().hide();
                } else {
                    $(this).parent().attr('data-info', 'hide');
                }
            });
        });

        var data;

        $.each(x, function (index) {

            index = index + 1;
            var parent = "";

            if (this["parent"].length > 0) {
                $.each(this["parent"], function () {
                    parent += " " + this;
                });
            }

            if (this.level > 0) {
                var _type = this.Type || "";
                var _room = this.ROOM || "";
                var _gewerk = this["GEWERK"] || "";
                var _favorite = this["FAVORITE"] || "";

                if (this.isLeaf == true) {

                    data += ('<tr id="' + index + '" class="tb_parent isLeaf ' + parent + ' level_' + this.level + '" data-lvl="' + this.level + '" data-info="hide"  style="display: none;">' +
                        '<td class="tree tree_name" style="padding-left:' + this.level * 20 + 'px"><span class="ui-icon ui-icon-radio-on tb-icon"></span>' + this.Name + '</td>' +
                        '<td class="tree tree_type">' + _type + '</td>' +
                        '<td class="tree tree_room">' + _room + '</td>' +
                        '<td class="tree tree_gewerk">' + _gewerk + '</td>' +
                        '<td class="tree tree_favorite">' + _favorite + '</td></tr>')

                } else {
                    data += ('<tr id="' + index + '" class="tb_parent ' + parent + ' level_' + this.level + '" data-lvl="' + this.level + '" data-info="hide"  style="display: none;">' +
                        '<td class="tree tree_name" style="padding-left:' + this.level * 20 + 'px"><span class="ui-icon ui-icon-circle-plus tb-icon"></span>' + this.Name + '</td>' +
                        '<td class="tree tree_type">' + _type + '</td>' +
                        '<td class="tree tree_room">' + _room + '</td>' +
                        '<td class="tree tree_gewerk">' + _gewerk + '</td>' +
                        '<td class="tree tree_favorite">' + _favorite + '</td></tr>')
                }
            } else {
                var _type = this.Type || "";
                var _room = this.ROOM || "";
                var _gewerk = this["GEWERK"] || "";
                var _favorite = this["FAVORITE"] || "";


                data += ('<tr id="' + index + '" class="tb_parent ' + parent + '" data-lvl="' + this.level + '" data-info="hide"  >' +
                    '<td class="tree tree_name" style="padding-left:' + this.level * 15 + 'px"><span class="ui-icon ui-icon-circle-plus tb-icon"></span>' + this.Name + '</td>' +
                    '<td class="tree tree_type">' + _type + '</td>' +
                    '<td class="tree tree_room">' + _room + '</td>' +
                    '<td class="tree tree_gewerk">' + _gewerk + '</td>' +
                    '<td class="tree tree_favorite">' + _favorite + '</td></tr>')
            }

        });

        $('#grid_hmid').append(data);

        $(".tb_parent:not(.isLeaf)").click(function () {
            var ist = this.getAttribute('data-info');
            var lvl = parseInt(this.getAttribute('data-lvl')) + 1;
            if (ist == "show") {
                $("." + $(this).attr("id")).attr('data-info', 'hide').hide();
                this.setAttribute('data-info', 'hide');

                $("." + $(this).attr("id") + ":not(.isLeaf)").children().children().removeClass("ui-icon-circle-minus");
                $("." + $(this).attr("id") + ":not(.isLeaf)").children().children().addClass("ui-icon-circle-plus");
                $(this).children().children().removeClass("ui-icon-circle-minus");
                $(this).children().children().addClass("ui-icon-circle-plus");

            } else {
                $("." + $(this).attr('id') + ".level_" + lvl).show();
                this.setAttribute('data-info', 'show');
                $(this).children().children().removeClass("ui-icon-circle-plus");
                $(this).children().children().addClass("ui-icon-circle-minus");
            }

        });

        $(".tb_parent").hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );


        console.log(new Date().getTime() - start_time);

    },
    _type2Str: function (type, subtype) {
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
};

