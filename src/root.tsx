import { Box, Button } from "@mantine/core";
import React, { useEffect } from "react";
import { rootStyle } from "./root.css";
import { render } from "./render";

const App: React.FC = () => {

    const sorted = pages.sort();

    useEffect(() => {
        const callback = (event: KeyboardEvent) => {
            if (!event.code.startsWith("Digit") || !event.shiftKey) return;
            const digit = +event.code.substring("Digit".length);

            const url = pages[digit - 1];
            if (url) {
                window.open(url, "_self");
            }

        };
        document.addEventListener("keypress", callback);
        return () => document.removeEventListener("keypress", callback);
    }, []);

    return <>
        <Box className={rootStyle.mainBox}>
            <Box className={rootStyle.theSecondBox}>
                {sorted.map((page, index) =>
                    <Button component="a" href={page} key={page} variant="filled">
                        {index + 1}. {page.replace(/\d/g, "").split(/[\\\/]/g).slice(1, -1).join("/")}
                    </Button>
                )}
            </Box>
        </Box>
    </>
};
render(<App />)