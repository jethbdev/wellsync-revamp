import { Controller, Get, Post, Delete, Body, Param, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { DocumentsService } from './documents.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/patients/:id/documents')
@UseGuards(StaffAuthGuard)
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Get()
  @RequirePermission('patients', 'read')
  async listDocuments(
    @Param('id') patientId: string
  ) {
    return this.service.listDocuments(patientId);
  }

  @Post()
  @RequirePermission('patients', 'update')
  async uploadDocument(
    @Param('id') patientId: string,
    @Body() body: { fileName: string; fileType: string; fileSize: number; fileUrl: string },
    @Req() req: Request & { session: any }
  ) {
    const uploadedBy = req.session.user.id;
    return this.service.uploadDocument(patientId, {
      ...body,
      uploadedBy
    });
  }

  @Delete(':docId')
  @RequirePermission('patients', 'update')
  async deleteDocument(
    @Param('id') patientId: string,
    @Param('docId') docId: string
  ) {
    return this.service.deleteDocument(patientId, docId);
  }
}
