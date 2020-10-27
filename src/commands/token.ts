import { Command, flags } from '@oclif/command';
import { exec } from 'child_process';

export default class Token extends Command {
  static description = 'Prints token needed to log into Kubernetes console';
  static examples = ['$callrail_eks token'];
  static flags = {
    help: flags.help({char: 'h'}),
  };
  static args = [];

  async run() {
    const {args, flags} = this.parse(Token)
    const commandString = "kubectl describe secret $(kubectl get secret | grep kubernetes-dashboard-user | awk '{print $1}')";
    exec(commandString, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(stdout);
    });
  }
}
