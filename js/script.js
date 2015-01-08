var canvas=document.getElementById('canvas'),
    ctx=canvas.getContext('2d'),
    mouse= {x:50,y:50},
    particles=[];

    //mouse Event
window.onmousemove=function(e){
    mouse.x=e.clientX;
    mouse.y=e.clientY;
};

//Create les particules avec des objets
function create(){
    var particle={
        x:mouse.x,
        y:mouse.y,
        r:Math.ceil(Math.random()*10),
        c: 'hsl('+Math.random()*360+',100%,50%)',
        speed:{
            x:Math.random()*10-2,
            y:Math.random()*10-2
/*le -2 c'est pour qu'il y ait du négatif
et que les cercles aillent dans tous les sens*/
        }
    };
    particles.push(particle);

}

//Update la position
function update(){
    for(var i=0; i<particles.length;i++){
        var particle=particles[i];
        particle.x += particle.speed.x;
        particle.y += particle.speed.y;

        if(particle.x<0 +particle.r || particle.x > canvas.width - particle.r)
            particle.speed.x *=-1;
        if(particle.y<0 +particle.r || particle.y > canvas.width - particle.r)
            particle.speed.y *=-1;
    }
}

//Draw
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i=0; i<particles.length;i++){
        var particle=particles[i];
        //le nom importe peu
        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.r,
            0,
            Math.PI*2
        );
        ctx.fillStyle=particle.c;
        ctx.fill();
    }
}


function loop(){
    window.requestAnimationFrame(loop);
    create();
    update();
    draw();
}
loop();