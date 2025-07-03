import { Box, Button, Checkbox, Text, TextInput } from "@mantine/core";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useCallback, useMemo, useRef } from "react";
import { render } from "../../render";
import { notifications } from "@mantine/notifications";
import { computedFn } from "mobx-utils";
import { computedStyle } from "../computed.css";

type Item = {
    title: string;
    id: number;
}

let counter = 0;

class Store {
    items: Item[] = [];
    public constructor() { makeAutoObservable(this) }
    public selectedItemIds: Set<number> = new Set;

    public setItemSelected(id: number, selected: boolean) {
        if (selected) {
            this.selectedItemIds.add(id);
        } else {
            this.selectedItemIds.delete(id);
        }
    }

    public isItemSelected = ((id: number) => {
        return this.selectedItemIds.has(id)
    });

    public addItem(title: string) {
        this.items.push({
            title,
            id: counter++
        })
    }
}

const Item = observer<{ item: Item, store: Store }>(({ item, store }) => {

    notifications.show({
        message: `rerendering ${item.id}`,
        autoClose: 800,
    })

    return <Box style={{ display: "flex" }}>
        <Checkbox checked={store.isItemSelected(item.id)} onChange={(e) => {
            store.setItemSelected(item.id, e.target.checked)
        }} />
        <Text>{item.title}</Text>
    </Box>;
});
export const CFNExample = observer(() => {
    const store = useMemo(() => new Store, []);
    const ref = useRef<React.ComponentRef<typeof TextInput>>(null);

    const addItem = useCallback(() => {
        store.addItem(ref.current!.value);
        ref.current!.value = "";
    }, [])

    return (
        <Box className={computedStyle.container}>
            <TextInput ref={ref} autoFocus onKeyPress={(e) => {
                if (e.key == "Enter") {
                    addItem();
                }
            }} />
            <Button onClick={addItem}>do</Button>
            <Box className={computedStyle.container}>
                {
                    store.items.map(item => <Item item={item} store={store} key={item.id} />)
                }
            </Box>
        </Box>
    );
});

render(<CFNExample />);