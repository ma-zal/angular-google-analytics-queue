Angular-Google-Analytics-Queue library
======================================

**AngularJS Service for using Google Analytics.**

 
Explanation
-----------

Google Analytics is not possible to use directly by calling `window.ga(...)` because of asynchronous GA library loading.
If you call `window.ga(...)` too earlier, the method does not exists because Ga library is not loaded yet.

This service creates a queue layer. If GA is not ready, commands are stored - and send immediately
when GA library loading is finished.

Library use
-----------

Install by bower:

    bower install --save https://github.com/ma-zal/angular-google-analytics-queue.git#master
    

In HTML head:

```html
<!-- Common GA include -->
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-12345678-123', 'auto');
    // ga('send', 'pageview'); // Disabled, because of SPA application are sending it manually
</script>

<!-- GAQ Library -->
<script type="text/javascript" src="bower_components/angular-google-analytics-queue/google-analytics-queue.js"></script>
```

Angular module dependencies:

```javascript
angular.module('myApp', [ 'gaq' ] );
```

Using in controller:

```javascript
// Inject `ga` into controller function
angular.module('myApp').controller('exampleController', function(ga) {
    // use `ga` method transparently in same way as with Google Analytics library.

    // Example 1
    ga('send', 'pageview');

    // Example 2
    ga('send', {
        hitType: 'event',
        eventCategory: 'Static pages',
        eventAction: 'View Welcome page',
        eventLabel: 'Welcome on my page'
    });
});
```



Alternative: Synchronous library loading
----------------------------------------
If you do not want to use any additional library, you can load the Google Analytics synchronously.
For this alternative, do not use this original script:

```html
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-12345678-123', 'auto');
    // ga('send', 'pageview'); // Disabled, because of SPA application are sending it manually
</script>
```

But switch it to this synchronous variant:
	
```html
<script type="text/javascript" src="https://www.google-analytics.com/analytics.js"></script>
<script type="text/javascript">
    ga('create', 'UA-12345678-123', 'auto');
</script>
```

Notice: If you are using Google Tag Manager, this does NOT solve issue, because Google Tag Manager
is always loaded asynchronously.
	
	
Debugging of Google Analytics
-----------------------------

If you want to see, which events are sending to Google Analytics servers, you can enable GA debug mode.
It can be done by switching the script from `https://www.google-analytics.com/analytics.js` to
`https://www.google-analytics.com/analytics_debug.js`.

And now, you will see the details in browser's console.

---

Licence: MIT
