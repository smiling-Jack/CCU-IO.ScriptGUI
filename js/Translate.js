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

// Editor

        'ROOMS'                 : {'de': 'Räume',                    'en': 'Rooms',                       'ru': 'Комнаты'},
        'FUNCTIONS'             : {'de': 'Gewerk',                   'en': 'Function',                    'ru': 'Роли'},
        'FAVORITE'              : {'de': 'Favoriten',                'en': 'Favorite',                    'ru': 'Часто используемые'},
        'Datei'                 : {'de': 'Datei',                    'en': 'File',                        'ru': 'Файл'},
        'Neu'                   : {'de': 'Neu',                      'en': 'New',                         'ru': 'Новый'},
        'Öffnen'                : {'de': 'Öffnen',                   'en': 'Open',                        'ru': 'Открыть'},
        'Vorlagen'              : {'de': 'Vorlagen',                 'en': 'Pattern',                     'ru': 'Образцы'},
        'Speichern'             : {'de': 'Speichern',                'en': 'Save',                        'ru': 'Сохранить'},
        'Speichern als'         : {'de': 'Speichern als',            'en': 'Save as',                     'ru': 'Сохранить как'},
        'Export'                : {'de': 'Exportieren',              'en': 'Export',                      'ru': 'Экспортировать'},
        'Einstellungen'         : {'de': 'Einstellungen',            'en': 'Settings',                    'ru': 'Настройки'},
        'Theme >'               : {'de': 'Theme >',                  'en': 'Thema > ',                    'ru': 'Тема > '},
        'Dark-Hive'             : {'de': 'Dark-Hive',                'en': 'Dark-Hive',                   'ru': 'Dark-Hive'},
        'Start'                 : {'de': 'Start',                    'en': 'Start',                       'ru': 'Start'},
        'humanity'              : {'de': 'humanity',                 'en': 'humanity',                    'ru': 'humanity'},
        'blitzer'               : {'de': 'blitzer',                  'en': 'blitzer',                     'ru': 'blitzer'},
        'Swanky Purse'          : {'de': 'Swanky Purse',             'en': 'Swanky Purse',                'ru': 'Swanky Purse'},
        'Compiler'              : {'de': 'Compiler',                 'en': 'Compiler',                    'ru': 'Компилятор'},
        'Zeige Script'          : {'de': 'Script zeigen',            'en': 'Show script',                 'ru': 'Показать скрипт'},
        'Speicher Script'       : {'de': 'Script speichern',         'en': 'Save script',                 'ru': 'Сохранить скрипт'},
        'Lösche Script'         : {'de': 'Script löschen',           'en': 'Delete script',               'ru': 'Удалить скрипт'},
        'Help'                  : {'de': 'Hilfe',                    'en': 'Help',                        'ru': 'Помощь'},
        'Schnell Hilfe'         : {'de': 'Schnell Hilfe',            'en': 'Quick help',                  'ru': 'Быстрая помощь'},
        'Tastenkominationen'    : {'de': 'Tastenkombinationen',      'en': 'Hot keys',                    'ru': 'Горячие клавиши'},
        'Video Tutorials'       : {'de': 'Video Anleitung',          'en': 'Video Tutorials',             'ru': 'Видео уроки'},
        'Develop'               : {'de': 'Develop??',                'en': 'Develop',                     'ru': 'Разработка'},
        'Lade Datei'            : {'de': 'Lade Datei',               'en': 'Load file',                   'ru': 'Загрузить файл'},
        'MBS Image'             : {'de': 'MBS Image',                'en': 'MBS Image',                   'ru': 'MBS Image'},
        'FBS Image'             : {'de': 'FBS Image',                'en': 'FBS Image',                   'ru': 'FBS Image'},
        'New Struck'            : {'de': 'New Struck??',             'en': 'New Struck??',                'ru': 'Новая Struck??'},
        'Add FireBug'           : {'de': 'Add FireBug??',            'en': 'Add FireBug??',               'ru': 'Add FireBug??'},
        'Show Debugscript'      : {'de': 'Zeige Debugscript',        'en': 'Show debug script',           'ru': 'Показать отладочный скрипт'},
        'Datei:'                : {'de': 'Datei:',                   'en': 'File:',                       'ru': 'Файл:'},
        ' Live Test'            : {'de': ' Live Test',               'en': ' Live test',                  'ru': ' Live test'},
        'Save Element'          : {'de': 'Element speichern',        'en': 'Save element',                'ru': 'Сохранить элемент'},
        'Speicher local'        : {'de': 'Local speichern',          'en': 'Save local',                  'ru': 'Сохранить локально'},
        'Öffnen local'          : {'de': 'Local öffnen',             'en': 'Open local',                  'ru': 'Загрузить локально'},
        'Links Ausrichten'      : {'de': 'Links Ausrichten',         'en': 'Align left',                  'ru': 'Выравнить слева'},
        'Rechts Ausrichten'     : {'de': 'Rechts Ausrichten',        'en': 'Align right',                 'ru': 'Выравнить справа'},
        'Oben Ausrichten'       : {'de': 'Oben Ausrichten',          'en': 'Align top',                   'ru': 'Выравнить сверху'},
        'Unten Ausrichten'      : {'de': 'Unten Ausrichten',         'en': 'Align bottom',                'ru': 'Выравнить снизу'},
        'Diagonal Ausrichten'   : {'de': 'Diagonal Ausrichten',      'en': 'Align diagonal',              'ru': 'Выравнить по диагонали'},
        'Zoom zuckrücksetzen'   : {'de': 'Zoom zuckrücksetzen',      'en': 'Reset zoom',                  'ru': 'Сбросить зум'},
        'Zoom In'               : {'de': 'Zoom In',                  'en': 'Zoom in',                     'ru': 'Увеличить'},
        'Zoom Out'              : {'de': 'Zoom Out',                 'en': 'Zoom out',                    'ru': 'Уменьшить'},
        'An Grid fangen ON/OFF' : {'de': 'Am Gitter fangen An/Aus',  'en': 'Grid On/Off',                 'ru': 'Сетка Вкл/Выкл'},
        'Tooltip ON/OFF'        : {'de': 'Hinweis ON/OFF',           'en': 'Tooltip On/Off',              'ru': 'Подсказки Вкл/Выкл'},
        'Scriptengine Neustarten':{'de': 'Script-Engine Neustarten', 'en': 'Restart script engine',       'ru': 'Перезапустить Scrip-Engine'},
        'Teste Script'          : {'de': 'Script testen',            'en': 'Script test',                 'ru': 'Тестировать скрипт'},
        'Stop'                  : {'de': 'Stop',                     'en': 'Stop',                        'ru': 'Стоп'},
        'Force entfernen'       : {'de': 'Force entfernen',          'en': 'Force remove',                'ru': ''},
        ''                      : {'de': '',                         'en': '',                            'ru': ''},

