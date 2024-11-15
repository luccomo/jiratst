import com.onresolve.scriptrunner.runner.customisers.WithPlugin
import com.onresolve.scriptrunner.runner.customisers.PluginModule
import com.atlassian.jira.component.ComponentAccessor
import groovy.xml.MarkupBuilder

@WithPlugin("com.onresolve.jira.groovy.groovyrunner")
def getFragment() {
    def htmlUrl = "https://your-cdn-or-server.com/inventory-panel.html"
    def cssUrl = "https://your-cdn-or-server.com/inventory-panel.css"
    def jsUrl = "https://your-cdn-or-server.com/inventory-panel.js"
    
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