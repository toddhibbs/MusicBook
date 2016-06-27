
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');
var scale = require('tonal-scale');

PageModes = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
}

PageModes.prototype = Object.create(page.Page.prototype);
PageModes.prototype.constructor = PageModes;

PageModes.prototype.render = function() {
    var self = this;

    var noteScales = 'ionian_dorian_phrygian_lydian_mixolydian_aeolian_locrian'.split('_');

    doc.addPage(self.pageConfig);
    self.addPageNumber();
    self.addPageSection();
    var headerYOffset = self.addPageHeader();

    self.doc.x = self.doc.page.margins.left;
    self.doc.y = headerYOffset + 40;

    var rowHeight = 25;

    _.each(noteScales, function(scaleName, index) {
        self.doc.x = self.doc.page.margins.left;
        self.doc.y += rowHeight;
        self.drawScaleRow(self.key, scale.build(scaleName, self.key), self.key + ' ' + scaleName, self.doc.x, self.doc.y, index == 0 );
    });

}

module.exports = {
    PageModes: PageModes
}