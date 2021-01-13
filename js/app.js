$(function(){

    const worksSlider = $('[data-slider="slick"]');

    /*Filter======================================*/

   let filter = $("[data-filter]");                 //сохранение ссылки в виде переменой

    filter.on("click",function(event) {
        event.preventDefault();                     //отмена стандартного поведения ссылки - удаляется решетка

        let cat = $(this).data('filter');           //сохранение в виде переменой фильтр категории filter

        if(cat =='all'){                            //сравнения значения из переменной со значением all
            $("[data-cat]").removeClass("hide");    //убираем класс hide
        } else {
            $("[data-cat]").each(function() {       //если категории не all, то сравниваем с выбранной
            let workCat = $(this).data('cat');

            if(workCat != cat) {
                $(this).addClass('hide');
            } else {
                $(this).removeClass('hide');
            }
        });
        }
    });

    /*Modal======================================*/

    const modalCall = $("[data-modal]");      //Сохраняем в переменную у которой есть атрибут "data-modal"
    const modalClose = $("[data-close]");     //Сохраняем в переменную у которой есть атрибут "data-close"

    modalCall.on("click", function(event) {   //Клик на кнопку вызывает определенную функцию
        event.preventDefault();               //Отмена стандартного поведения при клике (важное если кнопка ссылка)

        let $this = $(this);                  //Сохраняем в переменную кнопку на которую мы кликнули
        let modalId = $this.data('modal');    //Сохраняем в переменную значение атрибута кнопки по которой мы кликнули

        $(modalId).addClass ('show');         //Добавляем класс 'show' для вызова модального окна
        $("body").addClass ('no-scroll');     //Убираем скролл именно основной страницы при вызове модального окна

        setTimeout(function(){                //Задержка в отображении
            $(modalId).find(".modal__dialog").css({//Ищем в окне modalId ".modal__dialog" и меняем св-во с названием transform (ниже)
                transform: "rotateX(0)"       // см. предыдущий + можно заменить на scale(1)
            });
        }, 200);                              //Задержка по времени

       worksSlider.slick('setPosition');
    });

    modalClose.on("click", function(event) {  //Клик на кнопку вызывает определенную функцию
        event.preventDefault();               //Отмена стандартного поведения при клике

        let $this = $(this);                 //Сохраняем в переменную кнопку на которую мы кликнули
        let modalParent = $this.parents('.modal');//Сохраняем в переменную кнопку на которую мы кликнули, получаем'.modal'

        modalParent.find(".modal__dialog").css({//Ищем в окне modalId ".modal__dialog" и меняем св-во с названием transform (ниже)
            transform: "rotateX(90deg)"         //можно заменить на scale(1)
        });

        setTimeout(function(){                //Задержка в отображении
            modalParent.removeClass ('show');//Убираем класс 'show' для закрытия модального окна
            $("body").removeClass ('no-scroll');//Добавляем скролл именно основной страницы при закрытии модального окна
        }, 200);                                //Задержка по времени

    });

    $(".modal").on("click", function(event) {//При клике на маску (".modal") закрываем модальное окно
        let $this = $(this);                 //Сохраняем в переменную кнопку на которую мы кликнули

        $this.find(".modal__dialog").css({ //Ищем в окне modalId ".modal__dialog" и меняем св-во с названием transform (ниже)
            transform: "rotateX(90deg)"   //можно заменить на scale(1)
        });

        setTimeout(function(){              //Задержка в отображении
            $this.removeClass ('show');     //Убираем класс 'show' для закрытия модального окна
            $("body").removeClass ('no-scroll');//Добавляем скролл именно основной страницы при закрытии модального окна
        }, 200);                            //Задержка по времени
    });

    $(".modal__dialog").on("click", function(event) { //Нажатие на ".modal__dialog" и далее останавливаем событие установленное для его родителя (закрытие, см.ниже)
        event.stopPropagation();
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addID("#modal_hire_me");
    }); //ОТкрывает второе модальное окно поверх первого

    /*Slider https://kenwheeler.github.io/slick/ ======================================*/

    worksSlider.slick({ //Указываем ID слайдера
        infinite: true,     //Бесконечная прокрутка слайдов
        slidesToShow: 1,    //Показываем один слайд
        slidesToScroll: 1,  //Скроллим один слайд
        fade: true,
        arrows: false,
        dots: true,
    });

    $(".slickPrev").on("click", function(event) { //при нажатии на кнопку ".slickPrev" выполняем функцию
        event.preventDefault();                   //Отмена стандартного поведения при клике

        let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]'); //Сохраняем в переменную слайдер, который находится в мобальном окне и на который мы кликаем

        currentSlider.slick("slickPrev");     //При нажатии на "slickPrev" переключаем слайд на предыдущий
    });

        $(".slickNext").on("click", function(event) { //при нажатии на кнопку ".slickNext" выполняем функцию
        event.preventDefault();                       //Отмена стандартного поведения при клике

        let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]'); //Сохраняем в переменную слайдер, который находится в мобальном окне и на который мы кликаем

        currentSlider.slick("slickNext");         //При нажатии на "slickNext" переключаем слайд на предыдущий
    });

    /*Mobile nav =========================*/

    const navToggle = $("#navToggle");
    const nav = $("#nav");

    navToggle.on("click", function(event) {
         event.preventDefault();

        nav.toggleClass("show");
    });

    /*LOAD MORE WORK =====================*/

    $(".portfolio__col").slice(0, 6).show(); //При помощи slice выбираем первые 6 элементов
    $("#load__more").on("click", function(event) { //Клик на кнопку вызывает определенную функцию
         event.preventDefault();            //Отмена стандартного поведения при клике
    $(".portfolio__col--hidden:hidden").slice(0, 3).slideDown(); //выбирает следующие 3 элемента, которые были скрыты
    });

});
