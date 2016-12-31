/*------------------------------------------------------------*\
 CSS BREAKPOINTS TO JS ENGINE
 \*------------------------------------------------------------*/

/*
 *  Breakpoint Parser V1:
 *  Stores current SCSS breakpoint variable name from breakpoints map in activeBreakpoint object
 */

var activeBreakpoint = {};

// When the page has finished loading, determine which breakpoint is currently active
document.addEventListener("DOMContentLoaded", function () {
    activeBreakpoint.refreshValue = function () {
        this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');

// Debug
// console.log(activeBreakpoint.value);
    };
    activeBreakpoint.refreshValue();
});

// When the page is being resized, determine which breakpoint is currently active
window.onresize = function (event) {
    activeBreakpoint.refreshValue();
};