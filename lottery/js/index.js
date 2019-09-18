(function () {
    const doc = document;
    
    /**
     * rem 适配
     * @param {HTMLElement} el 指定元素适配
     */
    function remSetting(el) {
        const html = doc.documentElement;
        let value = 375 / 50;
        let width = el.getBoundingClientRect().width;
        html.style.fontSize = width / value + 'px';
        window.addEventListener('resize', function () {
            width = el.getBoundingClientRect().width;
            html.style.fontSize = width / value + 'px';
        });
    }
    
    remSetting(doc.querySelector('.page'));

    /**
     * 水波纹节点对象池
     * @type {Array<HTMLElement>}
     */
    const RIPPLE_POOL = [];

    /**
     * 点击水波纹
     * @param {Event} event 点击事件
     * @param {HTMLElement} target 点击目标
     */
    function ripple(event, target) {
        /**
         * 水波纹动画节点
         * @type {HTMLElement}
         */
        let node = null;

        // 从对象池里面拿取节点
        if (RIPPLE_POOL.length > 1) {
            node = RIPPLE_POOL.shift();
        } else {
            node = doc.createElement('div');
            node.className = 'ripple';
        }

        /** 点击目标矩阵尺寸 */
        let rect = target.getBoundingClientRect();
        /** 当前自定义颜色值 */
        let color = target.getAttribute('color');
        /** 波纹大小 */
        let size = Math.max(rect.width, rect.height);
        // 设置最大范围
        if (size > 200) size = 200;
        // 设置大小
        node.style.height = node.style.width = size + 'px';
        // 默认是白色透明
        node.style.backgroundColor = color || 'rgba(255, 255, 255, .45)';
        // 这里必须输出节点后再设置位置，不然会有问题
        target.appendChild(node);

        let y = event.touches ? event.touches[0].clientY : event.clientY;
        let x = event.touches ? event.touches[0].clientX : event.clientX;
        let top = y - rect.top - (node.offsetHeight / 2);
        let left = x - rect.left - (node.offsetWidth / 2);
        // console.log(top, left);
        node.style.top = top + 'px';
        node.style.left = left + 'px';

        function an() {
            node.removeEventListener('animationend', an);
            // console.log('动画结束', node);
            target.removeChild(node);
            RIPPLE_POOL.push(node);
        }
        node.addEventListener('animationend', an);
    }

    const pattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i;
     
    /** 是否移动端 */
    const isMobile = pattern.test(navigator.userAgent); 

    /** 添加事件类型 */
    const eventType = isMobile ? 'touchstart' : 'mousedown';

    doc.body.addEventListener(eventType, function (e) {
        /** 事件类型 */
        const event = e || window.event || arguments.callee.caller.arguments[0];
        /** 循环的次数 */
        let loop_count = 3; 
        /** 
         * 定义目标变量 
         * @type {HTMLElement} 
         */
        let target = event.target;
        // 循环 3 次由里向外查找目标节点
        while (loop_count > 0 && target && target != doc.body) {
            loop_count--;
            if (target.hasAttribute('ripple')) {
                ripple(event, target);
                break;
            }
            target = target.parentNode;
        }
    });

    /**
     * 生成范围数组
     * @param {number} end 
     */
    function range(end) {
        return Array.from({ length: end }, (item, index) => index + 1);
    }

    const ssq = {
        red: range(33),
        blue: range(16)
    }

    const dlt = {
        red: range(35),
        blue: range(12)
    }

    const ten = range(20);

    /**
     * 数组中随机取几个元素
     * @param {Array<number>} array 数组
     * @param {number} count 元素个数
     */
    function getRandomArrayElements(array, count) {
        let length = array.length;
        let min = length - count;
        let index = 0;
        let value = '';
        while (length-- > min) {
            index = Math.floor((length + 1) * Math.random());
            value = array[index];
            array[index] = array[length];
            array[length] = value;
        }
        return array.slice(min);
    }

    /**
     * 获取球列表
     * @param {number} type 类型
     */
    function getBall(type) {
        /**
         * @type {Array<number>}
         */
        let balls = [];
        switch (type) {
            case 0:
                balls = [...getRandomArrayElements(ssq.red, 6), ...getRandomArrayElements(ssq.blue, 1)];
                break;
        
            case 1:
                balls = [...getRandomArrayElements(dlt.red, 5), ...getRandomArrayElements(dlt.blue, 2)];
                break;

            case 2:
                balls = getRandomArrayElements(ten, 8);
                break;
        }
        return balls;
    }

    /**
     * 按钮点击
     * @param {HTMLElement} el 按钮
     * @param {number} type 类型
     */
    function onClick(el, type) {
        const listNode = el.parentNode.querySelector('.ball-list');
        // 防止重复点击
        if (el['isClick']) return;
        el['isClick'] = true;
        // 防止抖动设置固定高度
        listNode.style.height = listNode.clientHeight + 'px';
        /**
         * @type {Array<HTMLElement>}
         */
        const nodes = [...listNode.children];
        const balls = getBall(type);
        nodes.forEach((item, index) => {
            item.style.display = 'none';
            item.textContent = balls[index];
        });
        setTimeout(() => {
            nodes.forEach(item => {
                item.removeAttribute('style');
            });
            listNode.removeAttribute('style');
            el['isClick'] = false;
        }, 100);
    }

    const ballBtns = doc.querySelectorAll('[ball]');
    
    for (let i = 0; i < ballBtns.length; i++) {
        const btn = ballBtns[i];
        const type = btn.getAttribute('ball');
        btn.addEventListener('click', () => {
            onClick(btn, Number(type));
        });
    }
})();