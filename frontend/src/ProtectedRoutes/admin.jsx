import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        async function checkAdminRole() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/auth/me/${user}`);
                const data = await response.json();
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error('Error checking admin role:', error);
            } finally {
                setLoading(false);
            }
        }

        checkAdminRole();
    }, [user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner
    }

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AdminProtectedRoute;
