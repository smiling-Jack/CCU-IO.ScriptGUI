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
        'Force entfernen'       : {'de': 'Force entfernen',          'en': 'Force remove',                'ru': 'Удалить значение'},
        ''                      : {'de': '',                         'en': '',                            'ru': ''},

// MBS
         'delay_check'           : {
                                    'de': 'Alle laufenden Verzögerungen Beenden',
                                    'en': 'Remove all running delays',
                                    'ru': 'Остановить все запущеные таймауты'
                                   },
         'Abbruch'               : {'de': 'Abbruch',                  'en': 'Cancel',                      'ru': 'Отмена'},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},


// FBS
         'Empfänger'             : {'de': 'Empfänger',                'en': 'Destination',                 'ru': 'Получатель'},
         'Betreff'               : {'de': 'Betreff',                  'en': 'Subject',                     'ru': 'Заголовок'},
         'Text'                  : {'de': 'Text',                     'en': 'Text',                        'ru': 'Текст'},
         'roh'                   : {'de': '',                         'en': '',                            'ru': ''},
         'Monat_text'            : {'de': 'Monat (Text)',             'en': 'Month (Text)',                'ru': 'Месяц (текст)'},
         'Wochentag_text'        : {'de': 'Wochentag (Text)',         'en': 'Weekday (Text)',              'ru': 'День недели (текст)'},
         'KW'                    : {'de': 'KW',                       'en': 'Week of year',                'ru': 'Неделя года'},/*KW für Kalenderwoche*/
         'Minute'                : {'de': 'Minute',                   'en': 'Minute',                      'ru': 'Минуты'},
         'Stunde'                : {'de': 'Stunde',                   'en': 'Hour',                        'ru': 'Час'},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},

// Contextmenu
         'Entferne Element'      : {'de': 'Entferne Element',         'en': 'Del Element',                 'ru': 'Удалить'},
         'Eingang Hinzufügen'    : {'de': 'Eingang Hinzufügen',       'en': 'Add Input',                   'ru': 'Добавить вход'},
         'Add ID'                : {'de': 'Add ID',                   'en': 'Add ID',                      'ru': 'Добавить ID'},
         'Add Zeit'              : {'de': 'Add Zeit',                 'en': 'Add Time',                    'ru': 'Добавить время'},
         'Add Astro'             : {'de': 'Add Astro',                'en': 'Add Astro',                   'ru': 'Добавить астровремя'},
         'Entferne ID'           : {'de': 'Entferne ID',              'en': 'Remove ID',                   'ru': 'Удалить ID'},
         'Add Gerät'             : {'de': 'Add Gerät',                'en': 'Add Device',                  'ru': 'Добавить устройство'},
         'Entferne Gerät'        : {'de': 'Entferne Gerät',           'en': 'Remove Device',               'ru': 'Удалить устройство'},
         'Add Kanal'             : {'de': 'Add Kanal',                'en': 'Add channel',                 'ru': 'Добавить канал'},
         'Add Datenpunkt'        : {'de': 'Add Datenpunkt',           'en': 'Add Datapoint',               'ru': 'Добавить данные'},
         'Entferne Datenpunkt'   : {'de': 'Entferne Datenpunkt',      'en': 'Remove Datapoint',            'ru': 'Удалить данные'},
         'Hintergrund'           : {'de': 'Hintergrund',              'en': 'Background',                  'ru': 'Фон'},
         'Rot'                   : {'de': 'Rot',                      'en': 'Red',                         'ru': 'красный'},
         'Grün'                  : {'de': 'Grün',                     'en': 'Green',                       'ru': 'зеленый'},
         'Gelb'                  : {'de': 'Gelb',                     'en': 'Yellow',                      'ru': 'желтый'},
         'Weiß'                  : {'de': 'Weiß',                     'en': 'White',                       'ru': 'белый'},
         'Schwarz'               : {'de': 'Schwarz',                  'en': 'Black',                       'ru': 'черный'},
         'Transparent'           : {'de': 'Transparent',              'en': 'Transparent',                 'ru': 'прозрачный'},
         'Schrift'               : {'de': 'Schrift',                  'en': 'Font',                        'ru': 'Шрифт'},
         'ID Auswahl'            : {'de': 'ID Auswahl',               'en': 'Select ID',                   'ru': 'Выбрать ID'},
         'Add Force'             : {'de': 'Add Force',                'en': 'Add Force',                   'ru': 'Добавить значение'},
         'Del Force'             : {'de': 'Entferne Force',           'en': 'Remove Force',                'ru': 'Удалить значение'},
         'Autoformat'            : {'de': 'Autoformat',               'en': 'Autoformat',                  'ru': 'Автоформатирование'},
         'Entferne Kanal'        : {'de': 'Entferne Kanal',           'en': 'Remove Channel',              'ru': 'Удалить канал'},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},

