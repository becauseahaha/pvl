const typingText = () => {

    async function typeSentence(sentence, el, delay = 100) {
        const letters = sentence.split("");
        const $box = el;
        let i = 0;
        while (i < letters.length) {
            await waitForMs(delay);
            $box.innerHTML += letters[i];
            i++;
        }
        return;
    }
    
    async function deleteSentence(el) {
        const $box = el;
        const sentence = $box.innerHTML;
        const letters = sentence.split("");
        while (letters.length > 0) {
            await waitForMs(100);
            letters.pop();
            $box.innerText = letters.join("");
        }
    }
    
    async function carousel(carouselList, el) {
        var i = 1;
        while (true) {
            await waitForMs(2000);
            await deleteSentence(el);
            await waitForMs(500);
            await typeSentence(carouselList[i].text, el);
            await waitForMs(2000);
            i++;
            if (i >= carouselList.length) {
                i = 0;
            }
        }
    }

    const elements = document.querySelectorAll('.js-typing-text');
    elements.forEach((el) => {
        let carouselList = [];
        carouselList[0] = {'text': el.dataset.typingFirst}
        carouselList[1] = {'text': el.dataset.typingSecond}
        carousel(carouselList, el);
        el.parentElement.style.height = el.parentElement.offsetHeight + 'px'
    })

}

const accordion = () => {
    // if (window.innerWidth > 767) return;
    document.querySelectorAll('.js-accordion .btn').forEach((el) => {
        el.addEventListener('click', function() {
            // document.querySelectorAll('.js-contacts-card').forEach((el) => {
            //     el.classList.remove('is-active');
            // })
            el.classList.toggle('btn-plus')
            el.classList.toggle('btn-minus')
            el.classList.toggle('btn-light-blue')
            el.classList.toggle('btn-blue')
            el.closest('.accordion__item').classList.toggle('is-active');
        })
    })
}

function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function hidePopup(id) {
    let popup = document.getElementById(id)
        ? document.getElementById(id)
        : this.closest(".popup");

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains("is-shown")) {
        popup.addEventListener(
            "transitionend",
            (e) => {
                popup.style.display = "none";
                popup.dataset.processing = false;
            },
            {
                once: true,
            }
        );
        popup.classList.remove("is-shown");
    }
}

function showPopup(id) {
    let popup = document.getElementById(id);

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains("is-shown") == false) {
        popup.style.display = "flex";
        setTimeout(function () {
            popup.classList.add("is-shown");
            popup.dataset.processing = false;
        }, 1);
    }
}

const headerButton = () => {
    const $header = document.getElementById("header");
    const $backdrop = document.getElementById("header-backdrop");
    const $button = document.getElementById("header-button");

    $button.addEventListener("click", () => {
        if ($header.dataset.processing && $header.dataset.processing == true)
            return;
        $header.dataset.processing = true;
        if ($header.classList.contains("is-fixed") == false) {
            $backdrop.style.display = "block";
            setTimeout(function () {
                $backdrop.classList.add("is-active");
                $header.dataset.processing = false;
            }, 1);
        } else {
            $backdrop.addEventListener(
                "transitionend",
                (e) => {
                    $backdrop.style.display = "none";
                    $header.dataset.processing = false;
                },
                {
                    once: true,
                }
            );
            $backdrop.classList.remove("is-active");
        }
        $header.classList.toggle("is-fixed");
    });
};

const footer = () => {
    const $footer = document.getElementById("footer");
    const height = $footer.scrollHeight;

    document.body.style.paddingBottom = height + "px";
};

const projectsBorder = () => {
    const $projects = document.getElementById("projects");
    if (!$projects) return;

    const i = $projects.querySelectorAll(".project").length;
    let perLine = 4;

    switch (true) {
        case window.innerWidth < 767:
            perLine = 1;
            break;
        case window.innerWidth < 1280:
            perLine = 2;
            break;
    }

    for (let k = 1; k <= Math.ceil(i / perLine); k++) {
        const $line = document.createElement("div");
        $line.className = "project__line";
        const startRow = k * 2;
        const endtRow = startRow + 1;
        $line.style.gridRow = startRow + "/" + endtRow;
        $projects.appendChild($line);
    }
};

