import React, { useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import isEmpty from "is-empty";
import navigation from '../containers/_nav';
import { isNull } from '../common/utils/CowayUtils';
import {
  AppHeader, AppSidebar, AppContent, AppFooter,
} from "../components";

const AppLayout = () => {

  const location = useLocation();
  const [title, setTitle] = useState({ name: 'home' });

  const checkTitle = useCallback(
    () => {
      // console.log('location.pathname >> ', location.pathname);
      const result = navigation.find((el) => location.pathname.indexOf(el.to) > -1);

      if (!isNull(result) && !isEmpty(result._children) && result._children.length > 0) {
        const path = result._children.find((el) => location.pathname === el.to);
        // console.log('path : : ', location.pathname, path);
        if (!isNull(path)) {
          setTitle(path);
        }
      } else {
        setTitle(result);
      }

      // if (!isNull(result) && Object(result).hasOwnProperty('_children') && result._children.length > 0) {
      //   console.log('result >> ', JSON.stringify(result._children));
      // }

      // if (!isNull(result) && result.hasOwnProperty('_children') && result._children.length > 0) {
      //   console.log('result._children >> ', JSON.stringify(result._children));
      // }
      //   result._children.find(el => location.path === el.to);
      // }
      //   console.log(' result.find(el => location.path === el.to)', result.find(el => location.path === el.to));
      // }
      // setTitle(result);
    },
    [location.pathname],
  );

  useEffect(() => {
    checkTitle();
    return () => {};
  }, [checkTitle]);

  return (

    <div>
      <AppSidebar />
      {/* <TheSidebar /> */}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>

    </div>
  );
};

export default AppLayout;
