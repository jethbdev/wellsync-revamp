import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async listDocuments(patientId: string) {
    return this.prisma.patientDocument.findMany({
      where: { patientId },
      include: {
        uploader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async uploadDocument(patientId: string, data: { fileName: string; fileType: string; fileSize: number; fileUrl: string; uploadedBy?: string }) {
    const patientExists = await this.prisma.patient.findUnique({
      where: { id: patientId }
    });
    if (!patientExists) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return this.prisma.patientDocument.create({
      data: {
        patientId,
        fileName: data.fileName,
        fileType: data.fileType,
        fileSize: data.fileSize,
        fileUrl: data.fileUrl,
        uploadedBy: data.uploadedBy || null
      },
      include: {
        uploader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
          }
        }
      }
    });
  }

  async deleteDocument(patientId: string, docId: string) {
    const doc = await this.prisma.patientDocument.findFirst({
      where: { id: docId, patientId }
    });
    if (!doc) {
      throw new NotFoundException(`Document with ID ${docId} not found for this patient`);
    }

    return this.prisma.patientDocument.delete({
      where: { id: docId }
    });
  }
}
