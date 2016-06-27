
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');

PageInstruments = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
}

PageInstruments.prototype = Object.create(page.Page.prototype);
PageInstruments.prototype.constructor = PageInstruments;

PageInstruments.prototype.render = function() {
    doc.addPage(this.pageConfig);
    this.addPageNumber();
    this.addPageSection();
    this.addPageHeader();
}

module.exports = {
    PageInstruments: PageInstruments
}