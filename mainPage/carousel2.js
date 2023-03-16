'use strict';

class Carousel2 {
    constructor(el) {
        this.el = el;
        this.carouselOptions = ['previous', 'next'];
        this.carouselData = [
            {
                'id': '1',
                'src': '../Image/movie/귀멸의칼날.png',
            },
            {
                'id': '2',
                'src': '../Image/movie/대외비.png',
            },
            {
                'id': '3',
                'src': '../Image/movie/더퍼스트슬램덩크.png',
            },
            {
                'id': '4',
                'src': '../Image/movie/똑똑똑.png',
            },
            {
                'id': '5',
                'src': '../Image/movie/멍뭉이.png',
            },
            {
                'id': '6',
                'src': '../Image/movie/서치2.png',
            },
            {
                'id': '7',
                'src': '../Image/movie/스즈메의문단속.png',
            },
            {
                'id': '8',
                'src': '../Image/movie/아임히어로더파이널.png',
            },
            {
                'id': '9',
                'src': '../Image/movie/엔트맨과와스프퀀텀매니아.png',
            },
            {
                'id': '10',
                'src': '../Image/movie/카운트.png',
            }
        ];
        this.carouselInView = [1, 2, 3, 4, 5];
        this.carouselContainer;
        this.carouselPlayState;
    }

    mounted() {
        this.setupCarousel();
    }

    // Build carousel html
    setupCarousel() {
        const container = document.createElement('div');
        const controls = document.createElement('div');

        // Add container for carousel items and controls
        this.el.append(container, controls);
        container.className = 'carousel2-container';
        controls.className = 'carousel2-controls';

        // Take dataset array and append items to container
        this.carouselData.forEach((item, index) => {
            const carouselItem = item.src ? document.createElement('img') : document.createElement('div');

            container.append(carouselItem);

            // Add item attributes
            carouselItem.className = `carousel2-item carousel2-item-${index + 1}`;
            carouselItem.src = item.src;
            carouselItem.setAttribute('loading', 'lazy');
            // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
            carouselItem.setAttribute('data-index', `${index + 1}`);
        });

        this.carouselOptions.forEach((option) => {
            const btn = document.createElement('button');
            const axSpan = document.createElement('span');

            // Add accessibilty spans to button
            axSpan.innerText = option;
            axSpan.className = 'ax-hidden';
            btn.append(axSpan);

            // Add button attributes
            btn.className = `carousel2-control carousel2-control-${option}`;
            btn.setAttribute('data-name', option);

            // Add carousel control options
            controls.append(btn);
        });

        // After rendering carousel to our DOM, setup carousel controls' event listeners
        this.setControls([...controls.children]);

        // Set container property
        this.carouselContainer = container;


    }

    setControls(controls) {
        controls.forEach(control => {
            control.onclick = (event) => {
                event.preventDefault();

                // Manage control actions, update our carousel data first then with a callback update our DOM
                this.controlManager(control.dataset.name);
            };
        });
    }

    controlManager(control) {
        if (control === 'previous') return this.previous();
        if (control === 'next') return this.next();

        return;
    }

    previous() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.unshift(this.carouselData.pop());

        // Push the first item to the end of the array so that the previous item is front and center
        this.carouselInView.push(this.carouselInView.shift());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel2-item carousel2-item-${item}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 6).forEach((data, index) => {
            document.querySelector(`.carousel2-item-${index + 1}`).src = data.src;
        });
    }

    next() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.push(this.carouselData.shift());

        // Take the last item and add it to the beginning of the array so that the next item is front and center
        this.carouselInView.unshift(this.carouselInView.pop());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel2-item carousel2-item-${item}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 5).forEach((data, index) => {
            document.querySelector(`.carousel2-item-${index + 1}`).src = data.src;
        });
    }
}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el2 = document.querySelector('.carousel2');
// Create a new carousel object
const exampleCarousel2 = new Carousel2(el2);
// Setup carousel and methods
exampleCarousel2.mounted();
