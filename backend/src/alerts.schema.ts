import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlertDocument = Alert & Document;

@Schema()
export class Alert {
  @Prop({ required: true })
  hospitalId: string;

  @Prop({ required: true })
  bloodGroup: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: [String], default: [] })
  responses: string[];
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
