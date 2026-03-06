export class ScrollAnimations {

    static init() {
        this.revealUp();
        this.revealDown();
        this.revealLeft();
        this.revealRight();
        this.fadeIn();
        this.zoomIn();
        this.rise(); // новый эффект
    }

    static revealUp() {
        gsap.utils.toArray(".gsap-up").forEach(el => {
            const offset = el.dataset.offset || 100;

            gsap.from(el, {
                y: 100,
                opacity: 0,
                duration: 2.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },

            });
        });
    }

    static revealDown() {
        gsap.utils.toArray(".gsap-down").forEach(el => {
            const offset = el.dataset.offset || 100;
            const delay = parseFloat(el.dataset.delay) || 0;

            gsap.from(el, {
                y: -100,
                opacity: 0,
                duration: 1.6,
                ease: "power4.out",
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },

            });
        });
    }

    static revealLeft() {
        gsap.utils.toArray(".gsap-left").forEach(el => {
            const offset = el.dataset.offset || 100;

            gsap.from(el, {
                x: -100,
                opacity: 0,
                duration: 2.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },

            });
        });
    }

    static revealRight() {
        gsap.utils.toArray(".gsap-right").forEach(el => {
            const offset = el.dataset.offset || 100;

            gsap.from(el, {
                x: 100,
                opacity: 0,
                duration: 2.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },

            });
        });
    }

    static fadeIn() {
        gsap.utils.toArray(".gsap-fadein").forEach(el => {
            const offset = el.dataset.offset || 100;

            gsap.from(el, {
                opacity: 0,
                duration: 2.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },

            });
        });
    }

    static zoomIn() {
        gsap.utils.toArray(".gsap-zoomin").forEach(el => {
            const offset = el.dataset.offset || 100;

            gsap.from(el, {
                scale: 0.85,
                opacity: 0,
                duration: 2.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },
            });
        });
    }

    static rise() {
        gsap.utils.toArray(".gsap-rise").forEach(el => {
            const offset = el.dataset.offset || 100;

            gsap.from(el, {
                y: 90,
                opacity: 0,
                duration: 2.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: `top bottom-=${offset}`,
                    toggleActions: "play none none none"
                },

            });
        });
    }
}