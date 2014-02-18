/**
 * Created by Schorling on 18.02.14.
 */

(function ($) {
    $.fn.es_select = function (_options) {

        var $this = this;

        var o = {
            cssButton: _options.cssButton || "ui-widget ui-state-default ui-corner-all " + (_options.addcssButton || ""),
            cssMenu: _options.cssMenu || "ui-widget-content ui-corner-all " + (_options.addcssMenu || ""),
            cssFocus: _options.cssFocus || "ui-state-focus" + (_options.addcssFocus || ""),
            width: _options.cssFocus || false,
            height: _options.height || false,
            data: _options.data || []

        };

        var liste = "";

        $.each(o.data, function () {
            liste += ('<p style="margin: 0">' + this + '</p>')
        });

        this.addClass(o.cssButton);
        this.append('<span>' + o.data[0] + '</span>');
        this.append('<div class="' + o.cssMenu + '">' + liste.toString() + '</div>');

        this.find("div").hide();

        var list = this.children("div");
        var list_elem = this.children("div").children("p");

        $(list_elem)
            .mouseenter(function () {
                $(this).addClass(o.cssFocus)
            })
            .mouseleave(function () {
                $(this).removeClass(o.cssFocus)
            })
            .click(function () {
                $($this).val($(this).text())
            });





        this.click(function () {
                $(this).find("div").toggle();
            });


        $(value).change(function () {
            console.log("change")
            $(this).children("span").txt(this.val());
        });


        return this
    }

})(jQuery);
