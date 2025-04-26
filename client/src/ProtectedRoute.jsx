import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    console.log(user);
    
    return children;
};

export default ProtectedRoute;
