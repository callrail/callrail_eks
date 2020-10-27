import { Command, flags } from '@oclif/command';
import { join } from 'path';
import {
  writeFileSync,
  readFileSync,
  existsSync
} from 'fs';

export default class ConfigLocation extends Command {
  static description: string = 'Sets location of eks yaml config';
  static examples: string[] = ['$callrail_eks config-location my-config'];
  static flags = {
    help: flags.help({char: 'h'})
  };
  static args = [
    {
      name: 'config',
      description: 'Kubernetes configuration'
    }
  ];

  fileName: string = join(__dirname, 'config.json');

  async run() {
    const {args, flags} = this.parse(ConfigLocation);
    const { config } = args;
    if(existsSync(this.fileName)) {
      const rawData = readFileSync(this.fileName);
      const parsedData = JSON.parse(rawData.toString());
      this.writeConfig(parsedData)
    } else {
      this.writeConfig({ config })
    }
  }

  private writeConfig(parsedData: any): void {
    writeFileSync(this.fileName, JSON.stringify(parsedData));
  }
}
