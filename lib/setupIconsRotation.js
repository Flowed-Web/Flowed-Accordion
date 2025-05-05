/**
 * setupIconsRotation — handles simple icon rotation (e.g. arrow)
 * Rotates icon 180° when open, and resets on close.
 * Works with: .acc--icon[data-icon-anim="rotate"]
 */

function setupIconsRotation() {
    $('[data-accordion]').each(function () {
        const wrapper = this;
        const configKey = wrapper.dataset.accordion;
        const config = accordionConfigs[configKey] || accordionConfigs.default;

        const updateRotation = ($item) => {
            const $icon = $item.find('.acc--icon[data-icon-anim="rotate"]').first();
            if (!$icon.length) return;

            const isOpen = $item.hasClass('acc--open');
            const duration = isOpen ? config.animationSpeed : (config.closeSpeed ?? config.animationSpeed);

            $icon.css({
                transitionDuration: `${duration}ms`,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            });
        };

        const observer = new MutationObserver(() => {
            $(wrapper).find('.acc--item').each(function () {
                updateRotation($(this));
            });
        });

        observer.observe(wrapper, {
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        $(wrapper).find('.acc--item').each(function () {
            updateRotation($(this));
        });
    });
}