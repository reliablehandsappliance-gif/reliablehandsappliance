$(document).ready(function () {
    const $burgerButton = $('#burgerButton');
    const $mainNav = $('#main-nav');
    const $mobileNavMenu = $('#mobile-nav-menu');

    $burgerButton.on('click', function () {
        $burgerButton.toggleClass('open');
        $mobileNavMenu.slideToggle(300);
    });

    $(window).on('resize', function () {
        if ($(window).width() >= 768) {
            $mainNav.css('display', 'flex');
            $mobileNavMenu.hide();
            $burgerButton.removeClass('open');
        } else {
            $mainNav.css('display', 'none');
            if (!$burgerButton.hasClass('open')) {
                $mobileNavMenu.hide();
            }
        }
    });

    $(function () {
        $(".toggle-btn").on("click", function () {
            $(".gallery").toggleClass("show-second");
            $(this).text($(".gallery").hasClass("show-second") ? "Show less" : "Show more");
        });
    });




    $("#requestForm").on("submit", function (e) {
        e.preventDefault();

        let name = $("#name").val().trim();
        let phone = $("#phone").val().trim();
        let message = $("#message").val().trim();
        let honeypot = $("#website").val();

        if (honeypot !== "") {
            return false;
        }

        function sanitize(input) {
            input = input.replace(/<[^>]*>?/gm, "");
            input = input.replace(/(\r|\n)/g, " ");
            const forbidden = ["bcc:", "cc:", "to:", "content-type:"];
            forbidden.forEach(word => {
                const regex = new RegExp(word, "gi");
                input = input.replace(regex, "");
            });
            input = input.replace(/[;&|><$`]/g, "");
            return input.trim();
        }

        function formatUSPhone(number) {
            number = number.replace(/\D/g, "");
            if (number.length === 10) {
                return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            } else if (number.length === 11 && number.startsWith("1")) {
                return number.replace(/1(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            }
            return number;
        }

        name = sanitize(name);
        phone = sanitize(phone);
        message = sanitize(message);

        if (name === "" || phone === "" || message === "") {
            alert("Please fill all required fields!");
            return false;
        }

        phone = formatUSPhone(phone);

        const usPhoneRegex = /^(\d{3}-\d{3}-\d{4})$/;
        if (!usPhoneRegex.test(phone)) {
            alert("Please enter a valid US phone number!");
            return false;
        }

        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data: { name, phone, message },
            success: function () {
                alert("Request sent successfully!");
                $("#requestForm")[0].reset();
            },
            error: function () {
                alert("Something went wrong. Please try again.");
            }
        });
    });


});