// ID Select Dialog
         'Name'                  : {'de': 'Name',                     'en': 'Name',                        'ru': 'Имя'},
         'Type / Gerät'          : {'de': 'Typ / Gerät',              'en': 'Type / Device',               'ru': 'Тип / Устройство'},
         'Raum'                  : {'de': 'Raum',                     'en': 'Room',                        'ru': 'Комната'},
         'Gewerk'                : {'de': 'Gewerk',                   'en': 'Role',                        'ru': 'Роль'},
         'Favorit'               : {'de': 'Favorit',                  'en': 'Favorit',                     'ru': 'Часто используемые'},
         'Gruppen'               : {'de': 'Gruppen',                  'en': 'Groups',                      'ru': 'Группы'},
         'Gerät'                 : {'de': 'Gerät',                    'en': 'Device',                      'ru': 'Устройство'},
         'Kanal'                 : {'de': 'Kanal',                    'en': 'Channel',                     'ru': 'Канал'},
         'Datenpunkt'            : {'de': 'Datenpunkt',               'en': 'Datapoint',                   'ru': 'Данные'},
         'Local'                 : {'de': 'Local',                    'en': 'Local',                       'ru': 'Локально'},
         'Objecte'               : {'de': 'Objecte',                  'en': 'Objects',                     'ru': 'Объекты'},
         'ID:'                   : {'de': 'ID:',                      'en': 'ID:',                         'ru': 'ID:'},
         'Name:'                 : {'de': 'Name:',                    'en': 'Name:',                       'ru': 'Имя:'},
         'Übernehmen'            : {'de': 'Übernehmen',               'en': 'Apply',                       'ru': 'Применить'},
         'Alarm'                 : {'de': 'Alarm'  ,                  'en': 'Alarm'  ,                     'ru': 'Alarm'},
         'Logical'               : {'de': 'Logical',                  'en': 'Logical',                     'ru': 'Logical'},
         'Boolean'               : {'de': 'Boolean',                  'en': 'Boolean',                     'ru': 'Boolean'},
         'String'                : {'de': 'String' ,                  'en': 'String' ,                     'ru': 'String'},
         'Number'                : {'de': 'Number' ,                  'en': 'Number' ,                     'ru': 'Number'},
         'Enum'                  : {'de': 'Enum'   ,                  'en': 'Enum'   ,                     'ru': 'Enum'},
         ''                      : {'de': '',                         'en': '',                            'ru': ''},


