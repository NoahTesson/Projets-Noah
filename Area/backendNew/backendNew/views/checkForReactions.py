from backendNew.models.rule import RuleModel
from backendNew.models.service import ServiceModel

def checkForReactions(app, event, content, triggerToken):
    """
    Check for reactions and generate corresponding URLs based on the provided parameters.

    :param app: The application or service name.
    :type app: str

    :param event: The event or action.
    :type event: str

    :param content: The content or data associated with the event.
    :type content: str

    :param triggerToken: The trigger token for authorization.
    :type triggerToken: str

    :return: The URL generated based on the reaction, or None if no matching reaction is found.
    :rtype: str or None
    """
    if (service := ServiceModel.objects.filter(name=app, action=event).first()) is not None:
        if (rule := RuleModel.objects.filter(trigger_id=service.id).first()) is not None:
            if rule.triggerToken == triggerToken:
                user_id = rule.to_dict()['user_id']
                action_id = rule.to_dict()['action_id']
                action_token = rule.to_dict()['actionToken']
                action = ServiceModel.objects.filter(id=action_id).first()
                print("act = ", action.to_dict()['action'])
                if (action.to_dict()['action'] == "Post a tweet"):
                    return f"http://localhost:8080/api/twitter/postTweet?user_id={user_id}&content={content}"
                elif (action.action == "Add to a spreadsheet"):
                    if rule.actionToken:
                        return f"http://localhost:8080/api/google/spreadsheet/add_new_row?user_id={user_id}&title={rule.actionToken}&value1={content}"
                    return f"http://localhost:8080/api/google/spreadsheet/add_new_row?user_id={user_id}&title=Areas&value1={content}"
                elif (action.to_dict()['action'] == "Send an email"):
                    return f"http://localhost:8080/api/google/sendEmail?email={action_token}&content={content}"
                elif (action.to_dict()['action'] == "Follow a playlist"):
                    return f"http://localhost:8080/api/spotify/follow_playlist?user_id={user_id}&playlist_id={action_token}"
                elif (action.to_dict()['action'] == "Unfollow a playlist"):
                    return f"http://localhost:8080/api/spotify/follow_playlist?user_id={user_id}&playlist_id={action_token}"
                elif (action.to_dict()['action'] == "Follow an artist"):
                    return f"http://localhost:8080/api/spotify/follow_artist?user_id={user_id}&artist_id={action_token}"
                elif (action.to_dict()['action'] == "Unfollow an artist"):
                    return f"http://localhost:8080/api/spotify/unfollow_artist?user_id={user_id}&artist_id={action_token}"
                elif (action.to_dict()['action'] == "Follow an user"):
                    return f"http://localhost:8080/api/spotify/follow_user?user_id={user_id}&artist_id={action_token}"
                elif (action.to_dict()['action'] == "Unfollow an user"):
                    return f"http://localhost:8080/api/spotify/unfollow_user?user_id={user_id}&artist_id={action_token}"
                elif (action.to_dict()['action'] == "Save a track"):
                    return f"http://localhost:8080/api/spotify/save_track?user_id={user_id}&track_id={action_token}"
                elif (action.to_dict()['action'] == "Unsave a track"):
                    return f"http://localhost:8080/api/spotify/unsave_track?user_id={user_id}&track_id={action_token}"
                elif (action.to_dict()['action'] == "Post a message on your linkedin feed"):
                    return f"http://localhost:8080/api/linkedin/postALinkedinPost?user_id={user_id}&content={action_token}"
                elif (action.to_dict()['action'] == "Create a new organization"):
                    return f"http://localhost:8080/api/trello/createOrganization?user_id={user_id}&name={action_token}"
                elif (action.to_dict()['action'] == "Create a new board"):
                    return f"http://localhost:8080/api/trello/createBoard?user_id={user_id}&idOrganization={action_token}"
                elif (action.to_dict()['action'] == "Create a repository"):
                    return f"http://localhost:8080/api/github/createRepo?user_id={user_id}&repo_name={action_token}"
    return None
