# slack-node-github-action
This is a dead simple GitHub action that posts a message on Slack. This is only meant as a proof of concept/tutorial and could most definitly be improved in many areas.

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Getting started](#getting-started)
    1. [Configuring Slack](configuring-slack)
    2. [Create a workflow that uses the action](#create-a-workflow-that-uses-the-action)
    3. [Running the action](#running-the-action)
3. [Local development](local-development)
4. [Lessons learned](#lessons-learned)
5. [Possible improvements](#possible-improvements)
6. [Sources](#sources)

## Prerequisites
You need to have npm and node installed to run this application locally. You also need to have a Slack development account, and preferably a cup of coffee.

## Getting started


### Configuring Slack
Open [api.slack.com/apps](https://api.slack.com/apps) and click "Create New App". During test and development it might be useful to have a dedicated personal development workspace (which is free).

When your new application is created open the **Incoming Webhooks** feature from your dashboard. When you've enabled this feature, click the "Add New Webhook to Workspace" button located at the very bottom of the page. Select the channel you'd like to post to, and hit "Allow". This will generate a "Webhook URL" with a pattern similar to this; ``https://hooks.slack.com/services/XXX/YYY/ZZZ``.

### Create a workflow that uses the action
Up next we need to create a "workflow" that uses the action. Ideally you want to seperate your "action" in a different repository. Another repository can then have a "workflow" that utilizes that action in a step. For the sake of this demonstration however, the two has been combined in the same repository. You can have a look at ``.github/workflows/main.yml`` to see how that's done.

Our action takes two parameters; a key (basically parts of the URL from the previous step) and a message. The message can be in plain text, but the URL/token should be private. For this you can use a "secret". Secrets can be created per repository under the "Settings" tab. Create a new secret called "SLACK_TOKEN". Add the URL from the previous step, but only the part after /services/. For example; if you full URL is ``https://hooks.slack.com/services/XXX/YYY/ZZZ`` you should only store ``XXX/YYY/ZZZ`` in the secret. You can't see the content of a secret after it's been saved.

### Running the action
To start the action simply push to the repository containing the workflow, or launch the job manually from the "Actions" tab. 


## Local development
To test this script locally, simply run ``npm start``. This command ensures that the NODE_ENV is set to dev - which in turn loads environment variables from the ``.env`` file. Check out the ``env.sample`` file to get started. When running this file on GitHub you can set the environment variables in the workflow definition file.

## Possible improvements
As with most of the code we write, there is always room for improvements. These changes probably won't find their way into this repository (which aims to act more as starting point for newcomers, rather than an action you would actually use in the real world). You might want to consider some of these things if you create your own action.

- Use TypeScript. Might be a bit overkill for such a small demonstration, but in any larger more complex action I'd reach for it immediately.

- Write tests. 

- Create a pre-built production-ready file to avoid having to commit npm packages. The official documentation actually does include packages. Some people also run ``npm install`` every time the action runs, which seem a bit unnecessary (although you might be able to cache packages). Compiling everything down to one file, possibily with a pre-commit or pre-push hook *might* be a better way to go.



## Lessons learned
- Although this might be obvious for some people, the "uses" tag in ``.github/workflows/main.yml`` can just point to @master, and not rely on any specific release/tag. The documentation tends to use releases which can be bothersome and lead to some weird issues when things arent 100% in sync. During development, just use @master.

- In the same file as above, it seems like each step must have a unique ID. 

- I have not yet fully understood the difference between "with" and "env" for arguments, although it seems like "with" requires you to use a GitHub library. 


## Sources 
- [Creating a JavaScript Action - GitHub Help](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-javascript-action)
- [actions/hello-world-javascript-action - GitHub](https://github.com/actions/hello-world-javascript-action)
- [actions/typescript-action - GitHub](https://github.com/actions/typescript-action)
- [ilshidur/action-slack - GitHub](https://github.com/Ilshidur/action-slack)

