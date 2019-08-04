class Light {

    nextDirection = 'right';
    radius = 10;
    index = 0;

    constructor(color) {
        this.element = document.createElement('div');
        this.element.setAttribute('style', `background: ${color}`);
        this.element.classList.add('light');
    }

    /**
     * The number of lights by which the axis should be offset
     * so that the coordinates X:1, Y:0 are in the upper left corner of the rectangle
     */
    get circleOffset() {
        return Math.round((this.parrent.lightsNumber / 4)
            + ((this.parrent.width) / 2 * (this.parrent.lightsNumber / 4))
            / (this.parrent.height / 2 + this.parrent.width / 2));
    }

    mount(parent) {
        this.parrent = parent;
        this.element.style.top = '0px';
        this.element.style.left = '0px';
        this.setIndex(0);
        parent.element.appendChild(this.element);
        return this;
    }

    setIndex(index) {
        this.index = index % 60;
        return this;
    }

    move(steps = 1) {
        if (steps <= 0) {
            return this;
        }
        const left = parseInt(this.element.style.left);
        const top = parseInt(this.element.style.top);
        if (this.nextDirection === 'right') {
            if (left + this.radius * 4 + this.parrent.lightDistance <= this.parrent.width) {
                this.element.style.left = left + this.radius * 4 + 'px';
            } else {
                this.nextDirection = 'down';
                return this.move(steps);
            }
        } else if (this.nextDirection === 'down') {
            if (top + this.radius * 4 + this.parrent.lightDistance <= this.parrent.height) {
                this.element.style.top = top + this.radius * 4 + 'px';
            } else {
                this.nextDirection = 'left';
                return this.move(steps);
            }
        } else if (this.nextDirection === 'left') {
            if (left - this.radius * 4 >= 0) {
                this.element.style.left = left - this.radius * 4 + 'px';
            } else {
                this.nextDirection = 'up';
                return this.move(steps);
            }
        } else if (this.nextDirection === 'up') {
            if (top - this.radius * 4 >= 0) {
                this.element.style.top = top - this.radius * 4 + 'px';
            } else {
                this.nextDirection = 'right';
                return this.move(steps);
            }
        }
        this.setIndex(this.index + 1);
        return this.move(steps - 1);
    }

    moveRound(steps = 1) {
        this.setIndex(this.index + steps);
        this.element.style.top = this.parrent.radius
            * Math.sin(2 * Math.PI / this.parrent.lightsNumber * (this.index - this.circleOffset))
            + this.parrent.height / 2 - this.radius + 'px';
        this.element.style.left = this.parrent.radius
            * Math.cos(2 * Math.PI / this.parrent.lightsNumber * (this.index - this.circleOffset))
            + this.parrent.width / 2 - this.radius + 'px';
    }

    reset(index = this.index) {
        this.element.style.top = '0px';
        this.element.style.left = '0px';
        this.setIndex(0);
        this.nextDirection = 'right';
        this.move(index);
    }
}