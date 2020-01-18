const canvas = document.getElementById('tvCanvas');
const evilPic = document.getElementById('evilFace');
const evilCirl = document.getElementById('evilCirl');
ctx = canvas.getContext('2d');



let tvFuzz = 0;
document.getElementById('tvWrapper').addEventListener('click', function(e){
    tvFuzz = 1;

});

function putImageData(ctx, imageData, dx, dy,
                      dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
    var data = imageData.data;
    var height = imageData.height;
    var width = imageData.width;
    dirtyX = dirtyX || 0;
    dirtyY = dirtyY || 0;
    dirtyWidth = dirtyWidth !== undefined? dirtyWidth: width;
    dirtyHeight = dirtyHeight !== undefined? dirtyHeight: height;
    var limitBottom = dirtyY + dirtyHeight;
    var limitRight = dirtyX + dirtyWidth;
    for (var y = dirtyY; y < limitBottom; y++) {
        for (var x = dirtyX; x < limitRight; x++) {
            let pos = y * width + x;
            ctx.fillStyle = 'rgba(' + data[pos*4] + ',' + data[pos*4] + ',' + data[pos*4] + ',' + (data[pos*4+3]/255) + ')';

            ctx.fillRect(x + dx, y + dy, 1, 1);
        }
    }
}


(function loop() {
    if (tvFuzz === 0) {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;

        let imageData = ctx.createImageData(width, height);
        let buffer32 = new Uint32Array(imageData.data.buffer);

        for(let i = 0; i < buffer32.length;) {
            buffer32[i++] = ((255 * Math.random())|0) << 24;
        }
        ctx.putImageData(imageData, 0, 0);

    }
    let speed = Math.PI/2;
    if (tvFuzz === 1) {
        let step = 1;
        ctx.drawImage(evilCirl, 0, 0);
        ctx.drawImage(evilCirl, 150, 0);
        setInterval(function () {
            speed += Math.PI/2;
            ctx.fillStyle = 'rgba(233,33,32,0.4)';
            ctx.fillRect(speed, 15*Math.sin(speed), 100, 100);
            var imagedata = ctx.getImageData(0, 0, 100, 100);
            putImageData(ctx, imagedata, 150, 0, 50, 50, 25, 25);
            setInterval(function(){
                ctx.clearRect(0, 0, 100000, 10000);
                var gradient = ctx.createRadialGradient(105, 105-40, 20+60, 105, 120-55, 50+60);
                gradient.addColorStop(0, 'rgb(255,172,137)');
                gradient.addColorStop(0.13, 'rgb(82,0,23)');
                gradient.addColorStop(0.3, 'rgba(0,0,0,1.0)');
                gradient.addColorStop(0.75, 'rgb(36,32,74)');
                gradient.addColorStop(1, 'rgb(75,79,118)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1000, 1000);
                ctx.drawImage(evilPic, 33, 71, 104, 124, 50+speed, 20, 87, 104);
                ctx.globalAlpha = 0.50;
            }, 100);
        }, 10);
        setTimeout(function(){
            tvFuzz = 0;
        }, 1000)
    }
    requestAnimationFrame(loop);
})();


