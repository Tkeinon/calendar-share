import { useEffect, useState } from 'react';

import { Button } from 'src/components/buttons/Button';
import Calendar from 'src/components/calendar/Calendar';
import { LabelInput, SelectInput } from 'src/components/inputs/Input';
import Modal from 'src/components/modal/Modal';
import styles from 'src/pages/calendar/calendar.module.css';
import axiosInstance from 'src/utils/axios';
import type {
    CalendarType,
    CalendarResponse
} from 'src/types/calendarTypes';



const CalendarPage = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [calendars, setCalendars] = useState<CalendarType[]>([]);
    const [name, setName] = useState<string>('');
    const [selectedCalendar, setSelectedCalendar] = useState<CalendarType|null>(null);

    useEffect(() => {
        axiosInstance.get(
            '/api/calendar/',
        ).then((response) => {
            if (response?.data?.calendars) {
                const cals = response?.data?.calendars.map((respCal: CalendarResponse) => {
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
            // TODO better error handling
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
            // TODO better error handling
            console.error('error', error);
        });
    };

    const options = [
        {'value': '', 'label': 'Select calendar'}, ...calendars.map((calendar) => 
            ({value: String(calendar.id), label: calendar.name}))
    ];

    return <div className={styles.container}>
        {!calendars.length && <p>No calendars</p>}
        <div className={styles.toolbar}>
            <div className={styles['select']}>
                <SelectInput
                    labelText=''
                    name='calendar'
                    onChange={(calId) => {
                        const newCal = calendars.find((cal) => {
                            return Number(cal.id) === Number(calId);
                        });

                        if (newCal) {
                            setSelectedCalendar(newCal);
                        } else {
                            setSelectedCalendar(null);
                        }
                    }}
                    options={options}
                    value={String(selectedCalendar?.id) || ''}
                />
            </div>
            <div className={styles['create-button']}>
                <Button
                    buttonClass='primary'
                    buttonText='Create a calendar'
                    id='create-calendar'
                    onClick={() => setModalOpen(true)}
                    type='button'
                />
            </div>
        </div>
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
        {selectedCalendar && <Calendar calendar={selectedCalendar} />}
    </div>;
};


export default CalendarPage;