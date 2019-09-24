import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './app.css';

import Header from '../header';
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry/error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import RandomPlanet from "../random-planet";
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from "../pages";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new DummySwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        console.log('login');
        this.setState({
            isLoggedIn: true
        })
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            }
        })
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const {isLoggedIn} = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>

                            <RandomPlanet />

                            <Switch>
                                <Route path="/" render={() => "Welcome to StarDB"} exact={true}/>
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets" component={PlanetsPage}/>
                                <Route path="/starships" component={StarshipsPage} exact={true}/>
                                <Route path="/starships/:id" render={({match, location, history}) => <StarshipDetails itemId={match.params.id}/>}/>

                                <Route path="/login" render={() => <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>}/>
                                <Route path="/secret" render={() => <SecretPage isLoggedIn={isLoggedIn}/>}/>

                                <Route render={() => 'Page not found'}/>
                            </Switch>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};