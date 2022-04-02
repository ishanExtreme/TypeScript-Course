import {useRoutes} from 'raviger'
import Form from '../components/Form';
import FormPreview from '../components/FormPreview';
import Home from '../components/Home'
import ListForm from '../components/ListForms'

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