
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');
var scale = require('tonal-scale');
var chord = require('tonal-chord');

PageChordsOther = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
}

PageChordsOther.prototype = Object.create(page.Page.prototype);
PageChordsOther.prototype.constructor = PageChordsOther;

PageChordsOther.prototype.render = function() {

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
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('4', self.key), self.key + '4', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('5', self.key), self.key + '5, power chord', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('6', self.key), self.key + '6', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('M9', self.key), self.key + '9', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('sus2', self.key), self.key + 'sus2', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('sus4', self.key), self.key + 'sus4', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('add9', self.key), self.key + 'add9', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('sus4add9', self.key), self.key + 'sus4add9', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('M#5add9', self.key), self.key + '+add9', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('madd4', self.key), self.key + 'madd4', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;

    self.drawScaleRow(self.key, chord.build('madd9', self.key), self.key + 'madd9', self.doc.x, self.doc.y, false);
    self.doc.x = self.doc.page.margins.left;
    self.doc.y += rowHeight;
}

module.exports = {
    PageChordsOther: PageChordsOther
}
