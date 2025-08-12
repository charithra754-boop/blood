import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HospitalDocument = Hospital & Document;

@Schema()
export class Hospital {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ type: Object, default: {} })
  inventory: Record<string, number>; // bloodGroup: units
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
