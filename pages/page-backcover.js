var page = require('./page.js');

PageBackCover = function(doc, ppm, pageConfig) {

    page.Page.call(this, null, null, doc, ppm, pageConfig);
}

PageBackCover.prototype = Object.create(page.Page.prototype);
PageBackCover.prototype.constructor = PageBackCover;

PageBackCover.prototype.render = function() {
    doc.addPage(this.pageConfig);
    doc.text('Back Cover')
}

module.exports = {
    PageBackCover: PageBackCover
}