/**
 * Created by Schorling on 08.11.13.
 */
$.ui.plugin.add("draggable", "alsoDrag", {
    start: function() {
        var that = $(this).data("ui-draggable"),
            o = that.options,
            _store = function (exp) {
                $(exp).each(function() {
                    var el = $(this);
                    el.data("ui-draggable-alsoDrag", {
                        top: parseInt(el.css("top"), 10),
                        left: parseInt(el.css("left"), 10)
                    });
                });
            };

        if (typeof(o.alsoDrag) === "object" && !o.alsoDrag.parentNode) {
            if (o.alsoDrag.length) { o.alsoDrag = o.alsoDrag[0]; _store(o.alsoDrag); }
            else { $.each(o.alsoDrag, function (exp) { _store(exp); }); }
        }else{
            _store(o.alsoDrag);
        }
    },
    drag: function () {
        var that = $(this).data("ui-draggable"),
            o = that.options,
            os = that.originalSize,
            op = that.originalPosition,
            delta = {
                top: (that.position.top - op.top)/SGI.zoom || 0,
                left: (that.position.left - op.left)/SGI.zoom || 0
            },

            _alsoDrag = function (exp, c) {
                $(exp).each(function() {
                    var el = $(this), start = $(this).data("ui-draggable-alsoDrag"), style = {},
                        css = ["top", "left"];

                    $.each(css, function (i, prop) {
                        var sum = (start[prop]||0) + (delta[prop]||0);
                        style[prop] = sum || null;
                    });

                    el.css(style);
                });
            };

        if (typeof(o.alsoDrag) === "object" && !o.alsoDrag.nodeType) {
            $.each(o.alsoDrag, function (exp, c) { _alsoDrag(exp, c); });
        }else{
            _alsoDrag(o.alsoDrag);
        }
    },
    stop: function() {
        $(this).removeData("draggable-alsoDrag");
    }
});