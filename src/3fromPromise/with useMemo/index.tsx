import { observer } from "mobx-react-lite";
import { render } from "../../render";
import { useMemo, useRef, useState } from "react";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { countTheTexts, getTheText } from "../api";
import { Box, LoadingOverlay, NumberInput, Skeleton } from "@mantine/core";




const TheText = observer<{ currentIndex: number }>(({ currentIndex }) => {
    const prevPromise = useRef<IPromiseBasedObservable<string>>(undefined);

    const textPromise = prevPromise.current = useMemo(() => fromPromise(getTheText(currentIndex), prevPromise.current), [currentIndex]);

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


const App = observer(() => {
    const textCountPromise = useMemo(() => fromPromise(countTheTexts()), []);
    const [currentIndex, setCurrentIndex] = useState<number>();
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
                autoFocus
                min={0}
                value={currentIndex}
                onChange={(value) => {
                    if (typeof value == "number")
                        setCurrentIndex(value);
                }}
            />
            {currentIndex !== undefined && <TheText currentIndex={currentIndex} />}
        </Box>
    )

});

render(<App />);