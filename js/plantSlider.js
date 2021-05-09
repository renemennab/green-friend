// solution adapted from https://codepen.io/cconceicao/pen/PBQawy
export default function plantSlider(wrapper, items) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('main--results__container--plants__wrapper--slides__plant'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('main--results__container--plants__wrapper--slides__plant')[0]
            .offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true

    // Clone first and last slide
    items.appendChild(cloneFirst)
    items.insertBefore(cloneLast, firstSlide)
    wrapper.classList.add('loaded')

    // Mouse events
    items.onmousedown = dragStart

    // Touch events
    items.addEventListener('touchstart', dragStart)
    items.addEventListener('touchend', dragEnd)
    items.addEventListener('touchmove', dragAction)

    // Transition events
    items.addEventListener('transitionend', checkIndex)

    function dragStart(event) {
        event = event || window.event
        event.preventDefault()
        posInitial = items.offsetLeft

        if (event.type == 'touchstart') {
            posX1 = event.touches[0].clientX
        } else {
            posX1 = event.clientX
            document.onmouseup = dragEnd
            document.onmousemove = dragAction
        }
    }

    function dragAction(e) {
        e = e || window.event

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX
            posX1 = e.touches[0].clientX
        } else {
            posX2 = posX1 - e.clientX
            posX1 = e.clientX
        }
        items.style.left = items.offsetLeft - posX2 + 'px'
    }

    function dragEnd() {
        posFinal = items.offsetLeft
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag')
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag')
        } else {
            items.style.left = posInitial + 'px'
        }

        document.onmouseup = null
        document.onmousemove = null
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting')

        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft
            }

            if (dir == 1) {
                items.style.left = posInitial - slideSize + 'px'
                index++
            } else if (dir == -1) {
                items.style.left = posInitial + slideSize + 'px'
                index--
            }
        }

        allowShift = false
    }

    function checkIndex() {
        items.classList.remove('shifting')

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + 'px'
            index = slidesLength - 1
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + 'px'
            index = 0
        }

        allowShift = true
    }
}
