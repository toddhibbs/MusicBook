
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');
var scale = require('tonal-scale');
var chord = require('tonal-chord');

PageChords = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
}

PageChords.prototype = Object.create(page.Page.prototype);
PageChords.prototype.constructor = PageChords;

PageChords.prototype.render = function() {

    var self = this;

    doc.addPage(self.pageConfig);
    self.addPageNumber();
    self.addPageSection();
    var headerYOffset = self.addPageHeader();

    self.doc.x = self.doc.page.margins.left;
    self.doc.y = headerYOffset + 40;

    self.doc.x = self.doc.page.margins.left;
    self.doc.y = headerYOffset + 40;

    var rowHeight = 25;

    self.drawScaleRow(self.key, scale.build('major', self.key), self.key + ' major scale', self.doc.x, self.doc.y, true );
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight + 5;

    self.doc.fontSize(16).text('Triads');

    self.drawScaleRow(self.key, chord.build('', self.key), self.key, self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('minor', self.key), self.key + 'm', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('aug', self.key), self.key + '+, ' + self.key + 'aug', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('dim', self.key), self.key + '\u00B0, ' + self.key + 'dim', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight + 5;

    self.doc.fontSize(16).text('Sevenths');

    self.drawScaleRow(self.key, chord.build('maj7', self.key), self.key + 'maj7', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('Dominant', self.key), self.key + '7', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('m7', self.key), self.key + 'm7', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('M7+', self.key), self.key + '7+', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('M7b5', self.key), self.key + '7b5', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('M7b6', self.key), self.key + '7b6', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;
}

module.exports = {
    PageChords: PageChords
}

