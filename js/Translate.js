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
        "FAVORITE"              : {"de": "Favoriten",               "en": "Favorite",                     "ru": "Часто используемые"},
        "Datei"                 : {"de": "Datei",                    "en": "File",                        "ru": "Файл"},
        "Neu"                   : {"de": "Neu",                      "en": "New",                         "ru": "Новый"},
        "Öffnen"                : {"de": "Öffnen",                   "en": "Open",                        "ru": "Открыть"},
        "Vorlagen"              : {"de": "Vorlagen",                 "en": "Pattern",                     "ru": "Образцы"},
        "Speichern"             : {"de": "Speichern",                "en": "Save",                        "ru": "Сохранить"},
        "Speichern als"         : {"de": "Speichern als",            "en": "Save as",                     "ru": "Сохранить как"},
        "Export"                : {"de": "Exportieren",              "en": "Export",                      "ru": "Экспортировать"},
        "Einstellungen"         : {"de": "Einstellungen",            "en": "Settings",                    "ru": "Настройки"},
        "Theme >"               : {"de": "Theme >",                  "en": "Thema > ",                    "ru": "Тема > "},
        "Dark-Hive"             : {"de": "Dark-Hive",                "en": "Dark-Hive",                   "ru": "Dark-Hive"},
        "Start"                 : {"de": "Start",                    "en": "Start",                       "ru": "Start"},
        "humanity"              : {"de": "humanity",                 "en": "humanity",                    "ru": "humanity"},
        "blitzer"               : {"de": "blitzer",                  "en": "blitzer",                     "ru": "blitzer"},
        "Swanky Purse"          : {"de": "Swanky Purse",             "en": "Swanky Purse",                "ru": "Swanky Purse"},
        "Compiler"              : {"de": "Compiler",                 "en": "Compiler",                    "ru": "Компилятор"},
        "Zeige Script"          : {"de": "Script zeigen",            "en": "Show script",                 "ru": "Показать скрипт"},
        "Speicher Script"       : {"de": "Script speichern",         "en": "Save script",                 "ru": "Сохранить скрипт"},
        "Lösche Script"         : {"de": "Script löschen",           "en": "Delete script",               "ru": "Удалить скрипт"},
        "Help"                  : {"de": "Hilfe",                    "en": "Help",                        "ru": "Помощь"},
        "Schnell Hilfe"         : {"de": "Schnell Hilfe",            "en": "Quick help",                  "ru": "Быстрая помощь"},
        "Tastenkominationen"    : {"de": "Tastenkombinationen",      "en": "Hot keys",                    "ru": "Горячие клавиши"},
        "Video Tutorials"       : {"de": "Video Anleitung",          "en": "Video Tutorials",             "ru": "Видео уроки"},
        "Develop"               : {"de": "Develop??",                "en": "Develop",                     "ru": "Разработка"},
        "Lade Datei"            : {"de": "Lade Datei",               "en": "Load file",                   "ru": "Загрузить файл"},
        "MBS Image"             : {"de": "MBS Image",                "en": "MBS Image",                   "ru": "MBS Image"},
        "FBS Image"             : {"de": "FBS Image",                "en": "FBS Image",                   "ru": "FBS Image"},
        "New Struck"            : {"de": "New Struck??",             "en": "New Struck??",                "ru": "Новая Struck??"},
        "Add FireBug"           : {"de": "Add FireBug??",            "en": "Add FireBug??",               "ru": "Add FireBug??"},
        "Show Debugscript"      : {"de": "Zeige Debugscript",        "en": "Show debug script",           "ru": "Показать отладочный скрипт"},
        "Datei:"                : {"de": "Datei:",                   "en": "File:",                       "ru": "Файл:"},
        " Live Test"            : {"de": " Live Test",               "en": " Live test",                  "ru": " Live test"},
        "Save Element"          : {"de": "Element speichern",        "en": "Save element",                "ru": "Сохранить элемент"},
        "Speicher local"        : {"de": "Local speichern",          "en": "Save local",                  "ru": "Сохранить локально"},
        "Öffnen local"          : {"de": "Local öffnen",             "en": "Open local",                  "ru": "Загрузить локально"},
        "Links Ausrichten"      : {"de": "Links Ausrichten",         "en": "Align left",                  "ru": "Выравнить слева"},
        "Rechts Ausrichten"     : {"de": "Rechts Ausrichten",        "en": "Align right",                 "ru": "Выравнить справа"},
        "Oben Ausrichten"       : {"de": "Oben Ausrichten",          "en": "Align top",                   "ru": "Выравнить сверху"},
        "Unten Ausrichten"      : {"de": "Unten Ausrichten",         "en": "Align bottom",                "ru": "Выравнить снизу"},
        "Diagonal Ausrichten"   : {"de": "Diagonal Ausrichten",      "en": "Align diagonal",              "ru": "Выравнить по диагонали"},
        "Zoom zuckrücksetzen"   : {"de": "Zoom zuckrücksetzen",      "en": "Reset zoom",                  "ru": "Сбросить зум"},
        "Zoom In"               : {"de": "Zoom In",                  "en": "Zoom in",                     "ru": "Увеличить"},
        "Zoom Out"              : {"de": "Zoom Out",                 "en": "Zoom out",                    "ru": "Уменьшить"},
        "An Grid fangen ON/OFF" : {"de": "Am Gitter fangen An/Aus",  "en": "Grid On/Off",                 "ru": "Сетка Вкл/Выкл"},
        "Tooltip ON/OFF"        : {"de": "Hinweis ON/OFF",           "en": "Tooltip On/Off",              "ru": "Подсказки Вкл/Выкл"},
        "Scriptengine Neustarten": {"de": "Script-Engine Neustarten","en": "Restart script engine",       "ru": "Перезапустить Scrip-Engine"},
        "Teste Script"          : {"de": "Script testen",            "en": "Script test",                 "ru": "Тестировать скрипт"},
        "Stop"                  : {"de": "Stop",                     "en": "Stop",                        "ru": "Стоп"},
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
