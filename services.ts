import type { IconName } from '../components/Icon';

export interface Offering {
  id: string;
  title: string;
  summary: string;
  details: string;
  includes: string[];
}

export interface Service {
  id: string;
  path: string;
  title: string;
  tagline: string;
  summary: string;
  icon: IconName;
  offerings: Offering[];
  needs: string[];
  note?: string;
}

/**
 * Service descriptions. They describe what is offered and how a request works.
 * They deliberately contain no prices, timelines, statistics or guarantees:
 * those are agreed with each client directly.
 */
export const services: Service[] = [
  {
    id: 'free-website',
    path: '/free-website',
    title: 'Free Website',
    tagline: 'A clean, responsive website for your idea.',
    summary:
      'Tell me what the website is for and I will build it with modern web technology. What is included is agreed with you before any work starts.',
    icon: 'globe',
    offerings: [
      {
        id: 'portfolio',
        title: 'Personal or portfolio site',
        summary: 'A site that presents you or your work.',
        details:
          'A responsive website with the pages you need, for example a home page, an about page and a contact page, styled to match you or your brand.',
        includes: [
          'Layout that works on phone, tablet and desktop',
          'Basic on-page SEO such as page titles and descriptions',
          'Contact links that point to your own real accounts',
        ],
      },
      {
        id: 'landing-page',
        title: 'Landing page',
        summary: 'One focused page for one purpose.',
        details:
          'A single page built around one goal, such as introducing a project, a product or an event, with a clear call to action that works.',
        includes: [
          'One page with a clear structure and call to action',
          'Fast loading with optimised assets',
          'Links and buttons that all lead somewhere real',
        ],
      },
      {
        id: 'info-site',
        title: 'Small business or info site',
        summary: 'Share what you do and how to reach you.',
        details:
          'A small multi-page website that explains what you offer and how people can contact you, using only content you provide.',
        includes: [
          'Several pages with working navigation',
          'Your own text, images and contact details',
          'A structure that is easy to extend later',
        ],
      },
      {
        id: 'site-deployment',
        title: 'Getting the site online',
        summary: 'Help publishing the finished site.',
        details:
          'Guidance on putting the finished website on a free static hosting service, including connecting a GitHub repository and the right build settings.',
        includes: [
          'GitHub repository preparation',
          'Static hosting setup, for example Render Static Sites',
          'Correct routing so deep links do not break',
        ],
      },
    ],
    needs: [
      'What the website is for and who it is meant for',
      'The text and images you want shown (or a description of them)',
      'Links to your real accounts, if you want them listed',
    ],
    note: 'Scope and terms are discussed and agreed with Ramjan before work starts.',
  },
  {
    id: 'apk-building',
    path: '/apk-building',
    title: 'APK Building',
    tagline: 'Android apps and APK files, built and packaged.',
    summary:
      'From packaging an existing website as an Android app to building an app from your requirements and producing a signed APK.',
    icon: 'phone',
    offerings: [
      {
        id: 'website-to-app',
        title: 'Website to Android app',
        summary: 'Package an existing website as an APK.',
        details:
          'Wraps your website in an Android app shell so it can be installed like any other app. Some app stores have rules about apps that only wrap a website, and I will tell you about this before building.',
        includes: [
          'An installable Android APK of your website',
          'App name and icon set up from your files',
          'Basic handling for offline and error screens',
        ],
      },
      {
        id: 'custom-app',
        title: 'Custom Android app',
        summary: 'An app built from your requirements.',
        details:
          'An Android app designed around the features you describe. We agree on the feature list first so it is clear what will be built.',
        includes: [
          'A written feature list agreed before building',
          'A working APK to test on your device',
          'The project source so you can keep developing it',
        ],
      },
      {
        id: 'signing',
        title: 'Signing and release builds',
        summary: 'Turn a debug build into a release APK.',
        details:
          'Explains and sets up the difference between debug and release builds and how app signing works. You keep control of your own signing keystore.',
        includes: [
          'Release build configuration',
          'Signing steps explained clearly',
          'Guidance on storing your keystore safely',
        ],
      },
      {
        id: 'build-fixes',
        title: 'Fixing build errors',
        summary: 'Get a stuck Android project building again.',
        details:
          'Diagnosing Gradle, SDK and dependency errors in an existing Android project so it compiles and runs.',
        includes: [
          'Reading and explaining the error output',
          'Fixes for version and dependency conflicts',
          'A short note on what was changed and why',
        ],
      },
    ],
    needs: [
      'For a website app: the website address and your app name and icon',
      'For a custom app: a description of the features you want',
      'For build fixes: the project and the full error message',
    ],
    note: 'Never send keystore passwords or private signing keys by chat or email.',
  },
  {
    id: 'bot-making',
    path: '/bot-making',
    title: 'Bot Making',
    tagline: 'Bots that automate chat and repetitive tasks.',
    summary:
      'Bots for messaging platforms, built around the commands and behaviour you describe, and set up so they keep running.',
    icon: 'bot',
    offerings: [
      {
        id: 'telegram-bot',
        title: 'Telegram bot',
        summary: 'Commands, replies and menus inside Telegram.',
        details:
          'A bot built with the official Telegram Bot API that responds to commands, messages and buttons in the way you define.',
        includes: [
          'Commands and button menus you specify',
          'Clear error handling for unexpected input',
          'Setup notes so you can run and update it',
        ],
      },
      {
        id: 'discord-bot',
        title: 'Discord bot',
        summary: 'Slash commands and automation for your server.',
        details:
          'A bot for Discord servers using the official Discord developer platform, for example slash commands, welcome messages or moderation helpers.',
        includes: [
          'Slash commands you specify',
          'Permissions set up with least privilege',
          'Configuration kept out of the source code',
        ],
      },
      {
        id: 'automation-bot',
        title: 'Task automation bot',
        summary: 'Automate a repetitive job.',
        details:
          'A bot or script that handles a repeated task such as sending scheduled messages, collecting information from a service you own or formatting data.',
        includes: [
          'A written description of what it will and will not do',
          'Scheduled or on-demand running',
          'Logs that show what the bot did',
        ],
      },
      {
        id: 'bot-hosting',
        title: 'Hosting and keeping it running',
        summary: 'Move a bot from your computer to a server.',
        details:
          'Help deploying a finished bot so it runs continuously, including environment variables for secrets and restart behaviour.',
        includes: [
          'Deployment on a service you choose',
          'Secrets stored as environment variables',
          'Steps for updating the bot later',
        ],
      },
    ],
    needs: [
      'Which platform the bot is for and what it should do',
      'A bot you create yourself on that platform (I explain how)',
      'Your bot token, which stays with you and is never posted in public',
    ],
    note: 'Bots are built to follow each platform\u2019s terms of service.',
  },
  {
    id: 'security',
    path: '/security',
    title: 'Security',
    tagline: 'Practical help keeping projects and accounts safe.',
    summary:
      'Reviews and guidance for your own websites, apps and accounts, focused on the problems that cause real damage.',
    icon: 'shield',
    offerings: [
      {
        id: 'site-review',
        title: 'Website security review',
        summary: 'Check your site for common weaknesses.',
        details:
          'A review of your own website covering HTTPS, security headers, form handling, third-party scripts and outdated dependencies, with a clear list of what to fix.',
        includes: [
          'HTTPS and security header check',
          'Dependency and third-party script review',
          'A prioritised list of recommended fixes',
        ],
      },
      {
        id: 'account-hygiene',
        title: 'Account and password safety',
        summary: 'Protect the accounts you rely on.',
        details:
          'Practical steps for protecting developer and hosting accounts: two-factor authentication, password managers and recovery options.',
        includes: [
          'Two-factor authentication setup guidance',
          'Password manager basics',
          'Recovery and backup options explained',
        ],
      },
      {
        id: 'secret-cleanup',
        title: 'Leaked secret response',
        summary: 'What to do if a key reached GitHub.',
        details:
          'If a key, token or password was committed to a repository, the first step is to revoke and replace it. Then it can be removed from the project and its history.',
        includes: [
          'Rotating the exposed credential first',
          'Removing it from the code and repository history',
          'Preventing it from happening again',
        ],
      },
      {
        id: 'safe-setup',
        title: 'Safe project setup',
        summary: 'Good defaults from the start.',
        details:
          'Setting a project up so secrets stay out of the repository, with environment variables, a correct .gitignore and safe deployment settings.',
        includes: [
          'Environment variable setup',
          '.gitignore and repository hygiene',
          'Safe deployment configuration',
        ],
      },
    ],
    needs: [
      'The website, app or repository you want reviewed (it must be yours)',
      'What worries you, or what happened',
      'No passwords or private keys: describe the setup instead',
    ],
    note: 'I only review projects you own or have written permission to test.',
  },
  {
    id: 'api-key',
    path: '/api-key',
    title: 'API Key',
    tagline: 'Use API keys correctly without exposing them.',
    summary:
      'Guidance on getting, storing and using API keys so your project works and your keys stay private.',
    icon: 'key',
    offerings: [
      {
        id: 'getting-keys',
        title: 'Getting and understanding keys',
        summary: 'Create a key and know what it can do.',
        details:
          'Walks through creating a key with a provider, reading its permissions and limits, and choosing the smallest scope that does the job.',
        includes: [
          'Where and how to create the key',
          'Permissions, scopes and usage limits explained',
          'Separate keys for testing and production',
        ],
      },
      {
        id: 'safe-usage',
        title: 'Using keys safely',
        summary: 'Keep secrets out of public code.',
        details:
          'Anything in front-end code can be read by every visitor, so private keys must stay on a server. This covers environment variables and a small backend that calls the API for you.',
        includes: [
          'Environment variables explained',
          'Why private keys never belong in browser code',
          'A server-side proxy pattern for calling APIs',
        ],
      },
      {
        id: 'integration',
        title: 'Connecting an API',
        summary: 'Add a third-party API to your project.',
        details:
          'Reading the API documentation, making requests, handling errors and rate limits, and wiring the result into your website, bot or app.',
        includes: [
          'Request and response handling',
          'Error and rate-limit handling',
          'Configuration kept outside the code',
        ],
      },
      {
        id: 'rotation',
        title: 'Rotating and revoking keys',
        summary: 'Respond when a key may be exposed.',
        details:
          'How to revoke a key, issue a replacement and update every place that used it, so a leaked key stops being useful.',
        includes: [
          'Revoking and replacing a key',
          'Finding where the key was used',
          'Checking provider usage logs',
        ],
      },
    ],
    needs: [
      'Which API or provider you want to use',
      'What your project should do with it',
      'The names of your configuration variables, never their secret values',
    ],
    note: 'Never send a private API key by chat or email. Share the variable name, not the value.',
  },
  {
    id: 'review-project',
    path: '/review-project',
    title: 'Review Project',
    tagline: 'A second pair of eyes on your code and design.',
    summary:
      'A written review of your project with specific, actionable feedback you can apply straight away.',
    icon: 'review',
    offerings: [
      {
        id: 'code-review',
        title: 'Code review',
        summary: 'Readability, structure and bugs.',
        details:
          'A look through your code for bugs, unclear structure, duplicated logic and risky patterns, with suggestions for each point.',
        includes: [
          'Bug and risk spotting',
          'Structure and naming feedback',
          'Concrete suggested changes',
        ],
      },
      {
        id: 'performance-review',
        title: 'Performance review',
        summary: 'Find what makes it slow.',
        details:
          'Checks bundle size, image handling, loading behaviour and animation cost, and recommends the changes with the biggest effect.',
        includes: [
          'Bundle and asset size check',
          'Loading and rendering review',
          'Animation cost on mobile and desktop',
        ],
      },
      {
        id: 'design-review',
        title: 'Design and responsiveness',
        summary: 'How it looks and behaves on every screen.',
        details:
          'Reviews layout, readability, spacing, contrast and behaviour on phones, tablets and desktops, plus keyboard and accessibility basics.',
        includes: [
          'Responsive layout checks',
          'Contrast and readability feedback',
          'Keyboard and reduced-motion support',
        ],
      },
      {
        id: 'readiness-review',
        title: 'Deployment readiness',
        summary: 'Is it ready to publish?',
        details:
          'Checks that the project builds cleanly, routing works, environment variables are set up, links work and SEO basics are in place.',
        includes: [
          'Build and routing check',
          'Broken link and placeholder check',
          'SEO and metadata check',
        ],
      },
    ],
    needs: [
      'A GitHub link or a ZIP of the project',
      'What you want reviewed and what matters most',
      'Remove any secrets from the project before sharing it',
    ],
  },
  {
    id: 'pc-tools',
    path: '/pc-tools',
    title: 'PC Tools',
    tagline: 'Small tools that save time on your computer.',
    summary:
      'Utilities and scripts for repetitive jobs, each one described clearly before you run it.',
    icon: 'monitor',
    offerings: [
      {
        id: 'desktop-utility',
        title: 'Desktop utility',
        summary: 'A small program for one specific job.',
        details:
          'A focused tool with a simple interface for a task you do often, built to do exactly what was agreed and nothing else.',
        includes: [
          'A written description of what the tool does',
          'A simple interface or command line',
          'Instructions for running it',
        ],
      },
      {
        id: 'automation-script',
        title: 'Automation script',
        summary: 'Let the computer do the repetitive part.',
        details:
          'Scripts in languages such as Python, Node.js or batch files that automate repeated steps, with readable code you can inspect.',
        includes: [
          'Readable, commented scripts',
          'Safe handling of your files',
          'Notes on how to run and change it',
        ],
      },
      {
        id: 'file-helper',
        title: 'File and data helper',
        summary: 'Rename, convert and organise files.',
        details:
          'Tools for bulk renaming, converting formats, sorting folders or cleaning data files, designed so you can preview changes before they are applied.',
        includes: [
          'Preview before changing files',
          'Bulk operations on the folders you choose',
          'Clear messages when something fails',
        ],
      },
      {
        id: 'dev-setup',
        title: 'Developer environment setup',
        summary: 'Get your tools installed and working.',
        details:
          'Installing and configuring Node.js, Git, the Android SDK and similar tools, and fixing the version and path problems that come with them.',
        includes: [
          'Step-by-step setup guidance',
          'Fixing version and PATH issues',
          'A working test project to confirm it',
        ],
      },
    ],
    needs: [
      'A description of the task and your operating system',
      'Example files or steps that show the repetitive part',
      'Which folders the tool is allowed to work with',
    ],
    note: 'Every tool is described before you run it, so you know exactly what it does.',
  },
];

export const serviceOptions = services.map((service) => ({ id: service.id, title: service.title }));

export function getService(id: string | null | undefined): Service | undefined {
  return services.find((service) => service.id === id);
}
