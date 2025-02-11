import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 720,
} as const;
export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformations?: {
        width: number;
        height: number;
        quality?: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

const VideoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    transformations: {
        type: {
            width: {
                type: Number,
                default: VIDEO_DIMENSIONS.width
            },
            height: {
                type: Number,
                default: VIDEO_DIMENSIONS.height
            },
            quality: {
                type: Number,
                min: 1,
                max: 100
            }
        }
    }
},
    { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", VideoSchema);
export default Video;