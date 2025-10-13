type CalendarType = {
    'id': number,
    'name': string,
    'owner': string,
    'sharePerms': CalendarPermission[],
}

type CalendarPermission = {
    'canEditCalendar': boolean,
    'canEditEvents': boolean,
    'canInviteUsers': boolean,
    'canRemoveEvent': boolean,
}

type CalendarPermissionResponse = {
    'can_edit_calendar': boolean,
    'can_edit_events': boolean,
    'can_invite_users': boolean,
    'can_remove_events': boolean,
}

type CalendarResponse = {
    'id': number,
    'name': string,
    'owner': string,
    'share_perms': CalendarPermissionResponse,
}


export type {
    CalendarType,
    CalendarPermission,
    CalendarPermissionResponse,
    CalendarResponse,
};