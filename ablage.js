// Taster Flur rot
var idButtonKurz = 12722; // Flur Taster rot kurz

subscribe( {
    id: idButtonKurz,
    val:true
}, function (obj) {
    var lightFunc = 0;

    // First find the function with name 'Licht'
    for (var t = 0; t < regaIndex['ENUM_FUNCTIONS'].length; t++) {
        if (regaObjects[regaIndex['ENUM_FUNCTIONS'][t]].Name == '${funcLight}' ||
            regaObjects[regaIndex['ENUM_FUNCTIONS'][t]].Name == 'Licht') {
            lightFunc = regaIndex['ENUM_FUNCTIONS'][t];
            break;
        }
    }

    // If found
    if (lightFunc) {
        // Go through all channels of the function "Licht"
        for (var c = 0; c < regaObjects[lightFunc]['Channels'].length; c++) {
            var ch = regaObjects[lightFunc]['Channels'][c];
            if (regaObjects[ch].DPs && regaObjects[ch].DPs.STATE) {
                if (getState(regaObjects[channels[c]].DPs.STATE)) {
                    setState(regaObjects[ch].DPs.STATE, 0);
                    log(regaObjects[ch].Name + ' ausgeschaltet');
                }
            } else
            if (regaObjects[ch].DPs && regaObjects[ch].DPs.LEVEL) {
                if (parseFloat(getState(regaObjects[channels[c]].DPs.LEVEL)) > 0) {
                    setState(regaObjects[ch].DPs.LEVEL, 0);
                    log(regaObjects[ch].Name + ' auf 0% gedimmt');
                }
            }
        }
    } else {
        log('No function with name Licht or ${funcLight} found. Please check the function name');
    }
});