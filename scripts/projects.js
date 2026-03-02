const projects = [
    {
        title: "Tasky Crush",
        date: "December 15, 2025",
        images: [
            {
                src: "Projects/Tasky Crush/tasky01.png",
                alt: "Tasky Crush Home Page"
            },
            {
                src: "Projects/Tasky Crush/tasky02.png",
                alt: "Tasky Crush Add Task"
            },
            {
                src: "Projects/Tasky Crush/tasky03.png",
                alt: "Tasky Crush Edit Task"
            }
        ],
        githubUrl: "https://github.com/franciscoxcode/TaskyCrush",
        appStoreUrl: "",
        description:
            "Tasky Crush is a SwiftUI productivity companion that organizes your to-dos into project “stories” and day filters while handing out shiny coin points whenever you clear a task.",
        tags: "#swift #swiftui #ios"
    },
    {
        title: "Wicked",
        date: "March 7, 2024",
        images: [
            {
                src: "Projects/Wicked/wicked01.png",
                alt: "Wicked Home Page"
            },
            {
                src: "Projects/Wicked/wicked02.png",
                alt: "Make your cake"
            },
            {
                src: "Projects/Wicked/wicked03.png",
                alt: "Pay your cake"
            }
        ],
        githubUrl: "https://github.com/franciscoxcode/wicked",
        liveUrl: "https://franciscoxcode.github.io/wicked/",
        description:
            "Website for a cake shop where you can customize your order by choosing your prefered bread, layering and toppings.",
        tags: "#html5 #css3 #javascript"
    }
];

function buildProjectActions(project, assetPrefix) {
    const links = [
        {
            url: project.githubUrl,
            icon: "github.png",
            label: "GitHub Repository"
        },
        {
            url: project.liveUrl,
            icon: "eye.png",
            label: "Live Site"
        },
        {
            url: project.appStoreUrl,
            icon: "link.png",
            label: "App Store"
        },
        {
            url: project.videoUrl,
            icon: "eye.png",
            label: "Demo Video"
        },
        {
            url: project.caseStudyUrl,
            icon: "link.png",
            label: "Case Study"
        }
    ].filter((link) => Boolean(link.url));

    return links
        .map(
            (link) => `
                <li>
                    <a href="${link.url}" target="_blank" rel="noreferrer">
                        <img src="${assetPrefix}Icons/${link.icon}" alt="${link.label}">
                    </a>
                </li>
            `
        )
        .join("");
}

function getPrimaryProjectUrl(project) {
    return (
        project.liveUrl ||
        project.appStoreUrl ||
        project.videoUrl ||
        project.caseStudyUrl ||
        project.githubUrl ||
        ""
    );
}

function buildProjectCarousel(project, assetPrefix, projectIndex) {
    const images = project.images || [];

    if (images.length === 0) {
        return "";
    }

    return `
        <div class="projectCarousel" data-carousel>
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
    const projectActions = buildProjectActions(project, assetPrefix);
    const primaryUrl = getPrimaryProjectUrl(project);
    const descriptionTagOpen = primaryUrl
        ? `<a class="color1" target="_blank" rel="noreferrer" href="${primaryUrl}">`
        : `<div class="color1">`;
    const descriptionTagClose = primaryUrl ? "</a>" : "</div>";

    return `
        <section class="singleProject">
            ${buildProjectCarousel(project, assetPrefix, projects.indexOf(project))}
            <section class="projectLinks">
                <time>${project.date}</time>
                <nav>
                    <ul class="projectIcons">${projectActions}</ul>
                </nav>
            </section>
            <section class="projectDescription">
                ${descriptionTagOpen}
                    <h2 class="color3">${project.title}</h2>
                    <p>${project.description}</p>
                    <span>${project.tags}</span>
                ${descriptionTagClose}
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
    });
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
