#!/usr/bin/env ts-node

import {createDatabase} from "../src/orm/create-database";

// @ts-ignore
const write = (t) => process.stdout.write(t);
const writeLine = (t) => process.stdout.write(`${t}\n`);

interface ICommand {
    do(args);
    getName(): string;
    getCode(): string;
}

interface ICommandCollection {
    add(command: ICommand): void;
    show(): void;
    run(code: string, args): void;
}

abstract class Command implements ICommand {
    private readonly _name: string;
    private readonly _code: string;

    protected constructor(name: string, code: string) {
        this._name = name;
        this._code = code;
    }

    abstract do(args);

    getName() {
        return this._name;
    }

    getCode() {
        return this._code;
    }
}

class CommandCollection implements ICommandCollection{
    private commands: ICommand[];

    constructor(...commands) {
        this.commands = commands;
    }

    add(command: ICommand) {
        this.commands.push(command);
    }

    show() {
        this.commands.map(c => writeLine(`${c.getCode()} — ${c.getName()}`))
    }

    run(code, args) {
        const command = this.commands.find(c => {
            return c.getCode() === code
        });
        if (!command) {
            writeLine('Command not found.');
            return;
        }
        command.do(args)
    }
}

class PopulateDatabaseCommand extends Command {
    constructor() {
        super('Populate Database', 'db:populate');
    }

    do(args) {
        createDatabase();
    }
}

class DemoCommand extends Command {
    constructor() {
        super('Demo', 'misc:demo');
    }

    do(args) {
        args.map(a => writeLine(a));
    }
}

const commands = new CommandCollection(
    new PopulateDatabaseCommand(),
    new DemoCommand()
);

if(!process.argv[0]) {
    commands.show();
    process.exit();
}

process.argv.splice(0, 2);

commands.run(process.argv.shift(), process.argv);
