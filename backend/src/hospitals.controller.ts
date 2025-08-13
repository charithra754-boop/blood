import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from './schemas/hospital.schema';

@Controller('hospitals')
export class HospitalsController {
  constructor(@InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>) {}

  @Get(':id')
  async getHospital(@Param('id') id: string) {
    return this.hospitalModel.findById(id);
  }

  @Put(':id/inventory')
  async updateInventory(@Param('id') id: string, @Body() body: { inventory: Record<string, number> }) {
    return this.hospitalModel.findByIdAndUpdate(id, { inventory: body.inventory }, { new: true });
  }
}
