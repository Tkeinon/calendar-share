import { LucideIcon, LucideProps } from 'lucide-react';
import styles from 'src/components/buttons/button.module.css';


type ButtonProps = {
    buttonClass: 'primary' | 'secondary'
    buttonText: string,
    id: string,
    Icon?: LucideIcon,
    iconBefore?: boolean,
    iconAfter?: boolean,
    iconBeforeProps?: LucideProps,
    iconAfterProps?: LucideProps,
    onClick: () => void,
    type: 'button' | 'submit' | 'reset' | undefined,
};

const colorSchemes = {
    'primary': styles['primary'],
    'secondary': styles['secondary']
};

const Button = ({
    buttonClass = 'primary',
    buttonText,
    id,
    Icon,
    iconBefore = false,
    iconAfter = false,
    iconBeforeProps = {
        color: '#1f2937',
        size: '24',
    },
    iconAfterProps = {
        color: '#1f2937',
        size: '24',
    },
    onClick,
    type = 'button',
}: ButtonProps) => {
    return <button className={`${styles.button} ${colorSchemes[buttonClass]}`} id={id} onClick={onClick} type={type}>
        {iconBefore && Icon && <i><Icon {...iconBeforeProps} /></i>}
        <span>{buttonText}</span>
        {iconAfter && Icon && <i><Icon {...iconAfterProps} /></i>}
    </button>;
};


export {Button};
