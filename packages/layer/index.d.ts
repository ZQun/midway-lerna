import * as Egg from 'egg';

declare module 'egg' {
    export interface Application { // tslint:disable-line
        hello: string;
    }
}

export = Egg;