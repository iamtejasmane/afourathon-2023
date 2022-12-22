import { Container } from '@mui/material'
import React from 'react'
import AddNewProject from './AddNewProject'
import ProjectList from './ProjectList'

const Project = () => {
  return (
    <div style={{overflowX: "hidden"}}>
      <AddNewProject/>
      <ProjectList/>
    </div>
  )
}

export default Project