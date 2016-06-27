
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');

PageInfo = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
    this.chroma = tonal.chroma(this.key);
}

PageInfo.prototype = Object.create(page.Page.prototype);
PageInfo.prototype.constructor = PageInfo;

PageInfo.prototype.render = function() {

    var self = this;

    var keySignatureImages = {
        'C': { major: './svg-png/png/C-major_a-minor.png', minor: './svg-png/png/E-flat-major_c-minor.png' },
        'C#': { major: './svg-png/png/C-sharp-major_a-sharp-minor.png', minor: './svg-png/png/E-major_c-sharp-minor.png' },
        'Db': { major: './svg-png/png/D-flat-major_b-flat-minor.png', minor: null },
        'D': { major: './svg-png/png/D-major_h-minor.png', minor: './svg-png/png/F-major_d-minor.png' },
        'D#': { major: null, minor: './svg-png/png/F-sharp-major_d-sharp-minor.png' },
        'Eb': { major: './svg-png/png/E-flat-major_c-minor.png', minor: './svg-png/png/G-flat-major_e-flat-minor.png' },
        'E': { major: './svg-png/png/E-major_c-sharp-minor.png', minor: './svg-png/png/G-major_e-minor.png' },
        'F': { major: './svg-png/png/F-major_d-minor.png', minor: './svg-png/png/A-flat-major_f-minor.png' },
        'F#': { major: './svg-png/png/F-sharp-major_d-sharp-minor.png', minor: './svg-png/png/A-major_f-sharp-minor.png' },
        'Gb': { major: './svg-png/png/G-flat-major_e-flat-minor.png', minor: null },
        'G': { major: './svg-png/png/G-major_e-minor.png', minor: './svg-png/png/B-flat-major_g-minor.png' },
        'G#': { major: null, minor: './svg-png/png/B-major_g-sharp-minor.png' },
        'Ab': { major: './svg-png/png/A-flat-major_f-minor.png', minor: './svg-png/png/C-flat-major_a-flat-minor.png' },
        'A': { major: './svg-png/png/A-major_f-sharp-minor.png', minor: './svg-png/png/C-major_a-minor.png' },
        'A#': { major: null, minor: './svg-png/png/C-sharp-major_a-sharp-minor.png' },
        'Bb': { major: './svg-png/png/B-flat-major_g-minor.png', minor: './svg-png/png/D-flat-major_b-flat-minor.png' },
        'B': { major: './svg-png/png/B-major_g-sharp-minor.png', minor: './svg-png/png/D-major_h-minor.png' },
    };

    doc.addPage(self.pageConfig);
    self.addPageNumber();
    self.addPageSection();
    var headerYOffset = self.addPageHeader();

    self.doc.x = self.doc.page.margins.left;
    self.doc.y = headerYOffset + 40;

    var col1x = self.doc.x;
    var col2x = self.doc.page.width / 2;
    var currentY = self.doc.y;
    var lastBlockStartY = currentY;

    self.doc.fontSize(12).fillColor('black');
    self.doc.text(this.key + ' Major Key Signature');

    var majorSignature = keySignatureImages[this.key].major;
    if (majorSignature) {
        self.doc.image(majorSignature, self.doc.x, self.doc.y, {width: 150});
    }
    else {
        self.doc.moveDown()
            .fillColor('red')
            .fontSize(10)
            .text('This scale is theoretical and is not typically used. See related enharmonic scales.', {width: (self.doc.page.width / 2) - self.doc.page.margins.right});
    }

    self.doc.fillColor('black').fontSize(12);
    self.doc.text(this.key + ' Minor Key Signature', col2x, currentY);


    var minorSignature = keySignatureImages[this.key].minor;
    if (minorSignature) {
        self.doc.image(minorSignature, col2x, self.doc.y, {width: 150});
    }
    else {
        self.doc.moveDown().fillColor('red').fontSize(10).text('This scale is theoretical and is not typically used. See related enharmonic scales.');

    }

    // self.doc.moveDown();

    lastBlockStartY = currentY = self.doc.y; 


    //show midi codes

    var data = {};
    for(var i = 0; i < 9; i++) {
        var d = data[self.key + i] = {
            midi: tonal.toMidi(self.key + i),
            //frequency: _.round(tonal.toFreq(self.key + i), 2)
            frequency: tonal.toFreq(self.key + i)
        };
        d.noteWidth = self.doc.widthOfString(self.key + i);
        d.midiWidth = d.midi ? self.doc.widthOfString(d.midi.toString()) : 0,
        d.frequencyWidth = d.frequency ? self.doc.widthOfString(d.frequency.toFixed(3)) : 0
    }


    //get dimensions to align things properly

    self.doc.fontSize(12);
    
    var maxNoteWidth = _.max(_.map(data, 'noteWidth'));
    if (self.doc.widthOfString('Note') > maxNoteWidth) {
        maxNoteWidth = self.doc.widthOfString('Note');
    } 
    var maxMidiCodeWidth = _.max(_.map(data, 'midiWidth'));
    if (self.doc.widthOfString('Midi Code') > maxMidiCodeWidth) {
        maxMidiCodeWidth = self.doc.widthOfString('Midi Code');
    }
    var maxFrequencyWidth = _.max(_.map(data, 'frequencyWidth'));
    if (self.doc.widthOfString('Frequency') > maxFrequencyWidth) {
        maxFrequencyWidth = self.doc.widthOfString('Frequency');
    }

    var noteX = col1x;
    var midiCodeX = noteX + maxNoteWidth + 20;
    var frequencyX = midiCodeX + maxMidiCodeWidth + 20;
    var rowY = self.doc.y;

    self.doc.fillColor('black').fontSize(12).text('Note', noteX, rowY);
    self.doc.text('Midi Code', midiCodeX, rowY, {'width': maxMidiCodeWidth ,'align': 'right'});
    self.doc.text('Frequency', frequencyX, rowY, {'width': maxFrequencyWidth ,'align': 'right'});
    
    self.doc.moveDown();
    rowY = self.doc.y



    _.each(data, function(value, key) {
        self.doc.fillColor('black').fontSize(10).text(key, noteX, rowY);
        self.doc.text(value.midi, midiCodeX, rowY, {'width': maxMidiCodeWidth ,'align': 'right'});
        self.doc.text(value.frequency.toFixed(3), frequencyX, rowY, {'width': maxFrequencyWidth ,'align': 'right'});
        rowY = self.doc.y;
    });


    //Show enharmonics

    self.currentY = self.doc.y = lastBlockStartY;
    self.doc.x = col2x;

    self.doc.fillColor('black').fontSize(12).text('Enharmonics');
    self.doc.moveDown();
    var noteEnharmonics = tonal.enharmonics(self.key);
    self.doc.fillColor('black').fontSize(10).text(noteEnharmonics.join(', '));

    //Show pitch chroma

    self.doc.moveDown();
    self.doc.x = col2x;

    self.doc.fillColor('black').fontSize(12).text('Pitch Chroma');
    self.doc.moveDown();

    var notes = 'C_C#_Db_D_D#_Eb_E_F_F#_Gb_G_G#_Ab_A_A#_Bb_B'.split('_');

    self.doc.fontSize(10);
    _.each(notes, function(note, index) {
        self.doc.fillColor(self.key == note ? 'black' : '#aaa');
        self.doc.text(note + ' ' + tonal.chroma(note));
    });

    console.log(tonal.noteName('c'));


    // var noteChroma = tonal.chroma(self.key);
    // self.doc.fillColor('black').fontSize(10).text(noteChroma);



}

module.exports = {
    PageInfo: PageInfo
}