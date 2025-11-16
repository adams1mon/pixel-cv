import { GitHubLogo } from "./GithubLogo";
import { LinkedInLogo } from "./LinkedInLogo";

export function SocialIcon({ network, style }: { network: string, style?: any }) {
  
  switch (network.toLowerCase()) {
    case 'github': return <GitHubLogo style={style} />
    case 'linkedin': return <LinkedInLogo style={style} />
    default: return null;
  }
}