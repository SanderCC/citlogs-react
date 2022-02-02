import {Route, Switch} from "react-router";
import Home from "../../Pages/Home";
import SO from "../../Pages/SO";
import Admin from "../../Pages/Admin";

export default function MainRouter() {
    return <Switch>
        <Route path="/Parser/SO" component={SO}/>
        <Route path="/Parser/Admin" component={Admin}/>
        <Route path="/" component={Home}/>
    </Switch>
}