# CCU-IO.ScriptGUI
## Version 0.63.0

CCU-IO.ScriptGUI ist ein Visueller Script builder mit dem es möglich ist Scripte für CCU.IO zu erstellen, zu bearbeiten und zu testen.


## Todo/Roadmap


### 0.7
* Setup Dialog
* MVVS umstellung (Angular ?)
* Translate
* Erstellen Desktop anwendung (node-webkit oder ?)
* Performance allgemein und speziel Drag der Bausteine (evt. nutzung Katavorio) 
* Test Programme

### 0.8
* Mode umschaltung GUI/EDIT ?
* Erstellen von Multi/Gewerk Triggerbausteinen ( A. Trigger) incl. Compiler einbindung
* FBS execCmd
* Save Expert
* Expert Trigger
* JS Lint für Live Test ???
* Astro verfeinern ?
* Sun & Time Bausteine
* Rechte beim speichern setzen ?


### 0.9
* PI Regler
* PWM Baustein
* FBS Min
* FBS Max
* FBS Summe
* FBS Mittelwert
* Druck formulare
* Mehr FBS
* Doku
* Beispiele
* Videos
* Bugfixs
* Libs min.

### 1.0


## Changelog

### 0.63.0
* Add MBS Brake
* Add MBS intervall
* Add MBS loop
* Add MBS Trigger_yearly
* Add MBS Trigger_monthly

* Add FBS toint
* Add FBS tofloat
* Add FBS tostring
* Add FBS toH
* Add FBS round

* Change Sim Start/Stop
* Change Compiler (SortByEingang praseInt)
* Add Timeout/Interval management
* LiveTest show errorline number und text
* Add Tooltip vor FBS & MBS
* Add Icon for toggel Tooltip

* Bugfix Local (Name)
* Bugfix Compiler "not" (;)
* Bugfix input reihenfolge > 10  (zb. FBS Verketten)

### 0.62.2
* Bugfix UTC Time
* Bugfix font-type
* ADD FBS Timespan
* Bugfix Save CCU.IO (patch)

### 0.62.1
* Bugfix save as (Connections)
* Workaround (Fehler bei erstellen von Connctions, beim Öffnen)

### 0.62.0
* Add Open Local File in develog menu
* Add thumbnail generator for FBS & MBS in develop menu
* Change thumbnail to PNG
* New Make Struck
* Use File Manager

### 0.61.3
* Bugfix Rename CCU.IO Objeckt

### 0.61.2
* Bugfix Trigger Time  Sunday = 0
* Bugfix Typo persident = persistent

### 0.61.1
 * Bugfix Meta URL

### 0.61.0

 * Bugfix FBS Expert (Reihenfolge der I/O´s)
 * Bugfix FBS Wenn (Reihenfolge der I/O´s)
 * FBS Drop to Grid
 * Add email und push over to simulation
 * Add FBS Pushover
 * Add Forcen
 * Close and Resize Livetest panel
 * Add Copy & Paste (Strg+c & Strg+v)

### 0.60.7
 * Bugfix Trigger Val

### 0.60.6
 * Bugfix Livetext (force)

### 0.60.5
 * ID_Selectdialog Struktur für Adapter deaktiviert

### 0.60.4
 * add to Multiselect by shift
 * Multiselect by click + shift toggel
 * Verbindungen löschen nur über Doppelclick
 * Bugfix on border position
 * Bugfix FBS Expert (Automatische out deklaration)
 * Bugfix Compiler (; überprüfen)
 * Add Dummy execCmd in LiveTest

### 0.60.3
* Workaround LG Adapter (Device)
* Bugfix FBS Time (Sonntag)

### 0.60.2
* Bugfix Astro Trigger (Auto height)
* Bugfix next & netx1 (data übergabe)
* Live Test schedule & subcripe als dummy funktion hinzugefügt

### 0.60.1
* Bugfix Astro & Zeit Trigger

### 0.60
* Grid hinzugefügt
* Einige umstellungen auf Flex Box (CSS)
* Größenanpassung aller Bausteine ans Grid

* FBS Dragging auf ThreeDubMedia lib umgestellt
* MBS Dragging auf ThreeDubMedia lib umgestellt
* Einige Repaints angepasst
* Umbau das HM Selekt Dialogs zur Jquery id_select function
    - hmid
    - Gewerke Raume Favoriten
    - Local obj
    - Geräte
    - Kanäle
    - Datenpunkte

    -Komma getränte (oder) Suche im id_select für Type
    -Gerätebilder hinzugefügt
    -Comboboxen hinzugefügt

* Dashui HM_Select wird nicht mehr unterstützt

* Shortcut "Entf" Hinzugefügt
* Bugfix bei Mouseselect
* Scrollbar auf jquery_perfect_scrollbar umgestellt und an Jquery UI Themes angepasst
* Umstellung auf jquery UI Themes 1.10.4 und JQuery 1.11.0
* Umstellung auf jsPlumb 1.6.0 und nutzung mehrerer scopes
* MBS CCU.IO Object persident
* MBS Script Object hinzugefügt
* FBS +1
* FBS -1
* FBS Summe
* FBS Differnez

* FBS Local Get & Set hinzugefügt
* FBS listen Filter
    -Gerät
    -Kanal
    -Datenpunkt

* Autoformat bei Scriptvorschau (jsbeautifier)
* Bug fix Programm Boxen können nicht mehr kleiner als ihr Inhalt gemacht werden

