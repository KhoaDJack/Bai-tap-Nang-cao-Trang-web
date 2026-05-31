# Bootstrap 5 Quick Reference - Hotel App

## 🚀 Start Here

### CDN Links (Already Added to index.html)
```html
<!-- In <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Before </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

---

## 🎯 Most Used Bootstrap Classes

### Buttons
```html
<!-- Primary (blue) -->
<button class="btn btn-primary">Action</button>

<!-- Success (green) - for save/confirm -->
<button class="btn btn-success">Save</button>

<!-- Danger (red) - for delete -->
<button class="btn btn-danger">Delete</button>

<!-- Warning (orange) -->
<button class="btn btn-warning">Alert</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Full width -->
<button class="btn btn-primary w-100">Full Width</button>
```

### Forms
```html
<div class="mb-3">
  <label for="field1" class="form-label">Field Label</label>
  <input type="text" id="field1" class="form-control" placeholder="Enter text">
</div>

<div class="mb-3">
  <label for="select1" class="form-label">Choose option</label>
  <select id="select1" class="form-select">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<div class="mb-3">
  <label for="textarea1" class="form-label">Message</label>
  <textarea id="textarea1" class="form-control" rows="4"></textarea>
</div>
```

### Alerts
```html
<!-- Success (green) -->
<div class="alert alert-success" role="alert">✓ Success message</div>

<!-- Danger (red) -->
<div class="alert alert-danger" role="alert">⚠️ Error occurred</div>

<!-- Warning (orange) -->
<div class="alert alert-warning" role="alert">⏳ Warning message</div>

<!-- Info (blue) -->
<div class="alert alert-info" role="alert">ℹ️ Information</div>
```

### Spacing
```html
<!-- Margin bottom -->
<div class="mb-1">Small gap</div>     <!-- 0.25rem -->
<div class="mb-2">Medium gap</div>    <!-- 0.5rem -->
<div class="mb-3">Large gap</div>     <!-- 1rem -->
<div class="mb-4">Larger gap</div>    <!-- 1.5rem -->
<div class="mb-5">Largest gap</div>   <!-- 3rem -->

<!-- Margin top -->
<div class="mt-2">Top margin</div>
<div class="mt-3">Top margin</div>

<!-- Padding -->
<div class="p-2">Padding all</div>
<div class="px-2">Padding horizontal</div>
<div class="py-2">Padding vertical</div>
```

### Grid (Responsive Layout)
```html
<!-- 2 equal columns on medium+ screens, stacked on small -->
<div class="row">
  <div class="col-md-6">Half width</div>
  <div class="col-md-6">Half width</div>
</div>

<!-- 4 equal columns -->
<div class="row">
  <div class="col-md-3">1/4 width</div>
  <div class="col-md-3">1/4 width</div>
  <div class="col-md-3">1/4 width</div>
  <div class="col-md-3">1/4 width</div>
</div>

<!-- Responsive: full width on small, half on medium, 1/3 on large -->
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Responsive</div>
  <div class="col-12 col-md-6 col-lg-4">Responsive</div>
  <div class="col-12 col-md-6 col-lg-4">Responsive</div>
</div>
```

### Cards (Content Boxes)
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content goes here</p>
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Badges (Status Labels)
```html
<!-- Status indicator -->
<span class="badge bg-success">Available</span>
<span class="badge bg-danger">Booked</span>
<span class="badge bg-warning">Pending</span>
<span class="badge bg-info">On Duty</span>
```

### Spinner (Loading)
```html
<!-- Animated loading spinner -->
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>

<!-- Smaller spinner -->
<div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
```

---

## 📝 Common Patterns

### Form with Submit Button
```html
<form id="myForm">
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" id="name" class="form-control" required>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" class="form-control" required>
  </div>
  <button type="submit" class="btn btn-primary w-100">Submit</button>
  <div id="message" class="alert mt-2" role="alert" style="display:none;"></div>
</form>
```

### List with Edit/Delete Actions
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Item Name</h5>
    <p class="card-text">Item description</p>
    <button class="btn btn-sm btn-primary">Edit</button>
    <button class="btn btn-sm btn-danger">Delete</button>
  </div>
</div>
```

### Status Badge Grid
```html
<div class="row">
  <div class="col-md-3 mb-3">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">Bookings</h6>
        <p class="card-text"><strong>42</strong></p>
        <span class="badge bg-success">Active</span>
      </div>
    </div>
  </div>
  <!-- repeat for other stats -->
</div>
```

---

## ✅ Current Usage in Your App

### Already Using
- ✅ Form inputs (form-control, form-label)
- ✅ Buttons (btn, btn-primary, btn-success, btn-danger)
- ✅ Alerts (alert, alert-success, alert-danger, alert-warning)
- ✅ Spacing (mb-3, mt-2, w-100)

