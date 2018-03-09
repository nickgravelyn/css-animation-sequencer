(function() {
  var scripts = document.querySelectorAll('script[data-sample-code]')
  for (var i = 0; i < scripts.length; ++i) {
    var code = scripts[i].dataset.sampleCode
    var target = document.querySelector('code[data-sample-code="' + code + '"]')
    var text = scripts[i].innerText.trim()
    text = text.split('\n')

    var baseIndent = text[1].search(/\S/)
    text = text.slice(1, text.length - 1).map(l => l.substring(baseIndent))
    target.innerText = text.join('\n')
  }

  hljs.initHighlightingOnLoad()
})()
