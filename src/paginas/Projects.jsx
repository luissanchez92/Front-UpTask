import useProject from "../hook/useProject"
import PreviewProjects from "../components/PreviewProjects"


const Projects = () => {

  const {projects}=useProject()

  return (
    <div>
      <h1 className="text-4xl font-black uppercase">Projects</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ?
        projects.map(project=>(
          <PreviewProjects
            key={project.id}
            projects={project}
          />
        ))
        : <p className="text-center text-gray-600 uppercase p-5">No hay proyectos</p>}
      </div>
    </div>
  )
}

export default Projects
