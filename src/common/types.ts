import { ClientEvents } from "discord.js"

export type DiscordEvent = {
    name: keyof ClientEvents
    once: boolean
    execute: (...args: any[]) => void
}

export type DiscordCommand = {
    name: string
    execute: (...args: any[]) => void
}