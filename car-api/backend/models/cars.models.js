import mongoose from 'mongoose';
import fs from 'fs';
import csvParser from 'csv-parser';

// Path to your CSV file
const csvFilePath = 'path/to/your/csv-file.csv';

// Step 1: Extract headers dynamically
const headers = [];
fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('headers', (headerList) => {
        headerList.forEach((header) => headers.push(header));
    })
    .on('end', () => {
        // Step 2: Dynamically build the schema
        const schemaDefinition = {};
        headers.forEach((header) => {
            schemaDefinition[header] = { type: String }; // Default to String for all fields
        });

        // Step 3: Create a Mongoose schema
        const carSchema = new mongoose.Schema(schemaDefinition);

        // Step 4: Create and export the model
        const Car = mongoose.model('Car', carSchema);

        console.log('Car schema created successfully:', schemaDefinition);

        // Export the Car model
    });
export { Car };