const template =
`<% controllerList.forEach(function(controller){ %>
import { <%=controller.controllerName%> } from "<%=controller.controllerFilePath%>";<% }); %>

export function bindController(): void {<% controllerList.forEach(function(controller){ %>
  iocContainer
    .bind<<%=controller.controllerName%>>(TYPE.<%=controller.controllerName%>)
    .toSelf();<% }); %>
}
`

module.exports = template;