* Expert FBS mit Editor hinzugefügt
    - Autocomplete
    - Format selction (jsbeautifier)
    - ID select
    - Groupes select
    - Device select

* Live-Test (mit Debug Ausgaben hinzugefügt)
* Lizenzen angepasst
* Neue Videos auf Youtube

### 0.58
* FBS Wenn
* FBS Next 1
* Bug Fix leading zero on FBS Time
* Bug Fix Numbers of FBS Target connections
* Bug Fix Kommentar autosize

### 0.57.1
* Bug Fix Add Delay (Safari)

### 0.57
* Autosize Textarea for FBS String & Komex
* Add/Remove delay for MBS connections
* Add FBS Next

### 0.56
* Add FBS E-Mail
* Better Multiselect for FBS and MBS !!!
* Add Rename Program

### 0.55
* Add FBS Verketten
* Change FBS Zeit ( 10 Stellen)

### 0.54
* Working on SVG Files
* Add FBS Zeit
* Add Trigger Start

### 0.53.1
* Bugfix on FBS String

### 0.53
* PNG -> SVG
* Bugfix Drag to PRG
* Add MBS CCU.IO Object
* Add FBS Text
* Some Changes and Adds on "FBS Trigger Daten"
* Bugfix on HM Select Dialog

### 0.52
* Trigger VAL
* New HM Select Dialog (now Working)
* Singel Trigger preview change to SVG

### 0.51.2
* Bufgfix on Quick Help

### 0.51
* Astro Trigger
* New HM Select Dialog (nonWorking)
* Bugfixes

### 0.50
* Links zum Youtube Kanal
* Add Demo Licht

### 0.49
* Add io-addon.json

### 0.48
* Add Trigger --

### 0.47
* Kommentar Schrift und Hintergrundfarbe
* Add Script Lösch Dialog

### 0.46
* Add Trigger EQ
* Add Trigger NE
* Add Trigger GT
* Add Trigger GE
* Add Trigger LT
* Add Trigger LE

### 0.45
* Add Kommentraflächen

### 0.44
* Add Trigger Zyklus M
* Bugfixes

### 0.43
* Add CCU.IO LOG

### 0.42
* Add Trigger Zeit

### 0.41
* Compiler hmid bugfix

### 0.40

* Add Programmboxen
* Add jsPlumb instanzen
* Add Trigger Daten
* Add Quick Help
* Splitten der Bausteine in FBS & MBS
* Add Code Mirror

* Überarbeitung Drag&Drop
* Überarbeitung Select
* Überarbeitung "Make Struck"
* Überarbeitung Compiler
* Überarbeitung PRG Datenstrucktur
* Überarbeitung Load/Save

### 0.32
* (GermanBluefox) Use authentication

### 0.31
* Erstellen Script "Compiler"
* Tooltip Iconbar

### 0.30
* Trigger valNe


### 0.23
* Öffnen Dialog mit Datei löschen
* Save Dialog mit Datei löschen
* Anzeige Dateiname im Menu

### 0.22
* Hochzeit mit CCU.IO
* Offline ohne CCU.IO mit Daten aus sim-Store

### 0.21
* Übernahme HM_select aus DashUI

### 0.1
* Herstellung der Editor Grundfunktionen
* Grafischer aufbau
* Themes
* Menu
* Iconbar
* Contextmenue
* Toolbox
* Local Save/Open
* FBS anordnen
* Multi Drag


## In CCU-IO.ScripGUI verwendete Software

* jQuery http://jquery.com/
* CanJS http://canjs.com/
* lostorage.js https://github.com/js-coder/loStorage.js
* jQuery UI http://jqueryui.com/
* jsPlumb https://github.com/sporritt/jsplumb/
* jQuery ContextMenu http://medialize.github.com/jQuery-contextMenu/
* jQuery Mousewheel http://brandon.aaron.sh
* jQuery resize http://benalman.com/projects/jquery-resize-plugin/
* jQuery CodeMirror http://codemirror.net/
* JS Beautifier http://jsbeautifier.org/
* Autosize http://www.jacklmoore.com/autosize
* Perfect-Scollbar http://github.com/noraesae



## Copyright, Lizenz, Bedingungen

CCU-IO.ScripGUI
http://github.com/smiling-Jack/CCU-IO.ScriptGUI

Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack


Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)

Sie dürfen das Werk bzw. den Inhalt vervielfältigen, verbreiten und öffentlich zugänglich machen,
Abwandlungen und Bearbeitungen des Werkes bzw. Inhaltes anfertigen zu den folgenden Bedingungen:

  * **Namensnennung** - Sie müssen den Namen des Autors/Rechteinhabers in der von ihm festgelegten Weise nennen.
  * **Keine kommerzielle Nutzung** - Dieses Werk bzw. dieser Inhalt darf nicht für kommerzielle Zwecke verwendet werden.

Wobei gilt:
Verzichtserklärung - Jede der vorgenannten Bedingungen kann aufgehoben werden, sofern Sie die ausdrückliche Einwilligung des Rechteinhabers dazu erhalten.

Die Veröffentlichung dieser Software erfolgt in der Hoffnung, daß sie Ihnen von Nutzen sein wird,
aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK.
Die Nutzung dieser Software erfolgt auf eigenes Risiko!

HomeMatic und das HomeMatic Logo sind eingetragene Warenzeichen der eQ-3 AG
