import { Command, flags } from '@oclif/command';
import { exec } from '../helpers/exec';

export default class Token extends Command {
  static description = 'Prints token needed to log into Kubernetes console';
  static examples = ['$callrail_eks token'];
  static flags = {
    help: flags.help({char: 'h'}),
  };
  static args = [];

  async run() {
    exec("kubectl describe secret $(kubectl get secret | grep kubernetes-dashboard-user | awk '{print $1}')");
  }
}
