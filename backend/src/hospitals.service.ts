import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from './schemas/hospital.schema';

@Injectable()
export class HospitalsService {
  constructor(@InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>) {}

  async getHospital(id: string) {
    return this.hospitalModel.findById(id);
  }

  async updateInventory(id: string, inventory: Record<string, number>) {
    return this.hospitalModel.findByIdAndUpdate(id, { inventory }, { new: true });
  }
}
