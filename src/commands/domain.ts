import { Command, flags } from '@oclif/command';
import { writeConfigFile } from '../helpers/cli-config';

export default class Domain extends Command {
  static description: string = 'Sets current domain';
  static examples: string[] = ['$callrail_eks domain my-domain'];
  static flags = {
    help: flags.help({char: 'h'})
  };
  static args = [
    {
      name: 'domain',
      description: 'Domain associated with the eks environment. Just include the base, as the rest will be appended'
    }
  ];

  async run() {
    const { args } = this.parse(Domain);
    const { domain } = args;
    writeConfigFile({ domain: `${domain}.eks.staging-callrail.com` });
  }
}
