
var PDFDocument = require('pdfkit');
var fs = require('fs');
var _ = require('lodash');
var page = require('./pages/page.js');
var intervalsPage = require('./pages/page-intervals.js');
var backCoverPage = require('./pages/page-backcover.js');
var frontCoverPage = require('./pages/page-frontcover.js');
var titlePage = require('./pages/page-title.js');
var progressionsPage = require('./pages/page-progressions.js');
var modesPage = require('./pages/page-modes.js');
var instrumentsPage = require('./pages/page-instruments.js');
var chordsOtherPage = require('./pages/page-chords-other.js');
var chordsPage = require('./pages/page-chords.js');
var scalesPage = require('./pages/page-scales.js');
var infoPage = require('./pages/page-info.js');

var tonal = require('tonal');

// 72 points per inch. 25.4 mm per inch == 2.83464566929134 points per millimeter
var ppm = 2.83464566929134;
var pageConfig = {margin: ppm * 25.4 / 2};

//# Create a document
doc = new PDFDocument({
    autoFirstPage: false, 
    info: {
        Title: "Todd's Super Duper Music Reference", 
        Author: "Todd Hibbs",
        Subject: "Music Theory Reference Guide",
        Keywords: "music, music theory, reference, scales, notes, chords, key signature"
    }
});
doc.pipe(fs.createWriteStream('scalebook.pdf'));

var notes = 'C_C#_Db_D_D#_Eb_E_F_F#_Gb_G_G#_Ab_A_A#_Bb_B'.split('_');
//var notes = 'C'.split('_');
var pages = [];

pages.push(new frontCoverPage.PageFrontCover(doc, ppm, pageConfig));
pages.push(new titlePage.PageTitle(doc, ppm, pageConfig));

//Build page objects for each key, push object to pages array

pages.push(new intervalsPage.PageIntervals(doc, ppm, pageConfig));
_.each(notes, function(n) {

    pages.push(new infoPage.PageInfo(n, n, n + ': General Information', doc, ppm, pageConfig));
    pages.push(new modesPage.PageModes(n, n, n + ': Modes', doc, ppm, pageConfig));
    pages.push(new scalesPage.PageScales(n, n, n + ': Scales', doc, ppm, pageConfig));
    pages.push(new chordsPage.PageChords(n, n, n + ': Chords', doc, ppm, pageConfig));
    pages.push(new chordsOtherPage.PageChordsOther(n, n, n + ': Additional Chords', doc, ppm, pageConfig));
    pages.push(new progressionsPage.PageProgressions(n, n, n + ': Chord Progressions', doc, ppm, pageConfig));
    pages.push(new instrumentsPage.PageInstruments(n, n, n + ': Instruments', doc, ppm, pageConfig));
});

pages.push(new backCoverPage.PageBackCover(doc, ppm, pageConfig));

_.each(pages, function(page) {
    page.render();
});

// # Finalize PDF file
doc.end();

