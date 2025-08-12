import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './rewards.schema';

@Controller('rewards')
export class RewardsController {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<RewardDocument>) {}

  @Get('donor/:id')
  async getDonorRewards(@Param('id') id: string) {
    return this.rewardModel.findOne({ donorId: id });
  }
}
