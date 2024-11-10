import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../models/user.model';

interface IProps {
    userApp: User | null;
    children: any;
    setLoginModalVisible: any
}

const ProtectedRoute = ({ userApp, children, setLoginModalVisible }: IProps) => {
    const location = useLocation();

    if (!userApp) {
        setLoginModalVisible(true);
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
