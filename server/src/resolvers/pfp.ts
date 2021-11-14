import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { File } from "../types";
import { createWriteStream } from "fs";
import { User } from "../entities/User";

@Resolver()
export class PictureResolver {
  @Mutation(() => User)
  async addPicture(
    @Arg("picture", () => GraphQLUpload) { filename, createReadStream }: File
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(
            `/Volumes/flash/waiting/sreddit/sreddit/server/images/${filename}`
          )
        )
        .on("open", resolve)
        .on("error", reject)
    );
  }
}
