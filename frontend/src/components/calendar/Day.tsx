import useHover from 'src/hooks/useHover';
import styles from 'src/components/calendar/calendar.module.css';
import Modal from 'src/components/modal/Modal';
import { useState } from 'react';


const Day = ({
    date,
    isToday = false,
    isCurrentMonth = false
}: {
    date: Date,
    isToday: boolean,
    isCurrentMonth: boolean
}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const date_ = date.getDate();
    const { isHovered, hoverProps } = useHover();

    return <div
        {...hoverProps}
        className={`${styles['calendar-cell']}
            ${isToday ? styles['today'] : ''} 
            ${!isCurrentMonth ? styles['outside'] : ''}`}
        >
        {date_}
        {isHovered && <span 
            className={styles['add-event']}
            onClick={() => setModalOpen(true)}>
            Add an event
        </span>}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2>Add an event</h2>
        </Modal>
    </div>
};

export {Day};