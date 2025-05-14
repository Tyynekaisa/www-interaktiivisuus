import { Point } from "./Point.js"

class Rectangle {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    get area() {
        return this.width * this.height;
    }

    move(x, y) {
        this.left += x;
        this.top += y;
    }
    overlap(rect) {
        const L1 = new Point(this.left, this.top);
        const R1 = new Point(this.left + this.width, this.top + this.height);

        const L2 = new Point(rect.left, rect.top);
        const R2 = new Point(rect.left + rect.width , rect.top + rect.height);

        if ((L2.x > R1.x) || (L1.x > R2.x)) {
            return false;
        } else if ((L2.y > R1.y) || (L1.y > R2.y)) {
            return false;
        } else {
            return true;
        }
    }
}

export { Rectangle };