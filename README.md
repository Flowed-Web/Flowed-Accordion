# SimpleAccordion

**SimpleAccordion** is a lightweight, modular accordion component built with **jQuery**, designed for full flexibility, accessibility, and customization. It supports modal behavior, nesting, grouped control, icon animations, and ARIA accessibility.

---

## 📦 Features

- ✅ Modal or independent behavior
- ✅ Group-based exclusivity via `data-acc-group`
- ✅ Nested accordions supported out of the box
- ✅ Smooth jQuery animations with `swing` / `linear`
- ✅ Icon animation modules (rotate / plus-minus)
- ✅ ARIA accessibility with `<button>`
- ✅ Easy configuration with reusable presets
- ✅ Clean separation between logic, modules, styles, and config

---

## 🔧 File Structure

```txt
accordion/
├── lib/                     # Source modules (non-minified)
│   ├── SimpleAccordion.js
│   ├── setupIconsDefault.js
│   ├── setupIconsRotation.js
│   └── setupAccessibility.js
│
├── build/                   # Minified production builds
│   ├── SimpleAccordion.min.js
│   ├── setupIconsDefault.min.js
│   ├── setupIconsRotation.min.js
│   └── setupAccessibility.min.js
│
├── styles/
│   └── accordion.css        # Basic styles for layout and icons
│
├── demo/
│   └── index.html           # Usage example and preview
│
├── accordionConfig.js       # Configuration + initialization
└── README.md

```
---

## ⚙️ Configuration (`accordionConfig.js`)

You can define configuration sets using the `data-accordion="key"` attribute.

```js
const accordionConfigs = {
  faq: {
    modal: true,
    preventSelfClose: true,
    animationSpeed: 300,
    easing: 'swing',
    closeSpeed: 300,
    closeEasing: 'swing'
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
```

---

## 🧩 Available Options

| Option             | Type       | Description                                                              |
| ------------------ | ---------- | ------------------------------------------------------------------------ |
| `modal`            | `Boolean`  | Allow only one open item at a time                                       |
| `preventSelfClose` | `Boolean`  | Prevent closing an open item by clicking it again                        |
| `animationSpeed`   | `Number`   | Opening speed in milliseconds                                            |
| `easing`           | `String`   | jQuery easing for open (`'swing'` or `'linear'`)                         |
| `closeSpeed`       | `Number`   | Closing speed in milliseconds (optional; falls back to `animationSpeed`) |
| `closeEasing`      | `String`   | jQuery easing for close (optional; falls back to `easing`)               |
| `onToggle`         | `Function` | Callback on toggle: `(element, isOpen) => {}`                            |

---

## 🏷️ HTML Attributes

| Attribute        | Usage                                            | Example                                           |
| ---------------- | ------------------------------------------------ | ------------------------------------------------- |
| `data-accordion` | Assigns config key                               | `<div data-accordion="faq">`                      |
| `data-acc-group` | Makes items in different wrappers exclusive      | `<div data-acc-group="A">`                        |
| `data-open`      | Preopens an item                                 | `<div class="acc--item" data-open>`               |
| `data-icon-anim` | Triggers icon animation (`rotate`, `plus-minus`) | `<div class="acc--icon" data-icon-anim="rotate">` |

---

## 🔁 Icon Animation Support

### Rotate (arrow-style):

```html
<div class="acc--icon" data-icon-anim="rotate">▲</div>
```

### Plus/Minus:

```html
<div class="acc--icon" data-icon-anim="plus-minus">
    <span class="acc--icon_line acc-icon_horizontal"></span>
    <span class="acc--icon_line acc-icon_vertical"></span>
</div>
```

---

## ♿ Accessibility (a11y)

### To enable keyboard navigation and screen reader support:

Use

```html 
<button class="acc--header"> instead of <div> 
```

### Script will automatically add:

```txt 
aria-expanded
```
```txt 
aria-controls
```
```txt 
role="region"
```

---

## 🚀 Initialization

### All accordions are initialized via accordionConfig.js:

```js
$('[data-accordion]').each(function () {
  const key = this.dataset.accordion;
  const options = accordionConfigs[key] || accordionConfigs.default;
  new SimpleAccordion(this, options);
});

setupIconsDefault();
setupIconsRotation();
setupAccessibility();
```

---

## 🌐 CDN Usage

### Flowed Accordion is available via jsDelivr. Use @latest to always get the most recent stable version (based on Git tags).

```js 
<!-- jQuery (required) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Core Accordion -->
<script src="https://cdn.jsdelivr.net/gh/Flowed-Web/Flowed-Accordion@latest/build/SimpleAccordion.min.js"></script>

<!-- Optional Modules -->
<script src="https://cdn.jsdelivr.net/gh/Flowed-Web/Flowed-Accordion@latest/build/setupIconsDefault.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Flowed-Web/Flowed-Accordion@latest/build/setupIconsRotation.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Flowed-Web/Flowed-Accordion@latest/build/setupAccessibility.min.js"></script>

<!-- Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Flowed-Web/Flowed-Accordion@latest/styles/accordion.css">

<!-- Configuration & Init -->
<script src="https://cdn.jsdelivr.net/gh/Flowed-Web/Flowed-Accordion@latest/accordionConfig.js"></script>
```

## 💬 License

### MIT — free to use, modify, or embed in any project.