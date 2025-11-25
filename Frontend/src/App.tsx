import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
import ErrorPage from './pages/ErrorPage'
import MenuComponent from './components/Menu'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

// Layout component que incluye el menú
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MenuComponent />
      {children}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: 'home',
        element: (
          <Layout>
            <Home/>
          </Layout>
        )
      },
      {
        path: 'reports',
        element: (
          <Layout>
            <Reports/>
          </Layout>
        )
      }
    ]
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App