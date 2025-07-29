import { Box, Button, Checkbox, Text, TextInput } from "@mantine/core";
import { action, makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useCallback, useMemo, useRef } from "react";
import { render } from "../../render";
import { notifications } from "@mantine/notifications";
import { computedStyle } from "../computed.css";

type Item = {
    title: string;
    id: number;
    isSelected: boolean;
}

let counter = 0;

class Store {
    items: Item[] = [];
    public constructor() { makeAutoObservable(this) }
    public get selectedItemIds(): number[] {
        return this.items.filter(item => item.isSelected).map(item => item.id);
    }

    public addItem(title: string) {
        this.items.push({
            title,
            id: counter++,
            isSelected: false,
        });
    }
}

const Item = observer<{ item: Item, store: Store }>(({ item }) => {

    notifications.show({
        message: `rerendering ${item.id}`,
        autoClose: 800,
    });

    return <Box style={{ display: "flex" }}>
        <Checkbox checked={item.isSelected} onChange={action((e) => {
            item.isSelected = e.target.checked;
        })} />
        <Text>{item.title}</Text>
    </Box>;
});

export const TheBiggerEgg = observer(() => {
    const store = useMemo(() => new Store, []);
    const ref = useRef<React.ComponentRef<typeof TextInput>>(null);

    const addItem = useCallback(() => {
        store.addItem(ref.current!.value);
        ref.current!.value = "";
    }, [])

    return (
        <Box className={computedStyle.container}>
            <TextInput ref={ref} autoFocus onKeyDown={e => {
                if (e.key == "Enter") addItem();
            }} />
            <Button onClick={addItem}>do</Button>
            <Box className={computedStyle.tasksContainer}> 
                {
                    store.items.map(item => <Item item={item} store={store} key={item.id} />)
                }
            </Box>
        </Box>
    )
});

render(<TheBiggerEgg />);