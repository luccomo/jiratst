import com.onresolve.scriptrunner.runner.customisers.WithPlugin
import com.onresolve.scriptrunner.runner.customisers.PluginModule
import com.atlassian.jira.component.ComponentAccessor
import groovy.xml.MarkupBuilder

@WithPlugin("com.onresolve.jira.groovy.groovyrunner")
def getFragment() {
    def baseUrl = "https://cdn.jsdelivr.net/gh/luccomo/jiratst"
    def htmlUrl = "${baseUrl}/inventory-panel.html"
    def cssUrl = "${baseUrl}/inventory-panel.css"
    def jsUrl = "${baseUrl}/inventory-panel.js"
    
    def writer = new StringWriter()
    def html = new MarkupBuilder(writer)
    
    html.div(class: 'inventory-panel') {
        link(rel: 'stylesheet', href: cssUrl)
        div(id: 'inventory-container')
        script(src: jsUrl, type: 'text/javascript')
        script(type: 'text/javascript', """
            fetch('${htmlUrl}')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('inventory-container').innerHTML = html;
                });
        """)
    }
    
    return writer.toString()
}

return getFragment()