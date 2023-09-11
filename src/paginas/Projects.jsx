import useProject from "../hook/useProject"

const Projects = () => {

  const {projects}=useProject()

  return (
    <div>
      <h1 className="text-4xl font-black uppercase">Projects</h1>
    </div>
  )
}

export default Projects
