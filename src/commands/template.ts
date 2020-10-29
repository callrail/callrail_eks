import { Command, flags } from '@oclif/command';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getDomain } from '../helpers/cli-config';
import { writeTemplate } from '../helpers/eks-template';

export default class Template extends Command {
  static description: string = 'Sets current template';
  static examples: string[] = ['$callrail_eks namespace my-namespace'];
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
