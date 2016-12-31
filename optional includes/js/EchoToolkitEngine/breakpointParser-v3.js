/*------------------------------------------------------------*\
 CSS BREAKPOINTS TO JS ENGINE
 \*------------------------------------------------------------*/

/*
 *  Breakpoint Parser V3:
 *  Stores current SCSS breakpoint variable value from breakpoints map in activeBreakpoint object.
 *  If em-s are used, value is then converted to px for better control over the values.
 */

var activeBreakpoint = {};

// When the page has finished loading, determine which breakpoint is currently active
document.addEventListener("DOMContentLoaded", function () {
    activeBreakpoint.refreshValue = function () {
        this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        if (this.value.slice(-2) == "em") this.value = parseInt(this.value) * 16;
        else this.value = parseInt(this.value);

// Debug
// console.log(activeBreakpoint.value);
    };
    activeBreakpoint.refreshValue();
});

// When the page is being resized, determine which breakpoint is currently active
window.onresize = function (event) {
    activeBreakpoint.refreshValue();
};