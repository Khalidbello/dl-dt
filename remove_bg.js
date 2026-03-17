const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public/sky-walker/frames');
const outputDir = path.join(__dirname, 'public/sky-walker/output');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function processFrames() {
    try {
        const files = fs.readdirSync(inputDir).filter(file => file.toLowerCase().endsWith('.png'));
        console.log(`🚀 Found ${files.length} PNGs. Starting removal...`);

        for (const file of files) {
            const inputPath = path.join(inputDir, file);
            const outputName = file.replace(/\.png$/i, '.webp');
            const outputPath = path.join(outputDir, outputName);

            console.log(`⏳ Processing: ${file}`);

            try {
                // 1. Read file into a standard Buffer
                const fileBuffer = fs.readFileSync(inputPath);

                // 2. Wrap the Buffer in a Blob and explicitly define it as a PNG
                // This is the "magic" step that clears the "Unsupported format" error
                const imageBlob = new Blob([fileBuffer], { type: 'image/png' });

                // 3. Process
                const resultBlob = await removeBackground(imageBlob, {
                    output: {
                        format: 'image/webp',
                        quality: 0.8
                    }
                });

                // 4. Save result
                const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
                fs.writeFileSync(outputPath, resultBuffer);

                console.log(`✅ Saved: ${outputName}`);
            } catch (err) {
                console.error(`❌ Failed ${file}:`, err.message);
            }
        }
        console.log('✨ All frames complete!');
    } catch (error) {
        console.error('❌ Fatal Error:', error);
    }
}

processFrames();