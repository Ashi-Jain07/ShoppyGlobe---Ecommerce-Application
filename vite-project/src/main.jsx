import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App.jsx';
import Home from './components/Home.jsx';
import "./components/index.css";

//Using Lazy and Suspense for App optimization
const ProductDetail = lazy(() => import("./components/ProductDetail.jsx"))
const ProductList = lazy(() => import("./components/ProductList.jsx"))
const Cart = lazy(() => import("./components/Cart.jsx"))
const NotFound = lazy(() => import("./components/NotFound.jsx"))

//Create a routes for different paths
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/productdetail/:id",
        element: <Suspense fallback={<h1 className='text-center text-3xl'>Loading...</h1>}> <ProductDetail /> </Suspense> 
      },
      {
        path: "/productlist",
        element: <Suspense fallback={<h1 className='text-center text-3xl'>Loading...</h1>}> <ProductList /> </Suspense>  
      },
      {
        path: "/cart",
        element: <Suspense fallback={<h1 className='text-center text-3xl'>Loading...</h1>}> <Cart /> </Suspense> 
      }
    ],
    errorElement: <Suspense fallback={<h1 className='text-center text-3xl'>Loading...</h1>}> <NotFound /> </Suspense>  
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
