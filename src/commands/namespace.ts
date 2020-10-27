import { Command, flags } from '@oclif/command';
import { join } from 'path';
import {
  writeFileSync,
  readFileSync,
  existsSync
} from 'fs';

export default class Namespace extends Command {
  static description: string = 'Sets current namespace';
  static examples: string[] = ['$callrail_eks namespace my-namespace'];
  static flags = {
    help: flags.help({char: 'h'})
  };
  static args = [
    {
      name: 'namespace',
      description: 'Namespace to use when talking to Kubernetes'
    }
  ];

  fileName: string = join(__dirname, 'config.json');

  async run() {
    const {args, flags} = this.parse(Namespace);
    const { namespace } = args;
    if(existsSync(this.fileName)) {
      const rawData = readFileSync(this.fileName);
      const parsedData = JSON.parse(rawData.toString());
      this.writeConfig(parsedData)
    } else {
      this.writeConfig({ namespace })
    }
  }

  private writeConfig(parsedData: any): void {
    writeFileSync(this.fileName, JSON.stringify(parsedData));
  }
}
