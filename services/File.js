import * as uuid from "uuid"
import { unlink } from "node:fs"
import * as path from "node:path";

class File {
    async save(file) {
        if (!file) return null
        const [_, ext] = file.mimetype.split('/')
        const fileName = uuid.v4() + "." + ext
        await file.mv(path.resolve(process.cwd(), "..", 'static', fileName))
        return fileName
    }

    delete(file) {
        if (!file) return null
        const filePath = path.resolve(process.cwd(), "..", 'static', file)
        unlink(filePath, (err) => {
            if(err) throw err
            console.log(filePath, ' удалён')
        })
    }

}

export default new File()