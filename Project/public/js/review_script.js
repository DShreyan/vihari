var swiper = new Swiper(".slide-content", {
    grabCursor: true,
    mousewheel: true,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
  });