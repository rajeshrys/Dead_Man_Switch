
import api from "../api/api";
export const checkAuth = async () => {
    try {

        const response =
            await api.get("/auth/me");

        return response.data;

    } catch (error){
        throw error
        return { authenticated: false, user: null };
        
    }

};