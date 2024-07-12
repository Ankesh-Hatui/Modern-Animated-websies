const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



function firstPageAnimation(){
    var el1=gsap.timeline();

    el1.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })

    .to(".boundingEl",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
    })

    .from("#hero-footer",{
        y:'-10',
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })


}
var timeout;
function skewMouse(){

    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(dets){
        this.clearTimeout(timeout);
        // Gsap utils from documentation clamp
        xscale=gsap.utils.clamp(.8,1.2,dets.clientX-xprev);
        yscale=gsap.utils.clamp(.8,1.2,dets.clientY-yprev);

        xprev=dets.clientX;
        yprev=dets.clientY;

        timeout=this.setTimeout(()=>{
            window.addEventListener("mousemove",function (dets){
                document.querySelector('#mini-circle').style.transform=
                `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1))`
            })
        },100)

        
        CircleFollowMouse(xscale,yscale);
    });
}

skewMouse();
function CircleFollowMouse(xscale,yscale){
    window.addEventListener("mousemove",function (dets){
        document.querySelector('#mini-circle').style.transform=
        `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
};

document.querySelectorAll(".el")
.forEach(function (el) {
    var roatate=0;
    var diffrotate=0;
    el.addEventListener("mouseleave",function(dets){
                
        gsap.to(el.querySelector("img"),{
            opacity: 0,
            ease:Power3
        })
    });
});

document.querySelectorAll(".el")
.forEach(function (el) {
    var roatate=0;
    var diffrotate=0;
    el.addEventListener("mousemove",function(dets){

        var diff=(dets.clientY-el.getBoundingClientRect().top);
        diffrotate=dets.clientX-roatate;
        roatate=dets.clientX;
        
        gsap.to(el.querySelector("img"),{
            opacity: 1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrotate),
        })
    });
});


CircleFollowMouse();
firstPageAnimation();