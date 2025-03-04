import { Navigate } from "react-router-dom";

function ProtectedRoute({ state, children }) {
    if (state.userId) {
        return <Navigate to="/" replace />;//상태값에 따라 강제이동
    }
    return children;
}

export default ProtectedRoute;