import * as uuid from "uuid"
import { unlink } from "node:fs"
import * as path from "node:path";

class File {
    save(file) {
        if (!file) return null
        const [_, ext] = file.mimetype.split('/')
        const fileName = uuid.v4() + "." + ext
        const filePath = path.resolve('static', fileName)
        file.mv(filePath)
        return fileName
    }

    delete(file) {
        console.log(file)
        if (!file) return null
        const filePath = path.resolve('static', file)
        console.log(filePath)
        unlink(filePath, (err) => {
            if(err) throw err
            console.log(filePath, ' удалён')
        })
    }

}

export default new File()