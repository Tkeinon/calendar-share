import axiosInstance from 'src/utils/axios';
import styles from 'src/pages/calendar/calendar.module.css';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/buttons/Button';
import { LabelInput, SelectInput } from 'src/components/inputs/Input';
import Modal from 'src/components/modal/Modal';


type CalendarPerm = {
    'canEditCalendar': boolean,
    'canEditEvents': boolean,
    'canInviteUsers': boolean,
    'canRemoveEvent': boolean,
}

type Calendar = {
    'id': number,
    'name': string,
    'owner': string,
    'sharePerms': CalendarPerm[],
}

type CalendarPermResp = {
    'can_edit_calendar': boolean,
    'can_edit_events': boolean,
    'can_invite_users': boolean,
    'can_remove_events': boolean,
}

type CalendarResp = {
    'id': number,
    'name': string,
    'owner': string,
    'share_perms': CalendarPermResp,
}


const Calendar = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [calendars, setCalendars] = useState<Calendar[]>([]);
    const [name, setName] = useState<string>('');
    const [selectedCalendar, setSelectedCalendar] = useState<Calendar|null>(null);

    useEffect(() => {
        axiosInstance.get(
            '/api/calendar/',
        ).then((response) => {
            if (response?.data?.calendars) {
                const cals = response?.data?.calendars.map((respCal: CalendarResp) => {
                    return {
                        'id': respCal.id,
                        'name': respCal.name,
                        'owner': respCal.owner,
                        'sharePerms': {
                            'canEditCalendar': respCal.share_perms.can_edit_calendar,
                            'canEditEvents': respCal.share_perms.can_edit_events,
                            'canInviteUsers': respCal.share_perms.can_invite_users,
                            'canRemoveEvent': respCal.share_perms.can_remove_events,
                        }
                    };
                });

                setCalendars(cals);
            }
        }).catch((error) => {
            console.error('error', error);
        });
    }, []);

    const handleSubmit = () => {
        const formData = {
            'name': name,
        }; 

        axiosInstance.post(
            '/api/calendar/', formData
        ).then((response) => {
            setCalendars(response?.data?.calendars);
        }).catch((error) => {
            console.error('error', error);
        });
    };
    return <div className={styles.container}>
        {!calendars.length && <p>No calendars</p>}
        <Button
            buttonClass='primary'
            buttonText='Create a calendar'
            id='create-calendar'
            onClick={() => setModalOpen(true)}
            type='button'
        />
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2>Create a calendar</h2>
            <LabelInput
                labelText='Calendar name'
                name='nameField'
                onChange={setName}
                placeholder='Calendar name'
                value={name}
                required={true}
            />
            <Button 
                buttonClass='primary'
                buttonText='Create'
                id='create'
                onClick={handleSubmit}
                type='submit'
            />
        </Modal>
        <SelectInput
            labelText='Calendar'
            name='calendar'
            onChange={(calId) => {
                const newCal = calendars.find((cal) => {
                    return Number(cal.id) === Number(calId);
                });
                console.log(newCal);
                if (newCal) {
                    setSelectedCalendar(newCal);
                } else {
                    setSelectedCalendar(null);
                }
            }}
            options={[{'value': '', 'label': 'select cal'}, ...calendars.map((calendar) => ({value: String(calendar.id), label: calendar.name}))]}
            value={String(selectedCalendar?.id) || ''}
        />
        <div>
            {selectedCalendar && selectedCalendar.name}
        </div>
    </div>;
};


export default Calendar;