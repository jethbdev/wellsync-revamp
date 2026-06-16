import { Module, Global } from '@nestjs/common';
import { PluginRegistryService } from './plugin-registry.service.js';
import { PluginsController } from './plugins.controller.js';

@Global()
@Module({
  controllers: [PluginsController],
  providers: [PluginRegistryService],
  exports: [PluginRegistryService]
})
export class PluginsModule {}
