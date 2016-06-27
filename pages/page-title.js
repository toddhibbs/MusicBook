
var page = require('./page.js');
var _ = require('lodash');
var tonal = require('tonal');

PageTitle = function(doc, ppm, pageConfig) {

    page.Page.call(this, null, null, doc, ppm, pageConfig);
}

PageTitle.prototype = Object.create(page.Page.prototype);
PageTitle.prototype.constructor = PageTitle;

PageTitle.prototype.render = function() {
    doc.addPage(this.pageConfig);

    doc.text('Title Page');
}

module.exports = {
    PageTitle: PageTitle
}