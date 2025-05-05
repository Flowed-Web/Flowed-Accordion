/**
 * setupIconsDefault — handles plus-minus icon animation
 * It animates the vertical line to disappear when open.
 * Works with: .acc--icon[data-icon-anim="plus-minus"]
 */

function setupIconsDefault() {
    $('[data-accordion]').each(function () {
        const wrapper = this;
        const configKey = wrapper.dataset.accordion;
        const config = accordionConfigs[configKey] || accordionConfigs.default;

        const updateIcon = ($item) => {
            const isOpen = $item.hasClass('acc--open');
            const $icon = $item.find('.acc--icon[data-icon-anim="plus-minus"] .acc--icon_line.acc-icon_vertical').first();
            if (!$icon.length) return;

            const duration = isOpen ? config.animationSpeed : (config.closeSpeed ?? config.animationSpeed);

            $icon.css({
                transitionDuration: `${duration}ms`,
                transform: isOpen
                ? 'translateY(-50%) rotate(0deg) scaleY(0)'
                : 'translateY(-50%) rotate(90deg) scaleY(1)',
                opacity: isOpen ? '0' : '1'
            });
        };

        // Observe class changes to detect open/close
        const observer = new MutationObserver(() => {
            $(wrapper).find('.acc--item').each(function () {
                updateIcon($(this));
            });
        });

        observer.observe(wrapper, {
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial setup
        $(wrapper).find('.acc--item').each(function () {
            updateIcon($(this));
        });
    });
}