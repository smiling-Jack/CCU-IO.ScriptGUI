/**
 * Created by jack on 17.08.2014.
 */

var homematic = {
    uiState: {"_65535": {"Value": null}},
    regaIndex: {},
    regaObjects: {}
};


jQuery.extend(true, SGI, {

    setup_socket: function () {
        SGI.socket = io.connect(null, {'force new connection': true});

        $("#inp_con_ip").bind("change", function () {
            SGI.disconnect()
        })
    },

    disconnect: function () {

        if (!SGI.socket) {
            SGI.socket.disconnect()
        }


        homematic = {
            uiState: {"_65535": {"Value": null}},
            regaIndex: {},
            regaObjects: {}
        };
        $("#img_con_state").attr("src", "img/icon/flag-red.png");
        $("#btn_con_online").parent().removeClass("div_img_glass_on");
        $("#btn_con_offline").parent().removeClass("div_img_glass_on");
//        $("#inp_con_ip").unbind("change")
    },

    offline: function () {
//        if (SGI.socket != undefined){
//            SGI.socket.disconnect()
//        }

        try {
            var _url = $("#inp_con_ip").val();
            var url = "";


            if (_url.split(":").length < 2) {
                url = "http://" + _url + ":8080";
            } else {
                url = "http://" + _url;
            }

            var name = url.split("http://")[1].toString().replace(":", "_").replace(/\./g, "_");

            fs.readFile(SGI.nwDir + '/datastore/' + name + '.json', function (err, data) {
                if (!err) {
                    homematic = JSON.parse(data);
                    $("#img_con_state").attr("src", "img/icon/flag-yellow.png");
                    $("#btn_con_offline").parent().addClass("div_img_glass_on");
                    $("#btn_con_online").parent().removeClass("div_img_glass_on");
                } else {
                    $("#img_con_state").attr("src", "img/icon/flag-red.png");
                    $("#btn_con_offline").parent().removeClass("div_img_glass_on");
                    $("#btn_con_online").parent().removeClass("div_img_glass_on");
                    homematic = {
                        uiState: {"_65535": {"Value": null}},
                        regaIndex: {},
                        regaObjects: {}
                    };
                }
            });
        }
        catch (err) {
            $("#img_con_state").attr("src", "img/icon/flag-red.png");
            $("#btn_con_offline").parent().removeClass("div_img_glass_on");
            $("#btn_con_online").parent().removeClass("div_img_glass_on");
            homematic = {
                uiState: {"_65535": {"Value": null}},
                regaIndex: {},
                regaObjects: {}
            };

        }
    },
//    online: function () {
//        try {
//            var _url = $("#inp_con_ip").val();
//            var url = "";
//            console.log(_url)
//
//            if (_url.split(":").length < 2) {
//                url = "http://" + _url + ":8080";
//            } else {
//                url = "http://" + _url;
//            }
//
//
//            SGI.socket = io.connect(url)
//            SGI.socket.emit("getIndex", function (index) {
//                homematic.regaIndex = index;
//
//                SGI.socket.emit("getObjects", function (obj) {
//                    homematic.regaObjects = obj;
//
//                    SGI.socket.emit("getDatapoints", function (data) {
//
//                        for (var dp in data) {
//                            homematic.uiState.attr("_" + dp, { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]});
//                        }
//
//                        SGI.socket.on('event', function (data) {
//                            if (homematic.uiState["_" + obj[0]] !== undefined) {
//                                var o = {};
//                                o["_" + obj[0] + ".Value"] = obj[1];
//                                o["_" + obj[0] + ".Timestamp"] = obj[2];
//                                o["_" + obj[0] + ".Certain"] = obj[3];
//                                homematic.uiState.attr(o);
//                            }
//                        });
//                    });
//                });
//            });
//
//
//            SGI.socket.on('disconnect', function(){
//                alert("Disconnect")
//            });
//
//
//
//
//        }
//        catch (e){
//            SGI.info_box(e.stack)
//        }
//
//    },

    online: function () {
        try {
            var _url = $("#inp_con_ip").val();
            var url = "";


            if (_url.split(":").length < 2) {
                url = "http://" + _url + ":8080";
            } else {
                url = "http://" + _url;
            }
            $("#img_con_state").attr("src", "img/icon/flag-blue.png");

            SGI.socket = io.connect(url, {'force new connection': true});

            SGI.socket.on("connect", function (err) {



                SGI.socket.emit("getIndex", function (index) {
                    homematic.regaIndex = index;

                    SGI.socket.emit("getObjects", function (obj) {
                        homematic.regaObjects = obj;

                        SGI.socket.emit("getDatapoints", function (data) {

                            for (var dp in data) {
                                homematic.uiState["_" + dp] = { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]};
                            }

                            SGI.socket.on('event', function (obj) {
                                if (homematic.uiState["_" + obj[0]] !== undefined) {
                                    var o = {};
                                    o["_" + obj[0] + ".Value"] = obj[1];
                                    o["_" + obj[0] + ".Timestamp"] = obj[2];
                                    o["_" + obj[0] + ".Certain"] = obj[3];
                                    homematic.uiState["_" + obj[0]] = o;
                                }

                            });
                            $("#img_con_state").attr("src", "img/icon/flag-green.png");
                            $("#inp_con_ip").bind("change", function () {
                                SGI.disconnect()
                            })
                        });
                    });


                });


            });

            SGI.socket.on("error", function (err) {
                alert("fehler")
                SGI.disconnect();
                SGI.offline();

            });

            SGI.socket.on('disconnect', function () {
                $("#img_con_state").attr("src", "img/icon/flag-red.png");

                // TODO Ist da hier wirklich richtig oder doch eher direkt nach dem laden ?
                var name = url.split("http://")[1].toString().replace(":", "_").replace(/\./g, "_");
                fs.writeFile(SGI.nwDir + '/datastore/' + name + '.json', JSON.stringify(homematic), function (err) {
                    if (err) throw err;

                });
            });


            $("#btn_con_online").parent().addClass("div_img_glass_on");
            $("#btn_con_offline").parent().removeClass("div_img_glass_on")

        }
        catch (err) {
            $("#img_con_state").attr("src", "img/icon/flag-red.png");
            $("#btn_con_offline").parent().removeClass("div_img_glass_on");
            $("#btn_con_online").parent().removeClass("div_img_glass_on");
            homematic = {
                uiState: {"_65535": {"Value": null}},
                regaIndex: {},
                regaObjects: {}
            };
            throw err
        }

    },


});