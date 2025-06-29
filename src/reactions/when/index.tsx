import React from "react";
import { MantineProvider } from "@mantine/core";
import {Notifications,notifications} from "@mantine/notifications";
import {makeAutoObservable} from "mobx";
class Store{
    constructor(){
        makeAutoObservable(this);
    }
    
}
const App: React.FC = () => {
    return <MantineProvider >
        <Notifications/>

    </MantineProvider>
}