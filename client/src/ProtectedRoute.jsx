import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);


    useEffect(() => {
        console.log(user);
    }, [user, loading])


    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    
    
    return children;
};

export default ProtectedRoute;
