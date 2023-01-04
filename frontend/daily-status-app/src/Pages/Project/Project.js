import { Container } from '@mui/material'
import React from 'react'
import UpdateProjectForm from '../../Components/UpdateProjectForm'
import AddNewProject from './AddNewProject'
import ProjectList from './ProjectList'

const Project = () => {
  return (
    <div>
      <AddNewProject/>
      <ProjectList/>
      <UpdateProjectForm/>
    </div>
  )
}

export default Project