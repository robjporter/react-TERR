import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number, array, object, select, color, date } from "@storybook/addon-knobs";
import React from "react";
import Box from '@material-ui/core/Box';
import Bar from ".";

const stories = storiesOf("Custom/Bar", module).addDecorator(withKnobs);

stories.add("Default", () => {
    return (
        <Bar>TEST</Bar>
    );
});

stories.add("SignedIn", () => {
    let user = {
        firstName: 'Rob',
        lastName: 'Porter',
        photoURL: "",
        username: "roporter"
    };
    return (
        <Bar signedIn user={user.username} userData={user}>TEST</Bar>
    );
});
