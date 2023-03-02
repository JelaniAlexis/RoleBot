import { Message } from "discord.js"
import { DiscordCommand, DiscordEvent } from "src/common/types"
import * as dotenv from 'dotenv'
import { readdirSync } from "fs"
import { join } from "path"
dotenv.config()

const event: DiscordEvent = {
    name: "messageCreate",
    once: false,
    execute: async (message: Message) => {
        if (!message.content.startsWith(process.env.PREFIX as string) || message.author.bot) return;

        const args = message.content.slice(1).trim().split(/\s+/);
        const commandName = args.shift();
        //@ts-ignore
        message.client.commands.forEach(command => { if (command.name === commandName) command.execute(message, args) });
    }
}

module.exports = event;