// Quick-Help
         toint: {
             'de': 'Konvertiert den Eingangswert in eine Zahl.',
             'en': 'Convert the input value into the number.',
             'ru': 'Конвертирует входное значение в целочисленное число.'
         },
         tofloat: {
             'de': 'Konvertiert den Eingangswert in eine KommaZahl.',
             'en': 'Convert the input value into the float.',
             'ru': 'Конвертирует входное значение в число с плавающей запятой.'
         },
         tostring: {
             'de': 'Konvertiert den Eingangswert in einen Text.',
             'en': 'Convert the input value into the string.',
             'ru': 'Конвертирует входное значение в текст.'
         },
         und: {
             'de': 'Logische Verknüpfung wenn alle Eingänge 1 sind ist, der Ausgang auch 1',
             'en': 'Logical "and". If all inputs are 1, so the output is 1 too',
             'ru': 'Логическое "и". Если все входы не равны нулю, то выход будет 1'
         },
         oder: {
             'de': 'Logische Verknüpfung wenn ein Eingänge 1 sind, ist der Ausgang auch 1',
             'en': 'Logical "or". If one of inputs is 1, so the output is 1 too', 
			 'ru': 'Логическое "или". Если один из входов не равен нулю, то выход будет 1'
         },
         not: {
             'de': 'Logische Negierung wenn der Eingang 1 ist, ist der Ausgang 0 und umgekehrt',
             'en': 'Logitcal "not". If input is 1 the then output is 0 and vice versa.',
             'ru': 'Логическое "нет". Если вход не равен 0, то выход будет 0 и наоборот.'
         },
         verketten: {
             'de': 'Verbindet zB. mehrere Texte miteinander.',
             'en': 'Concatenate, e.g. the strings with each other.',
             'ru': 'Соединяет текстовые переменные между собой.'
         },
         input: {
             'de': 'Liest den aktuellen Wert der Hinterlegten ID von CCU.IO',
             'en': 'Read the actual value in CCU.IO of the given ID.',
             'ru': 'Считывает актуальное значение для переменной с заданным ID из CCU.IO'
         },
         inputliste: {
             'de': 'Erstellt eine Channel ID Liste entsprechend der Auswahl.',
             'en': 'Creates the list with channel ID according the selection???',
             'ru': 'Создаёт список с ID'
         },
         inputlocal: {
             'de': 'Liest den aktuellen Wert der localen Variable ein.',
             'en': 'Read the actual value of the local variable',
             'ru': 'Считывает актуальное значение локальной переменной.'
         },
         output: {
             'de': 'Setzt den Wert der Hinterlegten ID über CCU.IO',
             'en': 'Sets the value in CCU.IO of the variable with given ID.',
             'ru': 'Задаёт значение для переменной из CCU.IO с заданным ID.'
         },
         outputlocal: {
             'de': 'Setzt den Wert der Hinterlegten localen Variable',
             'en': 'Set the value of local variable.',
             'ru': 'Задаёт значение локальной переменной.'
         },
         mail: {
             'de': 'Versendet eine E-Mail<br><br><b>Zur nutzung muss der E-Mail Adapter in CCU.IO aktiviert sein',
             'en': 'Sends e-mail<br><br><b>To use this the E-Mail adapter must be activated',
             'ru': 'Отсылает электронное письмо.<br><br><b>Что бы использовать эту функцию, E-Mail драйвер должен быть активирован.'
         },
         debugout: {
             'de': 'Schreibt seinen Wert ins CCU.IO Log <br><br> Logeintrag sieht wie folgt aus:<br>Scriptnamen prg_codebox_n -> WERT',
             'en': 'Write own value to CCU.IO log<br><br>The log entry has following format:<br>ScriptName prg_codebox_n -> VALUE',
             'ru': 'Записывает значение в протокол CCU.IO<br><br>Записанная строка будет иметь следующий формат: ИмяСкрипта prg_codebox_n -> ЗНАЧЕНИЕ'
         },
         'true': {
             'de': 'Der Ausgang ist 1',
             'en': 'The output is 1',
             'ru': 'Выход равняется 1'
         },
         'false': {
             'de': 'Der Ausgang ist 0',
             'en': 'The output is 0',
             'ru': 'Выход равняется 0'
         },
         zahl: {
             'de': 'Der Ausgang entspricht der eingegebenen Zahl<br><br>Als eingabe sind nur Nummern möglich, das Dezimaltrennzeichen ist "." zb. 123.45',
             'en': 'The output is equal to defined number<br><br>Only digits are allowed and the divider is ".", e.g. 123.45',
             'ru': 'ru'
         },
         string: {
             'de': 'Der Ausgang entspricht dem eingegebenen Text. Durch "Enter" hinzugefügte Zeilenumbrüche werden als Leerzeichen übernommen. Zusätzliche können Zeilenumbrüche durch \\n und Leerzeichen durch \\f hinzugefügt werden',
             'en': 'The output is equal to the defined string. You can define the new line with \\n and the space with \\f.',
             'ru': 'Выход равняется заданному тексту. Для новой строки и дополнительного пробела можно использовать символы \\n (new line) и \\f (space).'
         },
         vartime: {
             'de': 'Der Ausgang entspricht z.B. :<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:JJ = 15.1.2014<br>TT:MM:JJ hh:mm = 15.1.2014 22:45<br>Minute = 54<br>Stunde = 22<br>KW = 3<br>Wochentag = Mittwoch<br>Monat = Januar',
             'en': 'The output is equal to time, e.g.:<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:JJ = 15.1.2014<br>TT:MM:JJ hh:mm = 15.1.2014 22:45<br>Minute = 54<br>Hour = 22<br>KW = 3<br>Week day = Monday<br>Month = January',
             'ru': 'Выход равняется заданному времени. Например:<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:YY = 15.1.2014<br>TT:MM:YY hh:mm = 15.1.2014 22:45<br>Минуты = 54<br>Часы = 22<br>KW = 3<br>День недели = Monday<br>Месяц = January'
         },
         trigvalue: {
             'de': 'Entspricht dem Wert des auslösenden Triggers, zum Auslösezeitpunkt <br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'Corrspond to the value of the trigger to the raise time<br><br>Cannot be used with time triggers',
             'ru': 'ru'
         },
         trigtime: {
             'de': 'Zeitstempel der Auslösung.<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'Time stamp of the trigger.<br><br>Cannot be used with time triggers.',
             'ru': 'Время, когда сработал триггер.<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigoldvalue: {
             'de': '',
             'en': 'en',
             'ru': 'ru'
         },
         trigoldtime: {
             'de': 'Zeitstempel letzten auslösing Auslösung.<br><br>Nicht nutzbar bei Zeit Trigger',
             'en': 'Time stamp of the previous trigger event.<br><br>Cannot be used with time triggers',
             'ru': 'Время, когда сработал триггер в предыдущий раз.<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigid: {
             'de': 'ID des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'ID of the tripped trigger.<br><br>Cannot be used with time triggers.',
             'ru': 'ID сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigname: {
             'de': 'Name des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'Name of the tripped trigger.<br><br>Cannot be used with time triggers.',
             'ru': 'Имя сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigtype: {
             'de': 'Typ des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'Typeof the tripped trigger.<br><br>Cannot be used with time triggers.',
             'ru': 'Тип сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigdevid: {
             'de': 'Geräte-ID des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'Device ID of the tripped trigger.<br><br>Cannot be used with time triggers.',
             'ru': 'ID устройства сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigdevname: {
             'de': 'Gerätename des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'Device name for the tripped trigger<br><br>Cannot be used with time triggers.',
             'ru': 'Тип устройства сработавшего триггера<br><br>Нельзя использовать с триггерами по времени.'
         },
         trigdevtype: {
             'de': 'Gerätetyp des auslösenden Triggers<br><br>Nicht nutzbar bei Zeit Trigger.',
             'en': 'Device type of the tripped trigger<br><br>Cannot be used with time triggers.',
             'ru': 'Имя устройства сработавшего триггера<br><br>Нельзя использовать с триггерами по времени.'
         },
         codebox: {
             'de': 'Programmboxen bilden die Basis von jedem Script und müssen immer mit mindestens einem Trigger verbunden sein.'+
			       '<br><br>In einer Programmbox werden dann die Funktionsbausteine, per Drag und Drop, aus der Toolbox platziert.',
             'en': 'Program box is the basis for every script and mist be always connected with some trigger.' + 
			       '<br><br>The function blocks from the tool box can be placed per drug\'n drop in the program box.',
             'ru': 'Программы являются основой для всех скриптов и должны быть связаны с триггером, для того, что бы они выполнялись.<br><br>' + 
			       'Функциональные блоки пожно "перетащить" мышкой из инструментария."
         },
         brake: {
             'de': 'Fügt eine Pause ein.<br><br>Nach aufruf des Starteingangs wird die Pause gestartet. ' + 
			       'Bei aufruf Abbrechen wird sie abgebochen und die verbundenen Programmboxen werden <b>nicht</b> Ausgefürt.'+
				   '<br><br>Die Eingabe der Pausenzeit erfolgt in Sekunden kann aber auch z.b 0.5 sein.',
             'en': 'Insert the delay.<br><br>The delay starts after the call of the input. ' + 
			       '<br><br>The value of the delay is in seconds, but you can use the float values, e.g. 0.5 is half second',
             'ru': 'Вставляет паузу.<br><br>Пауза отсчитывается после того, как вызван вход. '+
			       '<br><br>Длительность задаётся в секундах, но можно использовать и дробные значения. Например, 0.5 это пол-секунды.',
         },
         intervall: {
             'de': 'Ruft die verbundenen Programboxen im intervall auf.<br><br>'+
			       'Nach Aufruf des Starteingangs wird der Interval gestartet. Bei Aufruf "Abbrechen" wird der Intervall beendet<br><br>' + 
				   'Die Eingabe der Intervallzeit erfolgt in Sekunden kann aber auch z.b 0.5 sein',
             'en': 'Calls the connected programm box periodically.<br><br>'+
			       'The interval starts after call of start input. The periodical interval stops if Cancel input called.<br><br>' + 
				   'The interval can be set in seconds. Values as 0.5 are alowed too.',
             'ru': 'Переодически вызывает привязанную программу.<br><br>'+
			       'Вызовы стартуются если вызван вход Start. Переодические вызовы останавливаются если вызвать вход Cancel.<br><br>' + 
				   'Длительность задаётся в секундах, но можно использовать и дробные значения. Например, 0.5 это пол-секунды.',
         },
         loop: {
             'de': 'Ruft die verbundenen Programboxen entsprechend der eingegebenen Loop anzahl auf. Zwischen den aufrufen erfolgt eine Pause entsprechend der Time eingabe.<br><br>'+
			       'Nach aufruf des Starteingangs wird die wird der Loop gestartet. Bei aufruf Abbrechen wird der Loop beendet.<br><br>' + 
				   'Die Eingabe der Time erfolgt in Sekunden kann aber auch z.b 0.5 sein.',
             'en': 'Calls the connected programm box defined number of times. The pause can be defined between ths calls.<br><br>'+
			       'The executing starts after call of start input. The calls stop if Cancel input called.<br><br>' + 
				   'The pause can be set in seconds. Values as 0.5 are alowed too.',
             'ru': 'Вызывает привязанную программу заданное число раз. Между вызовами можно задать паузу.<br><br>'+
			       'Вызовы стартуются если вызван вход Start. Вызовы прекращаются если вызвать вход Cancel.<br><br>' + 
			       'Длительность паузы задаётся в секундах, но можно использовать и дробные значения. Например, 0.5 это пол-секунды.'
         },
         next: {
             'de': 'Ruft eine weitere Programmboxen auf.<br><br>Hinweis:<br>Verbindungen können eine Pause enthalten.',
             'en': 'Calls the next program box.<br><br>Note:<br>The call can be executed with pause.',
             'ru': 'Вызывает следующую программу.<br><br>Замечание:<br>Соединение может содержать паузу.'
         },
         next1: {
             'de': 'Ruft eine weitere Programmboxen auf wenn der Eingang 1 oder true ist.<br><br>Hinweis:<br>Verbindungen können eine Pause enthalten.',
             'en': 'Calls the next program box if the input is not 0.<br><br>Note:<br>The call can be executed with pause.',
             'ru':'Вызывает следующую программу, если вход не 0.<br><br>Замечание:<br>Соединение может содержать паузу.'
         },
         komex: {
             'de': 'Kommentarbox ohne weitere Funktion.',
             'en': 'Comment box without other functionality.',
             'ru': 'Просто коментарий или пояснение к программе.'
         },
         ccuobj: {
             'de': 'Legt eine Variable in CCU.IO an.<br><br>Dies kan ein einzelner Wert, Text oder auch eine Liste vieler Werte/Texte sein.<br><br>' + 
			       'Hinweis:<br>Beim neustarten der Scriptengine verliert diese Variable ihren Wert !',
             'en': 'Creates the variable in CCU.IO<br><br>It can be steing, number, float in list of texts/numbers.???<br><br>' + 
			       'Note:<br>After restart of CCU.IO the value of the variable will be lost!',
             'ru': 'Создаёт переменную в CCU.IO.<br><br>Она может быть текстовой, числовой или списком.<br><br>' + 
			       'Замечание: после перезапуска CCU.IO значение переменной потеряется!<br>'
         },
         ccuobjpersi: {
             'de': 'Legt eine Variable in CCU.IO an.<br><br> Dies kan ein einzelner Wert, Text oder auch eine Liste vieler Werte/Texte sein.<br><br>' + 
			       'Hinweis:<br> Beim neustarten der Scriptengine verliert diese Variable <b style="color: red">nicht</b> ihren Wert !',
             'en': 'Creates the variable in CCU.IO<br><br>It can be steing, number, float in list of texts/numbers.???<br><br>' + 
			       'Note:<br>After restart of CCU.IO the value of the variable will be <b style="color: red">restored</b>!',
             'ru': 'Создаёт переменную в CCU.IO.<br><br>Она может быть текстовой, числовой или списком.<br><br>' + 
			       'Замечание: после перезапуска CCU.IO значение переменной <b style="color: red">сохрантся</b>!<br>'
         },
         trigger_event: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisiert wird',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновится.'
         },
         trigger_EQ: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn eine der hinterlegten IDs aktualisiert wird und der Wert gleich geblieben ist',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated but the value is the same.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновится, но значение не изменилось.'
         },
         trigger_NE: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisiert wird und der Wert sich geändert hat',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated and the value is changed.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновится и значение изменилось.'
         },
         trigger_GT: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisiert wird und der Wert größer geworden ist',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated and the value is increased.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и увеличилось.'
         },
         trigger_GE: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn eine der hinterlegten IDs aktualisiert wird und der Wert größer geworden oder gleich geblieben ist',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated and the value is increased or the same.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и увеличилось или не изменилось.'
         },
         trigger_LT: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn eine der hinterlegten IDs aktualisiert wird und der Wert kleiner geworden ist',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated and the value is decreased.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и уменьшилось.'
         },
         trigger_LE: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn eine der hinterlegten IDs aktualisiert wird und der Wert kleiner geworden oder gleich geblieben ist',
             'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs will be updated and the value is decreased or the same.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и уменьшилось или не изменилось.'
         },
         trigger_valNe: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn eine der hinterlegten IDs aktualisiert wird und nicht 0 ist',
             'en': 'This trigger executes the linked program boxes,<br><br>' + 
			       'if one of the defined IDs will be updated and the value is not 0.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и не равно 0.'
         },
         trigger_val: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn eine der hinterlegten IDs aktualisiert wird und gemäß Auswahl dem eingegebenen Wert entspricht oder nicht<br><br>' + 
				   '<b>Mögliche Eingabe Wert:</b><br>z.B. true false 1 -2 345 67.89 "Text"',
             'en': 'This trigger executes the linked program boxes,<br><br>' + 
			       'if one of the defined IDs will be updated and the value is equal to defined value.',
             'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и равно заданному значению.'
         },
         trigger_time: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>Mögliche eingaben zb. 20:01, 9:00, 2:3, ...',
             'en': 'This trigger executes the linked program boxes,<br><br>',
             'ru': 'Триггер вызывает привязанную программу,<br><br>???'
         },
         trigger_vartime: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen aus:<br><br>' + 
			       'Wenn der Wert eines hinterlegten CCU.IO Objecte gleich der Aktuellen Zeit ist. Die Überprufung findet minütlich statt<br><br>' + 
				   '<b>Hinweis:</b><br>Die Werte der Objekte müssen hh:mm formatiert sein<br> zb. 01:23 12:34 12:01',
             'en': 'This trigger executes the linked program boxes,<br><br>' + 
			       'if the VALUE of the CCU.IO object equals to actual time. The comparation happens every minute.<br><br>' + 
				   '<b>Note:</b><br>The values of the objects must have follwoing format: hh:mm<br> e.g. 01:23 12:34 12:01',
             'ru': 'Триггер вызывает привязанную программу,<br><br>' + 
			       'если ЗНАЧЕНИЕ переменной из CCU.IO равняется настоящему времени. Сравнение происходит по-минутно.<br><br>' + 
				   '<b>Замечание:</b><br>Значения переменной должны иметь следующий формат: hh:mm<br> Например, 01:23 12:34 12:01'
         },
         trigger_zykm: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen alle X Minuten nach Scriptengine Start aus.',
             'en': 'This trigger executes the linked program boxes every X minutes after start of script engine.<br><br>',
             'ru': 'Триггер вызывает привязанную программу каждые X минут после старта Script-Engine.'
         },
         trigger_astro: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen entsprechent dem Sonnenstand aus.' + 
			       '<br><br>Hinweis:<br>Die Längen- und Breitengradeinstellungen in den CCU.IO Einstellungen beachten.' + 
				   '<br><br><b>Shift:</b><br>Offset für den Astrozeitpunkt. Es sind auch negative Eingaben möglich.??? In minuten?' + 
				   '<br><br><b>Sonnenaufgang Start:</b><br> Sonne erschein am Horizont<br><b>Sonnenaufgang Ende:</b>' + 
				   '<br>Sonne ist voll am Horizont zu sehen<br><b>Höchster Sonnenstand:</b>' + 
				   '<br>Sonne ist am höchsten Punkt<br><b>Sonnenuntergang Start:</b>' + 
				   '<br>Sonne berührt den Horizont<br><b>Sonnenuntergang Ende:</b>' + 
				   '<br>Sonne ist Voll untergegangen<br><b>Nacht Start:</b>' + 
				   '<br>Beginn der astronomischen Nacht<br><b>Nacht Ende:</b>' + 
				   '<br>Ende der astronomischen Nacht<br><b>Dunkelster moment:</b><br> Sonne ist am tiefsten Punkt',
             'en': 'This trigger executes the linked program box according to the sun position.' + 
			       '<br><br>Note:<br>The longitude and latitude should be set up valid in the CCU.IO settings.' + 
				   '<br><br><b>Shift:</b><br>Offset to the astro event. Negative values are possible too.' + 
				   '<br><br><b>Sunrise start:</b><br>The sun is at horizont.<br><b>Sunrise end:</b>' + 
				   '<br>The sun can be seen full at horizont.<br><b>Zenit:</b>' + 
				   '<br>The sun is in the high position.<br><b>Sunset start:</b>' + 
				   '<br>The sun touchs the horizont<br><b>Sunset end:</b>' + 
				   '<br>Ths sun is hidden behind the horizont<br><b>Night start:</b>' + 
				   '<br>Start of the astronomical night<br><b>Night end:</b>' + 
				   '<br>End of the astronomical night<br><b>Darkest position:</b><br>The sun is in the lowest position',
             'ru': 'Триггер вызывает привязанную программу в зависимости от положения солнца.' + 
			       '<br><br>Замечание:<br>Долгота и широта в настройках CCU.IO должны быть заданны правильно.' + 
				   '<br><br><b>Сдвиг:</b><br>Сдвиг в минутах по отношению к астрологическому событию. Можно задавать отрицательные значения.' + 
				   '<br><br><b>Начало восхода:</b><br>The sun is at horizont.<br><b>Конец восхода:</b>' + 
				   '<br>The sun can be seen full at horizont.<br><b>Зенит:</b>' + 
				   '<br>The sun is in the high position.<br><b>Начало захода:</b>' + 
				   '<br>The sun touchs the horizont<br><b>Конец захода:</b>' + 
				   '<br>Ths sun is hidden behind the horizont<br><b>Начало ночи:</b>' + 
				   '<br>Start of the astronomical night<br><b>Конец ночи:</b>' + 
				   '<br>End of the astronomical night<br><b>Надир:</b><br>The sun is in the lowest position'
         },
         trigger_start: {
             'de': 'Dieser Trigger fürt die Verbundenen Programmboxen einmalig beim Start/Neustart der Scriptengine aus',
             'en': 'This trigger executes the linked program box at start or restart of the script engine.',
             'ru': 'Триггер вызывает привязанную программу один раз при старте Scrip-Engine или её перезапуске.'
         },
         wenn: {
             'de': 'Dieser Baustein Vergleicht den Eingang In mit dem Rev und giebt bei erfüllung 1 aus.<br><br>' +
			       'Mögliche Vergleichsoperatoren:'+
				   '<br>= &nbsp: In <b>gleich</b> Rev<br>'+
				   '!= : In <b>ungleich</b> Rev<br>'+
				   '< &nbsp: In <b>kleiner</b> Rev<br>'+
				   '> &nbsp: In <b>größer</b> Rev<br>'+
				   '<=: In <b>kleiner gleich</b> Rev<br>'+
				   '>=: In <b>größer gleich</b> Rev<br><br>'+
				   'Hinweis:<br>'+
				   'Beim Vergleichen von Zeit ist:<br>'+
				   '10:00 <b>kleiner</b> 9:00<br>und:<br>'+
				   '10:00 <b>größer</b> 09:00',
             'en': 'This block compares the input "In" with value of "Rev" and writes 1 if true.<br><br>' +
			       'Possible comparations:'+
				   '<br>= &nbsp: In <b>equal</b> Rev<br>'+
				   '!= : In <b>not equal</b> Rev<br>'+
				   '< &nbsp: In <b>smaller</b> Rev<br>'+
				   '> &nbsp: In <b>greater</b> Rev<br>'+
				   '<=: In <b>smaller or equal</b> Rev<br>'+
				   '>=: In <b>greater or equal</b> Rev<br><br>'+
				   'Note:<br>'+
				   'By time comparations:<br>'+
				   '10:00 <b>smaller</b> 9:00<br>and:<br>'+
				   '10:00 <b>greater</b> 09:00',
             'ru': 'Этот блок сравнивает вход In со входом "Rev" и выдает 1, если сравнение истинно.<br><br>' +
			       'Варианты сравнений:'+
				   '<br>= &nbsp: In <b>равно</b> Rev<br>'+
				   '!= : In <b>не равно</b> Rev<br>'+
				   '< &nbsp: In <b>меньше</b> Rev<br>'+
				   '> &nbsp: In <b>больше</b> Rev<br>'+
				   '<=: In <b>меньше или равно</b> Rev<br>'+
				   '>=: In <b>больше или равно</b> Rev<br><br>'+
				   'Замечание:<br>'+
				   'Если сравнивать значения времени:<br>'+
				   '10:00 <b>меньше</b> 9:00<br>и:<br>'+
				   '10:00 <b>больше</b> 09:00'
         },
         timespan: {
             'de': 'Dieser Baustein vergleicht dann ob "Jetzt" zwischen "Start" und "STOP" liegt und giebt bei erfüllung 1 aus.'+
			       '<br><br><b>Mögliche Eingangswerte sind werte sind:</b><br>hh:mm<br>hh:mm:ss<br>' + 
				   'TT.MM.JJJJ (es geht aus immer T.M.JJ)<br>JJJJ-MM-TT (es geht aus immer JJ-M-T)' + 
				   '<br><br>Ab hier ist das leerzeichen Wichtig!<br> TT.MM.JJJJ hh:mm<br>TT.MM.JJJJ hh:mm:ss<br>JJJJ-MM-TT hh:mm<br>JJJJ-MM-TT hh:mm:ss',
             'en': 'This block compares if the time "now" is between "Start" and "Stop" and gives the result as 1(yes) or 0(no).' + 
			       '<br><br><b>Valid input formats are:</b><br>hh:mm<br>hh:mm:ss<br>' + 
				   'DD.MM.YYYY (D.M.YY is valid too)<br>YYYY-MM-DD (YY-M-D is valid too)' + 
				   '<br><br>From this pount it the space very important!<br>DD.MM.YYYY hh:mm:ss<br>YYYY-MM-DD hh:mm<br>YYYY-MM-DD hh:mm:ss',
             'ru': 'Этот блок проверяет лежит ли актуальное время между "Start" и "Stop" и выдаёт результат: 1(да) или 0(нет).' + 
			       '<br><br><b>Форматы ввода:</b><br>hh:mm<br>hh:mm:ss<br>' + 
				   'DD.MM.YYYY (D.M.YY тоже возможно)<br>YYYY-MM-DD (YY-M-D тоже возможно)' + 
				   '<br><br>Если задавать ещё и время, то пробел очень важен!<br>DD.MM.YYYY hh:mm:ss<br>YYYY-MM-DD hh:mm<br>YYYY-MM-DD hh:mm:ss'
         },
         inc: {
             'de': 'Dieser Baustein <b>erhöt</b> den Eingangswert um 1',
             'en': 'This block <b>increases</b> the input by one.',
             'ru': 'Этот блок <b>увеличивает</b> значение на входе на один.'
         },
         dec: {
             'de': 'Dieser Baustein <b>verringert</b> den Eingangswert um 1',
             'en': 'This block <b>decrements</b> the input by one.',
             'ru': 'Этот блок <b>уменьшает</b> значение на входе на один.'
         },
         summe: {
             'de': 'Dieser Baustein addiert alle Eingänge',
             'en': 'This block adds all inputs together.',
             'ru': 'Этот блок складывает значения всех входов вместе.'
         },
         differenz: {
             'de': 'Dieser Baustein subtrahiert alle Eingänge von Eingang In1',
             'en': 'This block substracts all other inputs from In1 input.',
             'ru': 'Этот блок отнимает значение всех входов (кроме первого) от первого входа (In1).'
         },


    },

    translate: function (text) {
		var l = "en";               // Hier die Sprache ändern

		if (SGI.words[text]) {
			if (SGI.words[text][l])
			   return SGI.words[text][l];
			else if (SGI.words[text]["de"])
				console.warn(text);
			return SGI.words[text]["de"];
		}else{
		  console.warn(text);
			return "xxx";
		}
	}
});
