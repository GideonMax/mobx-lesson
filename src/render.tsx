import { MantineProvider } from "@mantine/core";
import { JSX } from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export function render(element: JSX.Element) {
    const htmlElement = document.createElement("div");
    document.body.append(htmlElement);

    ReactDOM.createRoot(htmlElement).render(
        <MantineProvider>
            <Notifications autoClose={3000}  />
            {element}
        </MantineProvider>
    );
}