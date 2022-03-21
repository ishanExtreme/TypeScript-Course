import {useRoutes} from 'raviger'
import Form from './Form';
import Home from './Home'
import ListForm from './ListForms'

const routes = {
    '/': ()=><Home />,
    '/list': ()=><ListForm />,
    '/form/:id': ({id}:{id:string}) => <Form id={Number(id)}/>
}

export default function AppRouter() {

    let routeResult = useRoutes(routes);
    return routeResult;
}