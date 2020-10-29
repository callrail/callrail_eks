import { Command, flags } from '@oclif/command';
import { readFileSync, writeFileSync } from 'fs';
import { safeDump, safeLoad } from 'js-yaml';
import { join } from 'path';
import { getDomain } from '../helpers/cli-config';

export default class Template extends Command {
  static description: string = 'Sets current namespace';
  static examples: string[] = ['$callrail_eks namespace my-namespace'];
  static flags = {
    help: flags.help({char: 'h'}),
    branch: flags.string({
      char: 'b',
      default: 'master'
    })
  };
  static args = [];

  async run() {
    const { flags } = this.parse(Template);
    const { branch } = flags;
    const domain = getDomain();
    const bustCache = Math.floor(Math.random() * Math.floor(1000));
    const yamlTemplateRaw = readFileSync(join(__dirname,'../../templates/eks-template.yaml'));
    let yamlString = yamlTemplateRaw.toString()
    yamlString = yamlString.replace('$CACHEBUST', bustCache.toString());
    yamlString = yamlString.replace('$CALLRAILTAG', branch);
    yamlString = yamlString.replace('$BASEDOMAN', domain);

    writeFileSync(join(__dirname, '/eks_config.yaml'), yamlString);
  }
}
