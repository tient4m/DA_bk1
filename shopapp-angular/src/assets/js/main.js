/*=============== SEARCH ===============*/
const searchButton = document.getElementById('search-button'),
      searchClose = document.getElementById('search-close'),
      searchContent = document.getElementById('search-content');

/*=============== SHOW SEARCH ===============*/
if (searchButton) {
    searchButton.addEventListener("click", () => {
        searchContent.classList.add("show-search");
    });
}

/*=============== CLOSE SEARCH ===============*/
if (searchClose) {
    searchClose.addEventListener("click", () => {
        searchContent.classList.remove("show-search");
    });
}

/*=============== LOGIn ===============*/
const loginButton = document.getElementById('login-button'),
      loginClose = document.getElementById('login-close'),
      loginContent = document.getElementById('login-content');

const loginLink = document.getElementById("login-link"),
    registerLink = document.getElementById("register-link"),
    loginForm = document.getElementById("login-form");

loginLink.addEventListener("click", function() {
    loginForm.classList.remove("active");
});

registerLink.addEventListener("click", function() {
    loginForm.classList.add("active");
})

/*=============== SHOW LOGIn ===============*/
if (loginButton) {
    loginButton.addEventListener("click", () => {
        loginContent.classList.add("show-login");
    });
}

/*=============== CLOSE LOGIn ===============*/
if (loginClose) {
    loginClose.addEventListener("click", () => {
        loginContent.classList.remove("show-login");
    });
}

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = function() {
    const header = document.getElementById("header")
    this.scrollY >= 50 ? header.classList.add("shadow-header")
                        : header.classList.remove("shadow-header");
}

window.addEventListener("scroll", shadowHeader);

/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper('.home_swiper', {
    loop: true,
    spaceBetween: -24,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    
    breakpoints: {
        1220: {
            spaceBetween: -32,
        }
    }
});

/*=============== FEATURED SWIPER ===============*/
let swiperFeatured = new Swiper('.featured_swiper', {
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    // Lặp feature
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        1150: {
            slidesPerView: 4,
            centeredSlides: false,
        }
    }
});

/*=============== BOOK DETAILS SWIPER ===============*/
var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

/*=============== TESTIMONIAL SWIPER ===============*/
let swiperTestimonial = new Swiper('.testimonial_swiper', {
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    breakpoints: {
        1150: {
            slidesPerView: 3,
            centeredSlides: false
        }
    }
});


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUpButton = document.getElementById("scroll-up");
    // Check if the window has scrolled more than 350px
    window.scrollY >= 350 ? scrollUpButton.classList.add("show-scroll")
                          : scrollUpButton.classList.remove("show-scroll");
}

// Attach the scroll event listener
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top', // Hướng phần tử xuất hiện
    distance: '60px', // Khoảng cách từ vị trí ban đầu đến khi xuất hiện
    duration: 2500, // Thời gian hoàn thành hiệu ứng
    delay: 400,
    // reset: true
});

sr.reveal(`.home_data, .featured_container, .new_container, .book_details_card, .footer`);
sr.reveal(`.home_images`, {delay: 600})
sr.reveal(`.services_card`, {interval: 100})
sr.reveal(`.discount_data`, {origin: 'left'})
sr.reveal(`.discount_images`, {origin: 'right'})