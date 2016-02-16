
$(window).resize(function () {
    var windowHeight = $(window).height();
    $(".sidebar").css("height", windowHeight);
    $(".main").css("height", windowHeight);
});

$(window).trigger('resize');


$(function () {

    $(".add-heirarchy-selection").hide();

    $(".info").attr("title", "If choose heirarchy is false then the custom field is added to root level");

    $(document).click(function () {
        $(".div-dropdown").removeClass("show");
        $(".div-dropdown").addClass("hide");
    });

    $(".downarrow-icon").on("click", function (e) {
        e.stopPropagation();
        $(".div-dropdown").removeClass("hide");
        $(".div-dropdown").addClass("show");
        var value = $("#dropdownTextbox").val();
        $(".select-dropdown:checked").each(function () {
            $("label[for='" + value + "']").css("background-color", "yellow");
        });
    })

    $('#nestedlist li').each(function () {
        if ($(this).children('ul').length > 0) {
            $(this).addClass('parent');
        }
    });

    $(".select-dropdown").on("click", function () {
        $(".div-dropdown").removeClass("show");
        $(".div-dropdown").addClass("hide");
        var value = $(this).attr("value");
        $("#dropdownTextbox").val(value);
    })

    $('#nestedlist li > a').click(function () {
        if ($(this).attr("data-selected")) {
            $(this).removeAttr("data-selected")
            $(this).css("background-color", "");
        }
        else {
            $(this).attr("data-selected", "selected");
            $(this).css("background-color", "yellow");
        }
    });

    $("#nestedlist li > div").click(function () {
        if ($(this).hasClass("list-border-minus")) {
            $(this).removeClass("list-border-minus");
            $(this).addClass("list-border-plus");
        }
        else {
            $(this).removeClass("list-border-plus");
            $(this).addClass("list-border-minus");
        }

        if ($(this).hasClass("list-border-minus")) {
            $(this).parent().children("ul").css("display", "block")
        }
        else {
            $(this).parent().children("ul").css("display", "none")
        }
    });

    $('#all').click(function () {
        $('#nestedlist li').each(function () {
            $(this).toggleClass('active');
            $(this).children('ul').slideToggle('fast');

            $(this).find("div").each(function () {
                if ($(this).hasClass("list-border-minus")) {
                    $(this).removeClass("list-border-minus");
                    $(this).addClass("list-border-plus");
                }
                else {
                    $(this).removeClass("list-border-plus");
                    $(this).addClass("list-border-minus");
                }
            });
        });
    });

    $("#custom-value-feed").keyup(function (event) {
        if (event.keyCode == 13) {
            $(".button-add.custom-value").click();
        }
    });

    $(".button-add.custom-value").on("click", function () {
        var customValue = $("#custom-value-feed").val();
        if (customValue != "") {
            var template = listGroupItemTemplate.replace("{{custom_value}}", customValue);
            template = template.replace("{{style_background}}", "");
            template = template.replace("{{row_selected}}", "");
            $(".list-group").append(template);
            $("#custom-value-feed").val("");
        }
    })

    $("#sortUp").on("click", function () {
        var selectedRow = $(".custom-value-text[row-selected='selected']");
        var selectedText = $(selectedRow).text();

        var listItem = $(".custom-value-text");
        var listArr = [];
        for (i = 0; i < listItem.length; i++) {
            listArr.push($(listItem[i]).text());
        }

        var indexPosition = $.inArray(selectedText, listArr);
        if (indexPosition == 0) {
            return;
        }

        var removedElement = listArr.splice(indexPosition, 1);
        var newIndex = indexPosition - 1;
        listArr.splice(newIndex, 0, removedElement);

        var html = "";
        for (i = 0; i < listArr.length; i++) {
            var template = listGroupItemTemplate.replace("{{custom_value}}", listArr[i]);
            template = template.replace("{{style_background}}", (selectedText == listArr[i] ? "style=\"background-color:yellow\"" : ""));
            template = template.replace("{{row_selected}}", (selectedText == listArr[i] ? "row-selected='selected'" : ""));
            html += template;
        }
        $(".list-group").empty();
        $(".list-group").html(html);

    })

    $("#sortDown").on("click", function () {
        var selectedRow = $(".custom-value-text[row-selected='selected']");
        var selectedText = $(selectedRow).text();

        var listItem = $(".custom-value-text");
        var listArr = [];
        for (i = 0; i < listItem.length; i++) {
            listArr.push($(listItem[i]).text());
        }

        var indexPosition = $.inArray(selectedText, listArr);
        if (indexPosition == listArr.length) {
            return;
        }

        var removedElement = listArr.splice(indexPosition, 1);
        var newIndex = indexPosition + 1;
        listArr.splice(newIndex, 0, removedElement);

        var html = "";
        for (i = 0; i < listArr.length; i++) {
            var template = listGroupItemTemplate.replace("{{custom_value}}", listArr[i]);
            template = template.replace("{{style_background}}", (selectedText == listArr[i] ? "style=\"background-color:yellow\"" : ""));
            template = template.replace("{{row_selected}}", (selectedText == listArr[i] ? "row-selected='selected'" : ""));
            html += template;
        }
        $(".list-group").empty();
        $(".list-group").html(html);

    })

    $("#automatic").on("click", function () {
        $(".sort-arrow-group").hide();
        var listItem = $(".custom-value-text");
        var listArr = [];
        for (i = 0; i < listItem.length; i++) {
            listArr.push($(listItem[i]).text());
        }

        var sortedArray = listArr.sort();
        var html = "";
        for (i = 0; i < sortedArray.length; i++) {
            var template = listGroupItemTemplate.replace("{{custom_value}}", sortedArray[i]);
            template = template.replace("{{style_background}}", "");
            template = template.replace("{{row_selected}}", "");
            html += template;
        }
        $(".list-group").empty();
        $(".list-group").html(html);
    })

    $("#manual").on("click", function () {
        $(".sort-arrow-group").show();
        var listItem = $(".custom-value-text");
        var listArr = [];
        for (i = 0; i < listItem.length; i++) {
            listArr.push($(listItem[i]).text());
        }

        var sortedArray = listArr.sort();
        var html = "";
        for (i = 0; i < sortedArray.length; i++) {
            html += listGroupItemTemplate.replace("{{custom_value}}", sortedArray[i]);
        }
        $(".list-group").empty();
        $(".list-group").html(html);
    })

    $(".list-group").on("click", ".list-group-item", function () {
        $(".list-group-item").css("background-color", '')
        $(this).find(".custom-value-text").removeAttr("row-selected");

        $(this).css('background-color', 'yellow');
        $(this).find(".custom-value-text").attr("row-selected", "selected");
    })

    $(".list-group").on("click", ".delete-value", function () {
        $(this).parent().parent().remove();
    })

    $("#heirarchySelectionToggle").on("click", function () {
        if ($(this).is(":checked")) {
            $(".add-heirarchy-selection").show();
            $(".info").hide();
        }
        else {
            $(".add-heirarchy-selection").hide();
            $(".info").show();
        }
    })

    $(".outer").on("click", function () {
        //remove tick class
        $(".outer").removeClass("tick");
        $(".outer").find(".circle").removeClass("tick");

        //add tick class
        $(this).addClass("tick");
        $(this).find(".circle").addClass("tick");
        var customFieldType = $(this).find(".text-field-text").text();
        $(".header-text").find(".custom-field-type").text(customFieldType);

        $(".radio-buttons-selection").empty();

        if (customFieldType == "Check Box") {
            $(".radio-buttons-selection").html(checkboxTemplate);
        }
        else if (customFieldType == "Dropdown List") {
            $(".radio-buttons-selection").html(dropDownTemplate);
        }
        else if (customFieldType == "MultiSelect Dropdown") {
            $(".radio-buttons-selection").html(dropDownMultipleTemplate);
        }
        else if (customFieldType == "Radio Button") {
            $(".radio-buttons-selection").html(radioButtonTemplate);
        }
        else if (customFieldType == "Text Field") {
            $(".radio-buttons-selection").html(textboxTemplate);
        }
    });


    $("#txtCustomFieldName").on("keyup", function () {
        var value = $(this).val();
        $(".custom-field-heirarchy").text(value);
    });


    $("#txtSearchCustomValue").on("keyup", function () {
        var value = $(this).val();
        searchCustomValue(value, $(this));
    })

    var searchCustomValue = function (value, sourceObj) {
        var parentObj = sourceObj.parent().parent();
        var customValues = $(parentObj).find(".list-group-item");
        for (i = 0; i < customValues.length; i++) {
            var $this = $(customValues[i]);
            var customValue = $this.find(".custom-value-text").text();
            if (customValue.indexOf(value) == -1) {
                $this.hide();
            }
            else {
                $this.show();
            }
        }
    }

    var listGroupItemTemplate =
        ' <div class="list-group-item clearfix" {{style_background}}>\
            <label class="custom-value-text" {{row_selected}}>{{custom_value}}</label>\
            <span class="pull-right">\
                <button class="button button-add-custom-value">Default</button>\
                <div id="deleteValue" class="delete-value"></div>\
            </span>\
        </div>';

    var dropDownTemplate =
            '<div class="data-type-container">\
                <input type="radio" id="string" name="radios" value="string" checked>\
                <label for="string">String</label>\
                <input type="radio" id="number" name="radios" value="number">\
                <label for="number">Number</label>\
                <input type="radio" id="boolean" name="radios" value="boolean">\
                <label for="boolean">Boolean</label>\
            </div>\
            <div class="data-type-container margin">\
                <input type="radio" id="fixed" name="radios1" value="fixed" checked>\
                <label for="fixed">Fixed</label>\
                <input type="radio" id="add" name="radios1" value="add">\
                <label for="add">Add</label>\
            </div>';

    var checkboxTemplate =
            '<div class="data-type-container">\
                <input type="radio" id="boolean" name="radios" value="boolean" checked>\
                <label for="boolean">Boolean</label>\
            </div>';


    var dropDownMultipleTemplate =
            '<div class="data-type-container">\
                <input type="radio" id="string" name="radios" value="string" checked>\
                <label for="string">String</label>\
                <input type="radio" id="number" name="radios" value="number">\
                <label for="number">Number</label>\
            </div>\
            <div class="data-type-container margin">\
                <input type="radio" id="fixed" name="radios1" value="fixed" checked>\
                <label for="fixed">Fixed</label>\
                <input type="radio" id="add" name="radios1" value="add">\
                <label for="add">Add</label>\
            </div>';

    var radioButtonTemplate =
            '<div class="data-type-container">\
                <input type="radio" id="boolean" name="radios" value="boolean" checked>\
                <label for="boolean">Boolean</label>\
            </div>';

    var textboxTemplate =
            '<div class="data-type-container">\
                <input type="radio" id="string" name="radios" value="string" checked>\
                <label for="string">String</label>\
            </div>';

})