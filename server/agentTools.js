import { portfolioData } from "./portfolioData.js";

export function getAboutKartik() {
  return `Kartik Ganesh Jare is a ${portfolioData.role}.

    He works with:
    • C, C++, Java, Python
    • React and Spring Boot
    • Win32 API
    • Linux System Programming
    • Machine Learning basics`;
}

export function getSkills() {
  return `Kartik's main skills are:

${portfolioData.skills.map((skill) => `• ${skill}`).join("\n")}`;
}

export function getAllProjects() {
  return portfolioData.projects
    .map(
      (project, index) =>
        `${index + 1}. ${project.name}
        Tech: ${project.tech}
        ${project.description}
        GitHub: ${project.link}`
    )
    .join("\n\n");
}

export function getProjectsByType(type) {
  const projects = portfolioData.projects.filter((project) =>
    project.type.toLowerCase().includes(type.toLowerCase())
  );

  if (projects.length === 0) {
    return null;
  }

  return projects
    .map(
      (project, index) =>
        `${index + 1}. ${project.name}
        Tech: ${project.tech}
        ${project.description}
        GitHub: ${project.link}`
    )
    .join("\n\n");
}

export function getGitHubLink() {
  return `GitHub Profile:
  ${portfolioData.links.github}`;
}

export function getLinkedInLink() {
  return `LinkedIn Profile:
  ${portfolioData.links.linkedin}`;
}
export function getGitHubAndLinkedInLinks() {
  return `GitHub Profile:
  ${portfolioData.links.github}

  LinkedIn Profile:
  ${portfolioData.links.linkedin}`;
}

export function getPortfolioLink() {
  return `Portfolio Website:
  ${portfolioData.links.portfolio}`;
}

export function getEmailLink() {
  return `You can contact Kartik via email:

  ${portfolioData.links.email}`;
}

export function getContactInfo() {
  return `You can contact Kartik here:

    Email:
    ${portfolioData.links.email}

    GitHub:
    ${portfolioData.links.github}

    LinkedIn:
    ${portfolioData.links.linkedin}

    Portfolio:
    ${portfolioData.links.portfolio}`;
}

export function getRecruiterReply() {
  return `Hello, thanks for visiting Kartik's portfolio.

    Kartik specializes in:
    • Backend Development
    • Systems Programming
    • Java & Spring Boot
    • Win32 API
    • Linux System Programming
    • Python & Machine Learning

    Useful Links:

    GitHub:
    ${portfolioData.links.github}

    LinkedIn:
    ${portfolioData.links.linkedin}

    Email:
    ${portfolioData.links.email}

    Would you like to explore:
    • Java Projects
    • Backend Projects
    • Systems Programming Projects
    • Machine Learning Projects`;
}

export function getBestProjectsForRole(message) {
  const msg = message.toLowerCase();

  if (msg.includes("java") || msg.includes("spring")) {
    return `For Java/Spring Boot roles, Kartik's best projects are:

${getProjectsByType("java")}

Also recommended:

${getProjectsByType("backend")}`;
  }

  if (msg.includes("backend")) {
    return `For backend roles, Kartik's best project is:

${getProjectsByType("backend")}`;
  }

  if (
    msg.includes("system") ||
    msg.includes("linux") ||
    msg.includes("c language") ||
    msg.includes("socket")
  ) {
    return `For systems programming roles, Kartik's best projects are:

${getProjectsByType("systems")}`;
  }

  if (
    msg.includes("python") ||
    msg.includes("machine learning") ||
    msg.includes("ml")
  ) {
    return `For Python/ML roles, Kartik's best project is:

${getProjectsByType("python")}`;
  }

  if (msg.includes("win32") || msg.includes("windows")) {
    return `For Win32/Windows development roles, Kartik's best project is:

${getProjectsByType("windows")}`;
  }

  return null;
}

export function detectIntentAndRunTool(message) {
  const msg = message.toLowerCase();

  if (
    msg.includes("company") ||
    msg.includes("recruiter") ||
    msg.includes("hiring") ||
    msg.includes("hr") ||
    msg.includes("i am") ||
    msg.includes("i'm")
  ) {
    return getRecruiterReply();
  }
  if (
    msg.includes("github and linkedin") ||
    msg.includes("linkedin and github") ||
    msg.includes("share github and linkedin") ||
    msg.includes("github linkedin") ||
    msg.includes("github & linkedin") ||
    msg.includes("linkedin & github")
  ) {
  return getGitHubAndLinkedInLinks();
  }
    if (
        msg.includes("github") ||
        msg.includes("git hub") ||
        msg.includes("github link") ||
        msg.includes("share github")
    )
    {
        return getGitHubLink();
    }

    if (
        msg.includes("linkedin") ||
        msg.includes("linkedln") ||
        msg.includes("linked in") ||
        msg.includes("linkedin link")
    )
    {
        return getLinkedInLink();
    }

  if (msg.includes("portfolio") || msg.includes("website")) {
    return getPortfolioLink();
  }

    if (
        msg.includes("email") ||
        msg.includes("mail") ||
        msg.includes("gmail") ||
        msg.includes("e-mail") ||
        msg.includes("contact mail")
    ) {
        return getEmailLink();
    }

  if (msg.includes("contact")) {
    return getContactInfo();
  }

  if (
    msg.includes("who is kartik") ||
    msg.includes("about kartik") ||
    msg.includes("introduce") ||
    msg.includes("name")
  ) {
    return getAboutKartik();
  }

  if (
    msg.includes("skill") ||
    msg.includes("technology") ||
    msg.includes("tech stack") ||
    msg.includes("language")
  ) {
    return getSkills();
  }

  if (
    msg.includes("best project") ||
    msg.includes("recommend") ||
    msg.includes("role") ||
    msg.includes("job")
  ) {
    return getBestProjectsForRole(message);
  }

  if (msg.includes("java")) {
    return getProjectsByType("java");
  }

  if (
    msg.includes("python") ||
    msg.includes("machine learning") ||
    msg.includes("ml")
  ) {
    return getProjectsByType("python");
  }

  if (msg.includes("c++") || msg.includes("cpp")) {
    return getProjectsByType("cpp");
  }

  if (msg.includes("win32") || msg.includes("windows")) {
    return getProjectsByType("windows");
  }

  if (msg.includes("system") || msg.includes("linux")) {
    return getProjectsByType("systems");
  }

  if (msg.includes("project") || msg.includes("work")) {
    return getAllProjects();
  }
  
  return null;
}