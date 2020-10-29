import { readFileSync, writeFileSync } from 'fs';
import { getDomain } from './cli-config';

// We could just call the template run command, but its a pain with flags so use a helper
const writeTemplate = (branch: string = 'master', domain: string = getDomain()) => {
  const bustCache = Math.floor(Math.random() * Math.floor(1000));
  const yamlTemplateRaw = readFileSync('eks-template.yaml');
  let yamlString = yamlTemplateRaw.toString()
  yamlString = yamlString.replace('$CACHEBUST', `"${bustCache}"`);
  yamlString = yamlString.replace('$CALLRAILTAG', branch);
  yamlString = yamlString.replace('$BASEDOMAN', domain);

    writeFileSync('eks_config.yaml', yamlString);
}

export { writeTemplate }