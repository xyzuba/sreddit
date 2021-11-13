import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { File } from "../types";
import { createWriteStream } from "fs";

@Resolver()
export class PictureResolver {
  @Mutation(() => Boolean)
  async addPicture(
    @Arg("picture", () => GraphQLUpload) { filename, createReadStream }: File
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `../../images/${filename}`))
        .on("open", resolve)
        .on("error", reject)
    );
  }
}
