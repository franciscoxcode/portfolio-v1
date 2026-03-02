const projects = [
    {
        title: "Wicked",
        date: "March 7, 2022",
        images: [
            {
                src: "Projects/Wicked/Home Screenshot.png",
                alt: "Wicked Home Page"
            },
            {
                src: "Projects/Wicked/Home Screenshot.png",
                alt: "Wicked Home Page"
            },
            {
                src: "Projects/Wicked/Home Screenshot.png",
                alt: "Wicked Home Page"
            }
        ],
        githubUrl: "https://github.com/franciscoxcode/wicked",
        liveUrl: "https://franciscoxcode.github.io/wicked/",
        description:
            "Website for a cake shop where you can customize your order by choosing your prefered bread, layering and toppings.",
        tags: "#html5 #css3 #javascript"
    }
];

function buildProjectCarousel(project, assetPrefix, projectIndex) {
    const images = project.images || [];

    if (images.length === 0) {
        return "";
    }

    return `
        <div class="projectCarousel" data-carousel data-interval="3200">
            <div class="projectCarouselTrack">
                <button
                    class="projectCarouselArrow projectCarouselArrowLeft"
                    type="button"
                    aria-label="Previous image for ${project.title}"
                    data-prev
                >
                    <span aria-hidden="true">&#8249;</span>
                </button>
                ${images
                    .map(
                        (image, imageIndex) => `
                            <figure class="projectSlide${imageIndex === 0 ? " is-active" : ""}" data-slide>
                                <img
                                    class="projectImgs"
                                    src="${assetPrefix}${image.src}"
                                    alt="${image.alt}"
                                >
                            </figure>
                        `
                    )
                    .join("")}
                <button
                    class="projectCarouselArrow projectCarouselArrowRight"
                    type="button"
                    aria-label="Next image for ${project.title}"
                    data-next
                >
                    <span aria-hidden="true">&#8250;</span>
                </button>
            </div>
            <div class="projectCarouselDots" aria-label="${project.title} image gallery">
                ${images
                    .map(
                        (_, imageIndex) => `
                            <button
                                class="projectCarouselDot${imageIndex === 0 ? " is-active" : ""}"
                                type="button"
                                aria-label="Show image ${imageIndex + 1} for ${project.title}"
                                data-dot
                                data-index="${imageIndex}"
                                data-project="${projectIndex}"
                            ></button>
                        `
                    )
                    .join("")}
            </div>
        </div>
    `;
}

function buildProjectCard(project, assetPrefix) {
    return `
        <section class="singleProject">
            ${buildProjectCarousel(project, assetPrefix, projects.indexOf(project))}
            <section class="projectLinks">
                <time>${project.date}</time>
                <nav>
                    <ul class="projectIcons">
                        <li><a href="${project.githubUrl}" target="_blank" rel="noreferrer"><img src="${assetPrefix}Icons/github.png" alt="GitHub Repository"></a></li>
                        <li><a href="${project.liveUrl}" target="_blank" rel="noreferrer"><img src="${assetPrefix}Icons/eye.png" alt="Watch Live Site"></a></li>
                    </ul>
                </nav>
            </section>
            <section class="projectDescription">
                <a class="color1" target="_blank" rel="noreferrer" href="${project.liveUrl}">
                    <h2 class="color3">${project.title}</h2>
                    <p>${project.description}</p>
                    <span>${project.tags}</span>
                </a>
            </section>
        </section>
    `;
}

function showCarouselSlide(carousel, nextIndex) {
    const slides = carousel.querySelectorAll("[data-slide]");
    const dots = carousel.querySelectorAll("[data-dot]");

    slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === nextIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === nextIndex);
    });

    carousel.dataset.activeIndex = String(nextIndex);
}

function startCarousel(carousel) {
    const slides = carousel.querySelectorAll("[data-slide]");

    if (slides.length < 2 || carousel.dataset.timerId) {
        return;
    }

    const interval = Number(carousel.dataset.interval || 3200);
    const timerId = window.setInterval(() => {
        const currentIndex = Number(carousel.dataset.activeIndex || 0);
        const nextIndex = (currentIndex + 1) % slides.length;

        showCarouselSlide(carousel, nextIndex);
    }, interval);

    carousel.dataset.timerId = String(timerId);
}

function stopCarousel(carousel) {
    if (!carousel.dataset.timerId) {
        return;
    }

    window.clearInterval(Number(carousel.dataset.timerId));
    delete carousel.dataset.timerId;
}

function initCarousels(container) {
    const carousels = container.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {
        showCarouselSlide(carousel, 0);

        const slides = carousel.querySelectorAll("[data-slide]");

        carousel.querySelectorAll("[data-dot]").forEach((dot) => {
            dot.addEventListener("click", () => {
                showCarouselSlide(carousel, Number(dot.dataset.index));
            });
        });

        const prevButton = carousel.querySelector("[data-prev]");
        const nextButton = carousel.querySelector("[data-next]");

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                const currentIndex = Number(carousel.dataset.activeIndex || 0);
                const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
                showCarouselSlide(carousel, nextIndex);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                const currentIndex = Number(carousel.dataset.activeIndex || 0);
                const nextIndex = (currentIndex + 1) % slides.length;
                showCarouselSlide(carousel, nextIndex);
            });
        }

        carousel.addEventListener("mouseenter", () => stopCarousel(carousel));
        carousel.addEventListener("mouseleave", () => startCarousel(carousel));
    });

    if (!("IntersectionObserver" in window)) {
        carousels.forEach((carousel) => startCarousel(carousel));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCarousel(entry.target);
                } else {
                    stopCarousel(entry.target);
                }
            });
        },
        {
            threshold: 0.45
        }
    );

    carousels.forEach((carousel) => observer.observe(carousel));
}

function renderProjects(containerId, assetPrefix) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = projects
        .map((project) => buildProjectCard(project, assetPrefix))
        .join("");

    initCarousels(container);
}
