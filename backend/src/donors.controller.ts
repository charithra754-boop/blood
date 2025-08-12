import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donor, DonorDocument } from './schemas/donor.schema';

@Controller('donors')
export class DonorsController {
  constructor(@InjectModel(Donor.name) private donorModel: Model<DonorDocument>) {}

  @Get(':id')
  async getDonor(@Param('id') id: string) {
    return this.donorModel.findById(id);
  }

  @Put(':id')
  async updateDonor(@Param('id') id: string, @Body() update: Partial<Donor>) {
    return this.donorModel.findByIdAndUpdate(id, update, { new: true });
  }
}
