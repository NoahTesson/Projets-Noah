class GithubParser:
    """
    Class for parsing Github webhooks responses.
    """
    def __init__(self):
        pass

    @staticmethod
    def parseWebhook(resp, event: str):
        """
        This method parses a Github webhook response and returns a dictionary with action and message information.

        :param resp: The Github webhook response to parse.
        :type resp: dict
        :param event: The github event to parse.
        :type event: str
        :return: A dictionary containing the action and message.
        :rtype: dict

        The possible actions and their corresponding messages are as follows:

        - When a user pushes to a repository: "When a user push"
        - When a user creates a repository: "When a user create a repository"
        - When a user opens a pull request: "When a user open a pull request"
        - When a user closes a pull request: "When a user close a pull request"
        - When a user creates a branch: "When a user create a branch"
        """
        result = {'action': 'default', 'message': 'default'}
        action = resp.get('action', None)
        ref = resp.get('ref', None)

        if event == 'push':
            result['action'] = 'When a user push'
            result['message'] = f"User {resp['head_commit']['author']['name']} pushed on {resp['repository']['name']} with the message: {resp['head_commit']['message']}"
            return result
        elif event == 'repository' and action == 'created':
            result['action'] = 'When a user create a repository'
            result['message'] = f"User {resp['repository']['owner']['login']} created the {'private' if resp['repository']['private'] else 'public'} repository {resp['repository']['name']}"
        elif event == 'pull_request' and action == 'opened':
            result['action'] = 'When a user open a pull request'
            result['message'] = f"User {resp['pull_request']['user']['login']} opened a pull request on repository {resp['pull_request']['title']}"
        elif event == 'pull_request' and action == 'closed':
            result['action'] = 'When a user close a pull request'
            result['message'] = f"User {resp['pull_request']['user']['login']} closed a pull request on repository {resp['pull_request']['title']}"
        elif ref is not None and event == 'pull_request' or event == 'create':
            if resp.get('ref_type', None) is not None:
                result['action'] = 'When a user create a branch'
                result['message'] = f"User {resp['sender']['login']} created a new branch {ref}"
        return result