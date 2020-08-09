import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Pages/Landing';
import TeacherList from './Pages/TeacherList';
import TeacherForm from './Pages/TeacherForm';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/study" component={TeacherList} />
                <Route exact path="/give-classes" component={TeacherForm} />
            </Switch>
        </BrowserRouter>
    )
}