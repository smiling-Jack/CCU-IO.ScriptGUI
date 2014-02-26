/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */





function simulate(_options) {
    var datapoints = {};


    function getState(id) {

        return homematic.uiState["_" + id]["Value"]
    }

    function log(data) {
        console.log(data);
    }


    var script = Compiler.make_prg(true);
    console.log(script);
    eval(script)
}

