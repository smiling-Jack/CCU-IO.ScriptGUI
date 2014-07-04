/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */

SGI = $.extend(true, SGI, {
     words : {


        "Entferne Element"      : {"de": "Entferne Element",        "en": "Del Element",                  "ru": "Удалить"},
        "ROOMS"                 : {"de": "Räume",                   "en": "Rooms",                        "ru": "Комнаты"},
        "FUNCTIONS"             : {"de": "Gewerk",                  "en": "Function",                     "ru": "Роли"},
        "FAVORITE"              : {"de": "Favoriten",               "en": "Favorite",                     "ru": "Ча�?то и�?пользуемые"},
        "Datei"                 : {"de": "Datei",                    "en": "",                            "ru": ""},
        "Neu"                   : {"de": "Neu",                      "en": "",                            "ru": ""},
        "Öffnen"                : {"de": "Öffnen",                   "en": "",                            "ru": ""},
        "Vorlagen"              : {"de": "Vorlagen",                 "en": "",                            "ru": ""},
        "Speichern"             : {"de": "Speichern",                "en": "",                            "ru": ""},
        "Speichern als"         : {"de": "Speichern als",            "en": "",                            "ru": ""},
        "Export"                : {"de": "Export",                   "en": "",                            "ru": ""},
        "Einstellungen"         : {"de": "Einstellungen",            "en": "",                            "ru": ""},
        "Theme >"               : {"de": "Theme >",                  "en": "",                            "ru": ""},
        "Dark-Hive"             : {"de": "Dark-Hive",                "en": "",                            "ru": ""},
        "Start"                 : {"de": "Start",                    "en": "",                            "ru": ""},
        "humanity"              : {"de": "humanity",                 "en": "humanity",                    "ru": ""},
        "blitzer"               : {"de": "blitzer",                  "en": "blitzer",                     "ru": ""},
        "Swanky Purse"          : {"de": "Swanky Purse",             "en": "Swanky Purse",                "ru": ""},
        "Compiler"              : {"de": "Compiler",                 "en": "",                            "ru": ""},
        "Zeige Script"          : {"de": "Zeige Script",             "en": "",                            "ru": ""},
        "Speicher Script"       : {"de": "Speicher Script",          "en": "",                            "ru": ""},
        "Lösche Script"         : {"de": "Lösche Script",            "en": "",                            "ru": ""},
        "Help"                  : {"de": "Help",                     "en": "",                            "ru": ""},
        "Schnell Hilfe"         : {"de": "Schnell Hilfe",            "en": "",                            "ru": ""},
        "Tastenkominationen"    : {"de": "Tastenkominationen",       "en": "",                            "ru": ""},
        "Video Tutorials"       : {"de": "Video Tutorials",          "en": "",                            "ru": ""},
        "Develop"               : {"de": "Develop",                  "en": "",                            "ru": ""},
        "Lade Datei"            : {"de": "Lade Datei",               "en": "",                            "ru": ""},
        "MBS Image"             : {"de": "MBS Image",                "en": "",                            "ru": ""},
        "FBS Image"             : {"de": "FBS Image",                "en": "",                            "ru": ""},
        "New Struck"            : {"de": "New Struck",               "en": "",                            "ru": ""},
        "Add FireBug"           : {"de": "Add FireBug",              "en": "",                            "ru": ""},
        "Show Debugscript"      : {"de": "Show Debugscript",         "en": "",                            "ru": ""},
        "Datei:"                : {"de": "Datei:",                   "en": "",                            "ru": ""},
        " Live Test"            : {"de": " Live Test",               "en": "",                            "ru": ""},
        "Save Element"          : {"de": "Save Element",             "en": "",                            "ru": ""},
        "Speicher local"        : {"de": "Speicher local",           "en": "",                            "ru": ""},
        "Öffnen local"          : {"de": "Öffnen local",             "en": "",                            "ru": ""},
        "Links Ausrichten"      : {"de": "Links Ausrichten",         "en": "",                            "ru": ""},
        "Rechts Ausrichten"     : {"de": "Rechts Ausrichten",        "en": "",                            "ru": ""},
        "Oben Ausrichten"       : {"de": "Oben Ausrichten",          "en": "",                            "ru": ""},
        "Unten Ausrichten"      : {"de": "Unten Ausrichten",         "en": "",                            "ru": ""},
        "Diagonal Ausrichten"   : {"de": "Diagonal Ausrichten",      "en": "",                            "ru": ""},
        "Zoom zuckrücksetzen"   : {"de": "Zoom zuckrücksetzen",      "en": "",                            "ru": ""},
        "Zoom In"               : {"de": "Zoom In",                  "en": "",                            "ru": ""},
        "Zoom Out"              : {"de": "Zoom Out",                 "en": "",                            "ru": ""},
        "An Grid fangen ON/OFF" : {"de": "An Grid fangen ON/OFF",    "en": "",                            "ru": ""},
        "Tooltip ON/OFF"        : {"de": "Tooltip ON/OFF",           "en": "",                            "ru": ""},
        "Scriptengine Neustarten": {"de": "Scriptengine Neustarten", "en": "",                            "ru": ""},
        "Teste Script"          : {"de": "Teste Script",             "en": "",                            "ru": ""},
        "Stop"                  : {"de": "Stop",                     "en": "",                            "ru": ""},
        ""                      : {"de": "",                         "en": "",                            "ru": ""},




    },

    translate: function (text) {


     var l = "ru";               // Hier die Sprache ändern

        if (SGI.words[text]) {
            if (SGI.words[text][l])
               return SGI.words[text][l];
//                return "xxx";
            else if (SGI.words[text]["de"])
//            console.warn(text);
//                return "xxx";
            return SGI.words[text]["de"];
        }else{
          console.warn(text);
            return "xxx";
        }



}
});