// MBS
         'delay_check'           : {
                                    'de': 'Alle laufenden Verzögerungen Beenden',
                                    'en': '',
                                    'ru': ''
                                   },
         'Abbruch'               : {'de': 'Abbruch',                  'en': 'Cancel',                      'ru': ''},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},


// FBS
         'Empfänger'             : {'de': 'Empfänger',                'en': '',                            'ru': ''},
         'Betreff'               : {'de': 'Betreff',                  'en': '',                            'ru': ''},
         'Text'                  : {'de': 'Text',                     'en': '',                            'ru': ''},
         'roh'                   : {'de': '',                         'en': '',                            'ru': ''},
         'Monat_text'            : {'de': 'Monat (Text)',             'en': '',                            'ru': ''},
         'Wochentag_text'        : {'de': 'Wochentag (Text)',         'en': '',                            'ru': ''},
         'KW'                    : {'de': 'KW',                       'en': '',                            'ru': ''},/*KW für Kalenderwoche*/
         'Minute'                : {'de': 'Minute',                   'en': '',                            'ru': ''},
         'Stunde'                : {'de': 'Stunde',                   'en': '',                            'ru': ''},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},

// Contextmenu
         'Entferne Element'      : {'de': 'Entferne Element',         'en': 'Del Element',                 'ru': 'Удалить'},
         'Eingang Hinzufügen'    : {'de': 'Eingang Hinzufügen',       'en': '',                            'ru': ''},
         'Add ID'                : {'de': 'Add ID',                   'en': 'Add ID',                      'ru': ''},
         'Add Zeit'              : {'de': 'Add Zeit',                 'en': 'Add Time',                    'ru': ''},
         'Add Astro'             : {'de': 'Add Astro',                'en': 'Add Astro',                   'ru': ''},
         'Entferne ID'           : {'de': 'Entferne ID',              'en': 'Remove ID',                   'ru': ''},
         'Add Gerät'             : {'de': 'Add Gerät',                'en': 'Add Device',                  'ru': ''},
         'Entferne Gerät'        : {'de': 'Entferne Gerät',           'en': 'Remove Device',               'ru': ''},
         'Add Kanal'             : {'de': 'Add Kanal',                'en': 'Add channel',                 'ru': ''},
         'Add Datenpunkt'        : {'de': 'Add Datenpunkt',           'en': 'Add Datapoint',               'ru': ''},
         'Entferne Datenpunkt'   : {'de': 'Entferne Datenpunkt',      'en': 'Remove Datapoint',            'ru': ''},
         'Hintergrund'           : {'de': 'Hintergrund',              'en': 'Background',                  'ru': ''},
         'Rot'                   : {'de': 'Rot',                      'en': 'Red',                         'ru': ''},
         'Grün'                  : {'de': 'Grün',                     'en': 'Green',                       'ru': ''},
         'Gelb'                  : {'de': 'Gelb',                     'en': 'Yellow',                      'ru': ''},
         'Weiß'                  : {'de': 'Weiß',                     'en': '',                            'ru': ''},
         'Schwarz'               : {'de': 'Schwarz',                  'en': 'Black',                       'ru': ''},
         'Transparent'           : {'de': 'Transparent',              'en': '',                            'ru': ''},
         'Schrift'               : {'de': 'Schrift',                  'en': '',                            'ru': ''},
         'ID Auswahl'            : {'de': 'ID Auswahl',               'en': '',                            'ru': ''},
         'Add Force'             : {'de': 'Add Force',                'en': 'Add Force',                   'ru': ''},
         'Del Force'             : {'de': 'Entferne Force',           'en': 'Remove Force',                'ru': ''},
         'Autoformat'            : {'de': 'Autoformat',               'en': 'Autoformat',                  'ru': ''},
         'Entferne Kanal'        : {'de': 'Entferne Kanal',           'en': 'Remove Channel',              'ru': ''},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},

