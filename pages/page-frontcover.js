
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');

PageFrontCover = function(doc, ppm, pageConfig) {

    page.Page.call(this, null, null, doc, ppm, pageConfig);
}

PageFrontCover.prototype = Object.create(page.Page.prototype);
PageFrontCover.prototype.constructor = PageFrontCover;

PageFrontCover.prototype.render = function() {
    doc.addPage(this.pageConfig);
    doc.text('Front Cover')
}

module.exports = {
    PageFrontCover: PageFrontCover
}