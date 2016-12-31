/*------------------------------------------------------------*\
 CSS BREAKPOINTS TO JS ENGINE
 \*------------------------------------------------------------*/

/*
 *  Breakpoint Parser V1:
 *  Stores current SCSS breakpoint variable name from breakpoints map in activeBreakpoint object.
 *  Variable name is split in array with [0] being a device (mobile, tablet, desktop, tv, etc.).
 *  And [1] being a modifier (portrait, landscape, small, medium, large, custom, etc.).
 *  Use it for more advanced logic and precise control
 */


var activeBreakpoint = {};

// When the page has finished loading, determine which breakpoint is currently active
document.addEventListener("DOMContentLoaded", function() {
    activeBreakpoint.refreshValue = function () {
        this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        this.value=this.value.split("-");
        // Debug
        // console.log("Device: " + activeBreakpoint.value[0]);
        // console.log("Modifier: " + activeBreakpoint.value[1]);
    };
    activeBreakpoint.refreshValue();
});

// When the page is being resized, determine which breakpoint is currently active
window.onresize = function(event) {
    activeBreakpoint.refreshValue();
};