// ID Select Dialog
         'Name'                  : {'de': 'Name',                     'en': '',                            'ru': ''},
         'Type / Gerät'          : {'de': 'Type / Gerät',             'en': '',                            'ru': ''},
         'Raum'                  : {'de': 'Raum',                     'en': 'Room',                        'ru': ''},
         'Gewerk'                : {'de': 'Gewerk',                   'en': '',                            'ru': ''},
         'Favorit'               : {'de': 'Favorit',                  'en': '',                            'ru': ''},
         'Gruppen'               : {'de': 'Gruppen',                  'en': '',                            'ru': ''},
         'Gerät'                 : {'de': 'Gerät',                    'en': '',                            'ru': ''},
         'Kanal'                 : {'de': 'Kanal',                    'en': '',                            'ru': ''},
         'Datenpunkt'            : {'de': 'Datenpunkt',               'en': '',                            'ru': ''},
         'Local'                 : {'de': 'Local',                    'en': '',                            'ru': ''},
         'Objecte'               : {'de': 'Objecte',                  'en': '',                            'ru': ''},
         'ID:'                   : {'de': 'ID:',                      'en': '',                            'ru': ''},
         'Name:'                 : {'de': 'Name:',                    'en': '',                            'ru': ''},
         'Übernehmen'            : {'de': 'Übernehmen',               'en': '',                            'ru': ''},
         'Alarm'                 : {'de': 'Alarm'  ,                  'en': 'Alarm'  ,                     'ru': ''},
         'Logical'               : {'de': 'Logical',                  'en': 'Logical',                     'ru': ''},
         'Boolean'               : {'de': 'Boolean',                  'en': 'Boolean',                     'ru': ''},
         'String'                : {'de': 'String' ,                  'en': 'String' ,                     'ru': ''},
         'Number'                : {'de': 'Number' ,                  'en': 'Number' ,                     'ru': ''},
         'Enum'                  : {'de': 'Enum'   ,                  'en': 'Enum'   ,                     'ru': ''},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},


