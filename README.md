jquery-doubleTapToGo
============
Brings drop-down navigation-usability for touch devices. Built as jQuery UI widget.

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
<script src="../src/jquery.dcd.doubleTapToGo.js" type="text/javascript"></script>

<!-- 4. Bind widget to containers -->
<script type="text/javascript">
    $(function () {
        $('.navigation').doubleTapToGo();
    });
</script>
```

Options
============

- **levels**: Number of navigation levels for doubleTapping `[Default: 1 | -1 for all levels]`