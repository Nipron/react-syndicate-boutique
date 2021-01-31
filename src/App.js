import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import './default.scss';
import {checkUserSession} from './redux/User/user.actions';
//hoc
import WithAdminAuth from "./hoc/withAdminAuth";
import WithAuth from "./hoc/withAuth";
//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/Homepagelayout";
//components
import AdminToolbar from "./components/AdminToolbar";

const App = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession())
    }, [])

    return (
        <div className="App">
            <AdminToolbar/>
            <Switch>
                <Route exact path="/" render={() => (
                    <HomepageLayout>
                        <Homepage/>
                    </HomepageLayout>
                )}/>
                <Route path="/registration" render={() => (
                    <MainLayout>
                        <Registration/>
                    </MainLayout>
                )}/>
                <Route path="/login"
                       render={() => (
                           <MainLayout>
                               <Login/>
                           </MainLayout>
                       )}/>
                <Route path="/recovery"
                       render={() => (
                           <MainLayout>
                               <Recovery/>
                           </MainLayout>
                       )}/>
                <Route path="/dashboard"
                       render={() => (
                           <WithAuth>
                               <MainLayout>
                                   <Dashboard/>
                               </MainLayout>
                           </WithAuth>
                       )}/>
                <Route path="/admin"
                       render={() => (
                           <WithAdminAuth>
                               <MainLayout>
                                   <Admin/>
                               </MainLayout>
                           </WithAdminAuth>
                       )}/>
            </Switch>
        </div>
    );
}

export default App;
