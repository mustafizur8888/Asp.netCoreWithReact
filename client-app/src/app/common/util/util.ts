import { IUser } from './../../models/user';
import { IActivity } from './../../models/activity';
export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString + ' ' + timeString);
};

export const setActivityProps = (
  activity: IActivity,
  user: IUser
): IActivity => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(
    (x) => x.username === user.username
  );
  activity.isHost = activity.attendees.some(
    (x) => x.username === user.username && x.isHost
  );
  return activity;
};

export const createAttendee = (user: IUser) => {
  return {
    username: user.username,
    displayname: user.displayName,
    image: user.image!,
    isHost: false,
  };
};
