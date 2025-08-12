import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DonationHistory, DonationHistoryDocument } from './donation-history.schema';

@Controller('donation-history')
export class DonationHistoryController {
  constructor(@InjectModel(DonationHistory.name) private historyModel: Model<DonationHistoryDocument>) {}

  @Get('donor/:id')
  async getDonorHistory(@Param('id') id: string) {
    return this.historyModel.find({ donorId: id });
  }
}
