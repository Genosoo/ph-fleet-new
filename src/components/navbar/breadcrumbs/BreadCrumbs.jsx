// StyledBreadcrumbs.js

import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react';

function CustomBreadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb ">
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          {index < paths.length - 1 ? (
            <Link className='breadcrumbs' to={`/${paths.slice(0, index + 1).join('/')}`}>
              {path}
            </Link>
          ) : (
            <span className="breadcrumbs cursor-pointer">{path}</span>
          )}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  );
}

export default CustomBreadcrumbs;
