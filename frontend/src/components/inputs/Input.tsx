import styles from 'src/components/inputs/input.module.css';

type LabelInputProps = {
    labelText: string,
    name: string,
    onChange: (value: string) => void,
    placeholder: string,
    required: boolean,
    type?: string,
    value: string|number
};


const LabelInput = ({
    labelText,
    name,
    onChange,
    placeholder = '',
    required = false,
    type = 'text',
    value
}: LabelInputProps) => {
    return <label className={styles.wrapper}>
        <span className={styles['label-text']}>
            {labelText}
            {required && <span className={styles.required}>*</span>}
        </span>
        <input
            className={styles.input}
            id={name}
            onChange={(event) => onChange(event.target.value)}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
        />
    </label>;
};


export {LabelInput};