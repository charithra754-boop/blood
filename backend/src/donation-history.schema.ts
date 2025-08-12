import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonationHistoryDocument = DonationHistory & Document;

@Schema()
export class DonationHistory {
  @Prop({ required: true })
  donorId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hospitalId: string;
}

export const DonationHistorySchema = SchemaFactory.createForClass(DonationHistory);
