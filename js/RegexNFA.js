/*jslint browser: true*/
/*global window, regexToNfa, genAutomataSVG, $*/

$(document).ready(function () {
    'use strict';

    function b64EncodeUnicode(str) {
        return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            match = match.prototype; // For jslint.
            return String.fromCharCode('0x' + p1);
        }));
    }
   $('#button_convert').click(function () {
        var url,
            start = regexToNfa($('#input_regex').val()),
            prefix = window.location.href.split('?')[0] + '?regex=',
            input = b64EncodeUnicode($('#input_regex').val());
        $('#input_url').val(prefix + input);
        $('#alert_error').hide();
        if (typeof start === 'string') {
            $('#p_error').text(start);
            $('#alert_error').show();
        } else {
            $('svg').attr("width", $('svg').parent().width());
            genAutomataSVG('svg', start);
            url = prefix.replace('regex2nfa', 'nfa2dfa') + input;

        }
    });

    var input = getParameterByName('regex');
    if (input) {
        input = b64DecodeUnicode(input);
        $('#input_regex').val(input);
        $('#button_convert').click();
    }

});