const yandexMap = () => {
    const pin = {
        iconLayout: "default#image",
        iconImageHref: "./../images/map-marker.png",
        iconImageSize: [80, 80],
        iconImageOffset: [-19, -19],
    };
    let myMap = new ymaps.Map("yamap", {
        center: [59.929646, 30.400804],
        zoom: 16,
    });
    let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, pin);
    myMap.geoObjects.add(myPlacemark);
};

const mapScroll = () => {

    const $map = document.getElementById("map-scroll");
    if ($map === null) return;

    const $markers = $map.querySelectorAll('.map__marker');

    let params, offset;

    function onScroll() {

        params = $map.getBoundingClientRect()
        offset = (params.height - params.y-params.height) / params.height*100;

        if (offset > 0) {
            $markers[0].classList.add('is-active');
        } else {
            $markers[0].classList.remove('is-active');
        }
        if (offset > 15) {
            $markers[1].classList.add('is-active');
        } else {
            $markers[1].classList.remove('is-active');
        }
        if (offset > 30) {
            $markers[2].classList.add('is-active');
        } else {
            $markers[2].classList.remove('is-active');
        }
        if (offset > 45) {
            $markers[3].classList.add('is-active');
        } else {
            $markers[3].classList.remove('is-active');
        }
    }

    const observer = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
            window.addEventListener("scroll", onScroll);
        } else {
            window.removeEventListener('scroll', onScroll)
        }
    });

    observer.observe($map);
};


const forms = () => {

    const $contact = document.getElementById('contact-form');
    const $contact_submit = $contact.querySelector('.js-submit');

    $contact_submit.addEventListener('click', () => {

        $contact.dataset.errors = 0;

        const phone = $contact.querySelector('input[name="phone"]');
        const name = $contact.querySelector('input[name="name"]');
        const message = $contact.querySelector('[name="message"]');

        if (phone.value.length == 0) {
            phone.classList.add('is-error');
            $contact.dataset.errors++;
        } else {
            phone.classList.remove('is-error');
        }
        if (name.value.length == 0) {
            name.classList.add('is-error');
            $contact.dataset.errors++;
        } else {
            name.classList.remove('is-error');
        }
        if (message.value.length == 0) {
            message.classList.add('is-error');
            $contact.dataset.errors++;
        } else {
            message.classList.remove('is-error');
        }

        if ($contact.dataset.errors > 0) return;

        const formData = new FormData($contact);
        $contact.style.display = 'none';
        document.getElementById('contact-form-success').style.display = 'block';
        return;
        fetch("/mailer.php", {
            method: "POST",
            body: formData
        })
        .then(function(serverPromise) { 
            serverPromise.json()
            .then(function(data) { 
                $contact.style.display = 'none';
                document.getElementById('contact-form-success').style.display = 'flex';
            });
        });

    })

}

const servicesMainSlider = () => {

    const duration = 3;
    const $box = document.getElementById('services-main-slider');
    if ($box === null) return;
    const $items = $box.querySelectorAll('.services__list-item');   
    const $images = $box.querySelectorAll('.services__image');   
    const $itemsContainer = $box.querySelector('.services__list');   

    let i = 0, prev_i = 0, reset = false, timeoutID;

    // $items.forEach(element => {
    //     element.addEventListener('click', () => {

    //         clearTimeout(timeoutID)
            // setDuration(0.3)

            // const el_index = Array.from(element.parentNode.children).indexOf(element) - 1;
            // i = el_index;
            // prev_i = i != 0 ? i-1 : 0;


            // $items.forEach(element => {
            //     element.classList.remove('is-filled');
            //     element.classList.remove('is-active');
            // });

    //         for (let index = 0; index < i; index++) {
    //             $items[index].classList.add('is-filled');
    //         }

    //         // setDuration(duration)

    //         // element.classList.add('is-active')
    //         timeoutID = setTimeout(switcher, 100);
    //     })
    // });

    function setDuration(s) {
        $items.forEach(element => {
            element.style.transitionDuration = s + 's'
        });
    }

    function switcher() {

        if (reset) {

            setDuration(0)
            $items.forEach(element => {
                element.classList.remove('is-filled');
                element.classList.remove('is-active');
            });
            $images.forEach(element => {
                element.classList.remove('is-active');
            });
            reset = false;

            timeoutID = setTimeout(switcher, 100)    

        } else {

            setDuration(duration)
    
            $itemsContainer.scrollTo($items[i].offsetLeft-16, 0)
            $items[i].classList.add('is-active')
            $images[i].classList.add('is-active')
            if (prev_i < i) {
                $items[prev_i].classList.remove('is-active')
                $images[prev_i].classList.remove('is-active')
                $items[prev_i].classList.add('is-filled')
            }
    
            prev_i = i;
            i++;
    
            if ($items[i] == undefined) {
                i = 0;
                prev_i = 0;
                reset = true;
            }

            timeoutID = setTimeout(switcher, duration*1000)    
        }

    }

    setTimeout(switcher, 1);
}

