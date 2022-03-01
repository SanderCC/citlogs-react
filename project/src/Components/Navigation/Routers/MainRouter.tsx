import {Route, Switch} from "react-router";
import Home from "../../Pages/Home";
import SO from "../../Pages/SO";
import Admin from "../../Pages/Admin";
import Account from "../../Pages/Account";
import GuiderReview from "../../Pages/Guiders/Review";
import GuiderApplication from "../../Pages/Guiders/Application";

export default function MainRouter() {
    return <Switch>
        <Route path="/Parser/SO" component={SO}/>
        <Route path="/Parser/Guiders/Application" component={GuiderApplication}/>
        <Route path="/Parser/Guiders/Review" component={GuiderReview}/>
        <Route path="/Parser/Admin" component={Admin}/>
        <Route path="/Parser/Account" component={Account}/>
        <Route path="/" component={Home}/>
    </Switch>
}