import './form.styles.css';

interface SelectProps {
    data: [];
    placeholder?: string;
    flushed?: boolean;
}

export const Select = ({ data, placeholder, flushed = true }: SelectProps) => {
    return (
        <select className={flushed ? 'select_flushed' : 'select_solid'}>
            <option value="" className="placeholder">
                {placeholder}
            </option>
            <option value="mauricio">Mauricio</option>
            <option value="josiana">Josiana</option>
            <option value="jose">Jose</option>
        </select>
    );
};
