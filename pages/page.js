
/*
*   File:       page.js
*   Project:    MusicBook
*   Date:       June 2016.
*
*   Autho:      Todd Hibbs
*
*   Description: This is the base class for all music book pages.
*                Derived objects inherit these properties and override the render method to output page specific content
*/

var _ = require('lodash');
var tonal = require('tonal');
var filter = require('tonal-filter');

var Page = function(section, header, doc, ppm, pageConfig) {
    this.section = section;
    this.header = header;
    this.doc = doc;
    this.ppm = ppm;
    this.pageConfig = pageConfig;

    this.currentX = 10;
    this.currentY = 10;

    this.noteScales = 'major_minor_harmonic minor_major pentatonic_minor pentatonic_major blues_minor blues_lydian'.split('_');
    this.intervals = _.map(_.range(12), tonal.fromSemitones);
}

Page.prototype.render = function() {
    doc.addPage(this.pageConfig);
    this.addPageNumber();
    this.addPageSection();
    this.addPageHeader();
}

Page.prototype.addPageNumber = function() {
    var currentPageNumber = this.doc._root.data.Pages.data.Count;
    doc.save();
    doc.fontSize(8);
    var pageNumberYOffset = this.doc.page.height - (17.5 * this.ppm);
    doc.text(currentPageNumber, this.doc.page.width / 2, pageNumberYOffset);
    doc.restore();
}

Page.prototype.addPageHeader = function() {

    var x = this.doc.page.margins.left;
    var y = this.doc.page.margins.top;
    doc.save();

    doc.fontSize(24);
    doc.text(this.header, x, y);

    var textHeight = this.doc.heightOfString(this.header);
    var underLineY = y + textHeight + 5;
    doc.moveTo(x, underLineY).lineTo(x + this.doc.page.width - 70 - (x * 2), underLineY).stroke();

    doc.restore();

    return underLineY;
}

Page.prototype.addPageSection = function() {
    doc.save();

    var sectionWidth = 50;
    var sectionHeight = 50;
    var sectionXOffset = this.doc.page.width - this.doc.page.margins.right - 50; 
    var sectionYOffset = this.doc.page.margins.top;

    doc.roundedRect(sectionXOffset, sectionYOffset, sectionWidth, sectionHeight, 5).fill('black');
    

    //doc.fontSize(this.getMaxFontSize(50,10,this.section));

    doc.fontSize(24);

    var textWidth = this.doc.widthOfString(this.section);
    var textHeight = this.doc.heightOfString(this.section);
    var textXOffset = sectionXOffset + (sectionWidth / 2) - (textWidth / 2);
    var textYOffset = sectionYOffset + (sectionHeight / 2) - (textHeight / 3);

    doc.fillColor('white').text(this.section, textXOffset, textYOffset);
    
    doc.restore();
}

Page.prototype.drawIntervalRow = function(interval, name, startX, startY, showIntervals) {

    var width = 12 * this.ppm;
    var height = 6 * this.ppm;
    var currentX = startX;
    var currentY = startY;

    doc.save();

    doc.fontSize(12);

    var textWidth;
    var textHeight;
    var textX;
    var textY;
    var startArrowX = currentX + (width / 2);
    var endArrowX;
    var arrowY = currentY + height;

    _.each(this.intervals, function(intervalName, index) {
        if (showIntervals) {
            doc.fontSize(10);
            textWidth = this.doc.widthOfString(intervalName);
            textHeight = this.doc.heightOfString(intervalName);
            textX = currentX + (width / 2) - (textWidth / 2);
            textY = currentY - textHeight;

            doc.fillColor('#333').text(intervalName, textX, textY);
        }
        doc.rect(currentX, currentY, width, height)

        if (intervalName == interval || intervalName == '1P') {
            doc.stroke();

            if (intervalName == interval) {
                endArrowX = currentX + (width / 2);
            }

        }
        else {
            doc.fillAndStroke('#ccc', '#333');
        }

        currentX += width;
    });

    console.log('startArrowX:' + startArrowX + ' endX:' + endArrowX)

    doc.fontSize(12);

    textWidth = this.doc.widthOfString(name);
    textHeight = this.doc.heightOfString(name);
    textX = currentX + 5 * this.ppm;
    textY = currentY + (height / 2) - (textHeight / 2) + 2;
    doc.fillColor('black').text(name, textX, textY);

    doc.moveTo(startArrowX, arrowY).bezierCurveTo(startArrowX, arrowY + 15, endArrowX, arrowY + 15, endArrowX, arrowY).stroke();

    doc.restore();
}

Page.prototype.drawScaleRow = function(key, notes, name, startX, startY, showIntervals) {

    var intervalNotes = tonal.harmonize(this.intervals, key);   

    var width = 12 * this.ppm;
    var height = 12 * this.ppm;
    var currentX = startX;
    var currentY = startY;

    doc.save();

    doc.fontSize(12);

    //console.log(this.ppm);

    var textWidth;
    var textHeight;
    var textX;
    var textY;

    _.each(this.intervals, function(intervalName, index) {
        var currentNote = intervalNotes[index];
        var isNoteInScale = !!filter.scaleFilter(notes, currentNote);
        
        if (showIntervals) {
            doc.fontSize(10);
            textWidth = this.doc.widthOfString(intervalName);
            textHeight = this.doc.heightOfString(intervalName);
            textX = currentX + (width / 2) - (textWidth / 2);
            textY = currentY - textHeight;

            doc.fillColor('#333').text(intervalName, textX, textY);
        }

        doc.rect(currentX, currentY, width, height);

        if (isNoteInScale) {
            doc.stroke();

            var noteName = intervalNotes[index];

            doc.fontSize(16);

            textWidth = this.doc.widthOfString(noteName);
            textHeight = this.doc.heightOfString(noteName);
            textX = currentX + (width / 2) - (textWidth / 2);
            textY = currentY + (height / 2) - (textHeight / 2) + 2;
            doc.fillColor('#333333').text(noteName, textX, textY);

        }
        else {
            doc.fillAndStroke('#ccc', '#333');
        }

        currentX += width;

    });

    doc.fontSize(12);

    textWidth = this.doc.widthOfString(name);
    textHeight = this.doc.heightOfString(name);
    textX = currentX + 5 * this.ppm;
    textY = currentY + (height / 2) - (textHeight / 2) + 2;
    doc.fillColor('black').text(name, textX, textY);

    doc.restore();
}


Page.prototype.buildIntervals = function() {
    var data = [];
    for(var i = 0; i < 12; i++) {
        data.push(tonal.fromSemitones(i));
    }
    return data;
}

// Page.prototype.getMaxFontSize = function(width, padding, text) {
//     // (padding + text width + padding) < width
    
//     //gets maximum font size that will meet this requirement
//     //range checked is from 6 - 144 point font in one point increments

//     var startFontSize = 6;
//     var maxFontSize = 144;
//     var maxFontWidth = width - (padding * 2);
//     var currentFontSize = startFontSize;

//     while(currentFontSize <= maxFontSize) {
//         if (this.doc.widthOfString(text) <= maxFontWidth) {
//             currentFontSize++;
//             doc.fontSize(currentFontSize);
//         }
//     }

//     return currentFontSize;
// }


//************************************************************************************



module.exports = {
    Page: Page
}



