const template =
`
import "reflect-metadata";

export const repositoryType = {
<% repositoryList.forEach(function(repository){ %>
<%=repository.interfaceName%>: Symbol.for("<%=repository.interfaceName%>"),<% }); %>
};
`

module.exports = template;