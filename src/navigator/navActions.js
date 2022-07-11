import { CommonActions } from "@react-navigation/native";
//import { Routes } from "src/utils/routes";

export const AuthStack = CommonActions.reset({
    index: 0,
    routes: [
        { name: "Login" },
    ],
})
export const AppStack = CommonActions.reset({
    index: 0,
    routes: [
        { name: "FuelList" },
    ],
})