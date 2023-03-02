import { DiscordEvent } from "src/common/types";

const event: DiscordEvent = {
    name: "ready",
    once: true,
    execute: async () => {
        console.log("Ready.");
    }
}

module.exports = event;