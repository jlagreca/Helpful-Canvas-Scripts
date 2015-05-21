(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'SomeURL/favicon.ico';//change to point to your ico
    document.getElementsByTagName('head')[0].appendChild(link);
}());