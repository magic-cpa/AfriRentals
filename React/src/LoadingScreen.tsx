import react from 'react'
import { CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles';


const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.primary.main,
    margin: theme.spacing(2),
    // Add more custom styles here if needed
  }));

const LoadingComponent = function(){
    return(
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <StyledCircularProgress />
    </div>
    </>
    )
}
export default LoadingComponent