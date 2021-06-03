jQuery(($) => {
    $('.select').on('click', '.select__head', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head').removeClass('open');
            $('.select__list').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });
    $('.select').on('click', '.select__item', function () {
        $('.select__head').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text());
    });
    $(document).click(function (e) {
        if (!$(e.target).closest('.select').length) {
            $('.select__head').removeClass('open');
            $('.select__list').fadeOut();
        }
    });
});
$(document).ready(function () {
    $('.content_toggle').click(function () {
        $('.content_block').toggleClass('hide');
        if ($('.content_block').hasClass('hide')) {
            $('.content_toggle').html('Читать дальше <img style="width: 8px;height: 10px" src="assets/images/Vector.svg" alt=""> ');
        } else {
            $('.content_toggle').html('Скрыть <img style="width: 8px;height: 10px" src="assets/images/Vector.svg" alt="">');
            $('.content_toggle').toggleClass('scroll-top')
            $(".scroll-top").click(function () {
                elementClick = $(this).attr("href");
                destination = $(elementClick).offset().top;
                $("body,html").scrollTop(destination);
            });
        }
        return false;
    });
});

jQuery(document).ready(function ($) {
    $('.btn-popup').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
    });
});




/*second*/

var steps = [false, false, false, false, false,false,false];
var curr_step = 0;

// переходы по шагам
function to_step(index, need_push) {
    curr_step = index;
    for (var i = 0; i < steps.length; i++) {
        if (!$("#step" + i).is(':hidden')) {
            $("#step" + i).hide();
        }
    }
    $("#step" + index).show();

    $("#progress_in").css({width: (100 * index / steps.length) + "%"});
    $("#curr_step").text("Шаг " + index + " из " + (steps.length - 1));

    // Разделение на #step0, #other_steps и #last_step
    if (index + 1 == steps.length) { // если шаг равен общему количеству шагов
        if (!$("#other_steps").is(':hidden')) {
            $("#other_steps").hide();
            $("#last_step").show();
        }
    } else if (index > 0) { // если шаг больше ноля
        if ($("#other_steps").is(':hidden')) {
            $("#other_steps").show();
        }
        if (!$("#last_step").is(':hidden')) {
            $("#last_step").hide();
        }
    } else if (!$("#other_steps").is(':hidden')) { // если шаг равен нолю
        $("#other_steps").hide();
    }
}


// Проверка заполненности радиокнопки или чекбокса
function check_radio_selected(elem_id, error_message) {
    obj = $('input[name="' + elem_id + '"]:checked');
    if (!(obj.length && obj.val())) {
        alert(error_message);
        return false;
    }
    return true;
}

// Проверка E-mail
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

// Проверки полей по шагам и уведомления при незаполненных полях
(function ($) {

    $(document).ready(function () {
        to_step(0, true);
    }); // задаем первоначальный индекс
    $("#to_step1").click(function (event) {
        event.preventDefault();
        to_step(1, true);
    });
    $("#to_step2").click(function (event) {
        event.preventDefault();
        if (check_radio_selected("type-home", "Укажите Сумму")) {
            to_step(2, true);
        }
    });
    $("#to_step3").click(function (event) {
        event.preventDefault();

        var checked = $("#type-repair input:checked").length > 0;
        if (!checked) {
            alert("Укажите возраст ребенка");
            return false;
        } else {
            to_step(4, true);
        }

        /*if (check_radio_selected("type-repair", "Укажите какой ремонт необходим"))	{
            to_step(4, true);
        }*/
    });
    $("#to_step5").click(function (event) {
        event.preventDefault();
        if (check_radio_selected("design-project", "Укажите цель?")) {
            to_step(5, true);
        }
    });
    $("#to_step6").click(function (event) {
        event.preventDefault();
            to_step(6, true);
    });
    // Отправка формы (нажатием на финальную кнопку)
    $("#to_submit").click(function (event) {
        event.preventDefault();
        $("#quiz_form").submit();
    });
    // Проверка телефона и ПК при отправке формы
    $('#quiz_form').submit(function () {
        var name = $.trim($(this).find('input[name="name_input"]').val());
        var phone = $.trim($(this).find('input[name="phone"]').val());
        if (name === '') {
            alert('Заполните поле с именем');
            return false;
        }
        if (phone === '') {
            alert('Заполните поле с номером телефона');
            return false;
        } else if (phone.length < 8) {
            alert('Слишком короткий номер');
            return false;
        } else if (!((phone.lastIndexOf("+7", 0) === 0) || (phone.lastIndexOf("8", 0) === 0))) {
            alert('Введите корректный номер в формате +79998887766 или 89998887766');
            return false;
        }
    });
    // для возврата к предыдущему вопросу
    window.addEventListener("popstate", function (e) {
        var step = 0;
        if (e.state) {
            step = e.state.step_x;
        }
        to_step(step);
    });
})(jQuery);
$(document).ready(function () {

    jQuery('body').on('change', '#quiz_form', function () {

        // Обводка для label input[type=radio]
        $('input[type=radio]').each(function () {
            if ($(this).is(':checked')) {
                $(this).parent('label').addClass('checked');
            } else {
                $(this).parent('label').removeClass('checked');
            }
        });

        // Обводка для label input[type=checkbox]
        $('input[type=checkbox]').each(function () {
            if ($(this).is(':checked')) {
                $(this).parent('label').addClass('checked');
            } else {
                $(this).parent('label').removeClass('checked');
            }
        });

    });



});
