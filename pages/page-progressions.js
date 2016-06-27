
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');

PageProgressions = function(key, section, header, doc, ppm, pageConfig) {

    page.Page.call(this, section, header, doc, ppm, pageConfig);

    this.key = key;
}

PageProgressions.prototype = Object.create(page.Page.prototype);
PageProgressions.prototype.constructor = PageProgressions;

PageProgressions.prototype.render = function() {
    doc.addPage(this.pageConfig);
    this.addPageNumber();
    this.addPageSection();
    this.addPageHeader();
}

module.exports = {
    PageProgressions: PageProgressions
}