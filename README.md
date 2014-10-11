##*Qwg*   _noun_   _\ˈkw-eeg\_

![qwg install](https://github.com/daviddenton/qwg/blob/master/qwg/docs/ChromeWebStore_Badge_v2_206x58.png "Install")

A Chrome browser extension that converts the Omnibox (the multi-use URL bar) into a predictive bookmark launcher for the browser, based on a configuration tree that you supply. An additional mode for searching the tree via the context-menu (right-click) is also supported.

In it's simplest form, Qwg can be used to launch public webpages with content based on the inputted query (e.g. for search engines other than Google).  A more realistic (and advanced) real-world example would be to use it for consistently presented access to URL-based services in multiple development environments (dev/test/prod).

###Installation

From the [Chrome Web Store](https://chrome.google.com/webstore/detail/qwg/gdnhdogahjoiggjnlmbhdlgeihfioeic), Qwg can be installed by downloading the .crx package file from the artifacts directory in the repo and then manually dragging this file into the Chrome [Extensions option](chrome://chrome/extensions/) page.

###Usage

####Omnibox
Qwg can be activated by typing 'qwg' into the Chrome Omnibox and then hitting &lt;space&gt;. Then there are 2 options:

1. To see a list of available completions, hit &lt;space&gt; again. This will bring up a list of options based on the Qwg engine walking the configuration tree (see below for more details). Selecting one of these options with &lt;space&gt; will bring up the next tier of completions.

2. If you know the query that you want to run, just keep typing. Qwg will automatically narrow down the available completions as you type.

####An example
For the configuration:
 ```javascript
 {
    ask: "http://ask.com/$QUERY$",
    bing: "http://bing.com/$QUERY$",
    google: "http://google.com/$QUERY$",
    wolfram: "http://wolfram.com/$QUERY$"
}
```
a query of `qwg ask lolcats` will search `ask.com` for some cute felines.

![qwg omnibox menu](https://github.com/daviddenton/qwg/raw/master/qwg/docs/omnibox.png "Omnibox")

###Context-menu
Select some text in the browser and then right-click to navigate the configuration tree using the context-menu using the selected text as the end query. For the above example, you'd highlight the word `lolcats` then right-click and select `Qwg -> ask` to achieve the same result.

![qwg context menu](https://github.com/daviddenton/qwg/raw/master/qwg/docs/context.png "Context")

####Configuration
Opening the Qwg extension options tab will display an inline editor. The configuration tree is coded in JavaScript and which should resolve to a valid JavaScript object, whose properties make up the tree of available completions presented to the user. The nature of the configration code should be purely functional (ie. have no side-effects), as it will be executed at various points in the extension lifecycle.

Dynamic trees can be generated by embedding functions in the configuration object. The functions have the signature `aFunction(unmatchedQuery)` and return either a URL `String` (for leaf nodes) or an `Object` (whose properties make up the subsequent set of completions).

The default configuration of the extension has examples of the various available options for tree resolution.

####A note on security
Due to the nature of Qwg using user-defined JavaScript scripts, the Chrome API requires that all such code be executed in a sandboxed environment, which places some limitations on what can be executed. The configuration object cannot therefore load external JavaScript files.
