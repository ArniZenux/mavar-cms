import React, {useCallback, useContext, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { Home } from './pages/home';
import { Tulkur } from './pages/tulkur';
import { AddInterpreter } from './pages/addInterpreter';
import { InterpreterProjectList } from './pages/interpreterProjectList';
import { Custom } from './pages/customs';
import { AddCustom } from './pages/addCustom';
import { ProjectList } from './pages/projectList';
import { AddProject } from './pages/addproject';
import { ChangeProject } from './pages/changeProject';
import { StadaProject } from './pages/stadaProject';
import { WorkPlanT } from './pages/workPlan';
import { Bookproject } from './pages/bookproject.js';  //change to bookRequest
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

  return !userContext.token ? (
    <div>
       <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
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
            <Route path="/tulkaverkefni" element={<InterpreterProjectList />} />
            <Route path="/tulkur" element={<Tulkur />} />
            <Route path="/nyrtulkur" element={<AddInterpreter />} />
            <Route path="/vidskiptavinir" element={<Custom />} />
            <Route path="/nyrvidskiptavinur" element={<AddCustom />} />
            <Route path="/verkefnalisti" element={<ProjectList />} />
            <Route path="/nyttverkefni" element={<AddProject />} />
            <Route path="/breytaverkefni" element={<ChangeProject />} />
            <Route path="/stadaverkefni" element={<StadaProject />} />
            <Route path="/workplan" element={<WorkPlanT />} />
            <Route path="/bokabeidni/:id" element={<Bookproject />} />
            <Route path="*" element={<NotFound/> } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;