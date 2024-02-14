import projectList from "./projectList";
import ProjectCard from "@/_ui/components/ProjectCard/ProjectCard";

const Projects = () => {
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Project</h1>
      </header>
      <hr className="my-5" />
      <section className="my-12 flex flex-col gap-2 items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projectList.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
