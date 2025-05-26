import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      const timeout = setTimeout(() => {
        const url = nextUrl.startsWith('/') ? nextUrl : `/${nextUrl}`;
        navigate(url);
      }, 5000);

      return () => clearTimeout(timeout); // cleanup
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
      <p className="text-lg text-gray-600">Redirecting, please wait...</p>
    </div>
  );
};

export default Loading;
