import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const StyledBreadcrumbs = styled(Breadcrumbs)`
  font-family: "Manrope", "sans-serif" !important;
  
`;

function CustomBreadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  return (
    <StyledBreadcrumbs separator="›" aria-label="breadcrumb ">
      {paths.map((path, index) => (
        <Link className='breadcrumbs' to={`/${paths.slice(0, index + 1).join('/')}`} key={path}>
          {path}
        </Link>
      ))}
    </StyledBreadcrumbs>
  );
}

export default CustomBreadcrumbs;
