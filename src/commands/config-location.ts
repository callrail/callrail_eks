import { Command, flags } from '@oclif/command';
import { writeConfigFile } from '../helpers/cli-config';

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

  async run() {
    const { args } = this.parse(ConfigLocation);
    const { config } = args;
    writeConfigFile({ config });
  }
}
