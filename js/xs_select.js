/** jQuery
 *
 *  xtreme simpel select
 *
 *  Copyright (c) 2014 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */


(function ($) {
    $.fn.xs_select = function (_options) {

        if (typeof _options == "string") {
            var text = $(this).children("span");
            $(text).text(_options);
            $(this).val(_options);
            $(this).trigger("change");
        } else if (_options == undefined) {
            return $(this).val();
        } else {

            var $this = this;

            var o = {
                cssButton: _options.cssButton || "ui-widget ui-state-default ui-corner-all " + (_options.addcssButton || ""),
                cssMenu: _options.cssMenu || "ui-widget-content ui-corner-all " + (_options.addcssMenu || ""),
                cssFocus: _options.cssFocus || "ui-state-focus ui-corner-all" + (_options.addcssFocus || ""),
                cssText: _options.cssText|| "",
                width: _options.cssFocus || false,
                height: _options.height || false,
                data: _options.data || [],
                time: _options.time || 750,
                val: _options.val || _options.data[0]
            };

            var liste = "";

            var timer;
            $.each(o.data, function () {
                liste += ('<p class="'+ o.cssText+'">' + this + '</p>')
            });

            this.addClass(o.cssButton);
            this.append('<span class="'+ o.cssText+'">' + o.data[0] + '</span>');
            this.append('<div class="' + o.cssMenu + '">' + liste.toString() + '</div>');

            this.find("div").hide();
            text = this.children("span");
            var list = this.children("div");
            var list_elem = this.children("div").children("p");

            $(list_elem)
                .mouseenter(function () {
                    $(this).addClass(o.cssFocus);

                })
                .mouseleave(function () {
                    $(this).removeClass(o.cssFocus)
                })
                .click(function () {
                    $($this).val($(this).text());
                    $(text).text($(this).text());
                    $($this).trigger("change");
                });
            $(this)
                .mouseenter(function () {
                    $(this).addClass(o.cssFocus)
                })
                .mouseleave(function () {
                    $(this).removeClass(o.cssFocus)
                });

            $(list)
                .mouseenter(function () {
                    clearTimeout(timer);
                })
                .mouseleave(function () {
                    timer = setTimeout(function () {
                        $(list).hide();
                    }, o.time)
                });

            this.click(function () {
                $(list).toggle();
            });

        }
    }

})(jQuery);
