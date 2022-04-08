import {useRoutes} from 'raviger'
import Form from '../Pages/Form';
import FormPreview from '../Pages/FormPreview';
import Home from '../Pages/Home'
import ListForm from '../Pages/ListForm'

const routes = {
    '/': ()=><Home />,
    '/list': ()=><ListForm />,
    '/form/:id': ({id}:{id:string}) => <Form id={Number(id)}/>,
    '/preview/:id': ({id}:{id:string}) => <FormPreview id={Number(id)}/>
}

export default function AppRouter() {

    let routeResult = useRoutes(routes);
    return routeResult;
}