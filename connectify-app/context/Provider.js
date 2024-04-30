import {createContext, useContext, useEffect, useState} from "react";
import {getUserWithtoken} from "../requests/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            getUserWithtoken(token).then((res) => {
                if (res != null) {
                    const mes = res["message"];
                    if (mes.includes("successfully")) {
                        setUser(res);
                        setLoggedIn(true);
                        console.log("logged in with token");
                    } else {
                        console.log(mes);
                        console.log("token invalid");
                        AsyncStorage.removeItem("token");
                    }
                }
                setLoading(false);
            });
        });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default Provider;