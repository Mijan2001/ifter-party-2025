// global.d.ts

declare global {
    var mongoose: { conn: any; promise: any } | undefined;
}

export {};
