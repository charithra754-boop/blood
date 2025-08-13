import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertDocument } from './alerts.schema';

@Controller('alerts')
export class AlertsController {
  constructor(@InjectModel(Alert.name) private alertModel: Model<AlertDocument>) {}

  @Get('hospital/:id')
  async getHospitalAlerts(@Param('id') id: string) {
    return this.alertModel.find({ hospitalId: id });
  }

  @Get('donor/:id')
  async getDonorAlerts(@Param('id') id: string) {
    return this.alertModel.find({ responses: id });
  }
}
