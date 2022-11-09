const template =
`
import "reflect-metadata";

export const serviceType = {
<% serviceList.forEach(function(service){ %>
<%=service.interfaceName%>: Symbol.for("<%=service.interfaceName%>"),<% }); %>
};
`

module.exports = template;