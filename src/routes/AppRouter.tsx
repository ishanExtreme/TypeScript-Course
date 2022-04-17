import React from 'react';
import {useRoutes} from 'raviger'
import AppContainer from '../components/AppContainer';
import { user } from '../types/user';
import FallbackLazy from '../components/FallbackLazy'
const Home = React.lazy(() => import('../Pages/Home'));
const ListForm = React.lazy(() => import('../Pages/ListForm'));
const Form = React.lazy(() => import('../Pages/Form'));
const FormPreview = React.lazy(() => import('../Pages/FormPreview'));
const Signin = React.lazy(() => import('../Pages/Signin'));
const Restricted = React.lazy(() => import('../Pages/Restricted'));




const routes = {
    '/': ()=><FallbackLazy> <Home /> </FallbackLazy>,
    '/list': ({user}:{user?:user})=>user?<FallbackLazy> <ListForm /> </FallbackLazy>
    :<FallbackLazy> <Restricted /> </FallbackLazy>,
    '/form/:id': ({id, user}:{id:string, user?:user}) => user?
    <FallbackLazy> <Form id={Number(id)}/> </FallbackLazy>
    :<FallbackLazy> <Restricted/> </FallbackLazy>,
    '/preview/:id': ({id}:{id:string}) => (
        <FallbackLazy> 
            <FormPreview id={Number(id)}/>
        </FallbackLazy>),
    '/login': ()=> <FallbackLazy> <Signin /> </FallbackLazy>,
}

export default function AppRouter(props:{currentUser:user}) {

    let routeResult = useRoutes(routes, { routeProps: { user: props.currentUser } });
    return <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>;
}