const headerSlider = () => {
    const container = document.querySelector('.js-main-bgs-container');
    if (container == null) return;
    const slides = container.querySelectorAll('.js-main-bg');
    let i = 0, next_i = i+1, prev_i = slides.length-1;

    function changeSlides() {
        slides[prev_i].classList.remove('is-active');
        slides[i].classList.add('is-active');
        slides[i].classList.remove('is-next');
        slides[next_i].classList.add('is-next');
        prev_i = i;
        i++;
        if (i == slides.length) i = 0;
        next_i = i+1;
        if (next_i == slides.length) next_i = 0;
    }
    changeSlides();
    setInterval(changeSlides, 5000);
}

const imagesGallery = () => {

    const $box = document.querySelectorAll('.js-gallery');

    if ($box.length == 0) return;

    function changeSlides(direction) {

        const slides = this.querySelectorAll('.js-gallery-item')
        let i = this.dataset.index, prev_i;

        if (direction == 'next') {
            prev_i = i;
            i++;
            if (slides[i] == null) i = 0;
        }
        if (direction == 'prev') {
            prev_i = i;
            i--;
            if (slides[i] == null) i = slides.length-1;
        }

        slides[prev_i].classList.remove('is-active');
        slides[i].classList.add('is-active');

        this.dataset.index = i;
    }

    $box.forEach(box => {

        const $prev = box.querySelector('.js-gallery-prev');
        const $next = box.querySelector('.js-gallery-next');
        const $container = box.querySelector('.js-gallery-items');
        let slides = box.querySelectorAll('.js-gallery-item');

        box.dataset.index = 0;

        if (slides[0].getBoundingClientRect().width > 0) {
            $container.style.width  = slides[0].getBoundingClientRect().width + 'px'
            $container.style.height = slides[0].getBoundingClientRect().height + 'px'
        }

        $prev.addEventListener('click', function() {
            changeSlides.call(box, 'prev')
        })
        $next.addEventListener('click', function() {
            changeSlides.call(box, 'next')
        })
    });
}

document.addEventListener("DOMContentLoaded", () => {
    headerButton();
    projectsBorder();
    mapScroll();
    typingText();
    accordion();
    forms();
    servicesMainSlider();
    headerSlider();
    imagesGallery();

    if (typeof ymaps !== "undefined") ymaps.ready(yandexMap);

    document.querySelectorAll(".js-popup-hide").forEach((el) => {
        el.addEventListener("click", hidePopup.bind(el));
    });

    document.querySelectorAll(".popup").forEach((el) => {
        el.addEventListener("click", function (e) {
            if (e.target == el) {
                hidePopup(e.target.id);
            }
        });
    });

    document.querySelectorAll(".js-popup-show").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            showPopup(el.dataset.target, el.dataset);
        });
    });

    const swiperClients = new Swiper('.swiper-clients', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        navigation: {
            nextEl: '.swiper-clients-next',
            prevEl: '.swiper-clients-prev'
        },
        breakpoints: {
            768: {
                spaceBetween: 24,
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 24,
            }
        }
    });

    const swiperProjects = new Swiper('.swiper-projects', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        navigation: {
            nextEl: '.swiper-projects-next',
            prevEl: '.swiper-projects-prev'
        },
        breakpoints: {
            768: {
                spaceBetween: 24,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 24,
            }
        }
    });

    document.querySelectorAll('.js-scroll-to').forEach((el) => {
        const scrollIntoViewWithOffset = (selector) => {
            window.scrollTo({
                behavior: "smooth",
                top:
                    document.querySelector(selector).getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    20,
            });
        };
        el.addEventListener('click', () => {
            scrollIntoViewWithOffset('#'+el.dataset.target);
        })
    })
});
