const fs = require('fs'); // Import the file system module

// Read the file named "example.txt"
fs.readFile('Example.txt', 'utf8', (err, data) => {
if (err) {
    console.error('Error reading the file:', err);
    return;
    }
    console.log('File contents:\n', data);
    
});

