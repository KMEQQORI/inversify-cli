const template =
`
import { inject, injectable } from "inversify";
import { TYPE } from "../../inversify.type";
import { Request, Response } from "express";
import { buildError } from "../errorHandler";
<% if (relatedServiceInterfaceName!=="null") { %>
import { <%=relatedServiceInterfaceName%> } from "<%=relatedServiceInterfacePath%>";
<% } %>
import { getHeavyUserFromRequest } from "../util";

@injectable()
export class <%controllerName%> {
<% if (relatedServiceInterfaceName!=="null") { %>
  private readonly <%=relatedServiceInterfaceVariable%>: <%=relatedServiceInterfaceName%>;

  constructor(
    @inject(TYPE.<%=relatedServiceInterfaceName%>)
    <%=relatedServiceInterfaceVariable%>: <%=relatedServiceInterfaceName%>
  ) {
    this.<%=relatedServiceInterfaceVariable%> = <%=relatedServiceInterfaceVariable%>;
  }
  
    public example = async (
    request: Request,
    response: Response,
    next: Function
  ): Promise<void> => {
    /* const account: AccountCreationRequest = request.body;

    return this.accountService
      .create(account, idSocieteSupport)
      .then((createdAccount) => response.status(201).send(createdAccount))
      .catch((error) =>
        next(buildError(error, "Error creating a new account"))
      );
     */ 
  };
<% } %>
}
`

module.exports = template;