class Garland {
    radius = 300;
    lightDistance = 20;
    animationDuration = 300;
    changingDuration = 200;
    colors = ['red', 'blue', 'yellow', 'green'];
    lightsNumber = 60;
    direction = 'rectangle';

    element;
    lights;
    interval;

    constructor(element) {
        this.element = element;
        this.height = this.element.offsetHeight;
        this.width = this.element.offsetWidth;
    }

    initLights() {
        this.lights = new Array(this.lightsNumber).fill(null).map((e, i) => new Light(this.colors[i % this.colors.length])
            .mount(this)
            .move(i)
        );
        return this;
    }

    start() {
        if (this.direction === 'rectangle') {
            this.interval = setInterval(() => this.lights.forEach(p => p.move()), this.changingDuration);
        } else if (this.direction === 'circle') {
            this.interval = setInterval(() => this.lights.forEach(p => p.moveRound()), this.changingDuration);
        }
        return this;
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    async onChangeWay() {
        if (this.element.classList.contains('animated')) {
            return;
        }
        this.stop();
        await this.setDirection(this.direction === 'rectangle' ? 'circle' : 'rectangle');
        this.start();
    }

    setDirection(direction) {
        return new Promise(resolve => {
            const callbacks = {
                circle: light => light.moveRound(0),
                rectangle: light => light.reset(),
            };
            this.direction = direction;
            this.element.classList.add('animated');
            this.lights.forEach(callbacks[direction]);

            setTimeout(() => {
                this.element.classList.remove('animated');
                resolve();
            }, this.animationDuration);
        });
    }
}