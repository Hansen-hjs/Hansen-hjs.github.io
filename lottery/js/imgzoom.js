class ImgZoom {
    constructor(_params) {
        this.pack = document.querySelector(_params.pack);
        this.packImg = document.querySelector(_params.zoomImg);
        this.support = {
            transform3d: ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
            touch: ('ontouchstart' in window)
        };
    }
    getTranslate(_x, _y) {
        return this.support.transform3d ? 'translate3d(' + _x + 'px, ' + _y + 'px, 0)' : 'translate(' + _x + 'px, ' + _y + 'px)';
    }
    getPage(ev, page) {
        return this.support.touch ? ev.changedTouches[0][page] : ev[page];
    }
    init (_url) {
        this.packImg.innerHTML = ' ';
        this.zoomImg = document.createElement('img');
        this.zoomImg.src = _url;
        this.packImg.appendChild(this.zoomImg);
        this.zoomImg.onload = () => {
            this.zoomImg.style.marginTop = -(this.zoomImg.offsetHeight / 2) + 'px';
            this._touch();
        }
    }
    _touch () {
        this.buffMove = 3;      
        this.buffScale = 2;
        this.finger = false;
        this.distX = 0;
        this.distY = 0;
        this.newX = 0;
        this.newY = 0;
        this.imgBaseWidth = this.zoomImg.offsetWidth;
        this.imgBaseHeight = this.zoomImg.offsetHeight;
        this.wrapX = this.pack.offsetWidth || 0;
        this.wrapY = this.pack.offsetHeight || 0;
        this.mapX = this.zoomImg.width || 0;
        this.mapY = this.zoomImg.height || 0;
        this.zoomImg.addEventListener('touchstart',e => this._touchstart(e));
        this.zoomImg.addEventListener('touchmove',e => this._touchmove(e));
        this.zoomImg.addEventListener('touchend',e => this._touchend(e));
    }
    // 更新地图信息
    _changeData () {
        this.mapX = this.zoomImg.offsetWidth;
        this.mapY = this.zoomImg.offsetHeight;
        this.width = this.mapX - this.wrapX;
        this.height = this.mapY - this.wrapY;
    }
    _touchstart (e) {
        e.preventDefault();
        let touchTarget = e.targetTouches.length;
        this._changeData();
        if (touchTarget === 1) {
            this.basePageX = this.getPage(e, 'pageX');
            this.basePageY = this.getPage(e, 'pageY');
            this.finger = false;
        } else {
            this.finger = true;
            this.startFingerDist = this.getTouchDist(e).dist;
            this.startFingerX = this.getTouchDist(e).x;
            this.startFingerY = this.getTouchDist(e).y;
        }
    }
    _touchmove (e) {
        e.preventDefault();
        e.stopPropagation();
        let touchTarget = e.targetTouches.length;
        if (touchTarget === 1 && !this.finger) this._move(e);
        if (touchTarget >= 2) this._zoom(e);
    }
    _touchend (e) {
        this._changeData();
        if (this.finger) {
            this.distX = -this.imgNewX;
            this.distY = -this.imgNewY;
        }
        if (this.distX > 0) {
            this.newX = 0;
        } else if (this.distX <= 0 && this.distX >= -this.width) {
            this.newX = this.distX;
            this.newY = this.distY;
        } else if (this.distX < -this.width) {
            this.newX = -this.width;
        }
        this.reset();
    }
    getTouchDist (e) {
        let x1 = 0,
            y1 = 0,
            x2 = 0,
            y2 = 0,
            x3 = 0,
            y3 = 0,
            result = {};
        x1 = e.touches[0].pageX;
        x2 = e.touches[1].pageX;
        y1 = e.touches[0].pageY - document.body.scrollTop;
        y2 = e.touches[1].pageY - document.body.scrollTop;
        if (!x1 || !x2) return;
        if (x1 <= x2) {
            x3 = (x2 - x1) / 2 + x1;
        } else {
            x3 = (x1 - x2) / 2 + x2;
        }
        if (y1 <= y2) {
            y3 = (y2 - y1) / 2 + y1;
        } else {
            y3 = (y1 - y2) / 2 + y2;
        }
        result = {
            dist: Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))),
            x: Math.round(x3),
            y: Math.round(y3)
        };
        return result;
    }
    _move (e) {
        let pageX = this.getPage(e, 'pageX'), pageY = this.getPage(e, 'pageY');
        this.distX = (pageX - this.basePageX) + this.newX;
        this.distY = (pageY - this.basePageY) + this.newY;
        if (this.distX > 0) {
            this.moveX = Math.round(this.distX / this.buffMove);
        } else if (this.distX <= 0 && this.distX >= -this.width) {
            this.moveX = this.distX;
        } else if (this.distX < -this.width) {
            this.moveX = -this.width + Math.round((this.distX + this.width) / this.buffMove);
        }
        this.movePos();
        this.finger = false;
    }
    _zoom (e) {
        let nowFingerDist = this.getTouchDist(e).dist,
            ratio = nowFingerDist / this.startFingerDist,
            imgWidth = Math.round(this.mapX * ratio),
            imgHeight = Math.round(this.mapY * ratio);
        // 计算图片新的坐标
        this.imgNewX = Math.round(this.startFingerX * ratio - this.startFingerX - this.newX * ratio);
        this.imgNewY = Math.round((this.startFingerY * ratio - this.startFingerY) / 2 - this.newY * ratio);
        if (imgWidth >= this.imgBaseWidth) {
            this.zoomImg.style.width = imgWidth + 'px';
            this.refresh(-this.imgNewX, -this.imgNewY, '0s', 'ease');
            this.finger = true;
        } else {
            if (imgWidth < this.imgBaseWidth) {
                this.zoomImg.style.width = this.imgBaseWidth + 'px';
            }
        }
        this.finger = true;
    }
    movePos () {
        if (this.height < 0) {
            if (this.zoomImg.offsetWidth == this.imgBaseWidth) {
                this.moveY = Math.round(this.distY / this.buffMove);
            } else {
                var moveTop = Math.round((this.zoomImg.offsetHeight - this.imgBaseHeight) / 2);
                this.moveY = -moveTop + Math.round((this.distY + moveTop) / this.buffMove);
            }
        } else {
            var a = Math.round((this.wrapY - this.imgBaseHeight) / 2),
                b = this.zoomImg.offsetHeight - this.wrapY + Math.round(this.wrapY - this.imgBaseHeight) / 2;

            if (this.distY >= -a) {
                this.moveY = Math.round((this.distY + a) / this.buffMove) - a;
            } else if (this.distY <= -b) {
                this.moveY = Math.round((this.distY + b) / this.buffMove) - b;
            } else {
                this.moveY = this.distY;
            }
        }
        this.refresh(this.moveX, this.moveY, '0s', 'ease');
    }
    reset () {
        if (this.height < 0) {
            this.newY = -Math.round(this.zoomImg.offsetHeight - this.imgBaseHeight) / 2;
        } else {
            let a = Math.round((this.wrapY - this.imgBaseHeight) / 2),
                b = this.zoomImg.offsetHeight - this.wrapY + Math.round(this.wrapY - this.imgBaseHeight) / 2;
            if (this.distY >= -a) {
                this.newY = -a;
            } else if (this.distY <= -b) {
                this.newY = -b;
            } else {
                this.newY = this.distY;
            }
        }
        this.refresh(this.newX, this.newY, '0.2s', 'ease-in-out');
    }
    refresh (x, y, timer, type) {
        this.zoomImg.style.webkitTransitionProperty = '-webkit-transform';
        this.zoomImg.style.webkitTransitionDuration = timer;
        this.zoomImg.style.webkitTransitionTimingFunction = type;
        this.zoomImg.style.webkitTransform = this.getTranslate(x, y);
    }
}
