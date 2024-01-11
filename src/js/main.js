function hidePopup(id) {

    let popup = document.getElementById(id) ? document.getElementById(id) : this.closest('.popup');

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains('is-shown')) {
        popup.addEventListener('transitionend', (e) => {
            popup.style.display = 'none';
            popup.dataset.processing = false;
        }, {
            once: true
        })
        popup.classList.remove('is-shown');
    } 

}

function showPopup(id) {

    let popup = document.getElementById(id);

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains('is-shown') == false) {
        popup.style.display = 'flex';
        setTimeout(function() {
            popup.classList.add('is-shown')
            popup.dataset.processing = false;
        }, 1)
    }
}

const headerButton = () => {

    const $header = document.getElementById('header')
    const $backdrop = document.getElementById('header-backdrop')
    const $button = document.getElementById('header-button')

    $button.addEventListener('click', () => {
        if ($header.dataset.processing && $header.dataset.processing == true) return;
        $header.dataset.processing = true;
        if ($header.classList.contains('is-fixed') == false) {
            $backdrop.style.display = 'block';
            setTimeout(function() {
                $backdrop.classList.add('is-active')
                $header.dataset.processing = false;
            }, 1)
        } else {
            $backdrop.addEventListener('transitionend', (e) => {
                $backdrop.style.display = 'none';
                $header.dataset.processing = false;
            }, {
                once: true
            })
            $backdrop.classList.remove('is-active')
        }
        $header.classList.toggle('is-fixed')
    })
}

const footer = () => {

    const $footer = document.getElementById('footer');
    const height = $footer.scrollHeight;

    document.body.style.paddingBottom = height + 'px';

}

document.addEventListener('DOMContentLoaded', () => {

    headerButton();

    footer();
    // window.addEventListener('resize', footer)

    document.querySelectorAll('.js-popup-hide').forEach((el) => {
        el.addEventListener('click', hidePopup.bind(el));
    })

    document.querySelectorAll('.popup').forEach((el) => {
        el.addEventListener('click', function(e) {
            if (e.target == el) {
                hidePopup(e.target.id)
            }
        });
    })

    document.querySelectorAll('.js-popup-show').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            showPopup(el.dataset.target, el.dataset);
        })
    })

})