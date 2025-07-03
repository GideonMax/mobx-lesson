import React, { useCallback, useMemo, useRef } from "react";
import { Box, Button, Modal, TextInput } from "@mantine/core";
import { makeAutoObservable, when } from "mobx";
import { observer } from "mobx-react-lite";
import { render } from "../render";
import { whenContainer } from "./when.css";
import { notifications } from "@mantine/notifications";

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    public confirmModalOpen = false;
    public operationConfirmed: boolean | null = null;


    public confirm(confirm: boolean) {
        this.confirmModalOpen = false;
        this.operationConfirmed = confirm;
    }

    public async operation(value: string) {
        if (value.length > 5) {
            this.confirmModalOpen = true;
            this.operationConfirmed = null;
            await when(() => this.operationConfirmed !== null);
            if (!this.operationConfirmed) return;
        }
        notifications.show({
            message: `operation performed for value ${value}`
        });
    }
}

const App: React.FC = observer(() => {

    const store = useMemo(() => new Store(), []);
    const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

    const startOperation = useCallback(() => {
        const text = inputRef.current?.value;
        if (!text) {
            notifications.show({
                message: "what are you doing",
                color: "red"
            });
            return;
        }
        store.operation(text);
    }, [store]);

    return <>

        <Box className={whenContainer}>

            <Modal opened={store.confirmModalOpen} withCloseButton={false} onClose={() => store.confirm(false)}>
                do you wanna submit?
                <Button onClick={() => store.confirm(true)} >submit</Button>
                <Button color="red" onClick={() => store.confirm(false)}>oh god no</Button>
            </Modal>

            <TextInput ref={inputRef} onKeyPress={(e) => {
                if (e.key == "Enter") {
                    startOperation();
                }
            }} placeholder="data to submit" autoFocus />

            <Button onClick={startOperation}>submit this input</Button>

        </Box>

    </>
});
render(<App />);