import {useRoutes} from 'raviger'
import AppContainer from '../components/AppContainer';
import Form from '../Pages/Form';
import FormPreview from '../Pages/FormPreview';
import Home from '../Pages/Home'
import ListForm from '../Pages/ListForm'
import Signin from '../Pages/Signin'
import Restricted from '../Pages/Restricted'
import { user } from '../types/user';


const routes = {
    '/': ()=><Home />,
    '/list': ({user}:{user?:user})=>user?<ListForm />:<Restricted />,
    '/form/:id': ({id, user}:{id:string, user?:user}) => user?<Form id={Number(id)}/>:<Restricted/>,
    '/preview/:id': ({id}:{id:string}) => <FormPreview id={Number(id)}/>,
    '/login': ()=> <Signin />,
}

export default function AppRouter(props:{currentUser:user}) {

    let routeResult = useRoutes(routes, { routeProps: { user: props.currentUser } });
    return <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>;
}