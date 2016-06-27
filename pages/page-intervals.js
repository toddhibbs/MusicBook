
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');

PageIntervals = function(doc, ppm, pageConfig) {

    page.Page.call(this, null, 'Intervals', doc, ppm, pageConfig);
}

PageIntervals.prototype = Object.create(page.Page.prototype);
PageIntervals.prototype.constructor = PageIntervals;

PageIntervals.prototype.render = function() {
    var self = this;

    var intervalFriendlyNames = 'Perfect Unison_Minor 2nd_Major 2nd_Minor 3rd_Major 3rd_Perfect 4th_Diminished 5th_Perfect 5th_Minor 6th_Major 6th_Minor 7th_Major 7th'.split('_');

    doc.addPage(self.pageConfig);
    self.addPageNumber();
    var headerYOffset = self.addPageHeader();

    self.doc.x = self.doc.page.margins.left;
    self.doc.y = headerYOffset + 10;

    var rowHeight = 32;

    _.each(_.range(12), function(value, index) {
        self.doc.x = self.doc.page.margins.left;
        self.doc.y += rowHeight;
        self.drawIntervalRow(tonal.fromSemitones(value), intervalFriendlyNames[index], self.doc.x, self.doc.y, index == 0);
    });
}

module.exports = {
    PageIntervals: PageIntervals
}
