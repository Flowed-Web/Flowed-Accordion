/**
 * SimpleAccordion — modular accordion component with support for:
 * - nested accordions
 * - modal behavior (only one open at a time)
 * - self-close prevention
 * - smooth jQuery slide animations
 * - support for grouped behavior via data-acc-group
 */

class SimpleAccordion {
    static groupLocks = new Map();     // Prevent race conditions in grouped accordions
    static modalLocks = new Map();     // Prevent race conditions in modal mode

    constructor(container, options = {}) {
        this.$container = $(container);
        this.items = this.$container.children('.acc--item').toArray();
        this.opts = {
            modal: true,
            preventSelfClose: true,
            animationSpeed: 300,
            easing: 'swing',
            closeSpeed: null,
            closeEasing: null,
            onToggle: () => {},
            ...options
        };
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const $item = $(item);
            const $content = $item.find('.acc--content').first();
            $content.css({ display: 'none', overflow: 'hidden' });

            if (item.dataset.open != null) {
                $content.show();
                item.classList.add('acc--open');
            }

            $item.find('.acc--header').first().on('click', (e) => {
                if (!$(e.target).closest('.acc--wrapper').is(this.$container)) return;
                this.toggle(item);
            });

            $content.find('.acc--wrapper').each((_, nested) => {
                if (!nested.dataset.simpleAccordion) {
                new SimpleAccordion(nested, this.opts);
                nested.dataset.simpleAccordion = 'true';
                }
            });
        });
    }

    toggle(item) {
        const $item = $(item);
        const $wrapper = $item.closest('.acc--wrapper');
        const isOpen = $item.hasClass('acc--open');
        const groupName = this.$container.data('acc-group');
        const isGrouped = !!groupName;

        // Grouped accordion logic (data-acc-group)
        if (isGrouped) {
            if (SimpleAccordion.groupLocks.get(groupName)) return;
            SimpleAccordion.groupLocks.set(groupName, true);
            const unlock = () => SimpleAccordion.groupLocks.delete(groupName);

            if (isOpen) {
                this.close(item, true, unlock);
            } else {
                const openItems = $(`[data-acc-group="${groupName}"] .acc--item.acc--open`);
                let pending = openItems.length;
                if (pending === 0) {
                    this.open(item, true, unlock);
                } else {
                    openItems.each((_, openItem) => {
                        this.close(openItem, false, () => {
                            pending--;
                            if (pending === 0) {
                                this.open(item, true, unlock);
                            }
                        });
                    });
                }
            }
            return;
        }

        // Modal logic (only one item open at a time)
        if (this.opts.modal) {
            if (SimpleAccordion.modalLocks.get(this.$container[0])) return;
            SimpleAccordion.modalLocks.set(this.$container[0], true);
            const unlock = () => SimpleAccordion.modalLocks.delete(this.$container[0]);

            if (isOpen && this.opts.preventSelfClose) {
                unlock();
                return;
            }

            if (isOpen) {
                this.close(item, true, unlock);
            } else {
                const openItems = this.items.filter(i => i !== item && $(i).hasClass('acc--open'));
                let pending = openItems.length;
                if (pending === 0) {
                    this.open(item, true, unlock);
                } else {
                    openItems.forEach(openItem => {
                        this.close(openItem, false, () => {
                            pending--;
                            if (pending === 0) {
                            this.open(item, true, unlock);
                            }
                        });
                    });
                }
            }
            return;
        }

        // Fallback logic (non-modal, no group)
        if (isOpen && this.opts.preventSelfClose) return;
        if (item.dataset.animating === 'true') return;
        isOpen ? this.close(item) : this.open(item);
    }

    open(item, callCallback = true, onDone = () => {}) {
        const $item = $(item);
        const $content = $item.find('.acc--content').first();
        if (item.dataset.animating === 'true') return;
        item.dataset.animating = 'true';
        $content.stop(true, true).slideDown(this.opts.animationSpeed, this.opts.easing, () => {
            item.dataset.animating = 'false';
            $item.addClass('acc--open');
            if (callCallback) this.opts.onToggle(item, true);
            onDone();
        });
    }

    close(item, callCallback = true, onDone = () => {}) {
        const $item = $(item);
        const $content = $item.find('.acc--content').first();
        if (item.dataset.animating === 'true') return;
        item.dataset.animating = 'true';
        $content.stop(true, true).slideUp(this.opts.closeSpeed ?? this.opts.animationSpeed, this.opts.closeEasing ?? this.opts.easing, () => {
            item.dataset.animating = 'false';
            $item.removeClass('acc--open');
            if (callCallback) this.opts.onToggle(item, false);
            onDone();
        });

        // Close nested items recursively
        $content.find('.acc--item.acc--open').each((_, nested) => {
        this.close(nested, false);
        });
    }
}