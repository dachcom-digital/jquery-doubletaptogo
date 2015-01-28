jquery-doubleTapToGo
============
Brings drop-down navigation tapping for touch devices. Built as jQuery UI widget.

Dependencies
============
- jQuery: http://jquery.com/
- jQuery UI Widget: http://jqueryui.com/

Installation
============

```html
<!-- 1. Create your drop-down navigation -->
<nav class="navigation">
    <ul>
        <li><a href="#">First level</a></li>
        <li><a href="#">First level</a>
            <ul>
                <li><a href="#">Second level</a></li>
                <li><a href="#">Second level</a></li>
            </ul>
        </li>
    </ul>
</nav>

<!-- 2. Include libraries -->
<script src="../lib/jquery.js" type="text/javascript"></script>
<script src="../lib/jquery.ui.widget.js" type="text/javascript"></script>

<!-- 3. Include widget -->
<script src="../src/jquery.dcd.doubletaptogo.js" type="text/javascript"></script>

<!-- 4. Bind widget to containers -->
<script type="text/javascript">
    $(function () {
        $('.navigation').doubleTapToGo();
    });
</script>
```

Options
============

- **automatic**: If set to true, tries to find out automatically which elements need doubletap and sets selector class on it. Set to false, if you have a more complex structure and set the selector class manually on the elements. `[Default: true]`
- **selectorClass**: Defines the selector class on which doubletap binds. `[Default: 'doubletap']`

Changelog
============
2.0.0 Refactoring
-----------------
* added automatic mode
* added selector for binding
* removed levels option

1.0.0 Initial Release
---------------------
