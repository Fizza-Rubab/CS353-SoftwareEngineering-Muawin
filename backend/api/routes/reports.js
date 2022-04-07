const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit-table');
const fs = require('fs');

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, res, next) => {
    const classId = req.query.classId;
    const termId = req.query.termId;
    console.log(classId,  termId);

    // Document Generation Code
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('output.pdf'));

    // Embed a font, set the font size, and render some text
    doc
    .fontSize(25)
    .text('Hey Fizza Testing here', 100, 100);


    // Add another page
    doc
    .addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

    const table = {
        title: "Title",
        subtitle: "Subtitle",
        headers: ["Country", "Conversion rate", "Trend"],
        rows: [
          ["Switzerland", "12%", "+1.12%"],
          ["France", "67%", "-0.98%"],
          ["England", "33%", "+4.44%"],
        ],
      };
    doc.table( table, { 
    // A4 595.28 x 841.89 (portrait) (about width sizes)
    width: 300,
    //columnsSize: [ 200, 100, 100 ],
    }); 

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc
    .scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

    // Add some text with annotations
    doc
    .addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

    // Finalize PDF file
    doc.end();
    res.status(200).json({
        message: 'following parameters will be used to get term grades for students from database',
        classId: classId,
        termId: termId
    });

});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'students post'
    });

});

module.exports = router;
