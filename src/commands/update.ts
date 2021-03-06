import { Command, flags } from '@oclif/command';
import { join } from 'path';
import { getNamespace, getEKSConfigLocation } from '../helpers/cli-config';
import { exec } from '../helpers/exec';
import { writeTemplate } from '../helpers/eks-template';

export default class Update extends Command {

  static description: string = 'Updates the callrails eks environment. By default, the whole stack will be updated';
  static examples: string[] = [
    '$ callrail_eks update',
    '$ callrail_eks update -b my-branch',
    '$ callrail_eks update -s callrail/stack',
    '$ callrail_eks update -n my-namespace',
    '$ callrail_eks update -c "~/my-custom-yaml.yml"'
  ];
  static flags = {
    help: flags.help({char: 'h'}),
    branch: flags.string({
      char: 'b',
      default: 'master'
    }),
    stack: flags.string({
      char: 's',
      default: 'callrail/stack'
    }),
    config: flags.string({ char: 'c'}),
    namespace: flags.string({char: 'n'}),
  };

  static args = [];
  configFileLocation: string =  join(__dirname, 'config.json');

  async run() {
    const { flags } = this.parse(Update);
    const {
      branch,
      stack,
      config,
      namespace: namespaceFlag
    } = flags;

    const namespace = namespaceFlag || getNamespace();
    const eksConfigLocation = config || getEKSConfigLocation()
    const commandString = `helm ssm upgrade ${namespace} ${stack} -f ${config || eksConfigLocation}`;
    writeTemplate(branch);
    exec(commandString);
  }

}
