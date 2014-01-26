/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */

SGI = $.extend(true, SGI, {

    translate: function (text) {
        if (!this.words) {
            this.words = {


                "Entferne Element" : {"de": "Entferne Element",         "en": "Del Element",                 "ru": ""},
                ""                 : {"de": "",                         "en": "",                            "ru": ""}


            };
        }
        if (this.words[text]) {
            if (this.words[text][this.language])
                return this.words[text][this.language];
            else if (this.words[text]["de"])
                return this.words[text]["de"];
        }

        return text;
    }
});