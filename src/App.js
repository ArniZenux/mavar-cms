import React, {useCallback, useContext, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { Home } from './pages/home';
import { Tulkur } from './pages/tulkur';
import { AddInterpreter } from './pages/addInterpreter';
import { ProjectList } from './pages/projectList';
import { AddProject } from './pages/addproject';
import { ChangeProject } from './pages/changeProject';
import { DeleteProject } from './pages/deleteProject';
import { StadaProject } from './pages/stadaProject';

import { NotFound } from './pages/404';

import { Login } from './pages/login';
import { Register } from './pages/register';
import { Reset } from './pages/reset';

import { UserContext } from './context/UserContext';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  const [userContext, setUserContext] = useContext(UserContext); 

  const verifyUser = useCallback(() => {
    console.log('Hello useCallback() - app()');
    
    setUserContext(oldValues => {
      return { ...oldValues, token : null }
    })
  }, [setUserContext]);

  useEffect( () => {
    verifyUser();
  }, [verifyUser]);

  return userContext.token ? (
    <div>
       <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route path="*" element={<NotFound/> } />
          </Routes>
      </BrowserRouter>
    </div>
  ) : (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tulkur" element={<Tulkur />} />
            <Route exact path="/nyrtulkur" element={<AddInterpreter />} />

            <Route exact path="/verkefnalisti" element={<ProjectList />} />
            <Route exact path="/nyttverkefni" element={<AddProject />} />
            <Route exact path="/breytaverkefni" element={<ChangeProject />} />
            <Route exact path="/eydaverkefni" element={<DeleteProject />} />
            <Route exact path="/stadaverkefni" element={<StadaProject />} />
            
            <Route path="*" element={<NotFound/> } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;