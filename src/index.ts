import { encode, decode } from "@prokopschield/base64";
import nsblob from "nsblob";

export function fromHex(hex: string): string {
    return encode(Buffer.from(hex, "hex"));
}

export function toHex(base64: string): string {
    return Buffer.from(decode(base64)).toString("hex");
}

export async function store(blob: string | Buffer): Promise<string> {
    return fromHex(await nsblob.store(blob));
}

export async function store_json<T>(object: T): Promise<string> {
    return fromHex(await nsblob.store_json<T>(object));
}

export async function fetch(hash: string): Promise<Buffer> {
    if (/^[a-f0-9]{64}$/g.test(hash)) {
        return await nsblob.fetch(hash);
    } else {
        return await nsblob.fetch(toHex(hash));
    }
}

export async function fetch_json<
    T extends string | number | boolean | T[] | Record<string, T> | null
>(hash: string): Promise<T> {
    return /^[a-f0-9]{64}$/g.test(hash)
        ? await nsblob.fetch_json<T>(hash)
        : await nsblob.fetch_json<T>(toHex(hash));
}

export const socket = nsblob.socket;

export default { fromHex, toHex, store, store_json, fetch, fetch_json, socket };
