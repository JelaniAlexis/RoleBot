import { Message } from "discord.js";
import { DiscordCommand } from "src/common/types";

const command: DiscordCommand = {
    name: "ping",
    execute: async (message: Message, ...args) => {
        message.reply("Ping pong balls");
    }
}

module.exports = command;