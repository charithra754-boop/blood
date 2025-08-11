import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonorDocument = Donor & Document;

@Schema()
export class Donor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  bloodGroup: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  lastDonationDate: Date;

  @Prop({ default: 0 })
  points: number;

  @Prop({ type: [String], default: [] })
  rewards: string[];
}

export const DonorSchema = SchemaFactory.createForClass(Donor);
