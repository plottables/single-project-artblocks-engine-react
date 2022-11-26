import Page from 'components/Page';
import Alert from '@mui/material/Alert';
import ProjectDetails from 'components/ProjectDetails';
import {appProjectId, coreContractAddress} from 'config';

const ProjectPage = () => {
  const projectId = appProjectId;

  return (
    <Page>
      {
        projectId ? (
          <ProjectDetails id={coreContractAddress?.toLowerCase() + '-' + projectId} />
        ) : (
          <Alert severity="info">
            Project not found
          </Alert>
        )
      }
    </Page>
  )
}

export default ProjectPage;
