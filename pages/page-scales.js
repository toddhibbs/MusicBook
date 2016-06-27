
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');
var scale = require('tonal-scale');

PageScales = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
}

PageScales.prototype = Object.create(page.Page.prototype);
PageScales.prototype.constructor = PageScales;

PageScales.prototype.render = function() {

    var self = this;

    var noteScales = 'major_minor_harmonic minor_melodic minor_major pentatonic_minor pentatonic_major blues_minor blues_flamenco_whole tone_bebop'.split('_');

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
    PageScales: PageScales
}

