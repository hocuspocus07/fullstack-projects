import mongoose, { Schema } from "mongoose"
import fs from "fs"
import csv from "csv-parser"

const carSchema = new Schema({}, { timestamps: true });

const processModel = async(filePath) => {
    return new Promise((resolve, reject) => {
        let myHeaders = [];
        const readStream = fs.createReadStream(filePath);
        readStream
            .pipe(csv())
            .on('headers', (headers) => {
                console.log(`Headers found in CSV: ${headers}`);
                myHeaders = headers;

                console.log("Schema before dynamic update:", carSchema.obj);
                myHeaders.forEach((header) => {
                    carSchema.add({
                        [header]: { type: String, default: '' }
                    });
                });
                console.log("Schema after dynamic update:", carSchema.obj);
                resolve();
            })
            .on('error', (err) => {
                console.log("Error occured:", err);
                reject(err);
            })
            .on('end', () => {
                console.log("CSV READING COMPLETED!");
            })
    })
}

(async() => {
    const csvPath = '../data/carapi-opendatafeed-sample.csv';
    try {
        await processModel(csvPath);
        const Car = mongoose.model("Car", carSchema);
        console.log("MODEL CREATED SUCCESSFULLY WITH THESE ENTRIES:", carSchema.obj);
    } catch (err) {
        console.log("ERROR OCCURED: ", err);
    }
})();

const addDynamicField = (fieldName, type) => {
    carSchema.add({
        [fieldName]: { type, default: type === String ? '' : null },
    });
    console.log(`Field "${fieldName}" added to schema as type "${type.name}"`);
};

export { addDynamicField };