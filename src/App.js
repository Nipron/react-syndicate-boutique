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
import Search from "./pages/Search";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/Homepagelayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
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
                <Route exact path="/search" render={() => (
                    <MainLayout>
                        <Search/>
                    </MainLayout>
                )}/>
                <Route path="/search/:filterType" render={() => (
                    <MainLayout>
                        <Search/>
                    </MainLayout>
                )}/>
                <Route path="/product/:productID" render={() => (
                    <MainLayout>
                        <ProductDetails/>
                    </MainLayout>
                )}/>
                <Route path="/cart" render={() => (
                    <MainLayout>
                        <Cart/>
                    </MainLayout>
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
                               <DashBoardLayout>
                                   <Dashboard/>
                               </DashBoardLayout>
                           </WithAuth>
                       )}/>
                <Route path="/admin"
                       render={() => (
                           <WithAdminAuth>
                               <AdminLayout>
                                   <Admin/>
                               </AdminLayout>
                           </WithAdminAuth>
                       )}/>
            </Switch>
        </div>
    );
}

export default App;
