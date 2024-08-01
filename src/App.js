import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topnav from './components/topnav';
import Nav from './components/nav';
import Personaldetails from './pages/user/Personaldetails'
import Location from './pages/user/Location';
import Workassigned from './pages/user/workassigned';
import Completionreport from './pages/user/Reports/Completionreport';
import Previoustasks from './pages/user/Previoustasks';
import Accountsettings from './pages/user/Accountsettings';
import Register from './pages/authentication/register';
import Login from './pages/authentication/login';
import Verification from './pages/authentication/verification';
import Forgotpassword from './pages/authentication/forgotpassword';
import Homepage from './pages/Home/homepage';
import Contactus from './pages/Home/contactus';
import Help from './pages/Home/help';
import Adminpersonaldetails from './pages/admin/Adminpersonaldetails'
import Viewlocation from './pages/admin/Viewlocation';
import Inbox from './pages/admin/inbox';
import Agentlist from './pages/admin/Agentlist';
import Guardians from './pages/admin/Guardians';
import Adminreport from './pages/admin/Adminreport';
import Adminaccountsettings from './pages/admin/Adminaccountsettings';
import GuardianRegister from './pages/authentication/guardiansRegister';
import LoginGuardians from './pages/authentication/loginGuardians';
import Dashboard from './pages/guardian/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isUserPath = location.pathname.startsWith('/user');

  return (
    <main className="App">
      <div className='md:flex'>
          {isAdminPath ? <Nav /> :isUserPath ? <Sidebar />: " "}
          <div className='mt-14 md:mt-0 w-full max-h-[100vh] overflow-y-scroll'>
          <Topnav />
            <Routes>
              <Route path="/" element={<Homepage />} />
                  <Route path="/contactus" element={<Contactus />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/forgotpassword" element={<Forgotpassword />} />
                  <Route path="/register/guardian" element={<GuardianRegister />} />
                  <Route path="/login/guardian" element={<LoginGuardians />} />

              {/* User routes */}
                <Route path="/user/personaldetails"element={<Personaldetails/>}/>
                <Route path="/user/location"element={<Location/>}/>
                <Route path="/user/workassigned"element={<Workassigned/>}/>
                <Route path="/user/reports/completionreport"element={<Completionreport/>}/>
                <Route path="/user/previoustasks"element={<Previoustasks/>}/>
                <Route path="/user/accountsettings"element={<Accountsettings/>}/>

                {/* Guardian */}
                <Route path="/guardian/dashboard"element={<Dashboard/>}/>
              {/*Admin routes*/}
                <Route path="/admin/adminpersonaldetails" element={<Adminpersonaldetails />} />
                <Route path="/admin/viewlocation" element={<Viewlocation />} />
                <Route path="/admin/inbox" element={<Inbox />} />
                <Route path="/admin/agentlist" element={<Agentlist />} />
                <Route path="/admin/guardians" element={<Guardians />} />
                <Route path="/admin/adminreport" element={<Adminreport />} />
                <Route path="/admin/adminaccountsettings" element={<Adminaccountsettings />} />
            </Routes>
          </div>
      </div>
      
    </main>
  );
}

export default App;