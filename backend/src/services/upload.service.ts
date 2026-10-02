import { cloudinary } from "../config/cloudinary";
import { env } from "../env";
import { AppError } from "../middleware/error";
export interface UploadResult { url: string; publicId: string; bytes: number; format: string; }
export async function uploadFile(buf: Buffer, filename: string, folder: string): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${env.CLOUDINARY_FOLDER}/${folder}`, resource_type: "auto", public_id: filename.replace(/\.[^.]+$/, "") },
      (err, r) => err || !r ? reject(new AppError(500, "Upload failed")) : resolve({ url: r.secure_url, publicId: r.public_id, bytes: r.bytes, format: r.format })
    );
    stream.end(buf);
  });
}
export const deleteFile = (id: string) => cloudinary.uploader.destroy(id);
