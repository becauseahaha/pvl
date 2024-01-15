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
        console.log(el.parentElement.offsetHeight)
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
    return;

    const $map = document.getElementById("map-scroll");

    function onScroll(e) {
        console.log(e);
    }

    const observer = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
            document.addEventListener("scroll", onScroll);
        } else {
            // document.removeEventListener('scroll', onScroll)
        }
    });
    observer.observe($map);
};

document.addEventListener("DOMContentLoaded", () => {
    headerButton();
    projectsBorder();
    mapScroll();
    typingText();
    accordion();

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
});
