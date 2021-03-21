import path from "path";
import fs from "fs";

function readFileAsync(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const filenameWithExt = filename.endsWith(".sql")
            ? filename
            : `${filename}.sql`;

        fs.readFile(
            path.resolve(path.join(__dirname, filenameWithExt)),
            {encoding: "utf8"},
            (err, content) => (err ? reject(err) : resolve(content.trim()))
        );
    });
}

async function readAllFromFile(filename: string): Promise<string[]> {
    const fileContents = await readFileAsync(filename);

    return fileContents
        .split(";")
        .filter((q: string) => typeof q === "string" && q.length > 0)
        .map((q: string) => `${q.trim()};`);
}

export default {
    readAllFromFile
};
