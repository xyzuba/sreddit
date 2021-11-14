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
    let imgUrl;
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(
            `/Volumes/flash/waiting/sreddit/sreddit/server/images/${filename}`
            //file:///Volumes/flash/waiting/sreddit/sreddit/server/images/${filename}
          )
        )
        .on("open", resolve)
        .on("finish", () => {
          imgUrl = `//file:///Volumes/flash/waiting/sreddit/sreddit/server/images/${filename}`;
        })
        .on("error", reject)
    );
  }
}
