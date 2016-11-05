var activeBreakpoint = {};

// When the page has finished loading, determine which breakpoint is currently active
document.addEventListener("DOMContentLoaded", function(event) {
    activeBreakpoint.refreshValue = function () {
        this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');

        // Debug
        console.log(activeBreakpoint);
    };
});

// When the page is being resized, determine which breakpoint is currently active
window.onresize = function(event) {
    activeBreakpoint.refreshValue();
};