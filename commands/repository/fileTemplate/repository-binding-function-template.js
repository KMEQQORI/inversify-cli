const template =
`<% repositoryList.forEach(function(repository){ %>
import { <%=repository.interfaceName%> } from "<%=repository.interfaceFilePath%>";
import { <%=repository.implementationName%> } from "<%=repository.implementationFilePath%>";<% }); %>

export function bindRepository(): void {<% repositoryList.forEach(function(repository){ %>
  iocContainer
    .bind<<%=repository.interfaceName%>>(TYPE.<%=repository.interfaceName%>)
    .to(<%=repository.implementationName%>)
    .inSingletonScope();<% }); %>

}
`

module.exports = template;