import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampDocument = Camp & Document;

@Schema()
export class Camp {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ type: [String], default: [] })
  attendees: string[];
}

export const CampSchema = SchemaFactory.createForClass(Camp);
