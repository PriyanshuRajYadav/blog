const cards = gsap.utils.toArray(".hero_card");

gsap.set(cards, {
    opacity: 0,
    x: -250,
    y: 120,
    rotation: -20
});

const tl = gsap.timeline({
    repeat: -1
});

cards.forEach(card => {

    tl.to(card,{
        duration:1.2,
        opacity:1,
        x:0,
        y:0,
        rotation:0,
        ease:"power3.out"
    })

    .to(card,{
        duration:1.8
    })

    .to(card,{
        duration:1.2,
        opacity:0,
        x:250,
        y:-120,
        rotation:20,
        ease:"power3.in"
    });

});

