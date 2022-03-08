import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { nav } from '../../router';
import { isNull } from '../../common/utils';

const CBreadcrumb = () => {
  const theme = useTheme();
  const location = useLocation();
  const currentLocation = location.pathname;

  const getRouteName = (pathname) => {
    const currentRoute = nav.find(
      (route) =>
        currentLocation
          .split('/')
          .findIndex((id) => id.toLowerCase() === route.id.toLowerCase()) > -1,
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
        (route) =>
          currentLocation
            .split('/')
            .findIndex(
              (path) => path.toLowerCase() === route.path.toLowerCase(),
            ) > -1,
      );

      return isNull(breadcrumb) ? '' : breadcrumb.meta.breadcrumb;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  const handleClick = () => {};

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="medium" />}
      aria-label="breadcrumb"
      sx={{ px: 0, py: 2 }}
    >
      {!isNull(breadcrumbs) &&
        breadcrumbs.map((breadcrumb, index) => {
          return index + 1 === breadcrumbs.length ? (
            <Typography
              key="3"
              color={theme.palette.primary.main}
              variant={'h3'}
            >
              {breadcrumb.title}
            </Typography>
          ) : (
            <Link
              underline="hover"
              color={
                breadcrumbs.length === 1
                  ? theme.palette.primary.main
                  : 'inherit'
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

export default CBreadcrumb;
