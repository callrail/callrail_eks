import { Command, flags } from '@oclif/command';
import { execAsync } from '../helpers/exec';
import { getNamespace } from '../helpers/cli-config';
import { blue, red } from 'colors';

export default class Delete extends Command {
  static description: string = 'Deletes the stack along with the stateful sets associated with it';
  static examples: string[] = ['$callrail_eks delete'];
  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n'}),
  };
  static args = [];

  async run() {
    const { flags } = this.parse(Delete);
    const { namespace: namespaceFlag } = flags;
    const namespace = namespaceFlag || getNamespace();

    console.log(red('Deleting ESK environment!'));
    console.log(blue('Deleting helm deploy.'));
    await execAsync(`helm delete ${namespace}`);
    console.log(blue('Deleting statefule sets.'));
    await execAsync(`kubectl delete statefulset ${namespace}-callrail-postgresql-master`);
    await execAsync(`kubectl delete statefulset ${namespace}-rowdy-postgresql-master`);
    await execAsync(`kubectl delete statefulset ${namespace}-swappy-postgresql-master`);
    console.log(blue('Deleting all pvcs.'));
    await execAsync('kubectl delete pvc --all');
  }
}
