import * as uuid from "uuid"
import { unlink } from "node:fs"
import * as path from "node:path";
import {put} from "@vercel/blob";

class File {
    async save(file) {
        if (!file) return null
        console.log(file)
        const fileName = uuid.v4() + "." + path.extname(file.name)
        console.log(file)
        const { url } = await put(fileName, file.data, {
            access:'public'
        })
        return url
    }
}

export default new File()