const projects = [
    {
        title: "Wicked",
        date: "March 7, 2022",
        image: "Projects/Wicked/Home Screenshot.png",
        imageAlt: "Wicked Home Page",
        githubUrl: "https://github.com/franciscoxcode/wicked",
        liveUrl: "https://franciscoxcode.github.io/wicked/",
        description:
            "Website for a cake shop where you can customize your order by choosing your prefered bread, layering and toppings.",
        tags: "#html5 #css3 #javascript"
    }
];

function buildProjectCard(project, assetPrefix) {
    return `
        <section class="singleProject">
            <img class="projectImgs" src="${assetPrefix}${project.image}" alt="${project.imageAlt}">
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

function renderProjects(containerId, assetPrefix) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = projects
        .map((project) => buildProjectCard(project, assetPrefix))
        .join("");
}
