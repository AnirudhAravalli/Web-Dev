// gsap.from('.header', { duration: 1, y: '-100%', ease: 'bounce'})

// gsap.from('.link', { duration: 1, opacity: 0, delay: 0.5, stagger: 0.25})

// gsap.from('.right', {duration: 1, x: '-100vw', ease: 'bounce', delay: 1 })

// gsap.from('.left', {duration: 1, delay: 1, x: '100vw', ease: 'bounce'})

// gsap.from('.footer', {duration: 1, y: '-100vh', ease: 'elastic', delay: 1.5})


// gsap.from('.header', { duration: 1, y: '-100%', ease: 'bounce'})

// gsap.from('.link', { duration: 1, opacity: 0, delay: 0.5, stagger: 0.25})

// gsap.from('.right', {duration: 1, x: '-100vw', ease: 'bounce', delay: 1 })

// gsap.from('.left', {duration: 1, delay: 1, x: '100vw', ease: 'bounce'})

// gsap.from('.footer', {duration: 1, y: '-100vh', ease: 'elastic', delay: 1.5})


const timeline = gsap.timeline({defaults: { duration: 0.7 }})
timeline
    .from('.header', { y: '-100%', ease: 'bounce' })
    .from('.link', { opacity: 0, stagger: 0.25})
    .from('.right', { x: '-100vw', ease: 'expo.inOut' }, 0.5)
    .from('.left', { x: '100vw', ease: 'expo.inOut'}, '<')
    .from('.footer', { y: '-100vh', ease: 'elastic'})
    .fromTo('button', { opacity: 0, scale: 0, rotation: 720}, { opacity: 1, scale: 5, rotation: 0 }, '<')

    $(".button").on('click', () => {
        // gsap.to("div", {
        //     opacity: 0,
        //     duration: 1,
        // });
        // timeline.timeStamp(2);
        timeline.reverse();
    });

