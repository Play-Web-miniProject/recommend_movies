'use strict';

class Carousel1 {
    constructor(el) {
        this.el = el;
        this.carouselOptions = ['previous', 'next'];
        this.carouselData = [
            {
                'id': '1',
                'src': '../Image/ott/나는 신이다.png',
            },
            {
                'id': '2',
                'src': '../Image/ott/날씨의아이.png',
            },
            {
                'id': '3',
                'src': '../Image/ott/너의이름은.png',
            },
            {
                'id': '4',
                'src': '../Image/ott/더글로리.png',
            },
            {
                'id': '5',
                'src': '../Image/ott/더글로리파트2.png',
            },
            {
                'id': '6',
                'src': '../Image/ott/모범택시2.png',
            },
            {
                'id': '7',
                'src': '../Image/ott/신성한이혼.png',
            },
            {
                'id': '8',
                'src': '../Image/ott/압꾸정.png',
            },
            {
                'id': '9',
                'src': '../Image/ott/판도라조작된낙원.png',
            },
            {
                'id': '10',
                'src': '../Image/ott/헤리미예채파.png',
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
        container.className = 'carousel1-container';
        controls.className = 'carousel1-controls';

        // Take dataset array and append items to container
        this.carouselData.forEach((item, index) => {
            const carouselItem = item.src ? document.createElement('img') : document.createElement('div');

            container.append(carouselItem);

            // Add item attributes
            carouselItem.className = `carousel1-item carousel1-item-${index + 1}`;
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
            btn.className = `carousel1-control carousel1-control-${option}`;
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
            this.carouselContainer.children[index].className = `carousel1-item carousel1-item-${item}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 6).forEach((data, index) => {
            document.querySelector(`.carousel1-item-${index + 1}`).src = data.src;
        });
    }

    next() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.push(this.carouselData.shift());

        // Take the last item and add it to the beginning of the array so that the next item is front and center
        this.carouselInView.unshift(this.carouselInView.pop());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel1-item carousel1-item-${item}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 6).forEach((data, index) => {
            document.querySelector(`.carousel1-item-${index + 1}`).src = data.src;
        });
    }
}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el1 = document.querySelector('.carousel1');
// Create a new carousel object
const exampleCarousel1 = new Carousel1(el1);
// Setup carousel and methods
exampleCarousel1.mounted();
