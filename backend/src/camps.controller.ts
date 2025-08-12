import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Camp, CampDocument } from './camps.schema';

@Controller('camps')
export class CampsController {
  constructor(@InjectModel(Camp.name) private campModel: Model<CampDocument>) {}

  @Get()
  async getCamps() {
    return this.campModel.find();
  }

  @Get(':id')
  async getCamp(@Param('id') id: string) {
    return this.campModel.findById(id);
  }

  @Post()
  async createCamp(@Body() body: Partial<Camp>) {
    const camp = new this.campModel(body);
    return camp.save();
  }

  @Post(':id/register')
  async registerAttendee(@Param('id') id: string, @Body() body: { attendeeId: string }) {
    return this.campModel.findByIdAndUpdate(id, { $push: { attendees: body.attendeeId } }, { new: true });
  }
}
