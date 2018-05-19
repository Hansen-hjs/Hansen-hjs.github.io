function rippleClick(el) {
    let canvas = {},
        context = {},
        centerX = 0,
        centerY = 0,
        radius = 0,
        scale = 8,
        color = el.dataset.color || '#999999',
        myAinmFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    canvas = document.createElement('canvas');
    el.appendChild(canvas);
    canvas.style.width = canvas.style.height ='100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context = canvas.getContext('2d');
    centerX = event.offsetX;
    centerY = event.offsetY;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (canvas.offsetWidth <= 60) scale = 3;
    console.log(canvas.offsetWidth);
    function draw() {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
        context.fillStyle = color;
        context.fill();
        radius += scale;
        if (radius < canvas.width) {
            myAinmFrame(draw);
        }else if (radius >= canvas.width) {
            canvas.style.opacity = '0';
            setTimeout(() => {
                el.removeChild(canvas);
            },200);
        }
    }
    draw();
}
