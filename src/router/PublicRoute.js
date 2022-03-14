import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? children : <Navigate to="/fota/firmwaremanage" />;
};

export default PublicRoute;
