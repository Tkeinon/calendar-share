import styles from 'src/components/inputs/input.module.css';


type SelectInputProps = {
    labelText: string,
    name: string,
    onChange: (value: string) => void,
    options: {value: string, label: string}[],
    value?: string
};

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


const SelectInput = ({
    labelText,
    name,
    onChange,
    options,
    value
}: SelectInputProps) => {
    return <label className={styles.wrapper}>
        <span className={styles['label-text']}>
            {labelText}
        </span>
        <select
            className={styles.input}
            id={name}
            onChange={(event) => {
                onChange(event.target.value);
            }}
            name={name}
            value={value}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </label>;
};

export {LabelInput, SelectInput};