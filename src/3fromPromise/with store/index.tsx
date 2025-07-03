import { action, makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { countTheTexts, getTheText } from "../api";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Box, LoadingOverlay, NumberInput, Skeleton } from "@mantine/core";
import { render } from "../../render";

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    public textCountPromise = fromPromise(countTheTexts());

    public currentIndex: number | undefined;

    #prevPromise: IPromiseBasedObservable<string> | undefined;

    public get textPromise(): IPromiseBasedObservable<undefined | string> {
        if (this.currentIndex === undefined) {
            return fromPromise.resolve(undefined);
        }
        const newPromise = fromPromise(
            getTheText(this.currentIndex),
            this.#prevPromise
        );
        newPromise.then(() => this.#prevPromise = newPromise);
        return newPromise;
    }

}

const TheText = observer<{ store: Store }>(({ store }) => {
    const textPromise = store.textPromise;

    if (textPromise.state == "rejected") {
        throw textPromise.value;
    }
    if (textPromise.state == "pending" && !textPromise.value) {
        return <Skeleton w={150} height={20} />;
    }

    const isLoading = textPromise.state == "pending";
    return <Box pos="relative">
        <LoadingOverlay visible={isLoading} overlayProps={{ blur: 1 }} />
        {textPromise.value}
    </Box>

});

export const FromPromiseWithStores = observer(() => {

    const store = useMemo(() => new Store, []);
    const textCountPromise = store.textCountPromise;

    if (textCountPromise.state == "rejected") {
        throw textCountPromise.value;
    }
    if (textCountPromise.state == "pending") {
        return <Skeleton visible height={75} w={400} />
    }

    const textCount = textCountPromise.value;

    return (
        <Box style={{ display: "flex", gap: 20, width: 400, alignItems: "baseline", flexDirection: "column" }}>
            <NumberInput
                allowDecimal={false}
                max={textCount - 1}
                min={0}
                autoFocus
                value={store.currentIndex}
                onChange={action(value => {
                    if (typeof value == "number")
                        store.currentIndex = value;
                })}
            />
            <TheText store={store} />
        </Box>
    )
});

render(<FromPromiseWithStores />);