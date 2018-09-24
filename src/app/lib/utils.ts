import {async} from 'q';

export const Utils = {
    srcToFile: function* (srcs) {
        const fileInArray = async function(srcFiles){
            let buffer = null,
                arrayBuf = null;
            const fArr = [];
            for (const src of srcFiles) {
                buffer = await fetch(src.src);
                arrayBuf = await buffer.arrayBuffer();
                fArr.push(new File(
                            [arrayBuf],
                            src.filename,
                            {
                                type: src.mimeType
                            }
                        ));
            }
            return fArr;
        };
        return fileInArray(srcs);
    }
};
