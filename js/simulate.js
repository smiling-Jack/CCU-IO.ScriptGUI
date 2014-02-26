/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */


function stopsim () {
    for(i=0; i<100; i++)
    {
        window.clearTimeout(i);
    }

    $.each(SGI.plumb_inst, function(){

        var con = this.getConnections();

        $.each(con, function(){
            var $con = this
            var over = this.getOverlays();
            $.each(over,function(){

                $con.removeOverlay("sim")
            });

        });


    });
}


function simulate(callback) {
    var datapoints = {};


    function getState(id) {

        return homematic.uiState["_" + id]["Value"]
    }

    function log(data) {
        var t = new Date();
        $("#sim_output").val(t.getHours()+":"+ t.getMinutes()+":"+ t.getSeconds()+":"+ t.getMilliseconds()+" " +data+"\n" +$("#sim_output").val() );
    }

    function simout(key, data) {
        var output = key.split("_");
        var fbs = output[0] + "_" + output[1];
        var codebox = $("#" + PRG.fbs[fbs]["parent"]).parent().attr("id");
        console.log(key)

        var cons = SGI.plumb_inst["inst_" + codebox].getConnections({source:key});
console.log(cons)
        cons[0].addOverlay(
            ["Custom", {
                create: function () {
                    return $('<div>\
                    <p class="sim_overlay ui-corner-all">'+data+'</p>\
                    </div>\
                                            ');
                },
               id: "sim"
            }]
            );


    }


    var script = Compiler.make_prg(true);
    console.log(script);
    eval(script)
    console.log("xxxxxxxxxxxxxxxxxxxxxxxx")
    return callback
}

