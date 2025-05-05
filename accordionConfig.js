/**
 * accordionConfig.js
 * Main configuration and initialization file for all accordions
 * Used for managing animation, behavior, and setup routines.
 */

// Config presets by key (used via data-accordion="key")
const accordionConfigs = {
    faq: {
        modal: true,
        preventSelfClose: true,
        animationSpeed: 300,
        easing: 'swing',
        closeSpeed: 300,
        closeEasing: 'swing'
    },
    files: {
        modal: false,
        preventSelfClose: false,
        animationSpeed: 400,
        easing: 'linear',
        closeSpeed: 500,
        closeEasing: 'linear'
    },
    default: {
        modal: false,
        preventSelfClose: false,
        animationSpeed: 300,
        easing: 'swing',
        closeSpeed: 300,
        closeEasing: 'swing'
    }
};

// Initialize all accordions on the page
$('[data-accordion]').each(function () {
    const key = this.dataset.accordion;
    const options = accordionConfigs[key] || accordionConfigs.default;
    new SimpleAccordion(this, options);
});

// Optional modules
setupIconsDefault();
setupIconsRotation();
setupAccessibility();