// Quick-Help
         toint: {
             'de': 'Konvertiert den Eingangswert in eine Zahl',
             'en': 'en',
             'ru': 'ru'
         },
         tofloat: {
             'de': 'Konvertiert den Eingangswert in eine KommaZahl',
             'en': 'en',
             'ru': 'ru'
         },
         tostring: {
             'de': 'Konvertiert den Eingangswert in einen Text',
             'en': 'en',
             'ru': 'ru'
         },
         und: {
             'de': 'Logische Verknüpfung wenn alle Eingänge 1 sind ist der Ausgang auch 1',
             'en': 'en',
             'ru': 'ru'
         },
         oder: {
             'de': 'Logische Verknüpfung wenn ein Eingänge 1 sind ist der Ausgang auch 1',
             'en': 'en', 'ru': 'ru'
         },
         not: {
             'de': 'Logische Negierung wenn der Eingang 1 ist, ist der Ausgang 0 und umgekehrt',
             'en': 'en',
             'ru': 'ru'
         },
         verketten: {
             'de': 'Verbindet zB. mehrere Texte miteinander',
             'en': 'en',
             'ru': 'ru'
         },
         input: {
             'de': 'Liest den aktuellen Wert der Hinterlegten ID von CCU.IO',
             'en': 'en',
             'ru': 'ru'
         },
         inputliste: {
             'de': 'Erstellt eine Channel ID Liste entsprechend der auswahl',
             'en': 'en',
             'ru': 'ru'
         },
         inputlocal: {
             'de': 'Liest den aktuellen Wert der localen Variable ein',
             'en': 'en',
             'ru': 'ru'
         },
         output: {
             'de': 'Setzt den Wert der Hinterlegten ID über CCU.IO',
             'en': 'en',
             'ru': 'ru'
         },
         outputlocal: {
             'de': 'Setzt den Wert der Hinterlegten localen Variable',
             'en': 'en',
             'ru': 'ru'
         },
         mail: {
             'de': 'Versendet eine E-Mail<br><br><b>Zur nutzung muss der E-Mail Adapter in CCU.IO aktiviert sein',
             'en': 'en',
             'ru': 'ru'
         },
         debugout: {
             'de': 'Schreibt seinen Wert ins CCU.IO Log <br><br> Logeintrag sieht wie folgt aus:<br>Scriptnamen prg_codebox_n -> WERT',
             'en': 'en',
             'ru': 'ru'
         },
         'true': {
             'de': 'Der Ausgang ist 1',
             'en': 'en',
             'ru': 'ru'
         },
         'false': {
             'de': 'Der Ausgang ist 0',
             'en': 'en',
             'ru': 'ru'
         },
         zahl: {
             'de': 'Der Ausgang entspricht der eingegebenen Zahl<br><br>Als eingabe sind nur Nummern möglich, das Dezimaltrennzeichen ist "." zb. 123.45',
             'en': 'en',
             'ru': 'ru'
         },
         string: {
             'de': 'Der Ausgang entspricht dem eingegebenen Text. Durch "Enter" hinzugefügte Zeilenumbrüche werden als Leerzeichen übernommen. Zusätzliche können Zeilenumbrüche durch \\n und Leerzeichen durch \\f hinzugefügt werden',
             'en': 'en',
             'ru': 'ru'
         },
         vartime: {
             'de': 'Der Ausgang entspricht z.B. :<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:JJ = 15.1.2014<br>TT:MM:JJ hh:mm = 15.1.2014 22:45<br>Minute = 54<br>Stunde = 22<br>KW = 3<br>Wochentag = Mittwoch<br>Monat = Januar',
             'en': 'en',
             'ru': 'ru'
         },
         trigvalue: {
             'de': 'Entspricht dem Wert des auslösenden Triggers, zum Auslösezeitpunkt <br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigtime: {
             'de': 'Zeitstempel der Auslösung<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigoldvalue: {
             'de': '',
             'en': 'en',
             'ru': 'ru'
         },
         trigoldtime: {
             'de': 'Zeitstempel letzten auslösing Auslösung<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigid: {
             'de': 'ID des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigname: {
             'de': 'Name des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigtype: {
             'de': 'Type des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigdevid: {
             'de': 'Geräte ID des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigdevname: {
             'de': 'Geräte Name des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         trigdevtype: {
             'de': 'Geräte Type des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'en',
             'ru': 'ru'
         },
         codebox: {
             'de': 'Programmboxen bilden die Basis von jedem Script und müssen immer mit mindestens einem Trigger verbunden sein.<br><br>In einer Programmbox werden dann die Funktionsbausteine, per Drag und Drop, aus der Toolbox platziert.',
             'en': 'en',
             'ru': 'ru'
         },
         brake: {
             'de': 'Fügt eine Pause ein.<br><br> Nach aufruf des Starteingangs wird die Pause gestartet. Bei aufruf Abbrechen wird sie abgebochen und die verbundenen Programmboxen werden <b>nicht</b> Ausgefürt<br><br>Die Eingabe der Pausenzeit erfolgt in Sekunden kann aber auch z.b 0.5 sein',
             'en': 'en',
             'ru': 'ru'
         },
         intervall: {
             'de': 'Ruft die verbundenen Programboxen im intervall auf.<br><br> Nach aufruf des Starteingangs wird die wird der Interval gestartet . Bei aufruf Abbrechen wird der Intervall beendet<br><br>Die Eingabe der Intervallzeit erfolgt in Sekunden kann aber auch z.b 0.5 sein',
             'en': 'en',
             'ru': 'ru'
         },
         loop: {
             'de': 'Ruft die verbundenen Programboxen entsprechend der eingegebenen Loop anzahl auf. Zwischen den aufrufen erfolgt eine Pause entsprechend der Time eingabe. <br><br> Nach aufruf des Starteingangs wird die wird der Loop gestartet . Bei aufruf Abbrechen wird der Loop beendet<br><br>Die Eingabe der Time erfolgt in Sekunden kann aber auch z.b 0.5 sein',
             'en': 'en',
             'ru': 'ru'
         },
         next: {
             'de': 'Ruft eine weitere Programmboxen auf <br><br>Hinweis:<br>Verbindungen können eine Pause enthalten',
             'en': 'en',
             'ru': 'ru'
         },
         next1: {
             'de': 'Ruft eine weitere Programmboxen auf wenn der Eingang 1 oder true ist <br><br>Hinweis:<br>Verbindungen können eine Pause enthalten',
             'en': 'en',
             'ru': 'ru'
         },
         komex: {
             'de': 'Kommentarbox ohne weitere Funktion',
             'en': 'en',
             'ru': 'ru'
         },
         ccuobj: {
             'de': 'Legt eine Variable in CCU.IO an.<br><br> Dies kan ein einzelner Wert, Text oder auch eine Liste vieler Werte/Texte sein.<br><br> Hinweis:<br> Beim neustarten der Scriptengine verliert diese Variable ihren Wert !',
             'en': 'en',
             'ru': 'ru'
         },
         ccuobjpersi: {
             'de': 'Legt eine Variable in CCU.IO an.<br><br> Dies kan ein einzelner Wert, Text oder auch eine Liste vieler Werte/Texte sein.<br><br> Hinweis:<br> Beim neustarten der Scriptengine verliert diese Variable <b style="color: red">nicht</b> ihren Wert !',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_event: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_EQ: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert gleich geblieben ist',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_NE: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert sich geändert hat',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_GT: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert größer geworden ist',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_GE: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert größer geworden oder gleich geblieben ist',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_LT: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert kleiner geworden ist',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_LE: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und der Wert kleiner geworden gleich geblieben ist',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_valNe: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und nicht 0 ist',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_val: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisirt wird und gemäß Auswahl dem eingegebenen Wert entspricht oder nicht<br><br><b>Mögliche Eingabe Wert:</b><br>z.B. true false 1 -2 345 67.89 "Text"',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_time: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Mögliche eingaben zb. 20:01, 9:00, 2:3, ...',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_vartime: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn der Wert eines hinterlegten CCU.IO Objecte gleich der Aktuellen Zeit ist. Die Überprufung findet minütlich statt<br><br><b>Hinweis: </b><br>Die Werte der Objekte müssen hh:mm formatiert sein<br> zb. 01:23 12:34 12:01',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_zykm: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen alle X Minuten nach Scriptengine Start aus',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_astro: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen entsprechent dem Sonnenstand aus. <br><br> Hinweis:<br>Die Längen- und Breitengradeinstellungen in den CCU.IO Einstellungen beachten.<br><br><b>Shift:</b><br>Offset für den Astrozeitpunkt. Es sind auch negative Eingaben möglich <br><br><b>Sonnenaufgang Start:</b><br> Sonne erschein am Horizont<br><b>Sonnenaufgang Ende:</b><br> Sonne ist voll am Horizont zu sehen<br><b>Höchster Sonnenstand:</b><br>Sonne ist am höchsten Punkt<br><b>Sonnenuntergang Start:</b><br>Sonne berührt den Horizont<br><b>Sonnenuntergang Ende:</b><br> Sonne ist Voll untergegangen<br><b>Nacht Start:</b><br> Beginn der astronomischen Nacht<br><b>Nacht Ende:</b><br> Ende der astronomischen Nacht<br><b>Dunkelster moment:</b><br> Sonne ist am tiefsten Punkt',
             'en': 'en',
             'ru': 'ru'
         },
         trigger_start: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen einmalig beim Start/Neustart der Scriptengine aus',
             'en': 'en',
             'ru': 'ru'
         },
         wenn: {
             'de': 'Dieser Baustein Vergleicht den Eingang In mit dem Rev und giebt bei erfüllung 1 aus<br><br>Mögliche Vergleichsoperatoren:<br>= &nbsp: In <b>gleich</b> Rev<br>!= : In <b>ungleich</b> Rev<br>< &nbsp: In <b>kleiner</b> Rev<br>> &nbsp: In <b>größer</b> Rev<br><=: In <b>kleiner gleich</b> Rev<br>>=: In <b>größer gleich</b> Rev<br><br>Hinweis:<br> Beim Vergleichen von Zeit ist:<br>10:00 <b>kleiner</b> 9:00<br>und:<br>10:00 <b>größer</b> 09:00',
             'en': 'en',
             'ru': 'ru'
         },
         timespan: {
             'de': 'Dieser Baustein vergleicht dann ob "Jetzt" zwischen "Start" und "STOP" liegt und giebt bei erfüllung 1 aus.<br><br><b>Mögliche Eingangswerte sind werte sind:</b></b><br>hh:mm<br>hh:mm:ss<br>TT.MM:JJJJ (es geht aus immer T:M:JJ)<br>JJJJ-MM-TT (es geht aus immer JJ-M-T)<br><br>Ab hier ist das leerzeichen Wichtig!<br> TT.MM:JJJJ hh:mm<br>TT.MM:JJJJ hh:mm:ss<br>JJJJ-MM-TT hh:mm<br>JJJJ-MM-TT hh:mm:ss',
             'en': 'en',
             'ru': 'ru'
         },
         inc: {
             'de': 'Dieser Baustein <b>erhöt</b> den Eingangswert um 1',
             'en': 'en',
             'ru': 'ru'
         },
         dec: {
             'de': 'Dieser Baustein <b>verringert</b> den Eingangswert um 1',
             'en': 'en',
             'ru': 'ru'
         },
         summe: {
             'de': 'Dieser Baustein addiert alle Eingänge',
             'en': 'en',
             'ru': 'ru'
         },
         differenz: {
             'de': 'Dieser Baustein subtrahiert alle Eingänge von Eingang In1',
             'en': 'en',
             'ru': 'ru'
         },


    },

    translate: function (text) {


     var l = "en";               // Hier die Sprache ändern

        if (SGI.words[text]) {
            if (SGI.words[text][l])
               return SGI.words[text][l];
//                return "xxx";
            else if (SGI.words[text]["de"])
         console.warn(text);
//                return "xxx";
            return SGI.words[text]["de"];
        }else{
          console.warn(text);
            return "xxx";
        }



}
});
