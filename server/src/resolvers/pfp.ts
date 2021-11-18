import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { File } from "../types";
import { createWriteStream } from "fs";

@Resolver()
export class PictureResolver {
  @Mutation(() => Boolean)
  async uploadPicture(
    @Arg("picture", () => GraphQLUpload) { filename, createReadStream }: File
  ): Promise<boolean> {
    // const uploadPic = (files) => {
    //   const formData = new FormData();
    //   formData.append("file", files[0]);
    //   formData.append("upload-preset", uploadPreset);
    // };

    let imgUrl = "";
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(
            `https://api.cloudinary.com/v1_1//image/upload`
            ///Volumes/flash/waiting/sreddit/sreddit/server/images/${filename}
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
