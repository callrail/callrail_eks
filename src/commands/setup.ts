import { Command, flags } from '@oclif/command';
import { execAsync } from '../helpers/exec';
import { blue, red } from 'colors';

export default class Setup extends Command {
  static description: string = 'Sets current namespace';
  static examples: string[] = ['$callrail_eks namespace my-namespace'];
  static flags = {
    help: flags.help({char: 'h'})
  };
  static args = [
    {
      name: 'githubName',
      description: 'Github user name'
    },
    {
      name: 'namespace',
      description: 'Namespace to use when talking to Kubernetes'
    }
  ];

  async run() {
    const { args } = this.parse(Setup);
    const { namespace, githubName } = args;

    console.log(blue('Installing needed packages'));
    await execAsync('brew install awscli');
    await execAsync('brew install helm');
    await execAsync('helm plugin install https://github.com/callrail/helm-ssm');
    await execAsync('brew cask install aws-vault');
    await execAsync('brew install kubectl');

    if(githubName) {
      console.log(blue('Installing kubectl plugins'));
      await execAsync(`curl --user ${githubName} 'https://raw.githubusercontent.com/callrail/k8s-eks/master/kubectl-plugins/kubectl-rails-c' > /usr/local/bin/kubectl-rails-c && chmod +x /usr/local/bin/kubectl-rails-c`)
    } else {
      console.log(red('No github user supplied. Install Kubectl plugins using this readme: https://github.com/callrail/k8s-eks/tree/master/kubectl-plugins/'))
    }
  }
}
