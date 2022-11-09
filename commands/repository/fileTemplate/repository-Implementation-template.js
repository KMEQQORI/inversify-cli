const template =
`
import { injectable } from "inversify";

@injectable()
export class <%=implementationName%> implements <%=interfaceName%> {
}
`

module.exports = template;