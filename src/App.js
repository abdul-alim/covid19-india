import React from 'react';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './components/home';
import Helpline from './components/helplines';
import State from './components/state';
import './styles/styles.css';
import ScrollToTop from "./utils/scroll-top";

function App() {
    const pages = [
        {
            pageLink: '/',
            view: Home,
            displayName: 'Home',
            animationDelayForNavbar: 0.2,
            showInNavbar: true,
        },
        {
            pageLink: '/helplines',
            view: Helpline,
            displayName: 'Helplines',
            animationDelayForNavbar: 0.6,
            showInNavbar: true,
        },
        {
            pageLink: '/state/:stateCode',
            view: State,
            displayName: 'State',
            animationDelayForNavbar: 0.8,
            showInNavbar: false,
        },
    ];

    return (
        <div className="App">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ScrollToTop />
                <Route
                    render={({location}) => (
                        <div className="Almighty-Router">
                            <Navbar pages={pages} />
                            <Switch location={location}>
                                {pages.map((page, index) => {
                                    return (
                                        <Route
                                            exact
                                            path={page.pageLink}
                                            render={({match}) => (
                                                <page.view
                                                    key={
                                                        match.params
                                                            .stateCode || index
                                                    }
                                                />
                                            )}
                                            key={index}
                                        />
                                    );
                                })}
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    )}
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
