import { Command, flags } from '@oclif/command';
import { getNamespace, getEKSConfigLocation } from '../helpers/cli-config';
import { exec } from '../helpers/exec';
import { writeTemplate } from '../helpers/eks-template';

export default class Install extends Command {

  static description: string = 'Installs the callrails eks environment.';
  static examples: string[] = [
    '$ callrail_eks install',
    '$ callrail_eks install -b my-branch',
    '$ callrail_eks install -s callrail/stack',
    '$ callrail_eks install -n my-namespace',
    '$ callrail_eks install -c "~/my-custom-yaml.yml"'
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

  async run() {
    const { flags } = this.parse(Install);
    const {
      branch,
      stack,
      config,
      namespace: namespaceFlag
    } = flags;

    const namespace = namespaceFlag || getNamespace();
    const eksConfigLocation = config || getEKSConfigLocation();
    const commandString = `helm ssm install ${namespace} ${stack} -f ${config || eksConfigLocation}`;
    writeTemplate(branch);
    exec(commandString);
  }
}
