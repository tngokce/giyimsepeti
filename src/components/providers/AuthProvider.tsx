'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken } from '@/redux/actions/clientActions';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      // @ts-ignore (Redux Thunk tiplemesi için)
      await dispatch(verifyToken());
    };
    
    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
} 