### Ready to Use (Phase 2)
- ⏳ Cards (card, card-body, card-title, card-text)
- ⏳ Grid (row, col-md-6, col-lg-3)
- ⏳ Badges (badge, bg-success, bg-danger)
- ⏳ Spinners (spinner-border)

### Optional Enhancements
- Modals (for confirmations)
- Navbars (for better navigation)
- Dropdowns (for more options)

---

## 🎨 Color Reference

| Color | Class | Use Case |
|-------|-------|----------|
| Blue (Primary) | `btn-primary` | Main actions, Save, Submit |
| Green (Success) | `btn-success` | Confirm, Create, Positive |
| Red (Danger) | `btn-danger` | Delete, Cancel, Negative |
| Orange (Warning) | `btn-warning` | Caution, Alert, In Progress |
| Gray (Secondary) | `btn-secondary` | Cancel, Back, Less important |
| Light | `btn-light` | Alternative action |
| Dark | `btn-dark` | Strong emphasis |

---

## 📱 Responsive Breakpoints

```html
<!-- Mobile first approach -->
<!-- Default: full width (col-12) -->

<!-- col-sm-* : ≥576px (small) -->
<div class="col-sm-6">...</div>

<!-- col-md-* : ≥768px (medium) - MOST COMMON -->
<div class="col-md-6">...</div>

<!-- col-lg-* : ≥992px (large) -->
<div class="col-lg-3">...</div>

<!-- col-xl-* : ≥1200px (extra large) -->
<div class="col-xl-2">...</div>

<!-- Example: Different layouts at different sizes -->
<div class="row">
  <div class="col-12 col-md-6 col-lg-3">
    <!-- Full width on mobile, half on tablet, quarter on desktop -->
  </div>
</div>
```

---

## 🚀 Migration Checklist

When refactoring components to Bootstrap:

- [ ] Change form inputs to have `class="form-control"`
- [ ] Wrap inputs in `<div class="mb-3">` for spacing
- [ ] Add `class="form-label"` to all labels
- [ ] Replace buttons with `class="btn btn-[color]"`
- [ ] Replace error messages with `class="alert alert-danger"`
- [ ] Replace success messages with `class="alert alert-success"`
- [ ] Use `mb-3`, `mt-2` for spacing instead of custom margins
- [ ] Test on mobile (resize browser window)

---

## ❓ Common Questions

**Q: Will Bootstrap conflict with my custom CSS?**
A: No! Load Bootstrap CSS first, then your custom CSS. Your CSS overrides Bootstrap.

**Q: Do I need npm or build tools?**
A: No! Bootstrap is loaded from CDN. No npm, no build process.

**Q: Can I use Bootstrap with vanilla JavaScript?**
A: Yes! Bootstrap works perfectly with vanilla JS. No React/Vue needed.

**Q: How do I customize Bootstrap colors?**
A: Add custom CSS after Bootstrap to override colors. Example:
```css
.btn-primary {
  background-color: #your-hotel-color;
}
```

**Q: What if I need a component Bootstrap doesn't have?**
A: Use custom CSS to create it. Bootstrap provides the foundation, you extend it.

**Q: Is Bootstrap mobile-friendly?**
A: Yes! Responsive design is built-in. Test by resizing browser.

---

## 📚 Documentation Links

- **Main Docs:** https://getbootstrap.com/docs/5.3/
- **Components:** https://getbootstrap.com/docs/5.3/components/
- **Buttons:** https://getbootstrap.com/docs/5.3/components/buttons/
- **Forms:** https://getbootstrap.com/docs/5.3/forms/overview/
- **Cards:** https://getbootstrap.com/docs/5.3/components/card/
- **Alerts:** https://getbootstrap.com/docs/5.3/components/alerts/
- **Grid:** https://getbootstrap.com/docs/5.3/layout/grid/
- **Utilities:** https://getbootstrap.com/docs/5.3/utilities/api/

---

## 🎯 Tips & Tricks

1. **Use `w-100`** for full-width buttons and inputs
2. **Use `mb-3`** for consistent spacing between form groups
3. **Use `btn-sm`** for small buttons in lists
4. **Use `btn-lg`** for prominent action buttons
5. **Use `col-md-`** for most responsive layouts
6. **Use `display:none`** to hide alerts initially, show with JavaScript
7. **Use `role="alert"`** on alerts for accessibility
8. **Use `text-center`** to center text within cards
9. **Use `text-muted`** for secondary text
10. **Use `fw-bold`** for bold text

---

## ✨ Your App Now Has

✅ Professional button styling  
✅ Better form styling  
✅ Color-coded alerts (green/red/orange)  
✅ Consistent spacing  
✅ Mobile-responsive ready  
✅ 50+ Bootstrap components available  

**Next Phase:** Add cards and grids for even better layout!

---

**Bootstrap Version:** 5.3.0  
**CDN Ready:** Yes ✅  
**Conflicts:** None ✅  
**Status:** Production Ready ✅
