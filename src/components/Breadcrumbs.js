import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation } from 'react-router-dom';
import routes from '../nav';
import { useTheme } from '@mui/material/styles';
const Breadcrumb = () => {
  const theme = useTheme();
  const location = useLocation();
  const currentLocation = location.pathname;

  const getRouteName = (pathname) => {
    const currentRoute = routes.items.find(
      (route) =>
        currentLocation.split('/').findIndex((id) => id === route.id) > -1,
    );

    if (currentRoute.children.length === 0) {
      return currentRoute;
    }

    return currentRoute.children;
  };

  const getBreadcrumbs = () => {
    const routeName = getRouteName(currentLocation);

    if (!Array.isArray(routeName)) {
      return [routeName];
    } else {
      const breadcrumb = routeName.find(
        (route) => route.path === currentLocation,
      );

      return breadcrumb.meta.breadcrumb;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  const handleClick = () => {};

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="medium" />}
      aria-label="breadcrumb"
      sx={{ padding: 2 }}
    >
      {breadcrumbs.map((breadcrumb, index) => {
        // console.log("breadcrumb >> ", breadcrumb);
        return breadcrumb.active ? (
          <Typography key="3" color={theme.palette.primary.main} variant={'h3'}>
            {breadcrumb.title}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color={
              breadcrumbs.length === 1 ? theme.palette.primary.main : 'inherit'
            }
            onClick={handleClick}
            key={index}
            variant={'h3'}
          >
            {breadcrumb.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
