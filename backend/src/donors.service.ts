import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donor, DonorDocument } from './schemas/donor.schema';

@Injectable()
export class DonorsService {
  constructor(@InjectModel(Donor.name) private donorModel: Model<DonorDocument>) {}

  async getDonor(id: string) {
    return this.donorModel.findById(id);
  }

  async updateDonor(id: string, update: Partial<Donor>) {
    return this.donorModel.findByIdAndUpdate(id, update, { new: true });
  }
}
