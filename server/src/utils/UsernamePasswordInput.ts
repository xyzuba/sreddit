import { GraphQLUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";
import { File } from "../types";

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field(() => GraphQLUpload, { nullable: true })
  picture: File;
}
