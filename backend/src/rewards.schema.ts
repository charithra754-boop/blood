import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema()
export class Reward {
  @Prop({ required: true })
  donorId: string;

  @Prop({ required: true })
  points: number;

  @Prop({ type: [String], default: [] })
  badges: string[];

  @Prop({ default: 'bronze' })
  tier: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
