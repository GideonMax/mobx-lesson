import { style } from "@vanilla-extract/css";

export const computedStyle = {
    container: style({
        display: "flex",
        flexDirection: "column",
        marginInline: "40%",
    }),
    tasksContainer: style({
        display: "flex",
        flexDirection: "column",
        gap: 4,
    }),
}