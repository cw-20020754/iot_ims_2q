import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'common/auth';

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/fota/firmwaremanage" />;
};

export default PublicRoute;
