import {useState, useEffect} from 'react'
import {Suspense, lazy} from 'react'
import type { RouteObject } from 'react-router-dom'
import MainLayout from './layouts/mainLayout';
import LoadingComponent from './LoadingScreen';



const Loadable = (Component:any)=> (props:JSX.IntrinsicAttributes)=>
(
    <Suspense fallback={<LoadingComponent/>}>
        <Component {...props}/>
    </Suspense>
);


/* PAGES */
const Home = Loadable(lazy(() => import('./views/Home')))
const Login = Loadable(lazy(()=> import('./views/auth/login')))
const Signup = Loadable(lazy(()=> import('./views/auth/signup')))



const routes: RouteObject[] = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'authentication',
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'signup',
              element: <Signup />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Home />, // You can define a 404 page here
    },
  ];
export default routes