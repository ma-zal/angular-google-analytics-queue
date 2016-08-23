Angular-Google-Analytics-Queue library
======================================

**AngularJS Service for using Google Analytics.**

 
Explanation
-----------

Google Analytics is not possible to use directly by calling `window.ga(...)` because of asynchronous GA library loading.
If you call `window.ga(...)` too earlier, the method does not exists because Ga library is not loaded yet.

This service creates a queue layer. If GA is not ready, commands are stored - and send immediately
when GA library loading is finished.


Alternative: Synchronous library loading
----------------------------------------
If you do not want to use any additional library, you can load the Google Analytics synchronously.
For this alternative, do not use this original script:

```javascript
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
	
```javascript
<script type="text/javascript" src="//www.google-analytics.com/analytics.js"></script>
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
