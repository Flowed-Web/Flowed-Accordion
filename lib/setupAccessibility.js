/**
 * setupAccessibility — adds ARIA and role attributes for screen readers
 * Works only if .acc--header is a <button>
 * Adds: aria-expanded, aria-controls, aria-labelledby, role="region"
 */

function setupAccessibility() {
    let accId = 0;

    $('[data-accordion]').each(function () {
        const $wrapper = $(this);

        $wrapper.find('.acc--item').each(function () {
            const $item = $(this);
            const $header = $item.find('.acc--header').first();
            const $content = $item.find('.acc--content').first();

            // Only apply if header is a button (keyboard accessible)
            if (!$header.is('button')) return;

            const triggerId = `acc-button-${accId}`;
            const panelId = `acc-panel-${accId}`;
            accId++;

            $header.attr({
                id: triggerId,
                'aria-expanded': $item.hasClass('acc--open') ? 'true' : 'false',
                'aria-controls': panelId
            });

            $content.attr({
                id: panelId,
                role: 'region',
                'aria-labelledby': triggerId
            });
        });
    });

    // Auto-update aria-expanded when state changes
    const observer = new MutationObserver(() => {
        $('.acc--item').each(function () {
            const $item = $(this);
            const isOpen = $item.hasClass('acc--open');
            $item.find('.acc--header[aria-expanded]').attr('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    observer.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
}
