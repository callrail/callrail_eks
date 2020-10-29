import { Command, flags } from '@oclif/command';
import { writeTemplate } from '../helpers/eks-template';

export default class Template extends Command {
  static description: string = 'Generate EKS Yaml template';
  static examples: string[] = [
    '$callrail_eks template',
    '$callrail_eks template -d my-domain',
    '$callrail_eks template -b my-branch',
    '$callrail_eks template -d my-domain -b my-branch'
  ];
  static flags = {
    help: flags.help({char: 'h'}),
    domain: flags.string({
      char: 'd'
    }),
    branch: flags.string({
      char: 'b',
      default: 'master'
    })
  };
  static args = [];

  async run() {
    const { flags } = this.parse(Template);
    const { branch, domain } = flags;
    writeTemplate(branch, domain);
  }
}
