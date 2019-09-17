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
    
    /** 底部节点 */
    const footerNode = doc.querySelector('.footer');
    /**
     * 全选节点
     * @type {HTMLInputElement}
     */ 
    const selectAllNode = footerNode.querySelector('[name="select"]');
    /** 列表节点 */
    const listNode = doc.querySelector('.content .list');

    /** 初始化获取列表 */
    function fetchList() {
        const list = localStorage.getItem('todolist') || '';
        listNode.innerHTML = list;
        checkState();
    }

    /** 保存列表数据 */
    function saveList() {
        const html = listNode.innerHTML.replace(/>\s+</g, '><').trim();
        // console.log(html);
        localStorage.setItem('todolist', html);
    }

    /** 检测是否全选 */
    function checkState() {
        const inputs = listNode.querySelectorAll('[name="select"]');
        const selected = listNode.querySelectorAll('[checked]');

        if (inputs.length > 0 && inputs.length == selected.length) {
            selectAllNode.checked = true; 
        } else {
            selectAllNode.checked = false; 
        }
    }

    // 添加输入事件
    doc.querySelector('.input').addEventListener('keypress', function(e) {
        if (e.keyCode != 13) return;
        const value = e.target.value.trim();
        if (!value) return alert('输入的内容不能为空');
        const item = `
        <div class="card flex fvertical item">
            <p class="f1">${value}</p>
            <input name="select" type="checkbox">
        </div>`;
        // console.log(item.replace(/[\r\n]/g, ''));
        listNode.insertAdjacentHTML('beforeend', item.replace(/\r|\n/g, ''));
        e.target.value = null;
        checkState();
        saveList();
    });

    // 右上角按钮切换事件
    doc.querySelector('.icon-menu').addEventListener('click', function() {
        footerNode.classList.toggle('hide');
        this.classList.toggle('icon-close');
    });

    // 添加列表选择框点击事件
    listNode.addEventListener('click', function(e) {
        /**
         * @type {HTMLInputElement}
         */
        const input = e.target;
        if (input.name != 'select') return;
        if (input.checked) {
            input.setAttribute('checked', '');
        } else {
            input.removeAttribute('checked');
        }
        checkState();
        saveList();
    });

    // 全选事件
    footerNode.querySelector('[name="select"]').addEventListener('click', function() {
        /**
         * @type {NodeListOf<HTMLInputElement>}
         */
        const inputs = listNode.querySelectorAll('[name="select"]');
        if (inputs.length == 0) return alert('没有可选的列表');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].checked = this.checked;
        }
        saveList();
    });

    // 删除事件
    footerNode.querySelector('.icon-delete').addEventListener('click', function() {
        /**
         * @type {NodeListOf<HTMLInputElement>}
         */
        const selected = listNode.querySelectorAll('[checked]');
        if (selected.length == 0) return alert('没有可删除的列表');
        for (let i = selected.length - 1; i >= 0; i--) {
            listNode.removeChild(selected[i].parentNode);
        }
        checkState();
        saveList();
    });

    fetchList();
})();