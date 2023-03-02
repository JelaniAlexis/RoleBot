import { Client, Partials, Collection } from 'discord.js'
import { readdirSync } from 'fs';
import { join } from 'path';
import { DiscordCommand, DiscordEvent } from './common/types';
import * as dotenv from 'dotenv'
dotenv.config()

const client = new Client({ intents: [ 'GuildMembers', 'Guilds', 'GuildMessages', 'MessageContent' ], partials: [ Partials.Message, Partials.Channel, Partials.Reaction ] })

// @ts-ignore
client.commands = new Collection();

const commandsPath = join(__dirname, 'commands');
const commands: DiscordCommand[] = readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts')).map(fileName => require(join(commandsPath, fileName)));

// @ts-ignore
commands.forEach(command => client.commands.set(command.name, command));

const eventsPath = join(__dirname, 'events');
const events: DiscordEvent[] = readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts')).map(filename => require(join(eventsPath, filename)));

events.forEach(async event => event.once ? client.once(event.name, (...args: any[]) => event.execute(...args)) : client.on(event.name, (...args: any[]) => event.execute(...args)));

client.login(process.env.TOKEN as string);