import { style } from "@vanilla-extract/css";

export const rootStyle = {
    mainBox: style({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),
    theSecondBox: style({
        display: "flex",
        flexDirection: "column",
        gap: 4,
    })
}