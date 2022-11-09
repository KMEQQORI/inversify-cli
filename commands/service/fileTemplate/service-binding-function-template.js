const template =
`<% serviceList.forEach(function(service){ %>
import { <%=service.interfaceName%> } from "<%=service.interfaceFilePath%>";
import { <%=service.implementationName%> } from "<%=service.implementationFilePath%>";<% }); %>

export function bindService(): void {<% serviceList.forEach(function(service){ %>
  iocContainer
    .bind<<%=service.interfaceName%>>(TYPE.<%=service.interfaceName%>)
    .to(<%=service.implementationName%>)
    .inSingletonScope();<% }); %>

}
`

module.exports = template;