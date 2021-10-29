import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelpResolver {
  @Query(() => String)
  help() {
    return "save my miserable soul";
  }
}
