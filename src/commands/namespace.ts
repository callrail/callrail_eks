import { Command, flags } from '@oclif/command';
import { writeConfigFile } from '../helpers/cli-config';

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

  async run() {
    const { args } = this.parse(Namespace);
    const { namespace } = args;
    writeConfigFile({ namespace });
  }
}
